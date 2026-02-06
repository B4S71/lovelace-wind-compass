/**
 * Light Control Card
 * @version 0.1.0
 */

import { LitElement, html, css, PropertyValues } from 'lit';
import type { HomeAssistant, LightControlCardConfig } from './types';

const CARD_VERSION = "0.1.0";

console.info(
  `%c SLICK-LIGHT-CONTROL-CARD %c ${CARD_VERSION} `,
  'color: white; background: #FFC107; font-weight: 700;',
  'color: #FFC107; background: white; font-weight: 700;'
);

export class LightControlCard extends LitElement {
  hass!: HomeAssistant;
  config!: LightControlCardConfig;

  static get properties() {
    return {
      hass: { attribute: false },
      config: { state: true },
    };
  }

  static getConfigElement() {
    return document.createElement("slick-light-control-card-editor");
  }

  static getStubConfig() {
    return {
      type: "custom:slick-light-control-card",
      entity: "light.example_light",
      name: "Living Room",
      covers: []
    };
  }

  setConfig(config: LightControlCardConfig) {
    if (!config.entity) {
      throw new Error("You need to define an entity (light)");
    }
    this.config = config;
  }

  shouldUpdate(changedProps: PropertyValues) {
    if (changedProps.has('config')) return true;
    
    // Check if relevant entities changed
    const oldHass = changedProps.get('hass') as HomeAssistant | undefined;
    if (!oldHass) return true;

    // Check main entity
    if (oldHass.states[this.config.entity] !== this.hass.states[this.config.entity]) return true;

    // Check covers
    if (this.config.covers) {
      for (const cover of this.config.covers) {
        if (oldHass.states[cover] !== this.hass.states[cover]) return true;
      }
    }

    return false;
  }

  private _toggleLight() {
    this.hass.callService('light', 'toggle', {
      entity_id: this.config.entity
    });
  }

  private _setBrightness(e: Event) {
    const value = (e.target as HTMLInputElement).value;
    this.hass.callService('light', 'turn_on', {
      entity_id: this.config.entity,
      brightness_pct: value
    });
  }

  private _setTemp(e: Event) {
    const value = (e.target as HTMLInputElement).value;
    // Value coming from slider is in Kelvin (warm to cool) or mireds? 
    // Let's use Kelvin for UI (Check what HA supports) or simpler: Mireds.
    // Slider: Left (Cool) -> Right (Warm) or vice versa.
    // Kelvin: High (Cool) -> Low (Warm).
    // Mireds: Low (Cool) -> High (Warm).
    
    // Let's assume the slider is Mireds for direct passing
    this.hass.callService('light', 'turn_on', {
      entity_id: this.config.entity,
      color_temp: value
    });
  }

  private _controlCover(entityId: string, command: 'open_cover' | 'close_cover' | 'stop_cover') {
    this.hass.callService('cover', command, {
      entity_id: entityId
    });
  }

