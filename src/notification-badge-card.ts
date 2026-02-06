/**
 * Notification Badge Card
 * @version 0.2.0
 */

import { LitElement, html, css } from 'lit';
import type {
  HomeAssistant,
  NotificationBadgeCardConfig,
} from './types';

const CARD_VERSION = "0.2.0";

console.info(
  `%c NOTIFICATION-BADGE-CARD %c ${CARD_VERSION} `,
  'color: white; background: #e91e63; font-weight: 700;',
  'color: #e91e63; background: white; font-weight: 700;'
);

export class NotificationBadgeCard extends LitElement {
  hass!: HomeAssistant;
  config!: NotificationBadgeCardConfig;

  static get properties() {
    return {
      hass: { attribute: false },
      config: { state: true },
    };
  }

  static getConfigElement() {
    return document.createElement("slick-notification-badge-card-editor");
  }

  static getStubConfig() {
    return {
      type: "custom:slick-notification-badge-card",
      calendars: [],
      entities: []
    };
  }

  setConfig(config: NotificationBadgeCardConfig) {
    if (!config) throw new Error("Invalid configuration");
    this.config = config;
  }

  private _getDaysUntil(dateStr: string): number {
      const now = new Date();
      const target = new Date(dateStr);
      
      // Reset times to compare just dates
      const current = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const event = new Date(target.getFullYear(), target.getMonth(), target.getDate());
      
      const diffTime = event.getTime() - current.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      return diffDays; 
  }

  private _handleEntityTap(entityId: string) {
      this.hass.callService('homeassistant', 'turn_off', {
          entity_id: entityId
      });
  }

  private _handleCalendarTap(entityId: string) {
      const event = new CustomEvent("hass-more-info", {
          detail: { entityId },
          bubbles: true,
          composed: true,
      });
      this.dispatchEvent(event);
  }

  render() {
    if (!this.config || !this.hass) return html``;

    const calendarBadges: any[] = [];
    const entityBadges: any[] = [];
    
    // Process Calendars
    if (this.config.calendars) {
        this.config.calendars.forEach(cal => {
            const stateObj = this.hass.states[cal.entity];
            if (!stateObj) return;
            
            // Calendar attributes typically have: message, start_time, end_time, all_day
            const startTime = stateObj.attributes.start_time;
            if (!startTime) return;
            
            const daysUntil = this._getDaysUntil(startTime);
            const limit = cal.days ?? 7;
            
            if (daysUntil >= 0 && daysUntil <= limit) {
                const message = (stateObj.attributes.message || "").toLowerCase();
                let useColor = cal.color || 'var(--primary-color)';
                
                // Rule matching
                if (cal.rules) {
                    for (const rule of cal.rules) {
                        if (message.includes(rule.pattern.toLowerCase())) {
                            useColor = rule.color;
                            break;
                        }
                    }
                }

                calendarBadges.push({
                    type: 'calendar',
                    entity: cal.entity,
                    icon: cal.icon || 'mdi:calendar',
                    label: daysUntil === 0 ? '' : daysUntil.toString(),
                    color: useColor,
                    active: true,
                    title: stateObj.attributes.message,
                    entityPicture: null // Calendars usually don't have entity pictures we want to use as icon
                });
            }
        });
    }

    // Process Entities
    if (this.config.entities) {
        this.config.entities.forEach(ent => {
            const stateObj = this.hass.states[ent.entity];
            if (!stateObj) return;
            
            if (stateObj.state === 'on' || stateObj.state === 'active' || stateObj.state === 'home') {
                const isPicture = !!stateObj.attributes.entity_picture;
                entityBadges.push({
                    type: 'entity',
                    entity: ent.entity,
                    icon: ent.icon || stateObj.attributes.icon || 'mdi:alert-circle',
                    label: '',
                    color: ent.color || '#ff9800', 
                    active: true,
                    title: stateObj.attributes.friendly_name,
                    entityPicture: isPicture ? stateObj.attributes.entity_picture : null
                });
            }
        });
    }

    // Combine: Entities first (Left), then Calendars
    const badges = [...entityBadges, ...calendarBadges];

    if (badges.length === 0) {
        return html``; // Render nothing if no badges
    }

    return html`
      <div class="badge-container">
        ${badges.map(badge => html`
            <div class="badge ${badge.type}" 
                 style="background: ${badge.color}; border-color: ${badge.color}"
                 title="${badge.title} (${badge.entity})"
                 @click=${() => badge.type === 'entity' ? this._handleEntityTap(badge.entity) : this._handleCalendarTap(badge.entity)}>
               
               ${badge.entityPicture ? html`
                   <div class="badge-icon-img" style="background-image: url('${badge.entityPicture}')"></div>
               ` : html`
                   <ha-icon icon="${badge.icon}" style="color: white; filter: drop-shadow(0 1px 2px rgba(0,0,0,0.3));"></ha-icon>
               `}

               ${badge.label ? html`<div class="badge-label">${badge.label}</div>` : ''}
            </div>
        `)}
      </div>
    `;
  }

