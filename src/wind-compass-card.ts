import type {
  HomeAssistant,
  WindCompassCardConfig,
  BucketData,
  HistoryState,
} from './types';

console.info(
  '%c WindCompassCard Loaded: V_0.1 ',
  'color: white; background: #607d8b; font-weight: bold;'
);

class WindCompassCard extends HTMLElement {
  private content?: HTMLDivElement;
  private config!: WindCompassCardConfig;
  private resizeObserver?: ResizeObserver;
  
  // Configuration
  private _bucketSize: number = 5;
  private _bucketCount: number = 72;
  private _warnMultiplier: number = 0.9;
  
  // State
  private _historyData: BucketData[] = [];
  private _lastHistoryFetch: number = 0;
  private _avgDeg?: number;
  private _instDeg?: number;
  private _currentSpeed?: number;
  private _currentUnit: string = '';
  private _maxSpeed: number = 30;
  private _currentGust: number = 0;
  private _limitRaffstore: number = 0;
  private _limitRollo: number = 0;
  private _pxPerDeg?: number;

  set hass(hass: HomeAssistant) {
    if (!this.content) {
      const card = document.createElement('ha-card');
      this.content = document.createElement('div');
      this.content.style.padding = '16px';
      this.content.style.display = 'flex';
      this.content.style.flexDirection = 'column';
      this.content.style.gap = '16px';

      this.content.innerHTML = `
        <style>
          .compass-container {
            position: relative;
            width: 100%;
            height: 80px;
            background: var(--secondary-background-color, rgba(0,0,0,0.2));
            border-radius: 8px;
            overflow: hidden;
            border: 1px solid var(--divider-color, rgba(0,0,0,0.1));
            touch-action: pan-y;
            isolation: isolate; 
            z-index: 0; 
          }
          
          .compass-tape {
            position: absolute;
            top: 0;
            left: 50%;
            height: 100%;
            display: flex;
            align-items: center;
            transition: transform 0.5s cubic-bezier(0.25, 1, 0.5, 1);
            will-change: transform;
            z-index: 1; 
          }
          
          /* Historien-Balken */
          .hist-bar {
            position: absolute;
            bottom: 0;
            border-top-left-radius: 1px;
            border-top-right-radius: 1px;
            pointer-events: none;
            transform: none; 
            border-top: 2px solid; 
            box-sizing: border-box; 
            background: none; 
            transition: height 0.3s ease, border-color 0.3s ease;
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
            width: 1px;
            background: var(--primary-text-color);
            opacity: 0.2;
            z-index: 2;
          }
          
          .compass-label {
            position: absolute;
            top: 28px;
            transform: translateX(-50%);
            color: var(--primary-text-color);
            font-weight: bold;
            font-size: 14px;
            font-family: var(--paper-font-body1_-_font-family, sans-serif);
            z-index: 3;
            text-shadow: 0 1px 2px var(--card-background-color);
          }
          
          .compass-marker {
            position: absolute;
            left: 50%; 
            top: 0; 
            width: 0;
            height: 0;
            border-left: 8px solid transparent;
            border-right: 8px solid transparent;
            border-top: 10px solid var(--error-color, #ff3b30);
            transform: translateX(-50%); 
            z-index: 5;
            filter: drop-shadow(0 2px 2px rgba(0,0,0,0.4));
            transition: transform 0.5s cubic-bezier(0.25, 1, 0.5, 1);
            will-change: transform;
          }
          
          .compass-center-dot {
             position: absolute;
             left: 50%;
             bottom: 0;
             width: 0; 
             height: 0; 
             border-left: 6px solid transparent;
             border-right: 6px solid transparent;
             border-bottom: 8px solid var(--primary-text-color);
             transform: translateX(-50%);
             opacity: 0.8;
             z-index: 4;
          }

          .speed-container {
            display: flex;
            flex-direction: column;
            gap: 6px;
          }

          .speed-bar-bg {
            position: relative;
            width: 100%;
            height: 8px;
            background: var(--secondary-background-color, rgba(0,0,0,0.1));
            border-radius: 4px;
            overflow: visible; 
            isolation: isolate;
            margin-top: 5px; 
            margin-bottom: 5px; 
          }

          .speed-bar-gust {
            position: absolute;
            top: 0; left: 0; bottom: 0;
            background: var(--accent-color, var(--primary-color, #2196F3));
            opacity: 0.3;
            width: 0%;
            transition: width 0.5s ease-out;
            z-index: 1;
            border-radius: 4px;
          }

          .speed-bar-fill {
            position: absolute;
            top: 0; left: 0; bottom: 0;
            background: var(--accent-color, var(--primary-color, #2196F3));
            width: 0%;
            transition: width 0.5s ease-out;
            box-shadow: 0 0 10px var(--accent-color, transparent);
            z-index: 2;
            border-radius: 4px;
          }

          .limit-marker {
            position: absolute;
            top: -4px; 
            bottom: -4px; 
            width: 2px;
            background-color: var(--primary-text-color);
            z-index: 10;
            box-shadow: 0 0 2px var(--card-background-color), 0 0 5px rgba(0,0,0,0.3);
            display: none; 
            pointer-events: none;
            opacity: 0.8;
          }

          .speed-text {
            text-align: right;
            color: var(--secondary-text-color);
            font-size: 12px;
            font-family: var(--paper-font-caption_-_font-family, sans-serif);
            display: flex;
            justify-content: flex-end;
            gap: 8px;
          }
          
          .speed-text span.faded {
            opacity: 0.6;
            font-size: 0.9em;
          }
        </style>

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
      `;

      card.appendChild(this.content);
      this.appendChild(card);

      this.resizeObserver = new ResizeObserver(() => {
        this._updateDimensions();
        this._updateVisuals();
      });
      this.resizeObserver.observe(this.content);

      // Default Initialization
      this._bucketSize = 5;
      this._bucketCount = 72;
      this._historyData = new Array(this._bucketCount)
        .fill(null)
        .map(() => ({ duration: 0, totalSpeed: 0 }));
      this._lastHistoryFetch = 0;
    }

    // --- CONFIG & ENTITIES ---
    const entityDirAvg = this.config.direction_entity;
    const entityDirInst = this.config.instant_direction_entity || entityDirAvg;
    const entitySpeed = this.config.speed_entity;
    const entityGust = this.config.gust_entity;
    const entityLimitRaffstore = this.config.raffstore_limit_entity;
    const entityLimitRollo = this.config.rollo_limit_entity;
    const maxSpeed = this.config.max_speed || 30;

    this._warnMultiplier =
      this.config.warn_multiplier !== undefined
        ? parseFloat(String(this.config.warn_multiplier))
        : 0.9;

    // --- SMART BUCKET CALCULATION ---
    let reqBucketSize =
      this.config.bucket_size !== undefined
        ? parseInt(String(this.config.bucket_size))
        : 5;

    // Sicherheit: Min 1, Max 90
    if (isNaN(reqBucketSize) || reqBucketSize < 1) reqBucketSize = 5;
    if (reqBucketSize > 90) reqBucketSize = 90;

    // Finde nächsten Teiler von 360 (aufrunden)
    while (360 % reqBucketSize !== 0) {
      reqBucketSize++;
    }
    const finalBucketSize = reqBucketSize;

    // Bei Änderung alles neu berechnen
    if (this._bucketSize !== finalBucketSize) {
      console.info(
        `WindCompass: Bucket Size adjusted from config ${
          this.config.bucket_size || 5
        } to ${finalBucketSize} to fit 360°.`
      );
      this._bucketSize = finalBucketSize;
      this._bucketCount = Math.floor(360 / this._bucketSize);
      this._historyData = new Array(this._bucketCount)
        .fill(null)
        .map(() => ({ duration: 0, totalSpeed: 0 }));
      this._lastHistoryFetch = 0; // Trigger reload
    }

    const dirStateAvg = hass.states[entityDirAvg];
    const dirStateInst = hass.states[entityDirInst];
    const speedState = hass.states[entitySpeed];
    const gustState = entityGust ? hass.states[entityGust] : null;

    if (dirStateAvg) this._avgDeg = parseFloat(dirStateAvg.state);
    if (dirStateInst) this._instDeg = parseFloat(dirStateInst.state);

    if (speedState) {
      this._currentSpeed = parseFloat(speedState.state);
      this._currentUnit = speedState.attributes.unit_of_measurement || '';
      this._maxSpeed = maxSpeed;
    }

    if (gustState) {
      this._currentGust = parseFloat(gustState.state);
    } else {
      this._currentGust = 0;
    }

    this._limitRaffstore = 0;
    this._limitRollo = 0;
    if (entityLimitRaffstore && hass.states[entityLimitRaffstore]) {
      this._limitRaffstore = parseFloat(
        hass.states[entityLimitRaffstore].state
      );
    }
    if (entityLimitRollo && hass.states[entityLimitRollo]) {
      this._limitRollo = parseFloat(hass.states[entityLimitRollo].state);
    }

    const now = Date.now();
    if (now - this._lastHistoryFetch > 300000) {
      this._lastHistoryFetch = now;
      this._fetchHistory(hass, entityDirAvg, entitySpeed);
    }

    this._updateVisuals();
  }

