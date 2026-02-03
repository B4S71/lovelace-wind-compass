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
  private _hass?: HomeAssistant;
  private config!: WindCompassCardConfig;
  private _resizeObserver?: ResizeObserver;
  
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
  private _pxPerDeg?: number;

  static getConfigElement() {
    return document.createElement('wind-compass-editor');
  }

  static getStubConfig() {
    return {
      type: 'custom:wind-compass-card',
      direction_entity: 'sensor.wind_direction',
      speed_entity: 'sensor.wind_speed'
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
  }

  connectedCallback() {
    if (!this.shadowRoot) {
      this.attachShadow({ mode: 'open' });
      this._render();
    }
    this._resizeObserver = new ResizeObserver(() => this._updateLayout());
    this._resizeObserver.observe(this);
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
          --accent-color: var(--accent-color, #ff9500);
        }
        
        ha-card {
          height: 100%;
          background: transparent;
          box-shadow: var(--ha-card-box-shadow, none);
          border-radius: var(--ha-card-border-radius, 12px);
          overflow: hidden;
        }

        .container {
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 16px;
          height: 100%;
          box-sizing: border-box;
        }

        .compass-wrapper {
          position: relative;
          flex: 1;
          min-height: 120px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .compass-container {
          position: relative;
          width: 100%;
          height: 100px;
          background: var(--secondary-background-color, rgba(0,0,0,0.02));
          border-radius: 16px;
          overflow: hidden;
          box-shadow: inset 0 1px 3px rgba(0,0,0,0.05);
        }

        .compass-tape {
          position: absolute;
          top: 0;
          left: 50%;
          height: 100%;
          display: flex;
          align-items: center;
          transition: transform 0.3s ease-out;
          will-change: transform;
          z-index: 2;
        }

        .compass-bar {
          position: absolute;
          bottom: 0;
          border-radius: 4px 4px 0 0;
          pointer-events: none;
          opacity: 0.6;
          transition: opacity 0.3s ease, background 0.3s ease;
        }

        .compass-tick {
          position: absolute;
          width: 2px;
          background: var(--primary-text-color);
          opacity: 0.15;
        }

        .compass-label {
          position: absolute;
          color: var(--primary-text-color);
          font-weight: 600;
          font-size: 14px;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          transform: translateX(-50%);
          top: -20px;
          opacity: 0.7;
        }

        .compass-marker {
          position: absolute;
          left: 50%;
          top: 0;
          width: 3px;
          height: 100%;
          background: var(--accent-color);
          border-radius: 2px;
          transform: translateX(-50%);
          z-index: 3;
          box-shadow: 0 2px 8px rgba(255, 149, 0, 0.3);
        }

        .speed-info {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          gap: 12px;
        }

        .speed-main {
          display: flex;
          align-items: baseline;
          gap: 4px;
        }

        .speed-value {
          font-size: 28px;
          font-weight: 300;
          color: var(--primary-text-color);
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          line-height: 1;
        }

        .speed-unit {
          font-size: 14px;
          color: var(--secondary-text-color);
          font-weight: 400;
          opacity: 0.7;
        }

        .speed-gust {
          font-size: 12px;
          color: var(--secondary-text-color);
          opacity: 0.6;
        }

        .speed-bar-container {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .speed-bar-bg {
          position: relative;
          width: 100%;
          height: 6px;
          background: var(--secondary-background-color, rgba(0,0,0,0.08));
          border-radius: 3px;
          overflow: hidden;
        }

        .speed-bar-fill {
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          background: linear-gradient(90deg, var(--accent-color), #ff6600);
          border-radius: 3px;
          transition: width 0.4s ease-out;
          box-shadow: 0 0 12px rgba(255, 149, 0, 0.3);
        }

        .speed-bar-label {
          display: flex;
          justify-content: space-between;
          font-size: 11px;
          color: var(--secondary-text-color);
          opacity: 0.6;
        }
      </style>

      <ha-card>
        <div class="container">
          <div class="compass-wrapper">
            <div class="compass-container">
              <div class="compass-tape" id="tape"></div>
              <div class="compass-marker" id="marker"></div>
            </div>
          </div>

          <div class="speed-info">
            <div class="speed-main">
              <span class="speed-value" id="speedValue">--</span>
              <span class="speed-unit" id="speedUnit"></span>
            </div>
            <div class="speed-gust" id="gustInfo"></div>
          </div>

          <div class="speed-bar-container">
            <div class="speed-bar-bg">
              <div class="speed-bar-fill" id="speedBar"></div>
            </div>
            <div class="speed-bar-label">
              <span>0</span>
              <span id="maxSpeedLabel">30</span>
            </div>
          </div>
        </div>
      </ha-card>
    `;
  }

  private _updateCard() {
    if (!this._hass || !this.config) return;

    const dirEntity = this.config.direction_entity;
    const speedEntity = this.config.speed_entity;
    const entityGust = this.config.gust_entity;
    const maxSpeed = this.config.max_speed || 30;

    const dirState = this._hass.states[dirEntity];
    const speedState = this._hass.states[speedEntity];
    const gustState = entityGust ? this._hass.states[entityGust] : null;

    if (dirState) {
      this._avgDeg = parseFloat(dirState.state);
      this._instDeg = parseFloat(dirState.state);
    }

    if (speedState) {
      this._currentSpeed = parseFloat(speedState.state);
      this._currentUnit = speedState.attributes.unit_of_measurement || '';
      this._maxSpeed = maxSpeed;
    }

    if (gustState) {
      this._currentGust = parseFloat(gustState.state);
    }

    const now = Date.now();
    if (now - this._lastHistoryFetch > 300000) {
      this._lastHistoryFetch = now;
      this._fetchHistory(dirEntity, speedEntity);
    }

    this._updateDisplay();
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
        const dirHist = history.find(arr => arr.length > 0 && arr[0].entity_id === dirEntity);
        const speedHist = history.find(arr => arr.length > 0 && arr[0].entity_id === speedEntity);
        
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
    this._updateLayout();
  }

  private _updateLayout() {
    if (!this.shadowRoot) return;
    const container = this.shadowRoot.querySelector('.compass-container') as HTMLElement;
    if (!container) return;

    const width = container.offsetWidth;
    if (width === 0) return;

    this._pxPerDeg = width / 360;
    this._buildTape();
    this._updateDisplay();
  }

  private _buildTape() {
    if (!this.shadowRoot || !this._pxPerDeg) return;
    const tape = this.shadowRoot.querySelector('#tape') as HTMLElement;
    if (!tape) return;

    tape.innerHTML = '';

    let maxSpeed = 1;
    this._historyData.forEach(b => {
      if (b.duration > 0) {
        const avg = b.totalSpeed / b.duration;
        if (avg > maxSpeed) maxSpeed = avg;
      }
    });

    const slotWidth = this._bucketSize * this._pxPerDeg;
    const barWidth = Math.max(1, slotWidth - 1);

    for (let i = -180; i <= 540; i += this._bucketSize) {
      const pxPos = i * this._pxPerDeg;
      const normalizedDeg = ((i % 360) + 360) % 360;
      const bucketIndex = Math.floor(normalizedDeg / this._bucketSize);

      if (bucketIndex >= 0 && bucketIndex < this._bucketCount) {
        const data = this._historyData[bucketIndex];
        if (data && data.duration > 0) {
          const avgSpeed = data.totalSpeed / data.duration;
          const heightPct = (avgSpeed / maxSpeed) * 100;

          const bar = document.createElement('div');
          bar.className = 'compass-bar';
          bar.style.left = `${pxPos}px`;
          bar.style.width = `${barWidth}px`;
          bar.style.height = `${Math.max(3, heightPct * 0.8)}%`;
          bar.style.background = avgSpeed > this._maxSpeed * 0.8 
            ? 'var(--error-color, #ff3b30)' 
            : 'var(--accent-color)';
          
          tape.appendChild(bar);
        }
      }

      // Ticks and labels
      const tick = document.createElement('div');
      tick.className = 'compass-tick';
      tick.style.left = `${pxPos}px`;

      if (normalizedDeg % 90 === 0) {
        tick.style.height = '100%';
        tick.style.opacity = '0.25';
        
        const label = document.createElement('div');
        label.className = 'compass-label';
        const directions: Record<number, string> = { 0: 'N', 90: 'E', 180: 'S', 270: 'W' };
        label.textContent = directions[normalizedDeg] || '';
        label.style.left = `${pxPos}px`;
        tape.appendChild(label);
        tape.appendChild(tick);
      } else if (normalizedDeg % 45 === 0) {
        tick.style.height = '80%';
        tick.style.top = '10%';
        tick.style.opacity = '0.2';
        tape.appendChild(tick);
      }
    }
  }

  private _updateDisplay() {
    if (!this.shadowRoot) return;

    const marker = this.shadowRoot.querySelector('#marker') as HTMLElement;
    const tape = this.shadowRoot.querySelector('#tape') as HTMLElement;

    if (this._avgDeg !== undefined && this._pxPerDeg && tape) {
      tape.style.transform = `translateX(-${this._avgDeg * this._pxPerDeg}px)`;
    }

    const speedValue = this.shadowRoot.querySelector('#speedValue');
    const speedUnit = this.shadowRoot.querySelector('#speedUnit');
    const gustInfo = this.shadowRoot.querySelector('#gustInfo');
    const speedBar = this.shadowRoot.querySelector('#speedBar') as HTMLElement;
    const maxLabel = this.shadowRoot.querySelector('#maxSpeedLabel');

    if (speedValue && this._currentSpeed !== undefined) {
      speedValue.textContent = Math.round(this._currentSpeed).toString();
    }

    if (speedUnit) {
      speedUnit.textContent = this._currentUnit || '';
    }

    if (gustInfo && this._currentGust > 0) {
      gustInfo.textContent = `Gusts: ${Math.round(this._currentGust)} ${this._currentUnit}`;
    }

    if (speedBar && this._currentSpeed !== undefined) {
      const pct = Math.min(100, (this._currentSpeed / this._maxSpeed) * 100);
      speedBar.style.width = `${pct}%`;
    }

    if (maxLabel) {
      maxLabel.textContent = this._maxSpeed.toString();
    }
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
