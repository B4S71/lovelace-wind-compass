/**
 * Energy Flow Card
 * @version 0.1.0
 */
import { LitElement } from 'lit';
import type { HomeAssistant, EnergyFlowCardConfig } from './types';
export declare class EnergyFlowCard extends LitElement {
    hass: HomeAssistant;
    config: EnergyFlowCardConfig;
    static get properties(): {
        hass: {
            attribute: boolean;
        };
        config: {
            state: boolean;
        };
    };
    static getConfigElement(): HTMLElement;
    static getStubConfig(): {
        type: string;
        title: string;
        solar_entity: string;
        grid_import_entity: string;
        grid_export_entity: string;
        battery_entity: string;
        battery_soc_entity: string;
        home_entity: string;
    };
    setConfig(config: EnergyFlowCardConfig): void;
    private _cachedGradients;
    private _activeIndex;
    private _displayedGradient;
    private _resizeObserver?;
    private _width;
    private _height;
    connectedCallback(): void;
    disconnectedCallback(): void;
    private _getState;
    private _formatPower;
    render(): import("lit-html").TemplateResult<1>;
    static get styles(): import("lit").CSSResult;
}
export declare class EnergyFlowCardEditor extends LitElement {
    hass: any;
    _config: any;
    static get properties(): {
        hass: {};
        _config: {};
    };
    setConfig(config: any): void;
    _valueChanged(ev: any): void;
    render(): import("lit-html").TemplateResult<1>;
}
//# sourceMappingURL=energy-flow-card.d.ts.map