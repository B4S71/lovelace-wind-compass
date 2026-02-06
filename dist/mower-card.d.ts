/**
 * Mower Card
 * @version 0.2.0
 */
import { LitElement, PropertyValues } from 'lit';
import type { HomeAssistant, MowerCardConfig } from './types';
export declare class MowerCard extends LitElement {
    hass: HomeAssistant;
    config: MowerCardConfig;
    private _tempTime;
    private _touchStartState;
    private _discoveredBatteryEntity;
    private _discoveredRoomEntity;
    private _deviceAreaName;
    private _discoveryAttempted;
    private _swipeOffset;
    private _isSwiping;
    private _swipeStartX;
    private _isTriggered;
    private _resizeObserver?;
    private _isCompact;
    private _isShort;
    private _isTiny;
    static get properties(): {
        hass: {
            attribute: boolean;
        };
        config: {
            state: boolean;
        };
        _tempTime: {
            state: boolean;
        };
        _discoveredBatteryEntity: {
            state: boolean;
        };
        _discoveredRoomEntity: {
            state: boolean;
        };
        _deviceAreaName: {
            state: boolean;
        };
        _swipeOffset: {
            state: boolean;
        };
        _isCompact: {
            state: boolean;
        };
        _isShort: {
            state: boolean;
        };
        _isTiny: {
            state: boolean;
        };
        _isTriggered: {
            state: boolean;
        };
    };
    connectedCallback(): void;
    disconnectedCallback(): void;
    private _inputStartY;
    private _inputTargetString;
    private _isDragging;
    static getStubConfig(): {
        type: string;
        entity: string;
        start_button_entity: string;
        automation_entity: string;
        schedule_time_entity: string;
    };
    static getConfigElement(): HTMLElement;
    setConfig(config: MowerCardConfig): void;
    protected shouldUpdate(_changedProps: PropertyValues): boolean;
    updated(changedProps: PropertyValues): void;
    private _fetchRelatedEntities;
    private _getActionMode;
    private _checkAutomationButtonVisibility;
    private _handleStartMowing;
    private _handleReturnHome;
    private _handleMoreInfo;
    private _handleToggleAutomation;
    private _getDateTimeParts;
    private _onInputStart;
    private _onInputMove;
    private _onInputEnd;
    private _cleanupInput;
    private _onSwipeStart;
    private _onSwipeMove;
    private _onSwipeEnd;
    private _getStatusIcon;
    private _getStatusLabel;
    render(): import("lit-html").TemplateResult<1>;
    static styles: import("lit").CSSResult;
}
export declare class MowerCardEditor extends LitElement {
    hass: HomeAssistant;
    _config: MowerCardConfig;
    static get properties(): {
        hass: {
            attribute: boolean;
        };
        _config: {
            state: boolean;
        };
    };
    setConfig(config: MowerCardConfig): void;
    _valueChanged(ev: CustomEvent): void;
    render(): import("lit-html").TemplateResult<1>;
}
//# sourceMappingURL=mower-card.d.ts.map