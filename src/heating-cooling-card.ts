/**
 * Heating/Cooling Card
 * @version 0.1.0
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
import type {
  HomeAssistant,
  HeatingCoolingCardConfig,
} from './types';

console.info(
  '%c HeatingCoolingCard Loaded ',
  'color: white; background: #ff6b6b; font-weight: bold;'
);

class HeatingCoolingCard extends HTMLElement {
  private _hass?: HomeAssistant;
  private config!: HeatingCoolingCardConfig;
  private _resizeObserver?: ResizeObserver;

  // Temperature state
  private _currentTemp: number = 0;
  private _heatSetpoint: number = 0;
  private _coolSetpoint: number = 0;
  private _unit: string = '°C';

  // Layout
  private _minTemp: number = 15;
  private _maxTemp: number = 30;

  static getConfigElement() {
    return document.createElement('heating-cooling-editor');
  }

  static getStubConfig() {
    return {
      type: 'custom:heating-cooling-card',
      entity: 'climate.living_room',
      title: 'Climate Control',
      min_temp: 15,
      max_temp: 30,
    };
  }

  set hass(hass: HomeAssistant) {
    this._hass = hass;
    this._updateCard();
  }

  setConfig(config: HeatingCoolingCardConfig) {
    if (!config.entity) throw new Error('entity is required');
    
    this.config = config;
    this._minTemp = config.min_temp ?? 15;
    this._maxTemp = config.max_temp ?? 30;
    this._render();
  }

  connectedCallback() {
    this._render();
    if (!this._resizeObserver) {
      this._resizeObserver = new ResizeObserver(() => {
        this._render();
      });
      this._resizeObserver.observe(this);
    }
  }

  disconnectedCallback() {
    if (this._resizeObserver) {
      this._resizeObserver.disconnect();
    }
  }

  private _updateCard() {
    if (!this._hass || !this.config) return;

    const entity = this._hass.states[this.config.entity];
    if (!entity) return;

    const attributes = entity.attributes;
    this._currentTemp = parseFloat(entity.state) || 0;
    this._heatSetpoint = attributes.target_temp_low ?? attributes.target_temperature ?? 20;
    this._coolSetpoint = attributes.target_temp_high ?? attributes.target_temperature ?? 24;
    this._unit = this.config.unit ?? attributes.unit_of_measurement ?? '°C';

    this._render();
  }

  private _render() {
    if (!this.shadowRoot) {
      this.attachShadow({ mode: 'open' });
    }

    const shadowRoot = this.shadowRoot!;
    shadowRoot.innerHTML = this._getTemplate();
    
    this._updateVisualization();
  }

  private _updateVisualization() {
    const svg = this.shadowRoot?.querySelector('svg') as SVGSVGElement | null;
    if (!svg) return;

    const rect = svg.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const centerY = height / 2;
    const barHeight = Math.min(80, height - 40);

    // Convert temps to pixel positions (0 = left, width = right)
    const tempRange = this._maxTemp - this._minTemp;
    const pixelsPerDegree = width / tempRange;

    // Blue bar (heating, comes from left)
    const heatPixels = (this._heatSetpoint - this._minTemp) * pixelsPerDegree;
    const blueBar = svg.querySelector('#blue-bar') as SVGRectElement | null;
    if (blueBar) {
      blueBar.setAttribute('x', '0');
      blueBar.setAttribute('y', String(centerY - barHeight / 2));
      blueBar.setAttribute('width', String(Math.max(0, heatPixels)));
      blueBar.setAttribute('height', String(barHeight));
    }

    // Red bar (cooling, comes from right)
    const coolPixels = (this._maxTemp - this._coolSetpoint) * pixelsPerDegree;
    const redBar = svg.querySelector('#red-bar') as SVGRectElement | null;
    if (redBar) {
      redBar.setAttribute('x', String(Math.max(0, width - coolPixels)));
      redBar.setAttribute('y', String(centerY - barHeight / 2));
      redBar.setAttribute('width', String(Math.max(0, coolPixels)));
      redBar.setAttribute('height', String(barHeight));
    }

    // Green zone (deadzone/comfort zone)
    const greenStart = heatPixels;
    const greenWidth = Math.max(0, width - heatPixels - coolPixels);
    const greenZone = svg.querySelector('#green-zone') as SVGRectElement | null;
    if (greenZone) {
      greenZone.setAttribute('x', String(greenStart));
      greenZone.setAttribute('y', String(centerY - barHeight / 2));
      greenZone.setAttribute('width', String(greenWidth));
      greenZone.setAttribute('height', String(barHeight));
    }

    // Current temperature indicator
    const currentPixels = (this._currentTemp - this._minTemp) * pixelsPerDegree;
    const indicator = svg.querySelector('#current-indicator') as SVGLineElement | null;
    if (indicator) {
      indicator.setAttribute('x1', String(currentPixels));
      indicator.setAttribute('y1', String(centerY - barHeight / 2 - 10));
      indicator.setAttribute('x2', String(currentPixels));
      indicator.setAttribute('y2', String(centerY + barHeight / 2 + 10));
    }

    // Update text labels
    const heatLabel = this.shadowRoot?.querySelector('#heat-label');
    if (heatLabel) {
      heatLabel.textContent = `Heat: ${this._heatSetpoint.toFixed(1)}${this._unit}`;
    }

    const coolLabel = this.shadowRoot?.querySelector('#cool-label');
    if (coolLabel) {
      coolLabel.textContent = `Cool: ${this._coolSetpoint.toFixed(1)}${this._unit}`;
    }

    const currentLabel = this.shadowRoot?.querySelector('#current-label');
    if (currentLabel) {
      currentLabel.textContent = `Current: ${this._currentTemp.toFixed(1)}${this._unit}`;
    }

    const comfortZoneLabel = this.shadowRoot?.querySelector('#comfort-label');
    if (comfortZoneLabel) {
      const comfortRange = this._coolSetpoint - this._heatSetpoint;
      comfortZoneLabel.textContent = `Comfort Zone: ${comfortRange.toFixed(1)}${this._unit}`;
    }
  }

  private _getTemplate(): string {
    const width = 400;
    const height = 200;
    const centerY = height / 2;
    const barHeight = 80;

    return `
      <style>
        :host {
          display: block;
          padding: 16px;
          background: var(--ha-card-background, #1a1a1a);
          border-radius: 12px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          color: var(--ha-text-color, #fff);
        }

        .card-title {
          font-size: 20px;
          font-weight: 600;
          margin-bottom: 16px;
          text-align: center;
        }

        .visualization {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
        }

        svg {
          width: 100%;
          height: auto;
          max-width: 500px;
          background: var(--ha-card-border-color, rgba(255,255,255,0.05));
          border-radius: 8px;
          padding: 20px 10px;
        }

        .labels {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr 1fr;
          gap: 12px;
          width: 100%;
          max-width: 500px;
          font-size: 13px;
          text-align: center;
        }

        .label-item {
          padding: 8px;
          border-radius: 6px;
          background: rgba(255,255,255,0.05);
        }

        .label-item.heat {
          border-left: 3px solid #4a90e2;
        }

        .label-item.cool {
          border-left: 3px solid #ff6b6b;
        }

        .label-item.current {
          border-left: 3px solid #ffd700;
        }

        .label-item.comfort {
          border-left: 3px solid #51cf66;
        }
      </style>

      <div class="card-title">${this.config.title || 'Climate Control'}</div>
      
      <div class="visualization">
        <svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
          <!-- Blue bar (heating, from left) -->
          <rect id="blue-bar" x="0" y="${centerY - barHeight / 2}" width="0" height="${barHeight}" 
                fill="#4a90e2" opacity="0.8" rx="4"/>
          
          <!-- Green zone (comfort/deadzone) -->
          <rect id="green-zone" x="0" y="${centerY - barHeight / 2}" width="0" height="${barHeight}" 
                fill="#51cf66" opacity="0.6" rx="4"/>
          
          <!-- Red bar (cooling, from right) -->
          <rect id="red-bar" x="${width}" y="${centerY - barHeight / 2}" width="0" height="${barHeight}" 
                fill="#ff6b6b" opacity="0.8" rx="4"/>
          
          <!-- Temperature scale lines -->
          <line x1="0" y1="${centerY + barHeight / 2 + 5}" x2="0" y2="${centerY + barHeight / 2 + 15}" 
                stroke="rgba(255,255,255,0.3)" stroke-width="1"/>
          <line x1="${width}" y1="${centerY + barHeight / 2 + 5}" x2="${width}" y2="${centerY + barHeight / 2 + 15}" 
                stroke="rgba(255,255,255,0.3)" stroke-width="1"/>
          
          <!-- Scale text -->
          <text x="0" y="${centerY + barHeight / 2 + 25}" text-anchor="middle" font-size="11" 
                fill="rgba(255,255,255,0.6)">${this._minTemp}${this._unit}</text>
          <text x="${width}" y="${centerY + barHeight / 2 + 25}" text-anchor="middle" font-size="11" 
                fill="rgba(255,255,255,0.6)">${this._maxTemp}${this._unit}</text>
          
          <!-- Current temperature indicator -->
          <line id="current-indicator" x1="0" y1="${centerY - barHeight / 2 - 10}" x2="0" y2="${centerY + barHeight / 2 + 10}" 
                stroke="#ffd700" stroke-width="3" opacity="0.9"/>
          <circle cx="0" cy="${centerY}" r="5" fill="#ffd700" opacity="0.9"/>
        </svg>

        <div class="labels">
          <div class="label-item heat">
            <div id="heat-label">Heat: 20.0°C</div>
          </div>
          <div class="label-item current">
            <div id="current-label">Current: 21.5°C</div>
          </div>
          <div class="label-item cool">
            <div id="cool-label">Cool: 24.0°C</div>
          </div>
          <div class="label-item comfort">
            <div id="comfort-label">Comfort: 3.0°C</div>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('custom:heating-cooling-card', HeatingCoolingCard);
