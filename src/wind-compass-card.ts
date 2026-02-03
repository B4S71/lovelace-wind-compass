/**
 * Wind Compass Card
 * @version 0.1.0
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
import type {
  HomeAssistant,
  WindCompassCardConfig,
  BucketData,
  HistoryState,
} from './types';

console.info(
  '%c WindCompassCard Loaded: TS_APPLE_FINAL ',
  'color: white; background: #000000; font-weight: bold;'
);

class WindCompassCard extends HTMLElement {
  private _hass?: HomeAssistant;
  private config!: WindCompassCardConfig;
  private _resizeObserver?: ResizeObserver;
  private content?: HTMLElement;

  // Configuration State
  private _bucketSize: number = 5;
  private _bucketCount: number = 72;
  private _warnMultiplier: number = 0.9;

  // Data State
  private _historyData: BucketData[] = [];
  private _lastHistoryFetch: number = 0;
  
  // Sensor Values
  private _avgDeg: number = 0;    // Standard 0 um Fehler zu vermeiden
  private _instDeg: number = 0;   // Standard 0
  private _currentSpeed?: number;
  private _currentUnit: string = '';
  private _maxSpeed: number = 30;
  private _currentGust: number = 0;
  
  // Limits
  private _limitRaffstore: number = 0;
  private _limitRollo: number = 0;

  // Layout
  private _pxPerDeg?: number;

  static getConfigElement() {
    return document.createElement('wind-compass-editor');
  }

  static getStubConfig() {
    return {
      type: 'custom:wind-compass-card',
      direction_entity: 'sensor.gw2000a_wind_direction_10m_avg',
      instant_direction_entity: 'sensor.gw2000a_wind_direction',
      speed_entity: 'sensor.gw2000a_wind_speed',
      gust_entity: 'sensor.gw2000a_wind_gust',
      max_speed: 60
    };
  }

  set hass(hass: HomeAssistant) {
    this._hass = hass;
    this._updateCard();
  }

  setConfig(config: WindCompassCardConfig) {
    if (!config.direction_entity) throw new Error('direction_entity is required');
    if (!config.speed_entity) throw new Error('speed_entity is required');
    
    this.config = config;
    this._recalcBuckets();
  }

  private _recalcBuckets() {
    let reqBucketSize = this.config.bucket_size !== undefined ? Number(this.config.bucket_size) : 5;
    if (isNaN(reqBucketSize) || reqBucketSize < 1) reqBucketSize = 5;
    if (reqBucketSize > 90) reqBucketSize = 90;

    while (360 % reqBucketSize !== 0) {
      reqBucketSize++;
    }

    if (this._bucketSize !== reqBucketSize) {
      this._bucketSize = reqBucketSize;
      this._bucketCount = Math.floor(360 / this._bucketSize);
      this._historyData = new Array(this._bucketCount).fill(null).map(() => ({ duration: 0, totalSpeed: 0 }));
      this._lastHistoryFetch = 0; 
    }
  }

  connectedCallback() {
    if (!this.shadowRoot) {
      this.attachShadow({ mode: 'open' });
      this._render();
    }
    this.content = this.shadowRoot?.querySelector('.container') as HTMLElement;
    
    if (this.content) {
        this._resizeObserver = new ResizeObserver(() => {
            this._updateDimensions();
            this._updateVisuals();
        });
        this._resizeObserver.observe(this.content);
    }
  }

  disconnectedCallback() {
    this._resizeObserver?.disconnect();
  }

  private _render() {
    if (!this.shadowRoot) return;
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        }
        
        ha-card {
          height: 100%;
          background: var(--ha-card-background, var(--card-background-color, white));
          box-shadow: none; 
          border: 1px solid var(--divider-color, rgba(0,0,0,0.05));
          border-radius: 16px;
          overflow: hidden;
        }

        .container {
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        /* --- COMPASS AREA --- */
        .compass-container {
          position: relative;
          width: 100%;
          height: 90px;
          background: transparent;
          border-radius: 12px;
          
          /* Apple Fade-Out Effect Left/Right */
          -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
          mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
          
          touch-action: pan-y;
          isolation: isolate; 
          z-index: 0;
        }

        .compass-tape {
          position: absolute;
          top: 0;
          left: 50%; /* Zentriert */
          height: 100%;
          display: flex;
          align-items: center;
          /* Smooth Animation für das Band */
          transition: transform 0.6s cubic-bezier(0.25, 0.1, 0.25, 1.0);
          will-change: transform;
          z-index: 1;
        }

        /* Historien-Balken */
        .hist-bar {
          position: absolute;
          bottom: 0;
          border-top-left-radius: 2px;
          border-top-right-radius: 2px;
          pointer-events: none;
          transform: none; 
          border-top: 1.5px solid; 
          box-sizing: border-box; 
          background: none; 
          transition: height 0.4s cubic-bezier(0.25, 0.1, 0.25, 1.0), border-color 0.3s ease;
        }

        .hist-fill {
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          transition: opacity 0.3s ease, background 0.3s ease;
        }

        .compass-tick {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 1.5px;
          border-radius: 1px;
          background: var(--primary-text-color);
          opacity: 0.1;
          z-index: 2;
        }

        .compass-label {
          position: absolute;
          top: 32px;
          transform: translateX(-50%);
          color: var(--primary-text-color);
          font-weight: 600;
          font-size: 13px;
          letter-spacing: -0.01em;
          z-index: 3;
          opacity: 0.8;
        }

        /* FLOATING MARKER (Rotes Dreieck) - Zeigt Ist-Wert */
        .compass-marker {
          position: absolute;
          left: 50%; 
          top: 0; 
          width: 0;
          height: 0;
          border-left: 7px solid transparent;
          border-right: 7px solid transparent;
          border-top: 9px solid var(--error-color, #ff3b30);
          
          /* Startet in der Mitte, wird per JS verschoben */
          transform: translateX(-50%); 
          
          z-index: 5;
          filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2));
          transition: transform 0.6s cubic-bezier(0.25, 0.1, 0.25, 1.0);
          will-change: transform;
        }

        /* CENTER DOT - Zeigt Durchschnitt (Mitte des Fensters) */
        .compass-center-dot {
           position: absolute;
           left: 50%;
           bottom: 0;
           width: 2px; 
           height: 12px; 
           background: var(--primary-text-color);
           border-radius: 2px;
           transform: translateX(-50%);
           opacity: 0.3;
           z-index: 4;
        }

        /* --- SPEED BAR AREA --- */
        .speed-container {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .speed-bar-bg {
          position: relative;
          width: 100%;
          height: 12px;
          background: var(--secondary-background-color, rgba(0,0,0,0.05));
          border-radius: 6px;
          overflow: visible; 
          isolation: isolate;
        }

        .speed-bar-gust {
          position: absolute;
          top: 0; left: 0; bottom: 0;
          background: var(--accent-color, var(--primary-color, #2196F3));
          opacity: 0.2;
          width: 0%;
          transition: width 0.6s cubic-bezier(0.25, 0.1, 0.25, 1.0);
          z-index: 1;
          border-radius: 6px;
        }

        .speed-bar-fill {
          position: absolute;
          top: 0; left: 0; bottom: 0;
          background: var(--accent-color, var(--primary-color, #2196F3));
          width: 0%;
          transition: width 0.6s cubic-bezier(0.25, 0.1, 0.25, 1.0);
          box-shadow: 0 0 10px var(--accent-color, transparent); 
          z-index: 2;
          border-radius: 6px;
        }

        .limit-marker {
          position: absolute;
          top: -2px; 
          bottom: -2px; 
          width: 2px;
          background-color: var(--primary-text-color);
          z-index: 10;
          box-shadow: 0 1px 3px rgba(0,0,0,0.3);
          border-radius: 1px;
          display: none; 
          pointer-events: none;
          opacity: 0.8;
        }

        .speed-text {
          display: flex;
          justify-content: flex-end;
          align-items: baseline;
          gap: 4px;
          color: var(--primary-text-color);
        }

        .speed-text .value {
          font-size: 24px;
          font-weight: 500;
          letter-spacing: -0.5px;
        }

        .speed-text .unit {
          font-size: 14px;
          color: var(--secondary-text-color);
          font-weight: 400;
        }

        .speed-text .gust-info {
          margin-left: 8px;
          font-size: 13px;
          color: var(--secondary-text-color);
          opacity: 0.8;
        }
      </style>

      <ha-card>
        <div class="container">
          <div class="compass-container" id="container">
            <div class="compass-center-dot"></div>
            <div class="compass-marker" id="marker"></div>
            <div class="compass-tape" id="tape"></div>
          </div>

          <div class="speed-container">
            <div class="speed-bar-bg">
              <div class="speed-bar-gust" id="gust-bar"></div>
              <div class="speed-bar-fill" id="speed-bar"></div>
              <div class="limit-marker" id="limit-raffstore" title="Raffstore Limit"></div>
              <div class="limit-marker" id="limit-rollo" title="Rollo Limit"></div>
            </div>
            <div class="speed-text" id="speed-text">--</div>
          </div>
        </div>
      </ha-card>
    `;
  }

  private _updateCard() {
    if (!this._hass || !this.config) return;

    // Entities
    const dirEntity = this.config.direction_entity; // AVG (Tape)
    // Fallback: Wenn keine Instant-Entity da ist, nimm auch Avg (Marker bleibt dann mittig)
    const instantDirEntity = this.config.instant_direction_entity || dirEntity; 
    
    const speedEntity = this.config.speed_entity;
    const entityGust = this.config.gust_entity;
    const entityLimitRaff = this.config.raffstore_limit_entity;
    const entityLimitRollo = this.config.rollo_limit_entity;
    
    // Config
    this._maxSpeed = this.config.max_speed || 30;
    this._warnMultiplier = this.config.warn_multiplier !== undefined ? Number(this.config.warn_multiplier) : 0.9;
    this._recalcBuckets();

    // States
    const dirState = this._hass.states[dirEntity];
    const instDirState = this._hass.states[instantDirEntity];
    const speedState = this._hass.states[speedEntity];
    const gustState = entityGust ? this._hass.states[entityGust] : null;

    // 1. DURCHSCHNITT (Bewegt das Band)
    if (dirState) {
      this._avgDeg = parseFloat(dirState.state);
    }
    
    // 2. IST-WERT (Bewegt den Marker)
    if (instDirState) {
      this._instDeg = parseFloat(instDirState.state);
    } else {
      this._instDeg = this._avgDeg; // Fallback
    }

    // Speed Data
    if (speedState) {
      this._currentSpeed = parseFloat(speedState.state);
      this._currentUnit = speedState.attributes.unit_of_measurement || '';
    }

    if (gustState) {
      this._currentGust = parseFloat(gustState.state);
    } else {
      this._currentGust = 0;
    }

    // Limits
    this._limitRaffstore = 0;
    this._limitRollo = 0;
    if (entityLimitRaff && this._hass.states[entityLimitRaff]) {
        this._limitRaffstore = parseFloat(this._hass.states[entityLimitRaff].state);
    }
    if (entityLimitRollo && this._hass.states[entityLimitRollo]) {
        this._limitRollo = parseFloat(this._hass.states[entityLimitRollo].state);
    }

    // History alle 5 min
    const now = Date.now();
    if (now - this._lastHistoryFetch > 300000) {
      this._lastHistoryFetch = now;
      this._fetchHistory(dirEntity, speedEntity);
    }

    this._updateVisuals();
  }

  private async _fetchHistory(dirEntity: string, speedEntity: string) {
    if (!this._hass) return;
    const endTime = new Date();
    const startTime = new Date(endTime.getTime() - 24 * 60 * 60 * 1000);

    try {
      const entities = [dirEntity, speedEntity].join(',');
      const history = await this._hass.callApi<HistoryState[][]>(
        'GET',
        `history/period/${startTime.toISOString()}?filter_entity_id=${entities}&end_time=${endTime.toISOString()}&minimal_response`
      );

      if (history && history.length === 2) {
        const dirHist = history.find((arr: HistoryState[]) => arr.length > 0 && arr[0].entity_id === dirEntity);
        const speedHist = history.find((arr: HistoryState[]) => arr.length > 0 && arr[0].entity_id === speedEntity);
        if (dirHist && speedHist) {
          this._processHistoryData(dirHist, speedHist);
        }
      }
    } catch (e) {
      console.error('WindCompass: History fetch failed', e);
    }
  }

  private _processHistoryData(dirData: HistoryState[], speedData: HistoryState[]) {
    const buckets: BucketData[] = new Array(this._bucketCount)
      .fill(null)
      .map(() => ({ duration: 0, totalSpeed: 0 }));
    
    let speedIdx = 0;

    for (let i = 0; i < dirData.length - 1; i++) {
      const deg = parseFloat(dirData[i].state);
      if (isNaN(deg)) continue;

      const startTs = new Date(dirData[i].last_changed).getTime();
      const endTs = new Date(dirData[i + 1].last_changed).getTime();
      const durationMin = (endTs - startTs) / 1000 / 60;

      while (speedIdx < speedData.length - 1 && 
             new Date(speedData[speedIdx + 1].last_changed).getTime() <= startTs) {
        speedIdx++;
      }

      const speedVal = parseFloat(speedData[speedIdx].state) || 0;
      const bucketIndex = Math.floor(((deg % 360) / 360) * this._bucketCount);
      
      if (bucketIndex >= 0 && bucketIndex < this._bucketCount) {
        buckets[bucketIndex].duration += durationMin;
        buckets[bucketIndex].totalSpeed += speedVal * durationMin;
      }
    }
    
    this._historyData = buckets;
    this._updateDimensions(); 
    this._updateVisuals(); 
  }

  private _updateDimensions() {
    if (!this.shadowRoot) return;
    const container = this.shadowRoot.querySelector('#container') as HTMLElement;
    if (!container) return;
    const width = container.offsetWidth;
    if (width === 0) return;
    this._pxPerDeg = width / 360;
    this._buildTape();
  }

  private _buildTape() {
    if (!this.shadowRoot || !this._pxPerDeg) return;
    const tape = this.shadowRoot.querySelector('#tape') as HTMLElement;
    if (!tape) return;

    tape.innerHTML = '';

    // Referenzwerte (Max Speed / Max Dauer)
    let maxDur = 0;
    let maxBucketAvgSpeed = 0;
    
    this._historyData.forEach(b => {
      if (b.duration > 0) {
        if (b.duration > maxDur) maxDur = b.duration;
        const avg = b.totalSpeed / b.duration;
        if (avg > maxBucketAvgSpeed) maxBucketAvgSpeed = avg;
      }
    });

    if (maxDur === 0) maxDur = 1;
    if (maxBucketAvgSpeed === 0) maxBucketAvgSpeed = 1;

    // Warn-Schwelle (Rot)
    const limits = [this._limitRaffstore, this._limitRollo].filter(l => l > 0);
    const minLimit = limits.length > 0 ? Math.min(...limits) : null;
    const alertThreshold = minLimit ? (minLimit * this._warnMultiplier) : null;

    const slotWidth = this._bucketSize * this._pxPerDeg;
    const barWidth = Math.max(1, slotWidth - 2); 
    const offset = 1;

    for (let i = -180; i <= 540; i += this._bucketSize) {
      const pxPos = i * this._pxPerDeg;
      const normalizedDeg = ((i % 360) + 360) % 360;
      const bucketIndex = Math.floor(normalizedDeg / this._bucketSize);

      // --- HISTOGRAMM ---
      if (bucketIndex >= 0 && bucketIndex < this._bucketCount) {
        const data = this._historyData[bucketIndex];
        if (data && data.duration > 0) {
          const avgSpeed = data.totalSpeed / data.duration;
          
          // Kritisch?
          const isCritical = alertThreshold !== null && avgSpeed >= alertThreshold;
          
          const colorNormal = 'var(--accent-color, var(--primary-color))';
          const colorCritical = 'var(--error-color, #ff3b30)';
          const usedColor = isCritical ? colorCritical : colorNormal;

          const bar = document.createElement('div');
          bar.className = 'hist-bar';
          
          // Höhe = Geschwindigkeit (Intensität)
          const heightPct = (avgSpeed / maxBucketAvgSpeed) * 100;
          bar.style.height = `${heightPct * 0.6}%`; 
          bar.style.left = `${pxPos + offset}px`;
          bar.style.width = `${barWidth}px`;
          bar.style.borderTopColor = usedColor;

          const fill = document.createElement('div');
          fill.className = 'hist-fill';
          fill.style.background = `linear-gradient(to top, transparent, ${usedColor})`;

          if (isCritical) {
              fill.style.opacity = '1.0';
          } else {
              // Opacity = Dauer (Häufigkeit)
              const freqRatio = data.duration / maxDur;
              fill.style.opacity = (0.1 + (freqRatio * 0.9)).toString();
          }

          bar.appendChild(fill);
          tape.appendChild(bar);
        }
      }

      // --- TICKS & LABELS ---
      let drawTick = false;
      const tick = document.createElement('div');
      tick.className = 'compass-tick';
      tick.style.left = `${pxPos}px`;

      if (normalizedDeg % 90 === 0) {
        tick.style.height = '100%';
        tick.style.opacity = '0.5';
        const label = document.createElement('div');
        label.className = 'compass-label';
        const directions: Record<number, string> = { 0: 'N', 90: 'O', 180: 'S', 270: 'W' };
        label.textContent = directions[normalizedDeg] || '';
        label.style.left = `${pxPos}px`;
        tape.appendChild(label);
        drawTick = true;
      } else if (normalizedDeg % 45 === 0) {
        tick.style.height = '10px';
        tick.style.top = '25px';
        tick.style.opacity = '0.3';
        drawTick = true;
      } else if (normalizedDeg % 15 === 0) {
          tick.style.height = '6px';
          tick.style.top = '25px';
          drawTick = true;
      }
      if (drawTick) tape.appendChild(tick);
    }
  }

  private _updateVisuals() {
    if (!this.shadowRoot || this._avgDeg === undefined || !this._pxPerDeg) return;

    // 1. BAND POSITION (Basis: Durchschnitt)
    const tape = this.shadowRoot.querySelector('#tape') as HTMLElement;
    if (tape) {
      tape.style.transform = `translateX(-${this._avgDeg * this._pxPerDeg}px)`;
    }

    // 2. MARKER POSITION (Basis: Ist-Wert relativ zum Durchschnitt)
    // Wenn instDeg vorhanden, berechne Differenz. Sonst bleibt Marker in der Mitte (diff=0).
    const marker = this.shadowRoot.querySelector('#marker') as HTMLElement;
    if (marker && this._instDeg !== undefined) {
        const diff = ((this._instDeg - this._avgDeg + 540) % 360) - 180;
        marker.style.transform = `translateX(calc(-50% + ${diff * this._pxPerDeg}px))`;
    }

    // 3. SPEED BARS
    const speedBar = this.shadowRoot.querySelector('#speed-bar') as HTMLElement;
    const gustBar = this.shadowRoot.querySelector('#gust-bar') as HTMLElement;
    const speedText = this.shadowRoot.querySelector('#speed-text');
    const limitRaff = this.shadowRoot.querySelector('#limit-raffstore') as HTMLElement;
    const limitRollo = this.shadowRoot.querySelector('#limit-rollo') as HTMLElement;

    if (this._currentSpeed !== undefined) {
        let pct = (this._currentSpeed / this._maxSpeed) * 100;
        if (pct > 100) pct = 100;
        if (speedBar) speedBar.style.width = `${pct}%`;
        
        let pctGust = (this._currentGust / this._maxSpeed) * 100;
        if (pctGust > 100) pctGust = 100;
        if (gustBar) gustBar.style.width = `${pctGust}%`;

        if (speedText) {
            let html = `
                <span class="value">${Math.round(this._currentSpeed)}</span>
                <span class="unit">${this._currentUnit}</span>
            `;
            if (this._currentGust > 0) {
                html += `<span class="gust-info">(Max ${Math.round(this._currentGust)})</span>`;
            }
            speedText.innerHTML = html;
        }

        if (limitRaff) {
            if (this._limitRaffstore > 0) {
                let p = (this._limitRaffstore / this._maxSpeed) * 100;
                if(p > 100) p = 100;
                limitRaff.style.left = `${p}%`;
                limitRaff.style.display = 'block';
            } else { limitRaff.style.display = 'none'; }
        }
        if (limitRollo) {
            if (this._limitRollo > 0) {
                let p = (this._limitRollo / this._maxSpeed) * 100;
                if(p > 100) p = 100;
                limitRollo.style.left = `${p}%`;
                limitRollo.style.display = 'block';
            } else { limitRollo.style.display = 'none'; }
        }
    }
  }

  public getCardSize(): number {
    return 3;
  }
}

customElements.define('wind-compass-card', WindCompassCard);

// Register as custom card
window.customCards = window.customCards || [];
window.customCards.push({
  type: 'wind-compass-card',
  name: 'Wind Compass Card',
  preview: true,
  description: 'Apple-style wind direction compass with speed indicator'
});