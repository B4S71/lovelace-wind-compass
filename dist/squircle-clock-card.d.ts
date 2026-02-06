/**
 * Squircle Clock Card
 * @version 0.2.0
 */
import type { HomeAssistant, SquircleClockCardConfig } from './types';
export declare class SquircleClockCard extends HTMLElement {
    private _hass?;
    private config;
    private _timer?;
    private _resizeObserver?;
    private hourHand?;
    private minuteHand?;
    private secondHand?;
    private _center?;
    private _timeDisplay?;
    private _dateDisplay?;
    private _ticks;
    private _lastMin;
    private _lastSecond;
    static getConfigElement(): HTMLElement;
    static getStubConfig(): {
        type: string;
        display_mode: string;
        font_style: string;
    };
    set hass(hass: HomeAssistant);
    setConfig(config: SquircleClockCardConfig): void;
    getLayoutOptions(): {
        grid_rows: number;
        grid_columns: number;
        grid_min_rows: number;
        grid_min_columns: number;
    };
    connectedCallback(): void;
    disconnectedCallback(): void;
    _startClock(): void;
    _stopClock(): void;
    _getPointOnRoundedRect(angleDeg: number, w: number, h: number, radius: number, inset: number): {
        x: number;
        y: number;
    };
    _getFontStyle(): string;
    _render(): void;
    _drawContent(): void;
    _drawAnalog(container: HTMLElement, w: number, h: number, radius: number, minDim: number): void;
    _drawDigital(container: HTMLElement, w: number, h: number, radius: number, minDim: number): void;
    _updateAnalog(time: Date): void;
    _updateDigital(time: Date, force?: boolean): void;
}
//# sourceMappingURL=squircle-clock-card.d.ts.map