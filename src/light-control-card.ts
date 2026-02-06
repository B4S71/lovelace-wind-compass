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
      _interacting: { state: true }
    };
  }

  // Internal state
  _interacting = false;
  private _pointerStartTime = 0;
  private _pointerStartX = 0;
  private _pointerStartY = 0;

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

  private _toggleLight(e?: Event) {
    if (e) e.stopPropagation();
    this.hass.callService('light', 'toggle', {
      entity_id: this.config.entity
    });
  }

  private _controlCover(entityId: string, command: 'open_cover' | 'close_cover' | 'stop_cover') {
    this.hass.callService('cover', command, {
      entity_id: entityId
    });
  }

  private _handlePointerDown(e: PointerEvent) {
    // Ignore if clicking buttons or controls
    const path = e.composedPath();
    for (const el of path) {
      if ((el as HTMLElement).classList?.contains('control-btn') || 
          (el as HTMLElement).tagName === 'HA-SWITCH' ||
          (el as HTMLElement).classList?.contains('icon-container')) {
        return;
      }
    }
    
    this._interacting = true;
    this._pointerStartTime = Date.now();
    this._pointerStartX = e.clientX;
    this._pointerStartY = e.clientY;

    const card = this.shadowRoot?.querySelector('ha-card');
    if (card) {
      card.setPointerCapture(e.pointerId);
    }
  }

  private _handlePointerUp(e: PointerEvent) {
    if (!this._interacting) return;
    this._interacting = false;
    
    const card = this.shadowRoot?.querySelector('ha-card');
    if (card) {
      card.releasePointerCapture(e.pointerId);

      // Check for tap vs drag
      const duration = Date.now() - this._pointerStartTime;
      const dist = Math.sqrt(
        Math.pow(e.clientX - this._pointerStartX, 2) + 
        Math.pow(e.clientY - this._pointerStartY, 2)
      );

      // If short tap and little movement -> Toggle
      if (duration < 250 && dist < 10) {
        this._toggleLight();
      } else {
        // Else -> Apply brightness/temp
        this._applyLightState(e, card);
      }
    }
  }

  private _handlePointerMove(_e: PointerEvent) {
    // Optional: Real-time update of local state if we want to show a "cursor" or "preview"
    // For now, just the concept of interacting is enough to show the gradient map
  }

  private _applyLightState(e: PointerEvent, card: Element) {
    const rect = card.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));

    const stateObj = this.hass.states[this.config.entity];
    if (!stateObj) return;

    // Y -> Brightness (Up=100%, Down=0%)
    const brightnessPct = Math.round((1 - y) * 100);

    // X -> Color Temp (Left=Cold/MinMireds, Right=Warm/MaxMireds)
    const minMireds = stateObj.attributes.min_mireds || 153;
    const maxMireds = stateObj.attributes.max_mireds || 500;
    const colorTemp = Math.round(minMireds + (x * (maxMireds - minMireds)));

    const serviceData: any = {
      entity_id: this.config.entity,
      brightness_pct: Math.max(1, brightnessPct) // Don't turn off, just dim
    };

    // Only apply color temp if supported
    // Check if bit 2 (color_temp) is supported or color_mode says so. 
    // Assuming if min_mireds is present, it supports it.
    if (stateObj.attributes.min_mireds) {
        serviceData.color_temp = colorTemp;
    }

    this.hass.callService('light', 'turn_on', serviceData);
  }

  render() {
    const stateObj = this.hass.states[this.config.entity];
    
    if (!stateObj) {
        return html`<ha-card class="not-found">Entity not found: ${this.config.entity}</ha-card>`;
    }

    const isOn = stateObj.state === 'on';
    const brightness = stateObj.attributes.brightness ? Math.round((stateObj.attributes.brightness / 255) * 100) : 0;
    
    // Color Temp Logic
    const minMireds = stateObj.attributes.min_mireds || 153;
    const maxMireds = stateObj.attributes.max_mireds || 500;
    const currentMireds = stateObj.attributes.color_temp || Math.round((minMireds + maxMireds) / 2);

    const covers = this.config.covers || [];

    // Background Gradient Calculation
    let bgStyle = 'background: linear-gradient(135deg, #2c3e50 0%, #000000 100%);'; // Off state

    if (this._interacting) {
      // 2D Map: X=Temp (Blue->Orange), Y=Bright (White->Black)
      bgStyle = `background: linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 100%), linear-gradient(to right, rgb(166, 209, 255) 0%, rgb(255, 160, 0) 100%);`;
    } else if (isOn) {
        // Normalize mireds 0..1
        const ratio = (currentMireds - minMireds) / (maxMireds - minMireds);
        
        if (stateObj.attributes.rgb_color) {
            const [r, g, b] = stateObj.attributes.rgb_color;
            bgStyle = `background: linear-gradient(135deg, rgba(${r},${g},${b},0.8) 0%, rgba(${r},${g},${b},0.4) 100%);`;
        } else {
             const r = 200 + (55 * ratio); 
             const g = 220 - (20 * ratio);
             const b = 255 - (105 * ratio);
             bgStyle = `background: linear-gradient(135deg, rgb(${r},${g},${b}) 0%, rgb(${Math.round(r*0.6)},${Math.round(g*0.6)},${Math.round(b*0.6)}) 100%);`;
        }
    }

    return html`
      <ha-card 
        style="${bgStyle}"
        @pointerdown=${this._handlePointerDown}
        @pointerup=${this._handlePointerUp}
        @pointercancel=${this._handlePointerUp}
        @pointermove=${this._handlePointerMove}
      >
        <div class="content" style="opacity: ${this._interacting ? '0' : '1'}; pointer-events: ${this._interacting ? 'none' : 'auto'}">
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
                    @click=${(e: Event) => e.stopPropagation()}
                    @change=${this._toggleLight}
                ></ha-switch>
            </div>

            <!-- COVERS -->
            ${covers.length > 0 ? html`
                <div class="covers-section">
                    ${covers.map((cover: string) => this._renderCover(cover))}
                </div>
            ` : ''}
        </div>
      </ha-card>
    `;
  }

  private _renderCover(entityId: string) {
      const stateObj = this.hass.states[entityId];
      if (!stateObj) return html``;
      
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
        transition: background 0.1s linear;
        padding: 16px;
        touch-action: none;
        user-select: none;
        position: relative;
        cursor: grab;
      }
      ha-card:active {
        cursor: grabbing;
      }
      .content {
        display: flex;
        flex-direction: column;
        gap: 20px;
        transition: opacity 0.2s ease-in-out;
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

customElements.define('slick-light-control-card', LightControlCard);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "slick-light-control-card",
  name: "Slick Light Control",
  description: "A card to control lights (brightness, color temp) and associated covers.",
  preview: true, // Optional, enables preview in the picker if supported
});
