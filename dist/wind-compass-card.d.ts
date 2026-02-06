/**
 * Wind Compass Card
 * @version 0.2.0
 */
import type { HomeAssistant, WindCompassCardConfig } from './types';
export declare class WindCompassCard extends HTMLElement {
    private _hass?;
    private config;
    private _resizeObserver?;
    private content?;
    private _bucketSize;
    private _bucketCount;
    private _warnMultiplier;
    private _historyData;
    private _lastHistoryFetch;
    private _avgDeg;
    private _instDeg;
    private _currentSpeed?;
    private _currentUnit;
    private _maxSpeed;
    private _currentGust;
    private _limitRaffstore;
    private _limitRollo;
    private _pxPerDeg?;
    constructor();
    static getConfigElement(): HTMLElement;
    static getStubConfig(): {
        type: string;
        direction_entity: string;
        speed_entity: string;
        max_speed: number;
    };
    set hass(hass: HomeAssistant);
    setConfig(config: WindCompassCardConfig): void;
    private _recalcBuckets;
    connectedCallback(): void;
    disconnectedCallback(): void;
    private _render;
    private _updateCard;
    private _fetchHistory;
    private _processHistoryData;
    private _updateDimensions;
    private _buildTape;
    private _interpolateColor;
    private _updateVisuals;
    getCardSize(): number;
}
//# sourceMappingURL=wind-compass-card.d.ts.map