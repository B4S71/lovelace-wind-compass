import { LitElement, html, css } from 'lit';
import { HomeAssistant, LightControlCardConfig } from './types';

const fireEvent = (node: HTMLElement, type: string, detail: any, options?: any) => {
  options = options || {};
  detail = detail === null || detail === undefined ? {} : detail;
  const event = new Event(type, {
    bubbles: options.bubbles === undefined ? true : options.bubbles,
    cancelable: Boolean(options.cancelable),
    composed: options.composed === undefined ? true : options.composed,
  });
  (event as any).detail = detail;
  node.dispatchEvent(event);
  return event;
};

export class LightControlCardEditor extends LitElement {
  private _config?: LightControlCardConfig;
  private _hass?: HomeAssistant;

  static get properties() {
    return {
      _hass: { attribute: false },
      _config: { state: true },
    };
  }

  set hass(hass: HomeAssistant) {
    this._hass = hass;
  }

  setConfig(config: LightControlCardConfig) {
    this._config = config;
  }

  private _valueChanged(ev: CustomEvent) {
    if (!this._config || !this._hass) {
      return;
    }
    const target = ev.target as any;
    if (this._config[target.configValue] === target.value) {
      return;
    }
    if (target.configValue) {
      if (target.value === '') {
        const newConfig = { ...this._config };
        delete newConfig[target.configValue];
        this._config = newConfig;
      } else {
        this._config = {
          ...this._config,
          [target.configValue]: target.value,
        };
      }
    }
    fireEvent(this, 'config-changed', { config: this._config });
  }

  private _coversChanged(ev: CustomEvent) {
      if (!this._config) return;
      const target = ev.target as any;
      const value = target.value;
      
      const covers = value.split(',').map((c: string) => c.trim()).filter((c: string) => c !== '');
      
      this._config = {
          ...this._config,
          covers: covers
      };
      
      fireEvent(this, 'config-changed', { config: this._config });
  }

  render() {
    if (!this._hass || !this._config) {
      return html``;
    }

    return html`
      <div class="card-config">
        <div class="option">
            <label>Entity (Light)</label>
            <input
                .value=${this._config.entity || ''}
                .configValue=${'entity'}
                @input=${this._valueChanged}
                type="text"
                placeholder="light.living_room"
            />
        </div>
        
        <div class="option">
            <label>Name (Optional)</label>
            <input
                .value=${this._config.name || ''}
                .configValue=${'name'}
                @input=${this._valueChanged}
                type="text"
                placeholder="Living Room"
            />
        </div>

        <div class="option">
            <label>Covers (Comma separated)</label>
            <input
                .value=${(this._config.covers || []).join(', ')}
                @change=${this._coversChanged}
                type="text"
                placeholder="cover.blind_1, cover.blind_2"
            />
        </div>
      </div>
    `;
  }

  static get styles() {
    return css`
      .card-config {
        display: flex;
        flex-direction: column;
        gap: 16px;
      }
      .option {
        display: flex;
        flex-direction: column;
        gap: 4px;
      }
      label {
        font-weight: bold;
        color: var(--primary-text-color);
      }
      input {
        padding: 8px;
        background: var(--secondary-background-color);
        color: var(--primary-text-color);
        border: 1px solid var(--divider-color);
        border-radius: 4px;
      }
    `;
  }
}

customElements.define('slick-light-control-card-editor', LightControlCardEditor);
