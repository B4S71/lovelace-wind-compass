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
  _interactionMode: 'light' | 'cover' = 'light';
  _interactState: string = '';
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
          (el as HTMLElement).classList?.contains('icon-container')) {
        return;
      }
    }
    
    this._interacting = true;
    this._pointerStartTime = Date.now();
    this._pointerStartX = e.clientX;
    this._pointerStartY = e.clientY;

    // improved mode detection using rect
    const card = this.shadowRoot?.querySelector('ha-card');
    if (card) {
        const rect = card.getBoundingClientRect();
        const y = (e.clientY - rect.top) / rect.height;
        // Assume bottom 35% is cover control if covers exist
        if (this.config.covers && this.config.covers.length > 0 && y > 0.65) {
            this._interactionMode = 'cover';
        } else {
            this._interactionMode = 'light';
        }
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

      // If short tap and little movement
      if (duration < 250 && dist < 10) {
        if (this._interactionMode === 'light') {
            this._toggleLight();
        }
        // No action for tap on cover currently
      } else {
        // Else -> Apply changes based on mode
        if (this._interactionMode === 'light') {
            this._applyLightState(e, card);
        } else {
            this._applyCoverState(e, card);
        }
      }
    }
  }

  private _handlePointerMove(e: PointerEvent) {
    if (!this._interacting) return;

    // Calc visual feedback state but don't apply yet
    // This provides the numbers for the status bar
    const card = this.shadowRoot?.querySelector('ha-card');
    if (card) {
        const rect = card.getBoundingClientRect();
        const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
        const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));

        if (this._interactionMode === 'light') {
            const brightness = Math.round((1 - y) * 100);
            this._interactState = `Brightness: ${brightness}%`;
        } else {
            const position = Math.round((1 - x) * 100);
            this._interactState = `Position: ${position}%`;
            // Optional: Tilt
            const tilt = Math.round((1 - y) * 100);
            this._interactState += ` | Tilt: ${tilt}%`;
        }
    }
  }

  private _applyCoverState(e: PointerEvent, card: Element) {
      const rect = card.getBoundingClientRect();
      const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));
      
      const covers = this.config.covers || [];
      covers.forEach(entityId => {
          // X Axis: Open (0) -> Close (1)
          if (x < 0.1) {
              this.hass.callService('cover', 'open_cover', { entity_id: entityId });
          } else if (x > 0.9) {
              this.hass.callService('cover', 'close_cover', { entity_id: entityId });
          } else {
              const position = Math.round((1 - x) * 100);
              this.hass.callService('cover', 'set_cover_position', { 
                  entity_id: entityId, 
                  position: position
              });
          }

          // Y Axis: Tilt (if supported)
          // Top (0) -> Open (100?), Bottom (1) -> Closed (0?)
          // Usually tilt: 0 is closed, 100 is open.
          // Let's map Y=0 to 100, Y=1 to 0.
          if (y >= 0 && y <= 1) { // Apply tilt if dragged
               const tilt = Math.round((1 - y) * 100);
               this.hass.callService('cover', 'set_cover_tilt_position', {
                   entity_id: entityId,
                   tilt_position: tilt
               });
          }
      });
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
      if (this._interactionMode === 'cover') {
           // Cover Gradient: Left (Bright/Open) -> Right (Dark/Close)
           // Pattern: Clear at top (transparent), tighter striped at bottom (opaque)
           
           // Layer 1 (Stripe Pattern): Repeating lines
           // Layer 2 (Vertical Fade - Masking opacity): Transparent top -> Black bottom
           // Layer 3 (Base Gradient): Sky Blue (Left) -> Dark Gray (Right)
           
           const stripes = `repeating-linear-gradient(0deg, transparent, transparent 18px, rgba(0,0,0,0.2) 19px, rgba(0,0,0,0.2) 20px)`;
           const verticalFade = `linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(0,0,0,0.4) 100%)`;
           const baseGradient = `linear-gradient(to right, #87CEEB 0%, #333333 100%)`;

           // Composition: Bottom layer is base, then stripes, then potential fade
           bgStyle = `background: ${verticalFade}, ${stripes}, ${baseGradient};`;
      } else {
           // 2D Map: X=Temp (Blue->Orange), Y=Bright (White->Black)
           bgStyle = `background: linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 100%), linear-gradient(to right, rgb(166, 209, 255) 0%, rgb(255, 160, 0) 100%);`;
      }
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

    // Determine status text for bottom bar
    let statusText = '';
    if (this._interacting) {
        statusText = this._interactState;
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
            </div>

            <!-- COVERS -->
            ${covers.length > 0 ? html`
                <div class="covers-section">
                    ${covers.map((cover: string) => this._renderCover(cover))}
                </div>
            ` : ''}
        </div>
        
        <!-- INTERACTION STATUS BAR -->
        <div class="status-bar" style="opacity: ${this._interacting ? '1' : '0'}">
            ${statusText}
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
      
      .status-bar {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 12px;
          background: rgba(0,0,0,0.5);
          color: white;
          text-align: center;
          font-weight: bold;
          font-size: 1.1rem;
          pointer-events: none;
          transition: opacity 0.2s;
          backdrop-filter: blur(4px);
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
