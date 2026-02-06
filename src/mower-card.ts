/**
 * Mower Card
 * @version 0.2.0
 */

import { LitElement, html, css, PropertyValues } from 'lit';
import type {
  HomeAssistant,
  MowerCardConfig,
} from './types';

const CARD_VERSION = "0.2.0";

console.info(
  `%c MOWER-CARD %c ${CARD_VERSION} `,
  'color: white; background: #673ab7; font-weight: 700;',
  'color: #673ab7; background: white; font-weight: 700;'
);

export class MowerCard extends LitElement {
  hass!: HomeAssistant;
  config!: MowerCardConfig;

  // Internal state for dragging
  private _tempTime: { hour: number; minute: number } | null = null;
  private _touchStartState: { hour: number; minute: number } | null = null;
  
  // Auto-discovery state
  private _discoveredBatteryEntity: string | null = null;
  private _discoveredRoomEntity: string | null = null;
  private _deviceAreaName: string | null = null;
  private _discoveryAttempted: boolean = false;

  // Swipe Slider State
  private _swipeOffset: number = 0;
  private _isSwiping: boolean = false;
  private _swipeStartX: number = 0;
  private _isTriggered: boolean = false;
  
  // Responsive State
  private _resizeObserver?: ResizeObserver;
  private _isCompact: boolean = false;
  private _isShort: boolean = false;
  private _isTiny: boolean = false;

  static get properties() {
    return {
      hass: { attribute: false },
      config: { state: true },
      _tempTime: { state: true }, // Reactive internal state
      _discoveredBatteryEntity: { state: true },
      _discoveredRoomEntity: { state: true },
      _deviceAreaName: { state: true },
      _swipeOffset: { state: true },
      _isCompact: { state: true },
      _isShort: { state: true },
      _isTiny: { state: true },
      _isTriggered: { state: true }
    };
  }
  
  public connectedCallback() {
      super.connectedCallback();
      this._resizeObserver = new ResizeObserver(entries => {
          for (const entry of entries) {
              const width = entry.contentRect.width;
              const height = entry.contentRect.height;
              // Thresholds
              this._isCompact = width < 300;
              this._isShort = height < 200;
              this._isTiny = height < 100;
          }
      });
      this._resizeObserver.observe(this);
  }
  
  public disconnectedCallback() {
      if (this._resizeObserver) {
          this._resizeObserver.disconnect();
      }
      super.disconnectedCallback();
  }

  // Input handling (Touch + Mouse)
  private _inputStartY: number = 0;
  private _inputTargetString: 'hour' | 'minute' | null = null;
  private _isDragging: boolean = false;

  static getStubConfig() {
    return {
      type: "custom:slick-mower-card",
      entity: "lawn_mower.smart_mower",
      start_button_entity: "input_button.start_mowing",
      automation_entity: "automation.mowing_schedule",
      schedule_time_entity: "input_datetime.mower_start_time"
    };
  }

  static getConfigElement() {
    return document.createElement("slick-mower-card-editor");
  }

