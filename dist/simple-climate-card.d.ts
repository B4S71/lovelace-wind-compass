/**
 * Simple Climate Card
 * @version 0.2.0
 */
import { LitElement } from 'lit';
import type { HomeAssistant, SimpleClimateCardConfig } from './types';
export declare class SimpleClimateCard extends LitElement {
    hass: HomeAssistant;
    config: SimpleClimateCardConfig;
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
        entity: string;
        name: string;
    };
    setConfig(config: SimpleClimateCardConfig): void;
    private _interpolateColor;
    private _getGradient;
    render(): import("lit-html").TemplateResult<1>;
    _renderTargets(stateObj: any, low: number, high: number): import("lit-html").TemplateResult<1>;
    _openMoreInfo(): void;
    static get styles(): import("lit").CSSResult;
}
//# sourceMappingURL=simple-climate-card.d.ts.map