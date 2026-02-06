import { LitElement } from 'lit';
import { HomeAssistant, LightControlCardConfig } from './types';
export declare class LightControlCardEditor extends LitElement {
    hass: HomeAssistant;
    _config: LightControlCardConfig;
    static get properties(): {
        hass: {
            attribute: boolean;
        };
        _config: {
            state: boolean;
        };
    };
    setConfig(config: LightControlCardConfig): void;
    _valueChanged(ev: CustomEvent): void;
    render(): import("lit-html").TemplateResult<1>;
}
//# sourceMappingURL=light-control-card-editor.d.ts.map