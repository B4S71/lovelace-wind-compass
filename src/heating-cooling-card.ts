/**
 * Heating/Cooling Card - Refined Version
 * @version 0.2.0
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { LitElement, html } from 'lit';
import type {
  HomeAssistant,
  HeatingCoolingCardConfig,
} from './types';

class HeatingCoolingCard extends HTMLElement {
  private _hass?: HomeAssistant;
  private config!: HeatingCoolingCardConfig;
  private _resizeObserver?: ResizeObserver;

  private _currentTemp: number = 0;
  private _heatSetpoint: number = 0;
  private _coolSetpoint: number = 0;
  private _unit: string = '°C';
  private _minTemp: number = 15;
  private _maxTemp: number = 30;
  private _hvacAction: 'heating' | 'cooling' | 'idle' = 'idle';
  private _state: string = 'off';
  private _canHeat: boolean = true;
  private _canCool: boolean = true;

  static getConfigElement() {
    return document.createElement('heating-cooling-editor');
  }

  static getStubConfig() {
    return {
      type: 'custom:heating-cooling-card',
      entity: 'climate.living_room',
      title: 'Klima',
      min_temp: 16,
      max_temp: 28,
    };
  }

  set hass(hass: HomeAssistant) {
    this._hass = hass;
    this._updateCard();
  }

  setConfig(config: HeatingCoolingCardConfig) {
    if (!config.entity) throw new Error('entity is required');
    this.config = config;
    
    // Toggle simple mode class on host
    if (this.config.simple_mode) {
      this.classList.add('simple-mode');
    } else {
      this.classList.remove('simple-mode');
    }

    // Don't set default values here - they will be calculated in _updateCard()
    this._render();
  }

  connectedCallback() {
    this._render();
    if (!this._resizeObserver) {
      this._resizeObserver = new ResizeObserver(() => this._updateVisualization());
      this._resizeObserver.observe(this);
    }
  }

  disconnectedCallback() {
    this._resizeObserver?.disconnect();
  }

  private _updateCard() {
    if (!this._hass || !this.config) return;
    const entity = this._hass.states[this.config.entity];
    if (!entity) return;

    const attr = entity.attributes;
    this._currentTemp = parseFloat(entity.state) || attr.current_temperature || 0;
    
    // Fix: Use 'temperature' as fallback for single-setpoint devices. 
    // 'target_temperature' was incorrect/non-standard.
    this._heatSetpoint = attr.target_temp_low ?? attr.temperature ?? 20;
    this._coolSetpoint = attr.target_temp_high ?? attr.temperature ?? 24;
    
    this._unit = this.config.unit ?? attr.unit_of_measurement ?? '°C';
    this._state = entity.state;

    const hvacAction = attr.hvac_action;
    
    // Determine Capabilities (Heat/Cool support)
    const modes = attr.hvac_modes || [];
    this._canHeat = modes.includes('heat') || modes.includes('heat_cool');
    this._canCool = modes.includes('cool') || modes.includes('heat_cool');

    // Fallback if hvac_modes is missing or empty (rare but possible)
    if (!this._canHeat && !this._canCool) {
        if (entity.state === 'heat') this._canHeat = true;
        if (entity.state === 'cool') this._canCool = true;
        if (attr.target_temp_low !== undefined) this._canHeat = true;
        if (attr.target_temp_high !== undefined) this._canCool = true;
        
        // If still nothing, default to true to show full UI
        if (!this._canHeat && !this._canCool) {
             this._canHeat = true;
             this._canCool = true;
        }
    }
    
    // Strict Mode: User requests animation ONLY when actually heating/cooling (not just in mode).
    // If hvac_action is provided, we trust it (it covers 'idle').
    // If NOT provided, we fall back to state, assuming 'heat' mode implies heating (legacy behavior).
    if (hvacAction) {
      if (hvacAction === 'heating') {
        this._hvacAction = 'heating';
      } else if (hvacAction === 'cooling') {
        this._hvacAction = 'cooling';
      } else {
        this._hvacAction = 'idle';
      }
    } else {
      // Fallback if integration doesn't support hvac_action
      if (entity.state === 'heat') {
        this._hvacAction = 'heating';
      } else if (entity.state === 'cool') {
        this._hvacAction = 'cooling';
      } else {
        this._hvacAction = 'idle';
      }
    }

    // Calculate min_temp and max_temp if not provided
    if (this.config.min_temp !== undefined) {
      this._minTemp = this.config.min_temp;
    } else {
      // Logic relies on setpoints. If a setpoint is effectively "disabled" (not supported),
      // we still need a reasonable range.
      const vals = [this._currentTemp];
      if (this._canHeat) vals.push(this._heatSetpoint);
      if (this._canCool) vals.push(this._coolSetpoint);
      this._minTemp = Math.floor(Math.min(...vals) - 5);
    }

    if (this.config.max_temp !== undefined) {
      this._maxTemp = this.config.max_temp;
    } else {
      const vals = [this._currentTemp];
      if (this._canHeat) vals.push(this._heatSetpoint);
      if (this._canCool) vals.push(this._coolSetpoint);
      this._maxTemp = Math.ceil(Math.max(...vals) + 5);
    }
    
    this._updateVisualization();
  }

  private _render() {
    if (!this.shadowRoot) {
      this.attachShadow({ mode: 'open' });
    }
    this.shadowRoot!.innerHTML = this._getTemplate();
  }

  private _updateVisualization() {
    const container = this.shadowRoot?.querySelector('.bar-container');
    if (!container) return;

    const width = container.clientWidth;
    const range = this._maxTemp - this._minTemp;
    const factor = width / range;

    const toPx = (temp: number) => Math.max(0, Math.min(width, (temp - this._minTemp) * factor));

    // Update Elements
    const baseFill = this.shadowRoot?.querySelector('.base-fill') as HTMLElement;
    const heatBar = this.shadowRoot?.querySelector('#heat-fill') as HTMLElement;
    const coolBar = this.shadowRoot?.querySelector('#cool-fill') as HTMLElement;
    const currentPin = this.shadowRoot?.querySelector('#current-pin') as HTMLElement;

    // Dynamic Sizing for Green Zone (Comfort Zone) to prevent overlap overlap/mixing
    let startPx = 0;
    let endPx = width;

    if (this._canHeat) {
       startPx = toPx(this._heatSetpoint);
    }
    if (this._canCool) {
       endPx = toPx(this._coolSetpoint);
    }
    
    // Safety check to prevent negative width
    if (startPx > endPx) startPx = endPx; 

    if (baseFill) {
        baseFill.style.left = `${startPx}px`;
        baseFill.style.width = `${endPx - startPx}px`;
        
        // Handle border radius to look flush with adjacent bars
        // If there is a heat bar (left side), remove left radius of green bar
        const radiusLeft = (this._canHeat && startPx > 2) ? '0' : '16px'; 
        // If there is a cool bar (right side), remove right radius of green bar
        const radiusRight = (this._canCool && endPx < (width - 2)) ? '0' : '16px';
        
        baseFill.style.borderRadius = `${radiusLeft} ${radiusRight} ${radiusRight} ${radiusLeft}`;
    }

    if (heatBar) heatBar.style.width = `${toPx(this._heatSetpoint)}px`;
    if (coolBar) coolBar.style.width = `${width - toPx(this._coolSetpoint)}px`;
    if (currentPin) currentPin.style.left = `${toPx(this._currentTemp)}px`;

    if (heatBar) {
      if (this._hvacAction === 'heating') heatBar.classList.add('active');
      else heatBar.classList.remove('active');
    }
    if (coolBar) {
      if (this._hvacAction === 'cooling') coolBar.classList.add('active');
      else coolBar.classList.remove('active');
    }

    // Handle Off State (Grey out)
    if (this._state === 'off') {
       this.classList.add('state-off');
    } else {
       this.classList.remove('state-off');
    }

    // Determine if we are in Comfort Zone (between low and high setpoints)
    // NOTE: If only heating (no cooling setpoint), comfort is anything above heating?
    // Usually comfort zone implies between heat and cool setpoints.
    let inComfort = false;
    if (this._canHeat && this._canCool) {
        inComfort = this._currentTemp >= this._heatSetpoint && this._currentTemp <= this._coolSetpoint;
    } else if (this._canHeat) {
        // Only heating -> Comfort is reaching target? Or basically >= target?
        // Let's assume comfort represents the "green zone" logic. 
        // In this card design, base-fill (green) occupies the gap.
        // If currentTemp is visually inside the gap, we are in comfort.
        inComfort = this._currentTemp >= this._heatSetpoint;
    } else if (this._canCool) {
        inComfort = this._currentTemp <= this._coolSetpoint;
    }
    
    if (inComfort) {
        this.classList.add('in-comfort');
    } else {
        this.classList.remove('in-comfort');
    }

    // Update Text
    this._updateText('#val-heat', `${this._heatSetpoint}${this._unit}`);
    this._updateText('#val-cool', `${this._coolSetpoint}${this._unit}`);
    this._updateText('#val-current', `${this._currentTemp}${this._unit}`);
    this._updateText('#val-simple', `${this._currentTemp}${this._unit}`);

    // Toggle visibility based on capabilities
    const valHeatParent = this.shadowRoot?.querySelector('#val-heat')?.parentElement;
    if (valHeatParent) valHeatParent.style.display = this._canHeat ? 'flex' : 'none';
    
    const valCoolParent = this.shadowRoot?.querySelector('#val-cool')?.parentElement;
    if (valCoolParent) valCoolParent.style.display = this._canCool ? 'flex' : 'none';

    if (heatBar) heatBar.style.display = this._canHeat ? 'block' : 'none';
    if (coolBar) coolBar.style.display = this._canCool ? 'block' : 'none';

    // Update simple value position to follow the pin in simple mode
    if (this.config.simple_mode) {
       const simpleVal = this.shadowRoot?.querySelector('#val-simple') as HTMLElement;
       if (simpleVal) {
          const pinX = toPx(this._currentTemp);
          simpleVal.style.left = `${pinX}px`;
          
          // Flip text side based on position to ensure visibility
          if (pinX > width / 2) {
             // Right side -> Text to the Left of pin
             simpleVal.style.transform = 'translate(calc(-100% - 12px), -50%)';
          } else {
             // Left side -> Text to the Right of pin
             simpleVal.style.transform = 'translate(12px, -50%)';
          }
       }
    }
  }

  private _updateText(selector: string, text: string) {
    const el = this.shadowRoot?.querySelector(selector);
    if (el) el.textContent = text;
  }

  private _getTemplate(): string {
    return `
      <style>
        :host {
          --hc-cool: #2979ff;
          --hc-heat: #ff6d00;
          --hc-green: #00e676;
          --hc-gold: #ffd600;
          --hc-bg: var(--ha-card-background, var(--card-background-color, #1c1c1e));
          display: block;
        }

        .card-content {
          padding: 16px;
        }

        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .title {
          font-size: 16px;
          font-weight: 500;
          color: var(--secondary-text-color);
        }

        .current-main {
          font-size: 24px;
          font-weight: 300;
        }

        /* The Bar Logic */
        .bar-container {
          position: relative;
          height: 32px;
          background: rgba(255,255,255,0.08);
          border-radius: 16px;
          overflow: visible; /* To allow pin to overflow */
          margin: 20px 0;
          border: 1px solid rgba(255,255,255,0.05);
          transition: background 0.3s;
          z-index: 1; /* Create local stacking context to prevent pin from leaking over dialogs */
        }

        /* Off State: Grey Bar */
        :host(.state-off) .bar-container {
           background: rgba(128,128,128,0.1);
           border-color: rgba(128,128,128,0.2);
        }
        
        :host(.state-off) .base-fill {
           background: #555;
           box-shadow: none;
           opacity: 0.3;
        }
        
        :host(.state-off) #heat-fill,
        :host(.state-off) #cool-fill {
           display: none !important;
        }
        
        :host(.state-off) #current-pin {
           border-color: #888;
           box-shadow: none;
           background: #aaa;
        }

        .base-fill {
          position: absolute;
          top: 0; bottom: 0; left: 0; right: 0;
          background: var(--hc-green);
          opacity: 0.2;
          border-radius: 16px;
          box-shadow: none;
          transition: background 0.3s, opacity 0.3s, box-shadow 0.3s;
        }

        :host(.in-comfort) .base-fill {
           opacity: 0.6;
           box-shadow: 0 0 15px var(--hc-green);
        }

        #heat-fill {
          position: absolute;
          left: 0; top: 0; bottom: 0;
          background: linear-gradient(90deg, rgba(255,109,0,0.6) 0%, var(--hc-heat) 100%);
          border-radius: 16px 0 0 16px;
          transition: width 0.5s ease;
          box-shadow: none;
          overflow: hidden;
          opacity: 0.3; 
        }

        /* Candle Glow Animation for Heating */
        #heat-fill.active {
          opacity: 1;
          box-shadow: 0 0 12px var(--hc-heat);
          animation: candle-heat 2s infinite ease-in-out;
        }

        @keyframes candle-heat {
          0% { box-shadow: 0 0 12px var(--hc-heat); filter: brightness(1); }
          25% { box-shadow: 0 0 16px var(--hc-heat); filter: brightness(1.1); }
          50% { box-shadow: 0 0 10px var(--hc-heat); filter: brightness(0.95); }
          75% { box-shadow: 0 0 18px var(--hc-heat); filter: brightness(1.15); }
          100% { box-shadow: 0 0 12px var(--hc-heat); filter: brightness(1); }
        }

        #cool-fill {
          position: absolute;
          right: 0; top: 0; bottom: 0;
          background: linear-gradient(270deg, rgba(41,121,255,0.6) 0%, var(--hc-cool) 100%);
          border-radius: 0 16px 16px 0;
          transition: width 0.5s ease;
          box-shadow: none;
          overflow: hidden;
          opacity: 0.3;
        }

        /* Candle Glow Animation for Cooling */
        #cool-fill.active {
          opacity: 1;
          box-shadow: 0 0 12px var(--hc-cool);
          animation: candle-cool 2s infinite ease-in-out;
        }

        @keyframes candle-cool {
          0% { box-shadow: 0 0 12px var(--hc-cool); filter: brightness(1); }
          25% { box-shadow: 0 0 16px var(--hc-cool); filter: brightness(1.1); }
          50% { box-shadow: 0 0 10px var(--hc-cool); filter: brightness(0.95); }
          75% { box-shadow: 0 0 18px var(--hc-cool); filter: brightness(1.15); }
          100% { box-shadow: 0 0 12px var(--hc-cool); filter: brightness(1); }
        }

        /* Indicator Pin - Golden Diamond */
        #current-pin {
          position: absolute;
          top: 50%;
          width: 14px;
          height: 14px;
          background: var(--hc-gold);
          border: 2px solid #fff;
          transform: translate(-50%, -50%) rotate(45deg);
          box-shadow: 0 0 15px var(--hc-gold), 0 0 4px #fff;
          transition: left 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: 10;
        }

        /* Removed old arrow pseudo-element */


        /* Info Labels */
        .stats {
          display: flex;
          justify-content: space-between;
          font-size: 12px;
          color: var(--secondary-text-color);
          margin-top: 8px;
        }

        .stat-item {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .stat-value {
          color: var(--primary-text-color);
          font-weight: 600;
          font-size: 14px;
        }

        .dot {
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          margin-right: 4px;
        }

        /* SIMPLE MODE STYLES */
        :host(.simple-mode) ha-card {
           background: transparent;
           box-shadow: none;
           border: none;
        }
        
        :host(.simple-mode) .header,
        :host(.simple-mode) .stats {
          display: none;
        }

        :host(.simple-mode) .bar-container {
          margin: 0; /* Remove top/bottom margin in simple mode */
        }
        
        /* Floating temperature in simple mode */
        .simple-value {
          position: absolute;
          /* Position controlled by JS */
          top: 50%;
          font-size: 14px;
          font-weight: 200;
          color: var(--primary-text-color);
          text-shadow: 0 0 4px var(--hc-bg); 
          z-index: 5; /* Below pin (10) but above fills */
          pointer-events: none;
          display: none;
          white-space: nowrap;
          transition: left 0.5s cubic-bezier(0.4, 0, 0.2, 1), transform 0.2s;
        }

        :host(.simple-mode) .simple-value {
          display: block;
        }
      </style>

      <ha-card>
        <div class="card-content">
          <div class="header">
            <div class="title">${this.config.title || 'Klima'}</div>
            <div class="current-main" id="val-current">-</div>
          </div>

          <div class="bar-container">
            <div class="base-fill"></div>
            <div id="heat-fill"></div>
            <div id="cool-fill"></div>
            <div id="current-pin"></div>
            <div class="simple-value" id="val-simple">-</div>
          </div>

          <div class="stats">
            <div class="stat-item">
              <span><span class="dot" style="background: var(--hc-heat)"></span>Heizen ab</span>
              <span class="stat-value" id="val-heat">-</span>
            </div>
            <div class="stat-item">
              <span style="opacity: 0.6">Bereich</span>
              <span class="stat-value" style="font-weight: 400">${this._minTemp} - ${this._maxTemp}${this._unit}</span>
            </div>
            <div class="stat-item">
              <span><span class="dot" style="background: var(--hc-cool)"></span>Kühlen ab</span>
              <span class="stat-value" id="val-cool">-</span>
            </div>
          </div>
        </div>
      </ha-card>
    `;
  }
}

customElements.define('heating-cooling-card', HeatingCoolingCard);

class HeatingCoolingEditor extends LitElement {
  private _config: any;
  private hass: any;

  static get properties() {
    return {
      hass: {},
      _config: {},
    };
  }

  setConfig(config: HeatingCoolingCardConfig) {
    this._config = config;
  }

  _valueChanged(ev: CustomEvent) {
    if (!this._config || !this.hass) return;
    const newConfig = {
      ...this._config,
      ...ev.detail.value,
    };
    
    const messageEvent = new CustomEvent("config-changed", {
      detail: { config: newConfig },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(messageEvent);
  }

  render() {
    if (!this.hass || !this._config) return html``;

    const schema = [
      { name: "entity", label: "Entity", selector: { entity: { domain: "climate" } } },
      { name: "title", label: "Title", selector: { text: {} } },
      { name: "min_temp", label: "Min Temp (Optional)", selector: { number: { mode: "box", step: 1 } } },
      { name: "max_temp", label: "Max Temp (Optional)", selector: { number: { mode: "box", step: 1 } } },
      { name: "unit", label: "Unit (Optional)", selector: { text: {} } },
      { name: "simple_mode", label: "Simple Mode", selector: { boolean: {} } }
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

customElements.define('heating-cooling-editor', HeatingCoolingEditor);