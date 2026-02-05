/**
 * Person Card
 * @version 0.1.0
 */
import { LitElement } from 'lit';
import type { HomeAssistant, PersonCardConfig } from './types';
export declare class PersonCard extends LitElement {
    hass: HomeAssistant;
    config: PersonCardConfig;
    static get properties(): {
        hass: {
            attribute: boolean;
        };
        config: {
            state: boolean;
        };
    };
    static getConfigElement(): HTMLElement;
    static getStubConfig(hass: HomeAssistant): {
        type: string;
        people: string[];
        layout: string;
    };
    constructor();
    getCardSize(): number;
    setConfig(config: PersonCardConfig): void;
    render(): import("lit-html").TemplateResult<1>;
    static styles: import("lit").CSSResult;
}
//# sourceMappingURL=person-card.d.ts.map