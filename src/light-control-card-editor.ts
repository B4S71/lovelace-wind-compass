import { LitElement, html } from 'lit';
import { HomeAssistant, LightControlCardConfig } from './types';

export class LightControlCardEditor extends LitElement {
  hass!: HomeAssistant;
  _config!: LightControlCardConfig;

  static get properties() {
    return {
      hass: { attribute: false },
      _config: { state: true },
    };
  }

  setConfig(config: LightControlCardConfig) {
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
    if (!this.hass || !this._config) {
      return html``;
    }

    const schema = [
         {name: "entity", label: "Light Entity", selector: { entity: { domain: "light" } }},
         {name: "name", label: "Name (Optional)", selector: { text: {} }},
         {name: "covers", label: "Covers", selector: { entity: { domain: "cover", multiple: true } }},
         {name: "layout", label: "Layout Mode", selector: { select: { 
             mode: "dropdown", 
             options: [
                 {value: "auto", label: "Auto (Responsive)"}, 
                 {value: "compact", label: "Compact"}, 
                 {value: "small", label: "Small"}, 
                 {value: "medium", label: "Medium"}, 
                 {value: "large", label: "Large"}
             ] 
         }}},
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

if (!customElements.get('slick-light-control-card-editor')) {
  customElements.define('slick-light-control-card-editor', LightControlCardEditor);
}