  setConfig(config: MowerCardConfig) {
    if (!config) throw new Error("Invalid configuration");
    if (!config.entity) throw new Error("Entity is required");
    
    // Reset discovery if entity changes
    if (this.config && this.config.entity !== config.entity) {
        this._discoveredBatteryEntity = null;
        this._discoveredRoomEntity = null;
        this._deviceAreaName = null;
        this._discoveryAttempted = false;
    }
    
    this.config = config;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected shouldUpdate(_changedProps: PropertyValues): boolean {
    if (!this.config || !this.hass) return false;
    return true; 
  }
  
  updated(changedProps: PropertyValues) {
    super.updated(changedProps);
    if ((!this._discoveredBatteryEntity || !this._discoveredRoomEntity || !this._deviceAreaName) && !this._discoveryAttempted && this.hass && this.config?.entity) {
        this._discoveryAttempted = true;
        this._fetchRelatedEntities();
    }
  }

  private async _fetchRelatedEntities() {
    try {
      // 1. Find device for this entity
      const relatedDev = await this.hass.callWS<{ device?: string[] }>({
        type: 'search/related',
        item_type: 'entity',
        item_id: this.config.entity
      });
      
      if (!relatedDev || !relatedDev.device || relatedDev.device.length === 0) return;
      const deviceId = relatedDev.device[0];
      
      // 1b. Fetch Device/Area Info
      if (this.hass.devices && this.hass.areas) {
          const device = this.hass.devices[deviceId];
          if (device && device.area_id) {
               const area = this.hass.areas[device.area_id];
               if (area && area.name) {
                   this._deviceAreaName = area.name;
                   console.debug('MowerCard: Discovered device area', this._deviceAreaName);
               }
          }
      }

      // 2. Find entities for this device
      const relatedEnt = await this.hass.callWS<{ entity?: string[] }>({
        type: 'search/related',
        item_type: 'device',
        item_id: deviceId
      });
      
      if (!relatedEnt || !relatedEnt.entity) return;

      const entities = relatedEnt.entity;

      // 3. Find battery sensor
      if (!this._discoveredBatteryEntity) {
          const battCandidates = entities.filter(id => {
             const s = this.hass.states[id];
             if (!id.startsWith('sensor.')) return false; 
             if (!s) return false;
             if (s.attributes.device_class === 'battery') return true;
             if (id.includes('battery')) return true;
             return false;
          });

          if (battCandidates.length > 0) {
              const best = battCandidates.find(id => this.hass.states[id].attributes.device_class === 'battery') || battCandidates[0];
              this._discoveredBatteryEntity = best;
              console.debug('MowerCard: Discovered battery entity', best);
          }
      }

      // 4. Find zone/lawn sensor (equivalent to room)
      if (!this._discoveredRoomEntity) {
           const roomCandidates = entities.filter(id => {
              const s = this.hass.states[id];
              if (!id.startsWith('sensor.')) return false;
              if (!s) return false;
              const idLower = id.toLowerCase();
              return idLower.includes('zone') || idLower.includes('lawn') || idLower.includes('rasen') || idLower.includes('area');
           });
           
           if (roomCandidates.length > 0) {
               this._discoveredRoomEntity = roomCandidates[0];
               console.debug('MowerCard: Discovered zone entity', this._discoveredRoomEntity);
           }
      }

    } catch (e) {
      console.warn('MowerCard: Error discovering related entities', e);
    }
  }

  // Helper to check action mode
  private _getActionMode(): 'start' | 'return' | 'none' {
    const mower = this.hass.states[this.config.entity];
    if (!mower) return 'none';
    
    // Mowing or Paused -> Return
    if (['mowing', 'error', 'paused'].includes(mower.state)) {
        return 'return';
    }

    // Docked -> Start (either via button or default action)
    if (mower.state === 'docked' || mower.state === 'idle') {
         return 'start';
    }

    return 'none';
  }

  private _checkAutomationButtonVisibility(): boolean {
    if (!this.config.automation_entity) return false;
    return true; 
  }

  private _handleStartMowing(e?: Event) {
    if (e) e.stopPropagation();
    if (this.config.start_button_entity) {
      this.hass.callService('input_button', 'press', { 
        entity_id: this.config.start_button_entity 
      });
    } else {
      // Fallback: Try lawn_mower first, then vacuum
      if (this.config.entity.startsWith('lawn_mower.')) {
         this.hass.callService('lawn_mower', 'start_mowing', { 
            entity_id: this.config.entity 
         });
      } else {
         this.hass.callService('vacuum', 'start', { 
            entity_id: this.config.entity 
         });
      }
    }
  }

  private _handleReturnHome(e?: Event) {
      if (e) e.stopPropagation();
      if (this.config.entity.startsWith('lawn_mower.')) {
         this.hass.callService('lawn_mower', 'dock', {
             entity_id: this.config.entity
         });
      } else {
         this.hass.callService('vacuum', 'return_to_base', {
             entity_id: this.config.entity
         });
      }
  }
  
  private _handleMoreInfo(e: Event) {
      const path = e.composedPath();
      // Check if click was inside ".actions"
      const inActions = path.some(el => (el as HTMLElement).classList && (el as HTMLElement).classList.contains('actions'));
      if (inActions) return;

      const event = new CustomEvent("hass-more-info", {
          detail: { entityId: this.config.entity },
          bubbles: true,
          composed: true,
      });
      this.dispatchEvent(event);
  }

  private _handleToggleAutomation(e?: Event) {
    if (e) e.stopPropagation();
    if (this.config.automation_entity) {
      this.hass.callService('automation', 'toggle', { 
        entity_id: this.config.automation_entity 
      });
    }
  }

  private _getDateTimeParts(): { hour: number; minute: number } | null {
      if (!this.config.schedule_time_entity) return null;
      const entity = this.hass.states[this.config.schedule_time_entity];
      if (!entity) return null;

      let { hour, minute } = entity.attributes;
      if (hour === undefined || minute === undefined) {
        const parts = entity.state.split(':');
        if (parts.length >= 2) {
          hour = parseInt(parts[0]);
          minute = parseInt(parts[1]);
        } else {
          return null;
        }
      }
      return { hour, minute };
  }

  private _onInputStart(e: PointerEvent, type: 'hour' | 'minute') {
    // Only left mouse button or touch
    if (e.button !== 0 && e.buttons !== 1) return;
    
    const target = e.currentTarget as HTMLElement;
    target.setPointerCapture(e.pointerId);

    this._isDragging = true;
    this._inputStartY = e.clientY;
    this._inputTargetString = type;
    
    // Capture current start state
    const current = this._getDateTimeParts();
    if (current) {
        this._touchStartState = current;
        this._tempTime = { ...current }; // Start temp tracking
    }
  }

  private _onInputMove(e: PointerEvent) {
      if (!this._isDragging || !this._inputTargetString || !this._touchStartState || !this._tempTime) return;

      e.preventDefault(); // Stop scrolling/selection
      
      const currentY = e.clientY;
      const diff = this._inputStartY - currentY; // Positive = UP
      
      // Sensitivity: 1 unit per 15px
      const sensitivity = 15;
      const delta = Math.round(diff / sensitivity);
      
      if (delta === 0) return;

      if (this._inputTargetString === 'hour') {
          // Calculate relative to START state, not cumulative
          let newHour = (this._touchStartState.hour + delta) % 24;
          if (newHour < 0) newHour += 24;
          this._tempTime = { ...this._tempTime, hour: newHour };
      } else {
          let newMinute = (this._touchStartState.minute + delta) % 60;
          if (newMinute < 0) newMinute += 60;
          this._tempTime = { ...this._tempTime, minute: newMinute };
      }
  }

  private _onInputEnd(e: PointerEvent) {
    if (!this._isDragging) return;

    this._isDragging = false;
    const target = e.currentTarget as HTMLElement;
    target.releasePointerCapture(e.pointerId);

    if (!this._inputTargetString || !this._tempTime) {
         this._cleanupInput();
         return;
    }
    
    // Commit changes
    const { hour, minute } = this._tempTime;
    const timeStr = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}:00`;
    
    this.hass.callService('input_datetime', 'set_datetime', {
      entity_id: this.config.schedule_time_entity,
      time: timeStr
    });
    
    this._cleanupInput();
  }

  private _cleanupInput() {
    this._inputTargetString = null;
    this._tempTime = null;
    this._touchStartState = null;
  }

  // --- SWIPE LOGIC ---
  private _onSwipeStart(e: PointerEvent) {
      if (e.button !== 0 && e.buttons !== 1) return;
      const target = e.currentTarget as HTMLElement;
      target.setPointerCapture(e.pointerId);
      
      this._isSwiping = true;
      this._swipeStartX = e.clientX;
      this._swipeOffset = 0;
  }
  
  private _onSwipeMove(e: PointerEvent) {
      if (!this._isSwiping) return;
      
      const handle = e.currentTarget as HTMLElement;
      const container = handle.parentElement; 
      if (!container) return;
      
      const diff = e.clientX - this._swipeStartX;
      const maxSlide = container.clientWidth - handle.clientWidth - 8; // padding/margin
      
      const newOffset = Math.max(0, Math.min(diff, maxSlide));
      this._swipeOffset = newOffset;
  }
  
  private _onSwipeEnd(e: PointerEvent) {
      if (!this._isSwiping) return;
      this._isSwiping = false;
      
      const handle = e.currentTarget as HTMLElement;
      handle.releasePointerCapture(e.pointerId);
      const container = handle.parentElement;
      
      if (container) {
          const maxSlide = container.clientWidth - handle.clientWidth - 8;
          // Trigger threshold: 90%
          if (this._swipeOffset > maxSlide * 0.9 && !this._isTriggered) {
              const mode = this._getActionMode();
              this._isTriggered = true; // Lock UI
              
              // Perform Action
              if (mode === 'start') {
                  this._handleStartMowing();
              } else if (mode === 'return') {
                  this._handleReturnHome();
              }
              
              // Haptic feedback
              if (navigator.vibrate) navigator.vibrate(50);
              
              // Reset trigger state after delay (fallback if entity state doesn't change)
              setTimeout(() => {
                  this._isTriggered = false;
                  this._swipeOffset = 0; 
              }, 4000);
          }
      }
      
      // Reset animation if not triggered, or visually snap back
      if (!this._isTriggered) {
          this._swipeOffset = 0;
      }
  }

  private _getStatusIcon(state: string) {
    switch (state) {
      case 'mowing': return 'mdi:robot-mower';
      case 'docked': return 'mdi:robot-mower-outline';
      case 'returning': return 'mdi:home-import-outline';
      case 'error': return 'mdi:alert-circle';
      case 'paused': return 'mdi:pause-circle';
      case 'idle': return 'mdi:robot-mower-outline';
      default: return 'mdi:robot-mower';
    }
  }

  private _getStatusLabel(state: string) {
    switch (state) {
      case 'mowing': return 'Mowing';
      case 'docked': return 'Docked';
      case 'returning': return 'Returning';
      case 'error': return 'Error';
      case 'paused': return 'Paused';
      case 'idle': return 'Idle';
      default: return state;
    }
  }

  render() {
    if (!this.config || !this.hass) return html``;

    const mower = this.hass.states[this.config.entity];
    if (!mower) return html`<div>Mower not found</div>`;

    const stateStr = mower.state;
    const attrs = mower.attributes;
    
    // Battery handling
    let battery: number | null = null;
    
    // 1. Discovered Entity (if configured not set)
    if (this._discoveredBatteryEntity) {
       const battEntity = this.hass.states[this._discoveredBatteryEntity];
       if (battEntity && !isNaN(parseFloat(battEntity.state))) {
          battery = Math.round(parseFloat(battEntity.state));
       }
    }
    
    // 2. Fallback: Check attributes battery_level or battery
    if (battery === null) {
        const val = attrs.battery_level !== undefined ? attrs.battery_level : attrs.battery;
        if (val !== undefined) {
             const parsed = parseFloat(val);
             if (!isNaN(parsed)) {
                 battery = Math.round(parsed);
             }
        }
    }

    let batteryIcon = 'mdi:battery-unknown';
    if (battery !== null) {
        if (battery >= 90) batteryIcon = 'mdi:battery';
        else if (battery >= 70) batteryIcon = 'mdi:battery-80';
        else if (battery >= 50) batteryIcon = 'mdi:battery-50';
        else if (battery >= 30) batteryIcon = 'mdi:battery-40';
        else batteryIcon = 'mdi:battery-20';
    }

    // Room/Zone info
    const stateLabel = this._getStatusLabel(stateStr);
    let zoneName: string | null = null;
    
    // Auto-discovered zone/lawn override
    if (this._discoveredRoomEntity) {
        const zoneState = this.hass.states[this._discoveredRoomEntity];
        if (zoneState && zoneState.state && zoneState.state !== 'unknown' && zoneState.state !== 'unavailable') {
             zoneName = zoneState.state;
        }
    }
    
    // Fallback: If no active zone, use Device Area
    if (!zoneName && this._deviceAreaName) {
        zoneName = this._deviceAreaName;
    }
    
    const cardTitle = attrs.friendly_name || this.config.entity;

    // Stats
    const area = attrs.mowed_area ? `${attrs.mowed_area} m²` : null;
    const time = attrs.mowing_time ? `${attrs.mowing_time} min` : null;
    // For Mowers, "mowed_area" might not be standard. Some use "activity_mowing_duration" or similar.
    // Using attributes if they exist.
    const stats = [area, time].filter(Boolean).join(' • ');

    // Time entity
    let hourStr = '--';
    let minuteStr = '--';

    if (this._tempTime) {
        // Use dragged value
        hourStr = this._tempTime.hour.toString().padStart(2, '0');
        minuteStr = this._tempTime.minute.toString().padStart(2, '0');
    } else {
        // Use default entity value
        const parts = this._getDateTimeParts();
        if (parts) {
            hourStr = parts.hour.toString().padStart(2, '0');
            minuteStr = parts.minute.toString().padStart(2, '0');
        }
    }
    
    const automationState = this.config.automation_entity ? this.hass.states[this.config.automation_entity]?.state : 'off';

    // Color Logic for Gradient
    // Top: Mowing/Returning (Green) vs Error (Red) vs Idle (Dark Greyish-Blue)
    let topColor = 'rgba(55, 71, 79, 0.25)'; // Dark Greyish-Blue (Idle, Docked, Paused, Unknown)
    
    if (['mowing', 'returning'].includes(stateStr)) {
        topColor = 'rgba(76, 175, 80, 0.25)'; // Green (Active) - Mowers are usually Green
    } else if (stateStr === 'error') {
        topColor = 'rgba(244, 67, 54, 0.25)'; // Red (Error)
    }

    // Bottom: Battery Level
    let bottomColor = 'rgba(158, 158, 158, 0.25)'; // Default Grey
    if (battery !== null) {
        if (battery >= 80) bottomColor = 'rgba(76, 175, 80, 0.25)'; // Green
        else if (battery >= 40) bottomColor = 'rgba(255, 193, 7, 0.25)'; // Yellow
        else bottomColor = 'rgba(244, 67, 54, 0.25)'; // Red
    }
    
    // Fallback background color if vars not set
    const fallbackBg = getComputedStyle(document.body).getPropertyValue('--ha-card-background') || '#fff';
    
    const actionMode = this._getActionMode();

    return html`
      <div class="mower-card-container ${this._isTiny ? 'tiny' : (this._isShort ? 'short' : '')}" 
           style="background: linear-gradient(to bottom, ${topColor} 0%, ${bottomColor} 100%), ${fallbackBg};"
           @click=${this._handleMoreInfo}>
        <div class="header">
          <div class="icon-container state-${stateStr}">
            <ha-icon icon="${this._getStatusIcon(stateStr)}"></ha-icon>
          </div>
          <div class="info">
             <div class="status">${cardTitle}</div>
             ${!this._isShort ? html`
                 <div class="room">${stateLabel} ${zoneName ? html`${zoneName}` : ''}</div>
                 <div class="battery">
                   ${battery !== null ? html`<ha-icon icon="${batteryIcon}"></ha-icon> ${battery}%` : ''} 
                   ${(!zoneName && attrs.fan_speed) ? `• ${attrs.fan_speed}` : ''}
                 </div>
                 ${stats ? html`<div class="stats">${stats}</div>` : ''}
             ` : html`
                 <!-- Short Mode: Condensed Info -->
                 <div class="room" style="font-size: 0.9rem; opacity: 0.8;">
                    ${stateLabel} 
                    ${battery !== null ? html` • ${battery}%` : ''}
                 </div>
             `}
          </div>
        </div>

        <div class="actions">
          ${actionMode !== 'none' && !this._isTriggered ? (this._isCompact ? html`
            <div class="action-btn ${actionMode === 'start' ? 'start-btn' : 'return-btn'}" 
                 @click=${actionMode === 'start' ? this._handleStartMowing : this._handleReturnHome}>
                <ha-icon icon="${actionMode === 'start' ? 'mdi:play' : 'mdi:home-import-outline'}"></ha-icon>
            </div>
          ` : html`
            <div class="swipe-slider ${actionMode === 'return' ? 'return-mode' : ''}">
               <div class="slide-track" style="opacity: ${Math.max(0, 1 - (this._swipeOffset / 150))}">
                   ${actionMode === 'start' ? 'Slide to Mow' : 'Slide to Return'}
               </div>
               <div class="slide-handle"
                    style="transform: translateX(${this._swipeOffset}px); opacity: ${Math.max(0.1, 1 - (this._swipeOffset / 250))}"
                    @pointerdown=${this._onSwipeStart}
                    @pointermove=${this._onSwipeMove}
                    @pointerup=${this._onSwipeEnd}
                    @pointercancel=${this._onSwipeEnd}>
                  <ha-icon icon="${actionMode === 'start' ? 'mdi:arrow-right' : 'mdi:arrow-right'}"></ha-icon>
               </div>
             </div>
          `) : ''}
          
          ${this._isTriggered ? html`
             <div class="swipe-slider triggered">
                 <div class="dots-loader">
                    <div class="dot"></div>
                    <div class="dot"></div>
                    <div class="dot"></div>
                 </div>
             </div>
          ` : ''}

          ${this.config.schedule_time_entity && !this._isShort ? html`
            <div class="time-picker">
              <div class="time-label">SCHEDULE</div>
              <div class="time-values">
                <div class="time-inputs">
                    <div class="time-column" 
                         @pointerdown=${(e: PointerEvent) => this._onInputStart(e, 'hour')}
                         @pointermove=${(e: PointerEvent) => this._onInputMove(e)}
                         @pointerup=${(e: PointerEvent) => this._onInputEnd(e)}
                         @pointercancel=${(e: PointerEvent) => this._onInputEnd(e)}>
                      ${hourStr}
                    </div>
                    <div class="time-sep">:</div>
                    <div class="time-column"
                         @pointerdown=${(e: PointerEvent) => this._onInputStart(e, 'minute')}
                         @pointermove=${(e: PointerEvent) => this._onInputMove(e)}
                         @pointerup=${(e: PointerEvent) => this._onInputEnd(e)}
                         @pointercancel=${(e: PointerEvent) => this._onInputEnd(e)}>
                      ${minuteStr}
                    </div>
                </div>

                ${this._checkAutomationButtonVisibility() ? html`
                    <div class="sparkle-btn ${automationState === 'on' ? 'active' : ''}" 
                         @click=${this._handleToggleAutomation}>
                       <ha-icon icon="mdi:auto-fix"></ha-icon>
                    </div>
                 ` : ''}
              </div>
            </div>
          ` : ''}
        </div>
      </div>
    `;
  }

  static styles = css`
    :host {
      display: block;
      height: 100%;
      /* Host acts as a container but visual styles move to inner div for gradient control */
    }

    .mower-card-container {
      background: var(--ha-card-background, var(--card-background-color, #fff));
      box-shadow: var(--ha-card-box-shadow, 0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12));
      border-radius: var(--ha-card-border-radius, 12px);
      color: var(--primary-text-color);
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 8px; /* Reduced from 16px for better default fit */
      height: 100%;
      box-sizing: border-box;
      cursor: pointer;
      justify-content: space-between;
      overflow: hidden; /* Ensure content doesn't bleed */
    }

    .mower-card-container.short {
        padding: 8px 12px;
        gap: 4px;
    }
    
    .mower-card-container.short .header {
        gap: 8px;
    }

    /* Tiny Mode (1-row) */
    .mower-card-container.tiny {
        flex-direction: row;
        align-items: center;
        padding: 0 12px;
        gap: 12px;
    }

    .mower-card-container.tiny .header {
        gap: 12px;
        margin: 0;
        min-height: 0;
        flex: 1;
    }

    .mower-card-container.tiny .icon-container {
        width: 32px;
        height: 32px;
    }
    
    .mower-card-container.tiny .icon-container ha-icon {
        --mdc-icon-size: 18px;
    }

    .mower-card-container.tiny .info {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .mower-card-container.tiny .status {
        font-size: 0.9rem;
        line-height: 1.1;
    }

    .mower-card-container.tiny .room {
        font-size: 0.75rem;
        line-height: 1.1;
        opacity: 0.8;
    }
    
    .mower-card-container.tiny .actions {
        /* Allow expansion for slider, but minimal for button */
        flex: 1 0 auto;
        display: flex;
        justify-content: flex-end;
        margin-left: 12px;
        min-width: 0;
    }

    .mower-card-container.tiny .swipe-slider {
        height: 36px;
        font-size: 0.9rem;
    }

    .mower-card-container.tiny .action-btn {
        width: 32px; /* Small circle button */
        height: 32px;
        margin: 0;
        padding: 0;
        border-radius: 50%;
        flex: 0 0 32px; /* Rigid width */
    }

    .mower-card-container.short .action-btn {
        height: 32px;
        min-height: 32px;
    }

    .mower-card-container.short .icon-container {
        width: 36px;
        height: 36px;
    }
    
    .mower-card-container.short .status {
        font-size: 1rem;
    }
    
    .actions {
        cursor: default;
        flex-shrink: 0; /* Prevent crushing actions */
    }

    .header {
      display: flex;
      align-items: center;
      gap: 16px;
      min-height: 0; /* Allow shrinking */
      flex: 1;
    }

    .icon-container {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background: rgba(var(--rgb-primary-text-color), 0.05);
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--paper-item-icon-color, #4CAF50); /* Green for mower default */
    }
    
    .icon-container ha-icon {
        --mdc-icon-size: 24px;
    }
    
    .icon-container.state-mowing {
      background: rgba(76, 175, 80, 0.2); /* Green */
      color: #4CAF50;
      animation: pulse 2s infinite;
    }

    .icon-container.state-error {
      background: rgba(var(--error-color, #db4437), 0.2);
      color: var(--error-color, #db4437);
    }

    .info {
      flex: 1;
      min-width: 0; 
    }

    .status {
      font-size: 1.2rem;
      font-weight: 500;
      line-height: 1.4;
      white-space: nowrap; 
      overflow: hidden; 
      text-overflow: ellipsis;
    }

    .room {
      font-size: 1rem;
      font-weight: 500;
      opacity: 0.9;
      line-height: 1.2;
      white-space: nowrap; 
      overflow: hidden; 
      text-overflow: ellipsis;
    }

    .battery {
      font-size: 0.9rem;
      opacity: 0.7;
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .stats {
      font-size: 0.9rem;
      opacity: 0.7;
      margin-top: 4px;
    }
    
    .battery ha-icon {
        --mdc-icon-size: 16px;
    }

    .actions {
      display: flex;
      gap: 12px;
      align-items: center;
      justify-content: space-between; /* Spread them out */
    }
    
    .action-btn {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: rgba(var(--rgb-primary-text-color), 0.05);
      border-radius: 12px; /* Match others */
      padding: 0 16px;
      cursor: pointer;
      height: 50px; /* Match slider */
      transition: background 0.2s;
      margin-right: 8px;
      flex: 1;
    }

    .start-btn {
       color: var(--primary-text-color);
       background: rgba(var(--rgb-primary-text-color), 0.05); /* Glassy Grey */
       backdrop-filter: blur(5px);
       border: 1px solid rgba(255,255,255,0.1);
       box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    }
    
    .start-btn:active {
       background: rgba(var(--rgb-primary-text-color), 0.1);
       box-shadow: inset 0 2px 4px rgba(0,0,0,0.1);
       transform: translateY(1px);
    }
    
    .return-btn {
       color: var(--primary-text-color);
       background: rgba(var(--rgb-primary-text-color), 0.05); /* Glassy Grey */
       backdrop-filter: blur(5px);
       border: 1px solid rgba(255,255,255,0.1);
       box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    }
    
    .return-btn:active {
       background: rgba(var(--rgb-primary-text-color), 0.1);
       box-shadow: inset 0 2px 4px rgba(0,0,0,0.1);
       transform: translateY(1px);
    }

    .swipe-slider {
        position: relative;
        height: 50px;
        background: rgba(0,0,0,0.1); 
        box-shadow: inset 0 1px 3px rgba(0,0,0,0.15); /* Pressed in track */
        border-radius: 12px;
        overflow: hidden;
        flex: 1; 
        display: flex;
        align-items: center;
        backdrop-filter: blur(5px);
        margin-right: 8px; /* gap with time picker */
        transition: background 0.2s;
    }
    
    .swipe-slider.triggered {
        justify-content: center;
        opacity: 0.9;
    }
    
    .swipe-slider.return-mode {
        background: rgba(0,0,0,0.15); /* Slightly darker/visible for return */
        box-shadow: inset 0 1px 3px rgba(0,0,0,0.15);
    }
    
    /* Ensure handle override is removed or neutral so it matches default glass style */
    .swipe-slider.return-mode .slide-handle {
        /* No specific override needed if we use the same glass style */
    }

    .slide-track {
        width: 100%;
        text-align: center;
        color: var(--secondary-text-color);
        font-size: 0.9rem;
        font-weight: 500;
        letter-spacing: 0.5px;
        pointer-events: none;
        user-select: none;
        opacity: 0.8;
        padding-left: 42px; /* Offset for handle start pos */
        transition: opacity 0.1s;
    }

    .slide-handle {
        position: absolute;
        left: 4px;
        top: 4px;
        bottom: 4px;
        width: 42px;
        
        /* Glass Style */
        background: rgba(255, 255, 255, 0.15);
        backdrop-filter: blur(4px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--primary-text-color); 
        cursor: grab;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        touch-action: none; 
        z-index: 2;
    }
    
    .slide-handle:active {
        cursor: grabbing;
        background: rgba(255, 255, 255, 0.25);
        box-shadow: 0 1px 2px rgba(0,0,0,0.1);
    }
    
    .dots-loader {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 6px;
        width: 100%;
        height: 100%;
    }
    
    .dot {
        width: 8px;
        height: 8px;
        background: var(--primary-text-color);
        border-radius: 50%;
        opacity: 0;
        animation: rush-in-out 1.5s infinite ease-in-out;
    }
    
    .dot:nth-child(2) { animation-delay: 0.2s; }
    .dot:nth-child(3) { animation-delay: 0.4s; }
    
    @keyframes rush-in-out {
        0% {
            opacity: 0;
            transform: translateX(-15px) scale(0.5);
        }
        20% {
            opacity: 1;
            transform: translateX(0) scale(1);
        }
        60% {
             opacity: 1;
             transform: translateX(5px) scale(1); /* Wait/Slow move */
        }
        100% {
            opacity: 0;
            transform: translateX(20px) scale(0.5);
        }
    }

    .time-picker {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: rgba(var(--rgb-primary-text-color), 0.15);
      border-radius: 12px;
      padding: 4px 8px; 
      user-select: none;
      backdrop-filter: blur(4px);
      min-width: 90px;
      height: 50px; /* Match slider height */
      box-sizing: border-box;
      margin-left: auto;
    }

    .time-label {
        font-size: 0.6rem;
        text-transform: uppercase;
        opacity: 0.8;
        margin-bottom: 2px;
        letter-spacing: 0.5px;
    }

    .time-values {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 6px; 
    }
    
    .time-inputs {
        display: flex;
        align-items: center;
        font-size: 1.1rem;
        font-weight: 600;
        line-height: 1;
    }

    .time-column {
      padding: 0 1px;
      cursor: ns-resize;
      min-width: 20px;
      text-align: center;
      touch-action: none;
    }

    .time-sep {
      padding-bottom: 3px;
      opacity: 0.5;
    }
    
    .sparkle-btn {
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        color: var(--disabled-text-color);
        cursor: pointer;
        opacity: 0.6;
        transition: all 0.2s;
        background: rgba(0,0,0,0.05);
    }
    
    .sparkle-btn.active {
        color: #FFD700; 
        opacity: 1;
        background: rgba(255, 215, 0, 0.15);
        box-shadow: 0 0 8px rgba(255, 215, 0, 0.3);
    }
    
    .sparkle-btn ha-icon {
        --mdc-icon-size: 16px;
    }

    @keyframes pulse {
      0% { box-shadow: 0 0 0 0 rgba(76, 175, 80, 0.4); } 
      70% { box-shadow: 0 0 0 10px rgba(76, 175, 80, 0); }
      100% { box-shadow: 0 0 0 0 rgba(76, 175, 80, 0); }
    }
  `;
}


export class MowerCardEditor extends LitElement {
  hass!: HomeAssistant;
  _config!: MowerCardConfig;

  static get properties() {
    return {
      hass: { attribute: false },
      _config: { state: true },
    };
  }

  setConfig(config: MowerCardConfig) {
    this._config = config;
  }
  
  _valueChanged(ev: CustomEvent) {
    const config = { ...this._config, ...ev.detail.value };
    const event = new CustomEvent("config-changed", {
      detail: { config },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }

  render() { 
    if (!this.hass || !this._config) return html``;
    
    const schema = [
         {name: "entity", label: "Mower Entity", selector: { entity: { domain: ["lawn_mower", "vacuum"] } }},
         {name: "start_button_entity", label: "Start Button", selector: { entity: { domain: "input_button" } }},
         {name: "automation_entity", label: "Automation", selector: { entity: { domain: "automation" } }},
         {name: "schedule_time_entity", label: "Schedule Time", selector: { entity: { domain: "input_datetime" } }},
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

if (!customElements.get('slick-mower-card')) {
  customElements.define('slick-mower-card', MowerCard);
}
if (!customElements.get('slick-mower-card-editor')) {
  customElements.define('slick-mower-card-editor', MowerCardEditor);
}

window.customCards = window.customCards || [];
window.customCards.push({
    type: "slick-mower-card",
    name: "Slick Mower Card",
    preview: true,
    description: "A card for controlling a lawn mower."
});
