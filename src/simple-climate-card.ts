/**
 * Simple Climate Card
 * @version 0.2.0
 */

import { LitElement, html, css } from 'lit';
import type {
  HomeAssistant,
  SimpleClimateCardConfig,
} from './types';

const CARD_VERSION = "0.2.0";

console.info(
  `%c SIMPLE-CLIMATE-CARD %c ${CARD_VERSION} `,
  'color: white; background: #ff9800; font-weight: 700;',
  'color: #ff9800; background: white; font-weight: 700;'
);

export class SimpleClimateCard extends LitElement {
  hass!: HomeAssistant;
  config!: SimpleClimateCardConfig;

  static get properties() {
    return {
      hass: { attribute: false },
      config: { state: true },
    };
  }

  static getConfigElement() {
    return document.createElement("slick-simple-climate-card-editor");
  }

  static getStubConfig() {
    return {
      type: "custom:slick-simple-climate-card",
      entity: "",
      name: "Climate",
    };
  }

  setConfig(config: SimpleClimateCardConfig) {
    if (!config) throw new Error("Invalid configuration");
    this.config = { name: "Climate", ...config };

    if (this.config.name && typeof this.config.name !== 'string') throw new Error("name must be a string");
    if (this.config.sensors && typeof this.config.sensors !== 'object') throw new Error("sensors must be an object");
  }