  render() {
    const stateObj = this.hass.states[this.config.entity];
    
    if (!stateObj) {
        return html`<ha-card class="not-found">Entity not found: ${this.config.entity}</ha-card>`;
    }

    const isOn = stateObj.state === 'on';
    const brightness = stateObj.attributes.brightness ? Math.round((stateObj.attributes.brightness / 255) * 100) : 0;
    
    // Color Temp Logic
    // HA uses mireds (min_mireds to max_mireds)
    // Low mireds = Cool, High mireds = Warm
    const minMireds = stateObj.attributes.min_mireds || 153;
    const maxMireds = stateObj.attributes.max_mireds || 500;
    const currentMireds = stateObj.attributes.color_temp || Math.round((minMireds + maxMireds) / 2);

    const covers = this.config.covers || [];

    // Background Gradient Calculation
    // If On: Warm/Cool gradient based on temp? Or yellowish.
    // If Off: Dark Grey.
    let bgStyle = 'background: linear-gradient(135deg, #2c3e50 0%, #000000 100%);'; // Off state
    if (isOn) {
        // Simple approximation: 
        // Cool (low mireds) -> Blueish White
        // Warm (high mireds) -> Orangeish
        
        // Normalize mireds 0..1
        const ratio = (currentMireds - minMireds) / (maxMireds - minMireds);
        // 0 (Cool) -> 1 (Warm)
        
        // Colors
        // Cool: #e0f7fa (Cyan 50)
        // Warm: #fff3e0 (Orange 50) -> #ffe0b2
        
        // Let's make it more vibrant for the card bg
        // Cool: #2980b9
        // Warm: #f39c12
        
        // We can interpolate or just pick. Let's interpolate roughly via CSS if possible, but JS is easier.
        // Let's stick to a Gold/Yellow glow for general "On" and tweak slightly.
        // Or actually visually represent the temp.
        
        if (stateObj.attributes.rgb_color) {
            const [r, g, b] = stateObj.attributes.rgb_color;
            bgStyle = `background: linear-gradient(135deg, rgba(${r},${g},${b},0.8) 0%, rgba(${r},${g},${b},0.4) 100%);`;
        } else {
             // Fallback for white spectrum lights
             // More mireds = warmer (orange). Less mireds = cooler (blue/white).
             const w = Math.round(255 * ratio); // Amount of "warmth"
             // Cool: rgb(200, 220, 255)
             // Warm: rgb(255, 200, 150)
             // Interpolation logic roughly:
             const r = 200 + (55 * ratio); 
             const g = 220 - (20 * ratio);
             const b = 255 - (105 * ratio);
             bgStyle = `background: linear-gradient(135deg, rgb(${r},${g},${b}) 0%, rgb(${Math.round(r*0.6)},${Math.round(g*0.6)},${Math.round(b*0.6)}) 100%);`;
        }
    }

    return html`
      <ha-card style="${bgStyle}">
        <div class="content">
            <!-- HEADER -->
            <div class="header">
                <div class="icon-container" @click=${this._toggleLight}>
                    <ha-icon icon="${stateObj.attributes.icon || (isOn ? 'mdi:lightbulb-on' : 'mdi:lightbulb')}"></ha-icon>
                </div>
                <div class="info">
                    <span class="name">${this.config.name || stateObj.attributes.friendly_name}</span>
                    <span class="state">${isOn ? `${brightness}%` : 'Off'}</span>
                </div>
                 <ha-switch
                    .checked=${isOn}
                    @change=${this._toggleLight}
                ></ha-switch>
            </div>

            <!-- CONTROLS -->
            ${isOn ? html`
            <div class="sliders">
                <!-- BRIGHTNESS -->
                <div class="slider-group">
                    <div class="slider-label"><ha-icon icon="mdi:brightness-6"></ha-icon></div>
                    <input type="range" 
                        min="1" max="100" 
                        .value=${brightness} 
                        @change=${this._setBrightness}
                        class="slider brightness-slider">
                </div>

                <!-- TEMP (if supported) -->
                ${stateObj.attributes.supported_features !== undefined /* simplified check, real logic checks bitmask or color_mode */ ? html`
                <div class="slider-group">
                    <div class="slider-label"><ha-icon icon="mdi:thermometer"></ha-icon></div>
                    <input type="range" 
                        min="${minMireds}" max="${maxMireds}" 
                        .value=${currentMireds} 
                        @change=${this._setTemp}
                        class="slider temp-slider">
                </div>` : ''}
            </div>
            ` : ''}

            <!-- COVERS -->
            ${covers.length > 0 ? html`
                <div class="covers-section">
                    ${covers.map(cover => this._renderCover(cover))}
                </div>
            ` : ''}
        </div>
      </ha-card>
    `;
  }

