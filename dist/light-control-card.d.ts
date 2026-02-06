/**
 * Light Control Card
 * @version 0.1.0
 */
import { LitElement, PropertyValues } from 'lit';
import type { HomeAssistant, LightControlCardConfig } from './types';
export declare class LightControlCard extends LitElement {
    hass: HomeAssistant;
    config: LightControlCardConfig;
    static get properties(): {
        hass: {
            attribute: boolean;
        };
        config: {
            state: boolean;
        };
        _interacting: {
            state: boolean;
        };
    };
    _interacting: boolean;
    static getConfigElement(): HTMLElement;
    static getStubConfig(): {
        type: string;
        entity: string;
        name: string;
        covers: never[];
    };
    setConfig(config: LightControlCardConfig): void;
    shouldUpdate(changedProps: PropertyValues): boolean;
    private _toggleLight;
    private _controlCover;
    private _handlePointerDown;
    private _handlePointerUp;
    private _handlePointerMove;
    private _applyLightState;
    render(): import("lit-html").TemplateResult<1>;
    private _renderCover;
    static get styles(): import("lit").CSSResult;
}
//# sourceMappingURL=light-control-card.d.ts.map