  private async _fetchHistory(
    hass: HomeAssistant,
    dirEntity: string,
    speedEntity: string
  ): Promise<void> {
    const endTime = new Date();
    const startTime = new Date(endTime.getTime() - 24 * 60 * 60 * 1000);
    try {
      const entities = [dirEntity, speedEntity].join(',');
      const history = await hass.callApi<HistoryState[][]>(
        'GET',
        `history/period/${startTime.toISOString()}?filter_entity_id=${entities}&end_time=${endTime.toISOString()}&minimal_response`
      );

      if (history && history.length === 2) {
        const dirHist = history.find(
          (arr) => arr.length > 0 && arr[0].entity_id === dirEntity
        );
        const speedHist = history.find(
          (arr) => arr.length > 0 && arr[0].entity_id === speedEntity
        );
        if (dirHist && speedHist) {
          this._processHistoryData(dirHist, speedHist);
        }
      }
    } catch (e) {
      console.error('History Error', e);
    }
  }

  private _processHistoryData(
    dirData: HistoryState[],
    speedData: HistoryState[]
  ): void {
    const buckets: BucketData[] = new Array(this._bucketCount)
      .fill(null)
      .map(() => ({ duration: 0, totalSpeed: 0 }));
    let speedIdx = 0;

    for (let i = 0; i < dirData.length - 1; i++) {
      const state = dirData[i];
      const nextState = dirData[i + 1];

      const deg = parseFloat(state.state);
      if (isNaN(deg)) continue;

      const startTs = new Date(state.last_changed).getTime();
      const endTs = new Date(nextState.last_changed).getTime();
      const durationMin = (endTs - startTs) / 1000 / 60;

      while (
        speedIdx < speedData.length - 1 &&
        new Date(speedData[speedIdx + 1].last_changed).getTime() <= startTs
      ) {
        speedIdx++;
      }

      const currentSpeedState = speedData[speedIdx];
      const speedVal = parseFloat(currentSpeedState.state) || 0;

      // Dynamischer Index
      const bucketIndex = Math.floor(((deg % 360) / 360) * this._bucketCount);
      if (bucketIndex >= 0 && bucketIndex < this._bucketCount) {
        buckets[bucketIndex].duration += durationMin;
        buckets[bucketIndex].totalSpeed += speedVal * durationMin;
      }
    }
    this._historyData = buckets;
    this._updateDimensions();
  }