  private _interpolateColor(c1: string, c2: string, factor: number): string {
    const hex = (c: string) => {
        const h = c.replace('#', '');
        return parseInt(h, 16);
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

  private _getGradient(stateObj: any, currentTemp: number, targetLow: number, targetHigh: number): string {
    const hvacAction = stateObj.attributes.hvac_action || stateObj.state;
    // Common colors
    const cGrey = '#607d8b';
    const cDarkGrey = '#455a64';
    const cOrange = '#ff9800';
    const cOrangeDark = '#e65100'; // Darker orange for full heat depth
    const cGreen = '#4caf50';
    const cBlue = '#2196f3';
    const cBlueDark = '#0d47a1';   // Darker blue for full cool depth
    
    // Safety check
    if (isNaN(currentTemp)) return `linear-gradient(180deg, ${cGrey}, ${cDarkGrey})`;

    // Difference required for full color intensity
    const maxDelta = 3;

    // heating, but below target temperature: bottom orange, top grey
    if (hvacAction === 'heating') {
      // If we only have single target, targetLow is the target
      if (currentTemp < targetLow) {
        const delta = targetLow - currentTemp;
        const intensity = delta / maxDelta >= 1 ? 1 : delta / maxDelta;
        
        // INTERPOLATE TOP COLOR: Grey -> Orange
        // Ensures no "Grey Bar" at the top when intensity is high (near 3deg).
        // Modulate from Grey to Orange starting at 40% intensity to keep contrast for small deltas.
        let topFactor = 0;
        if (intensity > 0.4) {
           topFactor = (intensity - 0.4) / 0.6; // 0..1
        }
        const topColor = this._interpolateColor(cGrey, cOrange, topFactor);
        
        // INTERPOLATE BOTTOM COLOR: Orange -> OrangeDark
        // Adds depth at high intensity so it's not flat
        const bottomColor = this._interpolateColor(cOrange, cOrangeDark, intensity);
        
        // HINT POSITION: Controls the "weight" of the gradient.
        // Intensity 0 (0deg) -> 90% (Transition happens at bottom, mostly Top Color/Grey)
        // Intensity 1 (3deg) -> 20% (Transition happens at top, mostly Bottom Color/Orange)
        const hint = 90 - (intensity * 70); 

        return `linear-gradient(180deg, ${topColor} 0%, ${hint}%, ${bottomColor} 100%)`;
      }
      
      // heating, but already >= target OR in range
      // Just a pleasant green-orange mix
      return `linear-gradient(180deg, ${cGreen}, 80%, ${cOrange})`;
    }

    // cooling
    if (hvacAction === 'cooling') {
      // cooling, but over target temperature: top blue, bottom grey
      if (currentTemp > targetHigh) {
        const delta = currentTemp - targetHigh;
        const intensity = delta / maxDelta >= 1 ? 1 : delta / maxDelta;

        // INTERPOLATE TARGET BLUE: Blue -> BlueDark
        // As intensity rises, the "Blue" end becomes darker for depth.
        const targetBlue = this._interpolateColor(cBlue, cBlueDark, intensity);

        // INTERPOLATE BOTTOM COLOR: Grey -> TargetBlue
        // Ensures no "Grey Bar" at the bottom when intensity is high.
        let botFactor = 0;
        if (intensity > 0.4) {
           botFactor = (intensity - 0.4) / 0.6;
        }
        const botColor = this._interpolateColor(cGrey, targetBlue, botFactor);

        // HINT POSITION:
        // Intensity 0 (0deg) -> 10% (Transition happens at top, mostly Bottom Color/Grey)
        // Intensity 1 (3deg) -> 80% (Transition happens at bottom, mostly Top Color/Blue)
        const hint = 10 + (intensity * 70);

        return `linear-gradient(180deg, ${cBlue} 0%, ${hint}%, ${botColor} 100%)`;
      }
      
      // cooling, and already <= target
      return `linear-gradient(180deg, ${cBlue}, 20%, ${cGreen})`;
    }

    // idle
    if (hvacAction === 'idle') {
      // idle, and in optimal temperature range: greenish gradient
      return `linear-gradient(180deg, ${cGreen} 0%, ${'#81c784'} 100%)`;
    }

    // off
    if (stateObj.state === 'off') {
        return `linear-gradient(180deg, ${cGrey} 0%, ${cDarkGrey} 100%)`;
    }

    // Fallback (maybe fan_only or dry) - Neutral
    return `linear-gradient(180deg, ${cGrey} 0%, ${cDarkGrey} 100%)`;
  }

  render() {
    // If config is missing, we can't do anything
    if (!this.config) return html``;
    
    // If hass is missing, we render a placeholder explicitly or return
    // But typically user wants to see the card structure.
    if (!this.hass) {
        return html`<ha-card style="padding:16px;">Loading...</ha-card>`;
    }

    const entityId = this.config.entity;
    let stateObj = this.hass.states[entityId];

    if (!stateObj) {
      stateObj = {
        entity_id: entityId,
        state: 'unavailable',
        attributes: { friendly_name: this.config.name || entityId },
      } as any;
    }

    // 1. Determine Temperatures
    let currentTemp = stateObj.attributes.current_temperature;
    
    // Config override
    if (this.config.sensors?.temp && this.hass.states[this.config.sensors.temp]) {
       const s = this.hass.states[this.config.sensors.temp];
       if (!isNaN(parseFloat(s.state))) currentTemp = parseFloat(s.state);
    }

    // Targets
    // Try to find High/Low. If single point 'temperature', assign to both or logic depends on mode?
    // If mode is 'heat', target is low. If mode is 'cool', target is high.
    // If 'heat_cool', we have both.
    let targetLow = stateObj.attributes.target_temp_low;
    let targetHigh = stateObj.attributes.target_temp_high;
    const singleTarget = stateObj.attributes.temperature;

    if (targetLow === undefined && singleTarget !== undefined) targetLow = singleTarget;
    if (targetHigh === undefined && singleTarget !== undefined) targetHigh = singleTarget;

    // Defaults if completely missing
    if (targetLow === undefined) targetLow = 20;
    if (targetHigh === undefined) targetHigh = 24;

    // Sensor overrides
    if (this.config.sensors?.target_low && this.hass.states[this.config.sensors.target_low]) {
        targetLow = parseFloat(this.hass.states[this.config.sensors.target_low].state);
    }
    if (this.config.sensors?.target_high && this.hass.states[this.config.sensors.target_high]) {
        targetHigh = parseFloat(this.hass.states[this.config.sensors.target_high].state);
    }

    const gradient = this._getGradient(stateObj, currentTemp, targetLow, targetHigh);

    // Labels
    const name = this.config.name || stateObj.attributes.friendly_name || 'Climate';
    const stateLabel = stateObj.attributes.hvac_action 
        ? this.hass.localize(`state_attributes.climate.hvac_action.${stateObj.attributes.hvac_action}`) 
        : this.hass.localize(`component.climate.state._.${stateObj.state}`) || stateObj.state;

    // Main Icon Logic
    let icon = 'mdi:thermostat';
    const action = stateObj.attributes.hvac_action || stateObj.state;
    if (action === 'heating') icon = 'mdi:fire';
    else if (action === 'cooling') icon = 'mdi:snowflake';
    else if (action === 'idle') icon = 'mdi:check-circle-outline';
    else if (action === 'off') icon = 'mdi:power-off';

    return html`
      <ha-card @click="${this._openMoreInfo}">
        <div class="bg-layer" style="background: ${gradient};"></div>
        
        <div class="container">
          <div class="header">
             <div class="temp-big">
                ${currentTemp !== undefined ? html`${currentTemp}<span class="unit">°</span>` : '--'}
             </div>
             <div class="header-right">
                <ha-icon icon="${icon}" class="main-icon"></ha-icon>
                <div class="state-label">${stateLabel}</div>
             </div>
          </div>

          <div class="spacer"></div>

          <div class="footer-row">
             <div class="footer-info">
               <div class="name">${name}</div>
             </div>
             <div class="targets">
                ${this._renderTargets(stateObj, targetLow, targetHigh)}
             </div>
          </div>
        </div>
      </ha-card>
    `;
  }

  _renderTargets(stateObj: any, low: number, high: number) {
     const mode = stateObj.state;
     // If off, show nothing or just "Off"
     if (mode === 'off') return html`<div class="target-chip">OFF</div>`;

     // heat_cool -> show both
     // heat -> show low
     // cool -> show high
     // But hvac_modes might allow more.
     
     // Simplification: If we have distinct low/high, show range. If same, show one.
     if (low !== undefined && high !== undefined && low !== high) {
         return html`
            <div class="target-group">
               <div class="target-label">Min</div>
               <div class="target-val">${low}°</div>
            </div>
            <div class="divider"></div>
            <div class="target-group">
               <div class="target-label">Max</div>
               <div class="target-val">${high}°</div>
            </div>
         `;
     }
     
     // Single target
     return html`
        <div class="target-group">
           <div class="target-label">Target</div>
           <div class="target-val">${low ?? high ?? '--'}°</div>
        </div>
     `;
  }

  _openMoreInfo() {
    if (this.config.entity) {
      const event = new CustomEvent("hass-more-info", {
        detail: { entityId: this.config.entity },
        bubbles: true,
        composed: true,
      });
      this.dispatchEvent(event);
    }
  }

  static get styles() {
    return css`
      :host {
        display: block;
        height: 100%;
      }
      ha-card {
        width: 100%;
        height: 100%;
        position: relative;
        overflow: hidden;
        border-radius: var(--ha-card-border-radius, 12px);
        box-shadow: var(--ha-card-box-shadow, none);
        cursor: pointer;
        color: white;
        container-type: inline-size; /* Enable container query units (cqi) */
      }
      .bg-layer {
        position: absolute;
        top: 0; left: 0; right: 0; bottom: 0;
        z-index: 0;
        transition: background 0.5s ease;
      }
      .container {
        position: relative;
        z-index: 1;
        padding: clamp(8px, 3%, 16px);
        height: 100%;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        min-height: 0;
        overflow: hidden;
      }
      
      .header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        flex: 0 0 auto;
        min-height: 0;
      }
      
      .temp-big {
        font-size: clamp(2rem, 10cqi, 4rem);
        font-weight: 100;
        line-height: 1;
        text-shadow: 0 1px 4px rgba(0,0,0,0.3);
        white-space: nowrap;
        letter-spacing: -1px;
      }
      .temp-big .unit {
        font-size: clamp(1rem, 4cqi, 2.2rem);
        vertical-align: top;
        opacity: 0.8;
        font-weight: 200;
      }
      
      .header-right {
        text-align: right;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        flex: 0 0 auto;
      }
      .main-icon {
        --mdc-icon-size: clamp(22px, 7cqi, 36px);
        filter: drop-shadow(0 1px 2px rgba(0,0,0,0.3));
        margin-bottom: 4px;
      }
      .state-label {
        font-size: clamp(0.7rem, 3cqi, 1rem);
        font-weight: 300;
        opacity: 0.9;
        text-shadow: 0 1px 2px rgba(0,0,0,0.3);
      }

      .spacer {
        flex: 1;
        min-height: 0;
      }

      .footer-row {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        flex: 0 0 auto;
        min-height: 0;
      }
      
      .name {
        font-size: clamp(0.8rem, 3.5cqi, 1.1rem);
        font-weight: 500;
        text-shadow: 0 1px 2px rgba(0,0,0,0.3);
        opacity: 0.9;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .targets {
        display: flex;
        align-items: center;
        background: rgba(0,0,0,0.2);
        border-radius: 20px;
        padding: 4px clamp(6px, 2%, 12px);
        backdrop-filter: blur(4px);
        flex: 0 0 auto;
      }
      .target-group {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
      }
      .target-label {
        font-size: 0.65rem;
        text-transform: uppercase;
        opacity: 0.7;
      }
      .target-val {
        font-size: 1.1rem;
        font-weight: 400;
      }
      .divider {
        width: 1px;
        height: 24px;
        background: rgba(255,255,255,0.3);
        margin: 0 10px;
      }
      .target-chip {
        font-weight: 400;
        font-size: 0.9rem;
      }
    `;
  }
}

// Register Custom Element
if (!customElements.get("slick-simple-climate-card")) {
  customElements.define("slick-simple-climate-card", SimpleClimateCard);
}

class SimpleClimateCardEditor extends LitElement {
  hass!: HomeAssistant;
  _config!: SimpleClimateCardConfig;
  
  static get properties() { return { hass: {}, _config: {} }; }
  setConfig(config: SimpleClimateCardConfig) { this._config = config; }
  
  _valueChanged(ev: CustomEvent) { 
    const newConfig = { ...this._config, ...ev.detail.value };
    const event = new CustomEvent("config-changed", {
      detail: { config: newConfig },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }

  render() { 
      // Minimal editor
      if (!this.hass || !this._config) return html``;
      
      const schema = [
        { name: "entity", label: "Entity", selector: { entity: { domain: "climate" } } },
        { name: "name", label: "Name", selector: { text: {} } }
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

if (!customElements.get("slick-simple-climate-card-editor")) {
  customElements.define("slick-simple-climate-card-editor", SimpleClimateCardEditor);
}

// Register
window.customCards = window.customCards || [];
window.customCards.push({ 
    type: "slick-simple-climate-card", 
    name: "Slick Simple Climate", 
    preview: true,
    description: "A clean climate card with dynamic gradients." 
});
