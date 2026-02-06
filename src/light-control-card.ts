/**
 * Light Control Card
 * @version 0.1.0
 */

import { LitElement, html, css, PropertyValues } from 'lit';
import type { HomeAssistant, LightControlCardConfig } from './types';
import './light-control-card-editor';

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
      _interacting: { state: true },
      _cursorPos: { state: true },
      _layout: { state: true }
    };
  }

  // Internal state
  _interacting = false;
  _layout: 'compact' | 'small' | 'medium' | 'large' = 'large';
  _resizeObserver: ResizeObserver | null = null;
  _cursorPos = { x: 0, y: 0 };
  _activeSlider: { 
    entityId: string; 
    type: 'position' | 'tilt'; 
    startX: number; 
    startVal: number;
    currentVal: number;
  } | null = null;
  private _pointerStartX = 0;
  private _pointerStartY = 0;
  private _longPressTimer: number | null = null;
  private _pendingPointerId: number | null = null;

  connectedCallback() {
      super.connectedCallback();
      this._resizeObserver = new ResizeObserver(entries => {
          for (const entry of entries) {
              const { width, height } = entry.contentRect;
              this._updateLayout(width, height);
          }
      });
      this._resizeObserver.observe(this);
  }

  disconnectedCallback() {
      super.disconnectedCallback();
      if (this._resizeObserver) {
          this._resizeObserver.disconnect();
          this._resizeObserver = null;
      }
  }

  protected firstUpdated(_changedProperties: PropertyValues): void {
      super.firstUpdated(_changedProperties);
      // We must use a passive: false listener to be able to preventDefault() on touchmove
      // This is the only reliable way to stop scrolling on mobile devices while dragging
      const card = this.shadowRoot?.querySelector('ha-card');
      if (card) {
          card.addEventListener('touchmove', this._handleTouchMove, { passive: false });
      }
  }

  private _handleTouchMove = (e: Event) => {
      // If we are currently interacting (long-press active) or dragging a slider
      if (this._interacting || this._activeSlider) {
          // Forcefully prevent scrolling
          if (e.cancelable) {
              e.preventDefault();
          }
      }
  }

  private _updateLayout(width: number, height: number) {
      if (height < 100) {
          this._layout = 'compact';
      } else if (height < 200 && width >= 400) {
          this._layout = 'medium';
      } else if (height < 200) {
          this._layout = 'small';
      } else {
          this._layout = 'large';
      }
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

  private _toggleLight(e?: Event) {
    if (e) e.stopPropagation();
    this.hass.callService('light', 'toggle', {
      entity_id: this.config.entity
    });
  }


  private _lastClick = 0;

  private _handlePointerDown(e: PointerEvent) {
    // Ignore if clicking buttons or controls
    const path = e.composedPath();
    for (const el of path) {
      if ((el as HTMLElement).classList?.contains('control-btn') || 
          (el as HTMLElement).classList?.contains('icon-container') ||
          (el as HTMLElement).classList?.contains('slider-control')) {
        return;
      }
    }
    
    // Check for double click/tap
    const now = Date.now();
    if (now - this._lastClick < 300) {
        // Double Tap
        if (this._layout === 'compact' && this.config.covers && this.config.covers.length > 0) {
             this._openMoreInfo(this.config.covers[0]);
             // Cancel interaction/long-press
             if (this._longPressTimer) clearTimeout(this._longPressTimer);
             this._pendingPointerId = null;
             return;
        }
    }
    this._lastClick = now;

    // Start long press detection
    this._pointerStartX = e.clientX;
    this._pointerStartY = e.clientY;
    this._pendingPointerId = e.pointerId;

    this._longPressTimer = window.setTimeout(() => {
        this._startInteraction();
    }, 500);
  }

  private _openMoreInfo(entityId: string) {
      const event = new CustomEvent('hass-more-info', {
        detail: { entityId },
        bubbles: true,
        composed: true
      });
      this.dispatchEvent(event);
  }

  private _startInteraction() {
     this._longPressTimer = null;

     // Mode Check: 'compact' and 'small' DO NOT support 2D drag
     // Instead, they open more-info
     if (this._layout === 'compact' || this._layout === 'small') {
         this._openMoreInfo(this.config.entity);
         this._pendingPointerId = null;
         return;
     }
     
     const card = this.shadowRoot?.querySelector('ha-card');
     if (card) {
        const rect = card.getBoundingClientRect();
        this._cursorPos = {
            x: this._pointerStartX - rect.left,
            y: this._pointerStartY - rect.top
        };
     }
     
     this._interacting = true;
     
     // Haptic feedback
     if (navigator.vibrate) navigator.vibrate(50);
     
     if (card && this._pendingPointerId !== null) {
         try {
             card.setPointerCapture(this._pendingPointerId);
         } catch (e) {
             // Ignore capture errors
         }
     }
  }

  private _handlePointerUp(e: PointerEvent) {
    if (this._activeSlider) {
        const { entityId, type, currentVal } = this._activeSlider;
        this._activeSlider = null;
        const target = e.target as HTMLElement;
        if (target && target.releasePointerCapture) {
             try {
                target.releasePointerCapture(e.pointerId);
             } catch (e) { /* ignore */ }
        }
        
        // Execute service call on release
        if (type === 'position') {
            this.hass.callService('cover', 'set_cover_position', {
                entity_id: entityId,
                position: currentVal
            });
        } else {
            this.hass.callService('cover', 'set_cover_tilt_position', {
                entity_id: entityId,
                tilt_position: currentVal
            });
        }
        
        this.requestUpdate();
        return;
    }

    if (this._longPressTimer) {
        clearTimeout(this._longPressTimer);
        this._longPressTimer = null;
        
        // If it was a clean tap (pointerup, not cancel), toggle
        if (e.type === 'pointerup') {
             this._toggleLight();
        }
        this._pendingPointerId = null;
        return;
    }

    if (!this._interacting) return;
    this._interacting = false;
    this._pendingPointerId = null;
    
    const card = this.shadowRoot?.querySelector('ha-card');
    if (card) {
      if (card.releasePointerCapture) {
          try {
            card.releasePointerCapture(e.pointerId);
          } catch (e) { /* ignore */ }
      }
      // Only apply if it wasn't a cancel
      if (e.type === 'pointerup') {
          this._applyLightState(e, card);
      }
    }
  }

  private _handlePointerMove(e: PointerEvent) {
    if (this._activeSlider) {
        this._handleSliderMove(e);
        return;
    }

    if (this._longPressTimer) {
        // Check if moved too far -> Cancel long press
        const dist = Math.sqrt(
            Math.pow(e.clientX - this._pointerStartX, 2) + 
            Math.pow(e.clientY - this._pointerStartY, 2)
        );
        if (dist > 5) { // Strict checking
            clearTimeout(this._longPressTimer);
            this._longPressTimer = null;
            this._pendingPointerId = null;
        }
        return;
    }

    if (!this._interacting) return;
    
    // Crucial: Prevent scrolling while interacting
    e.preventDefault();
    e.stopPropagation();

    // Update cursor position
    const card = this.shadowRoot?.querySelector('ha-card');
    if (card) {
        const rect = card.getBoundingClientRect();
        this._cursorPos = {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };
    }
  }

  private _handleSliderDown(e: PointerEvent, entityId: string, type: 'position' | 'tilt', currentVal: number) {
      e.stopPropagation();
      const target = e.currentTarget as HTMLElement;
      this._activeSlider = { 
          entityId, 
          type, 
          startX: e.clientX, 
          startVal: currentVal,
          currentVal: currentVal
      };
      
      target.setPointerCapture(e.pointerId);
  }

  private _handleSliderMove(e: PointerEvent) {
      if (!this._activeSlider) return;
      
      const target = e.target as HTMLElement;
      const slider = target.closest('.slider-control') as HTMLElement;
      if (slider) {
          this._processSliderMove(e, slider);
      }
  }

  private _processSliderMove(e: PointerEvent, slider: HTMLElement) {
      const rect = slider.getBoundingClientRect();
      const { startX, startVal } = this._activeSlider!;
      
      const deltaPixels = e.clientX - startX;
      
      // Map pixels to % 
      // Available track width is rect.width
      // But visual constraints: 
      // 0% -> handle at left: 4px
      // 100% -> handle at right: rect.width - handleWidth - 4px
      
      // Let's stick to simple % logic but constrain visual. 
      // 1% of value = 1% of width?
      const deltaPercent = (deltaPixels / rect.width) * 100;
      
      let newVal = Math.max(0, Math.min(100, Math.round(startVal + deltaPercent)));
      
      // Apply deadzone for 0/100
      if (newVal < 5) newVal = 0;
      if (newVal > 95) newVal = 100;

      // Update local state for rendering
      this._activeSlider!.currentVal = newVal;
      this.requestUpdate();
  }

  private _applyLightState(e: PointerEvent, card: Element) {
    const rect = card.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));

    const stateObj = this.hass.states[this.config.entity];
    if (!stateObj) return;

    // Y -> Brightness (Up=100%, Down=0%)
    let brightnessPct = Math.round((1 - y) * 100);

    // Snap to edges (10% threshold)
    if (brightnessPct > 90) brightnessPct = 100;
    if (brightnessPct < 15) brightnessPct = 0; // Slightly larger zone for OFF

    // X -> Color Temp (Left=Cold/MinMireds, Right=Warm/MaxMireds)
    const minMireds = stateObj.attributes.min_mireds || 153;
    const maxMireds = stateObj.attributes.max_mireds || 500;
    const colorTemp = Math.round(minMireds + (x * (maxMireds - minMireds)));

    if (brightnessPct === 0) {
        this.hass.callService('light', 'turn_off', {
            entity_id: this.config.entity
        });
        return;
    }

    const serviceData: any = {
      entity_id: this.config.entity,
      brightness_pct: brightnessPct
    };

    // Only apply color temp if supported
    // Check if bit 2 (color_temp) is supported or color_mode says so. 
    // Assuming if min_mireds is present, it supports it.
    if (stateObj.attributes.min_mireds) {
        serviceData.color_temp = colorTemp;
    }

    this.hass.callService('light', 'turn_on', serviceData);
  }

  // Not used yet, contextmenu is preferred for long press on web
  // private _handleCoverHold(e: Event, entityId: string) {
  //     if (this._layout === 'small') {
  //         e.preventDefault();
  //         e.stopPropagation();
  //         this._openMoreInfo(entityId);
  //     }
  // }

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

    const layoutClass = this._layout || 'large';

    return html`
      <ha-card 
        class="${layoutClass}"
        style="${bgStyle}"
        @pointerdown=${this._handlePointerDown}
        @pointerup=${this._handlePointerUp}
        @pointercancel=${this._handlePointerUp}
        @pointermove=${this._handlePointerMove}
      >
        <!-- LAYOUT CONTAINER -->
        <div class="layout-container ${layoutClass}">
            
            <div class="content" style="opacity: ${this._interacting ? '0' : '1'}; transition: opacity 0.2s">
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

                <!-- COVERS (Hidden in compact) -->
                ${covers.length > 0 && layoutClass !== 'compact' ? html`
                    <div class="covers-section" @pointerdown=${(e: Event) => e.stopPropagation()}>
                        ${covers.map((cover: string) => this._renderCover(cover))}
                    </div>
                ` : ''}
            </div>
        </div>

        <!-- 2D INTERACTION CURSOR -->
        <div class="cursor" 
             style="
                opacity: ${this._interacting ? '1' : '0'};
                transform: translate(${this._cursorPos.x - 20}px, ${this._cursorPos.y - 20}px);
             "
        ></div>
      </ha-card>
    `;
  }

  private _renderCover(entityId: string) {
      const stateObj = this.hass.states[entityId];
      if (!stateObj) return html``;
      
      // Check for Tilt support (Bit 7 = 128)
      const supportsTilt = (stateObj.attributes.supported_features & 128) === 128;
      
      let position = typeof stateObj.attributes.current_position === 'number' ? stateObj.attributes.current_position : 0;
      let tilt = typeof stateObj.attributes.current_tilt_position === 'number' ? stateObj.attributes.current_tilt_position : 0;

      // Override with active slider value if dragging
      if (this._activeSlider && this._activeSlider.entityId === entityId) {
          if (this._activeSlider.type === 'position') {
              position = this._activeSlider.currentVal;
          } else if (this._activeSlider.type === 'tilt') {
              tilt = this._activeSlider.currentVal;
          }
      }

      // Add context menu listener for "Small" layout long-press
      const contextHandler = (e: Event) => {
          if (this._layout === 'small') {
              e.preventDefault();
              this._openMoreInfo(entityId);
          }
      };

      return html`
        <div class="cover-row" @contextmenu=${contextHandler}>
            <div class="cover-info">
                <ha-icon icon="${stateObj.attributes.icon || 'mdi:window-shutter'}"></ha-icon>
            </div>
            <div class="cover-sliders">
                <!-- Position Slider -->
                <div class="slider-control" 
                     @pointerdown=${(e: PointerEvent) => this._handleSliderDown(e, entityId, 'position', position)}
                >
                     <div class="slider-fill" style="width: calc((100% - 50px) * ${position / 100} + 46px)"></div>
                     <div class="slider-handle" style="left: calc((100% - 42px - 8px) * ${position / 100} + 4px)"></div>
                     <div class="slider-label">Pos: ${position}%</div>
                </div>

                <!-- Tilt Slider -->
                ${supportsTilt ? html`
                <div class="slider-control" 
                     @pointerdown=${(e: PointerEvent) => this._handleSliderDown(e, entityId, 'tilt', tilt)}
                >
                     <div class="slider-fill" style="width: calc((100% - 50px) * ${tilt / 100} + 46px)"></div>
                     <div class="slider-handle" style="left: calc((100% - 42px - 8px) * ${tilt / 100} + 4px)"></div>
                     <div class="slider-label">Tilt: ${tilt}%</div>
                </div>
                ` : ''}
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
        /* padding: 16px; handled by layout container now */
        user-select: none;
        position: relative;
        cursor: grab;
        /* Ensure minimum height for controls */
        /* min-height: 150px; Dynamic now */
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
      }
      ha-card.compact {
          min-height: 50px;
          cursor: pointer;
      }
      ha-card.small {
          min-height: 120px;
      }

      .layout-container {
         padding: 16px;
         width: 100%;
         height: 100%;
         box-sizing: border-box;
         display: flex;
         flex-direction: column;
      }
      
      .layout-container.medium {
          flex-direction: row;
          align-items: center;
          gap: 24px;
      }

      ha-card:active {
        cursor: grabbing;
      }
      .content {
        display: flex;
        flex-direction: column;
        height: 100%;
        justify-content: space-between;
        gap: 20px;
        pointer-events: none; /* Allow events to pass through wrapper, but children re-enable if needed */
        flex: 1;
      }
      .layout-container.medium .content {
          flex-direction: row;
          gap: 24px;
          justify-content: flex-start;
          align-items: center;
      }

      .content > * {
         pointer-events: auto;
      }
      
      /* HEADER */
      .header {
        display: flex;
        align-items: center;
        gap: 16px;
        flex: 1; /* Take remaining space so covers stay at bottom */
      }
      /* In medium layout, header doesn't need to flex-grow heavily if side-by-side */
      .layout-container.medium .header {
          flex: 0 0 auto;
          min-width: 200px;
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

      /* CURSOR */
      .cursor {
        position: absolute;
        top: 0; 
        left: 0;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        border: 2px solid rgba(255,255,255,0.8);
        background: rgba(255,255,255,0.2);
        box-shadow: 0 0 10px rgba(0,0,0,0.3);
        pointer-events: none;
        transition: opacity 0.2s;
        will-change: transform;
        z-index: 10;
        /* -20px to center on finger (done in transform) */
        /* But due to finger blocking view, usually users prefer cursor slightly above finger */
        /* I used -45px for Y in the render method to show it above the finger */
      }

      /* COVERS */
      .covers-section {
        display: flex;
        flex-direction: column;
        gap: 8px;
        border-top: 1px solid rgba(255,255,255,0.1);
        padding-top: 12px;
        /* Ensure distinct visual area */
        background: rgba(0,0,0,0.2);
        margin: -16px;
        margin-top: 0;
        padding: 16px;
        padding-top: 12px;
        backdrop-filter: blur(10px);
      }
      /* In medium layout, covers are on the side, remove top border/margins */
      .layout-container.medium .covers-section {
         border-top: none;
         margin: 0;
         background: none;
         backdrop-filter: none;
         padding: 0;
         flex: 1;
         justify-content: center;
      }

      .cover-row {
        display: flex;
        align-items: center;
        gap: 12px;
        /* Removed background for row, using slider backgrounds */
      }
      .cover-info {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 32px;
      }
      .cover-sliders {
          flex: 1;
          display: flex;
          flex-direction: row;
          gap: 12px;
      }
      
      .slider-control {
          position: relative;
          height: 50px; /* Match vacuum card (42px handle + 4px top/bottom) */
          border-radius: 12px;
          background: rgba(0,0,0,0.3); /* Dark track */
          box-shadow: inset 0 1px 3px rgba(0,0,0,0.15); /* Pressed in */
          cursor: pointer; /* Click allowed, implemented relative drag */
          touch-action: none;
          flex: 1;
          display: flex;
          align-items: center;
          /* No padding, we absolute position handle */
          overflow: hidden; /* Contain fill */
      }
      .slider-control:active {
          cursor: grabbing;
      }
      /* Remove slider-track border since we use background */
      .slider-track {
          display: none; 
      }
      .slider-fill {
          position: absolute;
          top: 0; left: 0; bottom: 0;
          background: linear-gradient(to right, rgba(255,255,255,0.25) calc(100% - 42px), rgba(255,255,255,0) 100%);
          border-radius: 12px 0 0 12px;
          pointer-events: none;
      }
      .slider-handle {
          position: absolute;
          top: 4px;
          bottom: 4px;
          width: 42px; /* Fixed width */
          
          /* Glass Style */
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(4px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          pointer-events: none;
          z-index: 2;
          
          /* Centering Icon if we added one later */
          display: flex;
          align-items: center;
          justify-content: center;
      }
      .slider-label {
          position: absolute;
          left: 0; right: 0;
          text-align: center;
          font-size: 0.8rem;
          font-weight: 600;
          color: rgba(255,255,255,0.8);
          pointer-events: none;
          z-index: 3; /* Above handle */
          text-shadow: 0 1px 2px black;
      }

      .header, .content {
          text-shadow: 0 1px 3px rgba(0,0,0,0.6);
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