  private _updateVisuals(): void {
    if (this._avgDeg === undefined || !this._pxPerDeg || !this.content) return;

    const tape = this.content.querySelector('#tape') as HTMLElement | null;
    if (tape) {
      const offset = this._avgDeg * this._pxPerDeg;
      tape.style.transform = `translateX(-${offset}px)`;
    }

    const marker = this.content.querySelector('#marker') as HTMLElement | null;
    if (marker && this._instDeg !== undefined) {
      const diff = ((this._instDeg - this._avgDeg + 540) % 360) - 180;
      marker.style.transform = `translateX(calc(-50% + ${
        diff * this._pxPerDeg
      }px))`;
    }

    const speedBar = this.content.querySelector(
      '#speed-bar'
    ) as HTMLElement | null;
    const gustBar = this.content.querySelector(
      '#gust-bar'
    ) as HTMLElement | null;
    const speedText = this.content.querySelector(
      '#speed-text'
    ) as HTMLElement | null;
    const limitRaff = this.content.querySelector(
      '#limit-raffstore'
    ) as HTMLElement | null;
    const limitRollo = this.content.querySelector(
      '#limit-rollo'
    ) as HTMLElement | null;

    if (this._currentSpeed !== undefined) {
      let pct = (this._currentSpeed / this._maxSpeed) * 100;
      if (pct > 100) pct = 100;
      if (speedBar) speedBar.style.width = `${pct}%`;

      let pctGust = (this._currentGust / this._maxSpeed) * 100;
      if (pctGust > 100) pctGust = 100;
      if (gustBar) gustBar.style.width = `${pctGust}%`;

      if (speedText) {
        let html = `<span>${this._currentSpeed} ${this._currentUnit}</span>`;
        if (this._currentGust > 0)
          html += `<span class="faded">(Max ${this._currentGust})</span>`;
        speedText.innerHTML = html;
      }

      if (limitRaff) {
        if (this._limitRaffstore > 0) {
          let p = (this._limitRaffstore / this._maxSpeed) * 100;
          if (p > 100) p = 100;
          limitRaff.style.left = `${p}%`;
          limitRaff.style.display = 'block';
        } else {
          limitRaff.style.display = 'none';
        }
      }
      if (limitRollo) {
        if (this._limitRollo > 0) {
          let p = (this._limitRollo / this._maxSpeed) * 100;
          if (p > 100) p = 100;
          limitRollo.style.left = `${p}%`;
          limitRollo.style.display = 'block';
        } else {
          limitRollo.style.display = 'none';
        }
      }
    }
  }

