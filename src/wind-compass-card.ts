/**
 * Wind Compass Card
 * @version 0.2.0
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { LitElement, html } from 'lit';
import type {
  HomeAssistant,
  WindCompassCardConfig,
  BucketData,
  HistoryState,
} from './types';

const CARD_VERSION = "0.2.0";

console.info(
  `%c WIND-COMPASS-CARD %c ${CARD_VERSION} `,
  'color: white; background: #607d8b; font-weight: 700;',
  'color: #607d8b; background: white; font-weight: 700;'
);

export class WindCompassCard extends HTMLElement {
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

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  static getConfigElement() {
    return document.createElement('slick-wind-compass-editor');
  }

  static getStubConfig() {
    return {
      type: 'custom:slick-wind-compass-card',
      direction_entity: '',
      speed_entity: '',
      max_speed: 60
    };
  }

  set hass(hass: HomeAssistant) {
    this._hass = hass;
    this._updateCard();
  }

  setConfig(config: WindCompassCardConfig) {
    if (!config) throw new Error("Invalid configuration");

    const newConfig = {
        bucket_size: 5,
        warn_multiplier: 0.9,
        max_speed: 30,
        simple_mode: false,
        ...config
    };

    if (newConfig.bucket_size && typeof newConfig.bucket_size !== 'number') throw new Error("bucket_size must be a number");
    if (newConfig.max_speed && typeof newConfig.max_speed !== 'number') throw new Error("max_speed must be a number");

    this.config = newConfig as WindCompassCardConfig;

    if (this.config.simple_mode) {
      this.classList.add('simple-mode');
    } else {
      this.classList.remove('simple-mode');
    }

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
    }
    
    // Ensure render is called if content is missing
    if (this.shadowRoot && (!this.shadowRoot.innerHTML || this.shadowRoot.innerHTML.trim() === '')) {
        this._render();
    }

    if (this.shadowRoot) {
      this.content = this.shadowRoot.querySelector('.container') as HTMLElement;
    
      if (this.content) {
          this._resizeObserver = new ResizeObserver(() => {
              this._updateDimensions();
              this._updateVisuals();
          });
          this._resizeObserver.observe(this.content);
      }
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
          width: 100%;
          height: 100%;
          font-weight: 200;
          background: var(--ha-card-background, var(--card-background-color, white));
          border-radius: var(--ha-card-border-radius, 12px);
          box-shadow: var(--ha-card-box-shadow, none);
          overflow: hidden;
          box-sizing: border-box;
          position: relative;
          isolation: isolate;
        }
        
        ha-card {
          display: none;
        }

        .container {
          padding: clamp(8px, 3%, 20px);
          display: flex;
          flex-direction: column;
          gap: clamp(8px, 3%, 20px);
          height: 100%;
          box-sizing: border-box;
          overflow: hidden;
        }

        /* --- COMPASS AREA --- */
        .compass-container {
          position: relative;
          width: 100%;
          flex: 1 1 auto;
          min-height: 40px;
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
          border-radius: 4px;
          pointer-events: none;
          transform: none; 
          border: none;
          box-sizing: border-box; 
          background: none; 
          transition: height 0.4s cubic-bezier(0.25, 0.1, 0.25, 1.0);
          overflow: hidden;
          opacity: 0.9;
        }

        .hist-fill {
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          transition: opacity 0.3s ease, background 0.3s ease;
        }

        .compass-tick {
          position: absolute;
          top: 42px; /* Adjusted to sit below labels */
          width: 1px;
          border-radius: 0.5px;
          background: var(--primary-text-color);
          opacity: 0.2;
          z-index: 2;
        }

        .compass-label {
          position: absolute;
          top: 12px;
          transform: translateX(-50%);
          color: var(--primary-text-color);
          font-weight: 200;
          font-size: 20px;
          letter-spacing: 0.5px;
          z-index: 3;
          line-height: 1;
        }

        /* FLOATING MARKER (Modern Arrow) */
        .compass-marker {
          position: absolute;
          left: 50%; 
          top: 0px; 
          width: 2px;
          height: 12px;
          background: var(--error-color, #ff3b30);
          border-radius: 1px;
          
          transform: translateX(-50%); 
          z-index: 20; 
          filter: drop-shadow(0 0 4px rgba(255, 59, 48, 0.4));
          transition: transform 0.6s cubic-bezier(0.25, 0.1, 0.25, 1.0);
          will-change: transform;
        }
        
        /* Arrowhead */
        .compass-marker::after {
          content: '';
          position: absolute;
          bottom: -5px;
          left: 50%;
          transform: translateX(-50%);
          width: 0; 
          height: 0; 
          border-left: 5px solid transparent;
          border-right: 5px solid transparent;
          border-top: 6px solid var(--error-color, #ff3b30);
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
          flex: 0 0 auto;
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
          text-shadow: var(--text-shadow, none);
        }

        .speed-text .value {
          font-size: clamp(1.8rem, 10cqmax, 4rem);
          font-weight: 100;
          letter-spacing: -1px;
          line-height: 1;
        }

        .speed-text .unit {
          font-size: 1.25rem;
          color: var(--secondary-text-color);
          font-weight: 200;
        }

        .speed-text .gust-info {
          margin-left: 8px;
          font-size: 13px;
          color: var(--secondary-text-color);
          opacity: 0.8;
        }

        /* --- SIMPLE MODE --- */
        :host(.simple-mode) {
          /* Restore card background and shadow to match other cards */
          overflow: hidden; 
        }

        :host(.simple-mode) .container {
           padding: 0;
           height: 100%;
           position: relative;
        }

        :host(.simple-mode) .compass-container {
           flex: 1 1 auto;
           min-height: 30px;
           margin-top: 50px;
           -webkit-mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
           mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
        }

        :host(.simple-mode) .compass-tick {
           top: 42px; /* Pushed down */
        }
        
        :host(.simple-mode) .compass-label {
           top: 20px; /* Pushed down to clear marker */
           font-size: 16px;
        }

        :host(.simple-mode) .compass-marker {
           top: 0px; /* At the top edge of compass container */
        }

        :host(.simple-mode) .speed-container {
           position: absolute;
           top: 16px;
           left: 16px;
           width: auto;
           height: auto;
           display: block;
           z-index: 10;
        }
        
        :host(.simple-mode) .speed-bar-bg {
           display: none;
        }

        :host(.simple-mode) .speed-text {
           display: flex;
           flex-direction: row;
           align-items: baseline;
           justify-content: flex-start;
           color: var(--primary-text-color);
           text-shadow: 0 1px 4px rgba(0,0,0,0.5); /* Always shadow for readability over possible map/picture */
        }

        :host(.simple-mode) .speed-text .value {
           font-size: 2.8rem; /* Smaller than full mode */
        }
        
        :host(.simple-mode) .speed-text .gust-info {
           margin-left: 6px;
           font-size: 14px;
           opacity: 0.9;
        }

        /* ALERT MODE (Red Background) */
        :host(.simple-mode.alert-state) {
           background: linear-gradient(135deg, rgba(255,59,48,0.8), rgba(200,30,30,0.9)) !important;
           border-radius: var(--ha-card-border-radius, 12px);
           box-shadow: 0 4px 20px rgba(255, 59, 48, 0.4);
        }
        
        :host(.simple-mode.alert-state) .speed-text,
        :host(.simple-mode.alert-state) .compass-label {
           color: white !important;
        }
        
        :host(.simple-mode.alert-state) .compass-tick {
           background: white !important;
           opacity: 0.4;
        }
      </style>

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
    `;
  }

  private _updateCard() {
    if (!this.config) return;

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

    // Use dummy values if hass is not ready yet
    const hass = this._hass;

    // States
    const dirState = hass?.states[dirEntity];
    const instDirState = hass?.states[instantDirEntity];
    const speedState = hass?.states[speedEntity];
    const gustState = entityGust && hass ? hass.states[entityGust] : null;

    // 1. DURCHSCHNITT (Bewegt das Band)
    if (dirState && !isNaN(parseFloat(dirState.state))) {
      this._avgDeg = parseFloat(dirState.state);
    } 
    
    // 2. IST-WERT (Bewegt den Marker)
    if (instDirState && !isNaN(parseFloat(instDirState.state))) {
      this._instDeg = parseFloat(instDirState.state);
    } else {
      this._instDeg = this._avgDeg; // Fallback
    }

    // Speed Data
    if (speedState && !isNaN(parseFloat(speedState.state))) {
      this._currentSpeed = parseFloat(speedState.state);
      this._currentUnit = speedState.attributes.unit_of_measurement || 'km/h';
    } else {
      this._currentSpeed = 0;
      this._currentUnit = 'km/h';
    }

    if (gustState && !isNaN(parseFloat(gustState.state))) {
      this._currentGust = parseFloat(gustState.state);
    } else {
      this._currentGust = 0;
    }

    // Limits
    this._limitRaffstore = 0;
    this._limitRollo = 0;
    if (hass && entityLimitRaff && hass.states[entityLimitRaff]) {
        this._limitRaffstore = parseFloat(hass.states[entityLimitRaff].state) || 0;
    }
    if (hass && entityLimitRollo && hass.states[entityLimitRollo]) {
        this._limitRollo = parseFloat(hass.states[entityLimitRollo].state) || 0;
    }

    // History alle 5 min
    const now = Date.now();
    if (now - this._lastHistoryFetch > 300000 && hass) {
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
          // Removed borderTopColor - handled by background now

          const fill = document.createElement('div');
          fill.className = 'hist-fill';
          
          // Flat design: Solid color instead of gradient
          fill.style.background = usedColor;

          if (isCritical) {
              fill.style.opacity = '1.0';
          } else {
              // Opacity = Duration (Frequency)
              // We keep the opacity logic to visualize frequency weight, 
              // but the bar itself is a flat color block now.
              const freqRatio = data.duration / maxDur;
              fill.style.opacity = (0.4 + (freqRatio * 0.6)).toString(); 
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
        // Major: Label Only
        const label = document.createElement('div');
        label.className = 'compass-label';
        const directions: Record<number, string> = { 0: 'N', 90: 'O', 180: 'S', 270: 'W' };
        label.textContent = directions[normalizedDeg] || '';
        label.style.left = `${pxPos}px`;
        tape.appendChild(label);
        
        // No tick for major directions in minimalistic mode
        drawTick = false; 

      } else if (normalizedDeg % 45 === 0) {
        // Middle: Medium Tick
        tick.style.height = '10px';
        tick.style.opacity = '0.4';
        drawTick = true;

      } else if (normalizedDeg % 15 === 0) {
          // Minor: Small Tick
          tick.style.height = '6px';
          tick.style.opacity = '0.2';
          drawTick = true;
      }
      
      if (drawTick) tape.appendChild(tick);
    }
  }

  private _interpolateColor(c1: string, c2: string, factor: number): string {
    const hex = (c: string) => {
        const h = c.replace('#', '');
        return parseInt(h.length === 3 ? h.split('').map(x=>x+x).join('') : h, 16);
    };
    const r1 = (hex(c1) >> 16) & 255;
    const g1 = (hex(c1) >> 8) & 255;
    const b1 = (hex(c1)) & 255;
    
    const r2 = (hex(c2) >> 16) & 255;
    const g2 = (hex(c2) >> 8) & 255;
    const b2 = (hex(c2)) & 255;

    const r = Math.round(r1 + (r2 - r1) * factor);
    const g = Math.round(g1 + (g2 - g1) * factor);
    const b = Math.round(b1 + (b2 - b1) * factor);
    
    return `rgb(${r}, ${g}, ${b})`;
  }

  private _updateVisuals() {
    if (!this.shadowRoot || this._avgDeg === undefined || !this._pxPerDeg) return;
    if (!this.config) return;

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
        // --- LOGIG FOR SIMPLE MODE ---
        if (this.config.simple_mode) {
           const limits = [this._limitRaffstore, this._limitRollo].filter(l => l > 0);
           const minLimit = limits.length > 0 ? Math.min(...limits) : null;
           
           if (minLimit && this._currentSpeed >= minLimit) {
               this.classList.add('alert-state');
           } else {
               this.classList.remove('alert-state');
           }
           
           // Allow standard logic to run for gradient background
           
           // Special text for simple mode
           if (speedText) {
             let html = `
                <span class="value">${Math.round(this._currentSpeed || 0)}</span>
                <span class="unit">${this._currentUnit}</span>
             `;
             if (this._currentGust > 0) {
                html += `<span class="gust-info">(${Math.round(this._currentGust)})</span>`;
             }
             speedText.innerHTML = html;
           }
           // Fall through to standard visual update (skipping bar updates which are hidden anyway)
        } 
        
        // --- STANDARD MODE & SHARED GRADIENT ---
        let pct = (this._currentSpeed / this._maxSpeed) * 100;
        if (pct > 100) pct = 100;
        
        if (!this.config.simple_mode && speedBar) {
             speedBar.style.width = `${pct}%`;
        }

        // Check for Dark Mode Preference from HA Theme
        const isDarkMode = this._hass?.themes?.darkMode === true;

        // Dynamic Background Gradient
        // Low: Bright Creme-Grey (#ffffff -> #e0e0e0)
        // High: Dark Grey-Blue (#546e7a -> #263238)
        
        const intensity = pct / 100;
        
        // Define Gradient Colors (Lighter at bottom for modern "uplight" look)
        let cStartLow, cEndLow;
        if (isDarkMode) {
            // Dark Mode
            cStartLow = '#1c1c1e'; // Dark top
            cEndLow = '#3a3a3c';   // Lighter bottom
        } else {
            // Light Mode
            cStartLow = '#e0e0e0'; // Grey top
            cEndLow = '#ffffff';   // White bottom
        }

        // High Wind Colors (Blue-Grey)
        const cStartHigh = '#37474f'; // Darker Blue-Grey top
        const cEndHigh = '#607d8b';   // Lighter Blue-Grey bottom
        
        const startColor = this._interpolateColor(cStartLow, cStartHigh, intensity);
        const endColor = this._interpolateColor(cEndLow, cEndHigh, intensity);
        
        // Update host background
        this.style.background = `linear-gradient(180deg, ${startColor} 0%, ${endColor} 100%)`;
        
        // Adjust text and UI colors for contrast
        // In Dark Mode, we almost always want white text unless intensity pushes us to something very bright (unlikely here)
        if (isDarkMode || intensity > 0.5) {
            // Dark Background -> Light Elements
            this.style.color = 'white';
            this.style.setProperty('--primary-text-color', 'white');
            this.style.setProperty('--secondary-text-color', 'rgba(255,255,255,0.7)');
            this.style.setProperty('--secondary-background-color', 'rgba(255,255,255,0.15)');
            this.style.setProperty('--ha-card-box-shadow', 'none'); 
            this.style.setProperty('--text-shadow', '0 1px 4px rgba(0,0,0,0.5)');
        } else {
            // Light Mode + Low Intensity -> Dark Elements
            this.style.color = '#212121';
            this.style.setProperty('--primary-text-color', '#212121');
            this.style.setProperty('--secondary-text-color', '#757575');
            this.style.setProperty('--secondary-background-color', 'rgba(0,0,0,0.1)');
            this.style.removeProperty('--text-shadow');
        }
        
        // If alert state is active (Red), it overrides this anyway via !important in CSS
        
        let pctGust = (this._currentGust / this._maxSpeed) * 100;
        if (pctGust > 100) pctGust = 100;
        if (gustBar) gustBar.style.width = `${pctGust}%`;

        // Only update text here if not simple mode (because simple mode has different format)
        if (!this.config.simple_mode && speedText) {
            let html = `
                <span class="value">${Math.round(this._currentSpeed || 0)}</span>
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

if (!customElements.get('slick-wind-compass-card')) {
  customElements.define('slick-wind-compass-card', WindCompassCard);
}

class WindCompassEditor extends LitElement {
  private _config: any;
  private hass: any;

  static get properties() {
    return {
      hass: {},
      _config: {},
    };
  }

  setConfig(config: WindCompassCardConfig) {
    this._config = config;
  }

  _valueChanged(ev: CustomEvent) {
    if (!this._config || !this.hass) return;
    const newConfig = {
      ...this._config,
      ...ev.detail.value,
    };
    
    // Fire event to update card preview
    const messageEvent = new CustomEvent("config-changed", {
      detail: { config: newConfig },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(messageEvent);
  }

  render() {
    if (!this.hass || !this._config) return html``;

    // Schema for Home Assistant Form
    const schema = [
      { name: "direction_entity", label: "Direction Entity", selector: { entity: { domain: "sensor" } } },
      { name: "speed_entity", label: "Speed Entity", selector: { entity: { domain: "sensor" } } },
      { name: "gust_entity", label: "Gust Entity (Optional)", selector: { entity: { domain: "sensor" } } },
      { name: "instant_direction_entity", label: "Instant Dir (opt)", selector: { entity: { domain: "sensor" } } },
      { name: "max_speed", label: "Max Speed", selector: { number: { mode: "box", min: 0 } } },
      { name: "simple_mode", label: "Simple Mode", selector: { boolean: {} } },
      { name: "raffstore_limit_entity", label: "Raffstore Limit (opt)", selector: { entity: { domain: "sensor" } } },
      { name: "rollo_limit_entity", label: "Rollo Limit (opt)", selector: { entity: { domain: "sensor" } } }
    ];

    return html`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${schema}
        .computeLabel=${(s: any) => s.label}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `;
  }
}

if (!customElements.get('slick-wind-compass-editor')) {
  customElements.define('slick-wind-compass-editor', WindCompassEditor);
}

// Register as custom card
window.customCards = window.customCards || [];
window.customCards.push({
  type: 'slick-wind-compass-card',
  name: 'Slick Wind Compass',
  preview: true,
  description: 'Apple-style wind direction compass with speed indicator'
});
