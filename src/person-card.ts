/**
 * Person Card
 * @version 0.1.0
 */

import { LitElement, html, css } from 'lit';
import type {
  HomeAssistant,
  PersonCardConfig,
} from './types';

const CARD_VERSION = "0.1.0";

console.info(
  `%c PERSON-CARD %c ${CARD_VERSION} `,
  'color: white; background: #9c27b0; font-weight: 700;',
  'color: #9c27b0; background: white; font-weight: 700;'
);

export class PersonCard extends LitElement {
  hass!: HomeAssistant;
  config!: PersonCardConfig;

  static get properties() {
    return {
      hass: { attribute: false },
      config: { state: true },
    };
  }

  static getConfigElement() {
    return document.createElement("slick-person-card-editor");
  }

  static getStubConfig(hass: HomeAssistant) {
    // Collect all person entities
    let people: string[] = [];
    if (hass && hass.states) {
      people = Object.keys(hass.states).filter(eid => eid.startsWith('person.'));
    }

    return {
      type: "custom:slick-person-card",
      people: people,
      layout: "wrap"
    };
  }

  constructor() {
    super();
  }

  getCardSize() {
    return 1;
  }

  setConfig(config: PersonCardConfig) {
    if (!config) throw new Error("Invalid configuration");

    // Treat config as immutable: create a copy
    const newConfig = { 
        layout: "wrap",
        ...config 
    };

    // Migrate 'entity' to 'people' for badge/single compatibility
    if (newConfig.entity && (!newConfig.people || newConfig.people.length === 0)) {
      newConfig.people = [newConfig.entity];
    }
    
    // Validation
    if (newConfig.layout && !['wrap', 'horizontal'].includes(newConfig.layout)) throw new Error("layout must be wrap or horizontal");
    
    this.config = newConfig as PersonCardConfig;
  }

  render() {
    if (!this.config) {
      return html``;
    }
    // If hass missing, render empty container to avoid crash but show something if inspected
    if (!this.hass) {
        return html`<ha-card style="padding: 10px;">Loading persons...</ha-card>`;
    }

    const size = 38;
    const isHorizontal = this.config.layout === 'horizontal';
    
    // Ensure people list exists
    const people = this.config.people || [];
    
    const cardStyle = `
      width: ${size}px;
      height: ${size}px;
      border-radius: 50%;
    `;

    return html`
      <div class="person-container ${isHorizontal ? 'horizontal' : ''}">
        ${people.map(personId => {
          const entity = this.hass.states[personId];
          if (!entity) return html`
            <div class="person-card away" style="${cardStyle}; display: flex; align-items: center; justify-content: center; background-color: #555;">
               <span style="font-size: 0.5em; text-align: center; color: white;">?</span>
            </div>
          `;

          const isHome = entity.state === 'home';
          const entityPicture = entity.attributes.entity_picture;

          return html`
            <div class="person-card ${isHome ? 'home' : 'away'}" 
                 style="background-image: url('${entityPicture}'); ${cardStyle}">
            </div>
          `;
        })}
      </div>
    `;
  }

  static styles = css`
    :host {
      display: block;
      height: 100%;
    }
    .person-container {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      justify-content: flex-start;
      height: 100%;
      box-sizing: border-box;
      align-content: flex-start;
      margin-right: 12px;
      margin-bottom: 12px;
    }
    .person-container.horizontal {
      flex-wrap: nowrap;
      overflow-x: auto;
      padding-bottom: 4px; /* Space for scrollbar if visible */
      scrollbar-width: none; /* Hide scrollbar Firefox */
    }
    .person-container.horizontal::-webkit-scrollbar { 
      display: none; /* Hide scrollbar Chrome/Safari/Webkit */
    }
    
    .person-card {
      position: relative;
      /* width & height set by inline style */
      flex-shrink: 0;
      border-radius: var(--ha-card-border-radius, 12px);
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      background-color: var(--secondary-background-color);
      overflow: hidden;
      box-shadow: var(--ha-card-box-shadow, none);
      transition: filter 0.3s ease;
    }
    .person-card.away {
      filter: grayscale(100%);
    }
    .person-card.home {
      filter: grayscale(0%);
    }
  `;
}

// Robust Registration
const registry = window.customElements;
const existingClass = registry.get('slick-person-card');

try {
  if (!existingClass) {
    registry.define('slick-person-card', PersonCard);
  }
} catch (e) {
  console.error("Failed to register slick-person-card", e);
}

class PersonCardEditor extends LitElement {
  hass!: HomeAssistant;
  _config!: PersonCardConfig;

  static get properties() {
    return {
      hass: { attribute: false },
      _config: { state: true },
    };
  }

  setConfig(config: PersonCardConfig) {
    // Normalize config for editor
    const newConfig = { ...config };
    if (newConfig.entity && (!newConfig.people || newConfig.people.length === 0)) {
      newConfig.people = [newConfig.entity];
    }
    this._config = newConfig;
  }

  _valueChanged(ev: CustomEvent) {
    if (!this._config || !this.hass) {
      return;
    }
    const value = ev.detail.value;

    this._config = value;

    const event = new CustomEvent("config-changed", {
      detail: { config: this._config },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }

  render() {
    if (!this.hass || !this._config) {
      return html``;
    }

    const schema = [
      {
        name: "people",
        label: "People",
        selector: {
          entity: {
            domain: ["person", "device_tracker"],
            multiple: true
          }
        }
      },
      {
        name: "layout",
        label: "Layout",
        selector: {
          select: {
            mode: "dropdown",
            options: [
              { value: "wrap", label: "Wrap (Grid)" },
              { value: "horizontal", label: "Horizontal Scroll (Chips)" }
            ]
          }
        }
      }
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

if (!customElements.get("slick-person-card-editor")) {
  customElements.define("slick-person-card-editor", PersonCardEditor);
}

window.customCards = window.customCards || [];
window.customCards.push({
  type: "slick-person-card",
  name: "Slick Person",
  preview: true,
  description: "A round person badge/card."
});

window.customBadges = window.customBadges || [];
window.customBadges.push({
  type: "custom:slick-person-card",
  name: "Slick Person Badge",
  description: "A round person badge.",
  preview: true
});