  private _updateDimensions(): void {
    if (!this.content) return;
    const container = this.content.querySelector(
      '#container'
    ) as HTMLElement | null;
    if (!container) return;
    const width = container.offsetWidth;
    if (width === 0) return;
    this._pxPerDeg = width / 360;
    this._buildTape();
  }

  private _buildTape(): void {
    if (!this.content || !this._pxPerDeg) return;
    const tape = this.content.querySelector('#tape') as HTMLElement | null;
    if (!tape) return;
    tape.innerHTML = '';

    const activeLimits: number[] = [];
    if (this._limitRaffstore > 0) activeLimits.push(this._limitRaffstore);
    if (this._limitRollo > 0) activeLimits.push(this._limitRollo);
    let minLimit: number | null = null;
    if (activeLimits.length > 0) minLimit = Math.min(...activeLimits);
    const alertThreshold = minLimit ? minLimit * this._warnMultiplier : null;

    let maxDur = 0;
    let maxBucketAvgSpeed = 0;

    this._historyData.forEach((b) => {
      if (b.duration > 0) {
        if (b.duration > maxDur) maxDur = b.duration;
        const avg = b.totalSpeed / b.duration;
        if (avg > maxBucketAvgSpeed) maxBucketAvgSpeed = avg;
      }
    });

    if (maxDur === 0) maxDur = 1;
    if (maxBucketAvgSpeed === 0) maxBucketAvgSpeed = 1;

    // Dynamische Breitenberechnung
    const slotWidth = this._bucketSize * this._pxPerDeg;
    const barWidth = Math.max(1, slotWidth - 2); // 2px Gap
    const offset = 1;

    // Loop mit dynamischer Schrittweite
    for (let i = -180; i <= 540; i += this._bucketSize) {
      const pxPos = i * this._pxPerDeg;
      const normalizedDeg = ((i % 360) + 360) % 360;

      const bucketIndex = Math.floor(normalizedDeg / this._bucketSize);
      if (bucketIndex >= 0 && bucketIndex < this._bucketCount) {
        const data = this._historyData[bucketIndex];
        if (data && data.duration > 0) {
          const avgSpeed = data.totalSpeed / data.duration;

          let isCritical = false;
          if (alertThreshold !== null && avgSpeed >= alertThreshold) {
            isCritical = true;
          }

          const colorNormal = 'var(--accent-color, var(--primary-color))';
          const colorCritical = 'var(--error-color, #ff3b30)';
          const usedColor = isCritical ? colorCritical : colorNormal;

          const bar = document.createElement('div');
          bar.className = 'hist-bar';

          // HÖHE = SPEED
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
            const freqRatio = data.duration / maxDur;
            fill.style.opacity = String(0.1 + freqRatio * 0.9);
          }

          bar.appendChild(fill);
          tape.appendChild(bar);
        }
      }

      // Ticks Logic - Pragmatischer Ansatz
      const tick = document.createElement('div');
      tick.className = 'compass-tick';
      tick.style.left = `${pxPos}px`;
      let drawTick = false;

      if (normalizedDeg % 90 === 0) {
        tick.style.height = '100%';
        tick.style.opacity = '0.5';
        const label = document.createElement('div');
        label.className = 'compass-label';
        let text = '';
        if (normalizedDeg === 0) text = 'N';
        else if (normalizedDeg === 90) text = 'O';
        else if (normalizedDeg === 180) text = 'S';
        else if (normalizedDeg === 270) text = 'W';
        label.innerText = text;
        label.style.left = `${pxPos}px`;
        tape.appendChild(label);
        drawTick = true;
      } else if (normalizedDeg % 45 === 0) {
        tick.style.height = '100%';
        tick.style.opacity = '0.3';
        drawTick = true;
      } else if (normalizedDeg % 15 === 0) {
        tick.style.height = '10px';
        tick.style.top = '25px';
        drawTick = true;
      }
      if (drawTick) tape.appendChild(tick);
    }
  }

  public setConfig(config: WindCompassCardConfig): void {
    if (!config.direction_entity)
      throw new Error('direction_entity is required');
    if (!config.speed_entity) throw new Error('speed_entity is required');
    this.config = config;
  }

  public getCardSize(): number {
    return 3;
  }
}

customElements.define('wind-compass-card', WindCompassCard);

window.customCards = window.customCards || [];
window.customCards.push({
  type: 'wind-compass-card',
  name: 'Wind Compass Card',
  preview: true,
  description: 'Professional wind direction compass card'
});
