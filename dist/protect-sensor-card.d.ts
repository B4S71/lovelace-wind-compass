/**
 * Protect Sensor Card
 * @version 0.1.0
 */
import { LitElement, TemplateResult } from 'lit';
import type { HomeAssistant, ProtectSensorCardConfig } from './types';
export declare class ProtectSensorCard extends LitElement {
    hass: HomeAssistant;
    config: ProtectSensorCardConfig;
    static get properties(): {
        hass: {
            attribute: boolean;
        };
        config: {
            state: boolean;
        };
    };
    static getConfigElement(): HTMLElement;
    static getStubConfig(_hass: HomeAssistant): {
        type: string;
        sensors: {
            binary_entity: string;
            temp_entity: string;
            type: string;
        }[];
        size: number;
        layout: string;
    };
    setConfig(config: ProtectSensorCardConfig): void;
    private _getTempColor;
    render(): TemplateResult<1>;
    private _renderSensor;
    static styles: import("lit").CSSResult;
}
//# sourceMappingURL=protect-sensor-card.d.ts.map