  static styles = css`
    :host {
      display: block;
      height: 100%;
      container-type: inline-size;
    }
    
    .badge-container {
        display: flex;
        flex-wrap: wrap;
        gap: clamp(6px, 3cqi, 12px);
        align-items: center;
        align-content: flex-start;
        justify-content: flex-end;
        margin-left: clamp(6px, 3cqi, 12px);
        margin-bottom: clamp(6px, 3cqi, 12px);
        padding-bottom: 4px;
        height: 100%;
        box-sizing: border-box;
        overflow: hidden;
    }
    
    .badge {
        position: relative;
        width: clamp(28px, 10cqi, 38px);
        height: clamp(28px, 10cqi, 38px);
        border-radius: 50%;
        background: var(--primary-color);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        cursor: pointer;
        transition: transform 0.2s, opacity 0.2s;
        border: 1px solid transparent;
        box-sizing: border-box;
        box-shadow: 0 1px 3px rgba(0,0,0,0.12);
        flex: 0 0 auto;
    }
    
    /* Make entities feel more solid/pronounced */
    .badge.entity {
        z-index: 2;
        box-shadow: 0 2px 4px rgba(0,0,0,0.15);
    }
    
    /* Make calendars slightly translucent */
    .badge.calendar {
       opacity: 0.85; 
    }
    
    .badge:active {
        transform: scale(0.95);
    }
    
    .badge:hover {
        filter: brightness(1.1);
    }
    
    .badge-icon-img {
        width: 100%;
        height: 100%;
        background-size: cover;
        background-position: center;
        border-radius: 50%;
    }
    
    .badge-label {
        position: absolute;
        top: 2px;
        right: 2px;
        background: white;
        color: #333;
        font-size: 0.7rem;
        font-weight: 700;
        min-width: 16px;
        height: 16px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 4px;
        box-shadow: 0 1px 2px rgba(0,0,0,0.3);
        z-index: 5;
    }
    
    ha-icon {
        --mdc-icon-size: 24px;
    }
  `;
}

export class NotificationBadgeCardEditor extends LitElement {
  hass!: HomeAssistant;
  _config!: NotificationBadgeCardConfig;

  static get properties() {
    return {
      hass: { attribute: false },
      _config: { state: true },
    };
  }

  setConfig(config: NotificationBadgeCardConfig) {
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
         {
             name: "calendars",
             label: "Calendars",
             selector: {
                 object: {
                     schema: [
                         { name: "entity", label: "Entity", selector: { entity: { domain: "calendar" } } },
                         { name: "icon", label: "Icon", selector: { icon: {} } },
                         { name: "days", label: "Days Lookahead", selector: { number: { min: 1, max: 365 } } }
                     ]
                 }
             }
         },
         {
             name: "entities",
             label: "Entities",
             selector: {
                 object: {
                    schema: [
                         { name: "entity", label: "Entity", selector: { entity: {} } },
                         { name: "icon", label: "Icon Override", selector: { icon: {} } },
                         { name: "color", label: "Color (Active)", selector: { text: {} } }
                    ]
                 }
             }
         }
    ];

    // Note: The list selector implementation in ha-form is complex. 
    // For bespoke lists, we might need a custom render. 
    // However, ha-form usually doesn't support array of objects easily in custom cards 
    // without specific support. 
    // For now, assume YAML mode is primary or provide basic list support if possible.
    // Standard custom card boilerplate often omits complex array editors due to ha-form limitations.
    
    return html`
      <div style="padding: 16px;">
        <p><strong>Note:</strong> This card is best configured via YAML for multiple lists.</p>
        <ha-form
            .hass=${this.hass}
            .data=${this._config}
            .schema=${schema}
            .computeLabel=${(s: any) => s.label}
            @value-changed=${this._valueChanged}
        ></ha-form>
      </div>
    `; 
  }
}

if (!customElements.get('slick-notification-badge-card')) {
  customElements.define('slick-notification-badge-card', NotificationBadgeCard);
}
if (!customElements.get('slick-notification-badge-card-editor')) {
  customElements.define('slick-notification-badge-card-editor', NotificationBadgeCardEditor);
}

window.customCards = window.customCards || [];
window.customCards.push({
    type: "slick-notification-badge-card",
    name: "Slick Notification Badge",
    preview: true,
    description: "Displays badges for calendar events and active entities."
});

window.customBadges = window.customBadges || [];
window.customBadges.push({
    type: "slick-notification-badge-card",
    name: "Slick Notification Badge",
    preview: true,
    description: "Displays badges for calendar events and active entities."
});
