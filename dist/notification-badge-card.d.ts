/**
 * Notification Badge Card
 * @version 0.2.0
 */
import { LitElement } from 'lit';
import type { HomeAssistant, NotificationBadgeCardConfig } from './types';
export declare class NotificationBadgeCard extends LitElement {
    hass: HomeAssistant;
    config: NotificationBadgeCardConfig;
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
        calendars: never[];
        entities: never[];
    };
    setConfig(config: NotificationBadgeCardConfig): void;
    private _getDaysUntil;
    private _handleEntityTap;
    private _handleCalendarTap;
    render(): import("lit-html").TemplateResult<1>;
    static styles: import("lit").CSSResult;
}
export declare class NotificationBadgeCardEditor extends LitElement {
    hass: HomeAssistant;
    _config: NotificationBadgeCardConfig;
    static get properties(): {
        hass: {
            attribute: boolean;
        };
        _config: {
            state: boolean;
        };
    };
    setConfig(config: NotificationBadgeCardConfig): void;
    _valueChanged(ev: CustomEvent): void;
    render(): import("lit-html").TemplateResult<1>;
}
//# sourceMappingURL=notification-badge-card.d.ts.map