  private _renderCover(entityId: string) {
      const stateObj = this.hass.states[entityId];
      if (!stateObj) return html``;
      
      const isOpen = stateObj.state === 'open';

      return html`
        <div class="cover-row">
            <div class="cover-info">
                <ha-icon icon="${stateObj.attributes.icon || 'mdi:window-shutter'}"></ha-icon>
                <span>${stateObj.attributes.friendly_name}</span>
            </div>
            <div class="cover-controls">
                <div class="control-btn" @click=${() => this._controlCover(entityId, 'open_cover')}>
                    <ha-icon icon="mdi:arrow-up"></ha-icon>
                </div>
                <div class="control-btn" @click=${() => this._controlCover(entityId, 'stop_cover')}>
                    <ha-icon icon="mdi:stop"></ha-icon>
                </div>
                <div class="control-btn" @click=${() => this._controlCover(entityId, 'close_cover')}>
                    <ha-icon icon="mdi:arrow-down"></ha-icon>
                </div>
            </div>
        </div>
      `;
  }

  static get styles() {
    return css`
      :host {
        display: block;
      }
      ha-card {
        color: white;
        overflow: hidden;
        transition: all 0.5s ease;
        padding: 16px;
      }
      .content {
        display: flex;
        flex-direction: column;
        gap: 20px;
      }
      
      /* HEADER */
      .header {
        display: flex;
        align-items: center;
        gap: 16px;
      }
      .icon-container {
        background: rgba(255, 255, 255, 0.2);
        border-radius: 50%;
        width: 48px;
        height: 48px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: background 0.3s;
      }
      .icon-container:hover {
          background: rgba(255,255,255,0.3);
      }
      .info {
        flex: 1;
        display: flex;
        flex-direction: column;
      }
      .name {
        font-weight: 600;
        font-size: 1.1rem;
      }
      .state {
        opacity: 0.8;
        font-size: 0.9rem;
      }

      /* SLIDERS */
      .sliders {
        display: flex;
        flex-direction: column;
        gap: 16px;
        background: rgba(0,0,0,0.2);
        padding: 16px;
        border-radius: 12px;
      }
      .slider-group {
        display: flex;
        align-items: center;
        gap: 12px;
      }
      .slider {
        -webkit-appearance: none;
        width: 100%;
        height: 6px;
        border-radius: 3px;
        background: rgba(255, 255, 255, 0.3);
        outline: none;
        transition: opacity .2s;
      }
      .slider::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 18px;
        height: 18px;
        border-radius: 50%;
        background: #ffffff;
        cursor: pointer;
        border: 2px solid rgba(0,0,0,0.1);
      }
      
      .brightness-slider::-webkit-slider-thumb {
         box-shadow: 0 0 10px rgba(255,255,255,0.8);
      }
      
      .temp-slider {
        background: linear-gradient(90deg, #a7c5eb 0%, #ffcc80 100%);
      }

      /* COVERS */
      .covers-section {
        display: flex;
        flex-direction: column;
        gap: 12px;
        margin-top: 8px;
        border-top: 1px solid rgba(255,255,255,0.1);
        padding-top: 16px;
      }
      .cover-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: rgba(0,0,0,0.15);
        padding: 8px 12px;
        border-radius: 8px;
      }
      .cover-info {
        display: flex;
        align-items: center;
        gap: 10px;
        font-size: 0.9rem;
        font-weight: 500;
      }
      .cover-controls {
        display: flex;
        gap: 8px;
      }
      .control-btn {
        width: 32px;
        height: 32px;
        background: rgba(255,255,255,0.15);
        border-radius: 6px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: background 0.2s;
      }
      .control-btn:hover {
        background: rgba(255,255,255,0.3);
      }
      .control-btn ha-icon {
        --mdc-icon-size: 20px;
      }
    `;
  }
}

customElements.define('custom:slick-light-control-card', LightControlCard);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "custom:slick-light-control-card",
  name: "Slick Light Control",
  description: "A card to control lights (brightness, color temp) and associated covers.",
  preview: true, // Optional, enables preview in the picker if supported
});
