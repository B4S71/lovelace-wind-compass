/**
 * Mini Weather Card
 * @version 0.2.0
 */
import { LitElement } from 'lit';
import type { HomeAssistant, MiniWeatherCardConfig, ForecastData, HistoryDataPoint } from './types';
interface Gradients {
    bright: string;
    dark: string;
}
export declare class MiniWeatherCard extends LitElement {
    hass: HomeAssistant;
    config: MiniWeatherCardConfig;
    _forecast: ForecastData[] | null;
    _historyData: HistoryDataPoint[];
    _cardHeight: number;
    _cardWidth: number;
    _resizeObserver: ResizeObserver;
    _unsub?: () => void;
    _historyTimeout?: number;
    static get properties(): {
        hass: {
            attribute: boolean;
        };
        config: {
            state: boolean;
        };
        _forecast: {
            state: boolean;
        };
        _historyData: {
            state: boolean;
        };
        _cardWidth: {
            state: boolean;
        };
        _cardHeight: {
            state: boolean;
        };
    };
    static getConfigElement(): HTMLElement;
    static getStubConfig(hass: HomeAssistant): {
        type: string;
        entity: string;
        title: string;
        mode: string;
        sampling_size: number;
        history_hours: number;
    };
    constructor();
    connectedCallback(): void;
    disconnectedCallback(): void;
    setConfig(config: MiniWeatherCardConfig): void;
    updated(changedProps: Map<string, any>): void;
    _subscribeForecast(): Promise<void>;
    _unsubscribeForecast(): void;
    _updateHistory(): Promise<void>;
    _calculatePathPoints(): {
        line: string;
        area: string;
    } | null;
    render(): import("lit-html").TemplateResult<1>;
    _renderRow(day: ForecastData): import("lit-html").TemplateResult<1>;
    _getIcon(condition: string): string;
    _openMoreInfo(): void;
    _getCurrentGradients(): Gradients;
    static get styles(): import("lit").CSSResult;
}
export {};
//# sourceMappingURL=minimal-weather-card.d.ts.map