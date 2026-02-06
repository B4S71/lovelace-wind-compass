/**
 * Light Control Card
 * @version 0.2.0
 */
import { LitElement, PropertyValues } from 'lit';
import type { HomeAssistant, LightControlCardConfig } from './types';
import './light-control-card-editor';
export declare class LightControlCard extends LitElement {
    hass: HomeAssistant;
    config: LightControlCardConfig;
    static readonly SIZES: {
        readonly ICON: 40;
        readonly HEADER_GAP: 12;
        readonly HEADER_MIN_W: 120;
        readonly COVER_ROW_H: 42;
        readonly COVER_ICON_W: 40;
        readonly COVER_GAP: 8;
        readonly COVER_SECTION_PAD: 24;
        readonly CONTENT_GAP: 8;
        readonly PAD_H: 12;
        readonly PAD_V: 12;
        readonly SLIDER_MIN_W: 100;
    };
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
        _cursorPos: {
            state: boolean;
        };
        _computed: {
            state: boolean;
        };
    };
    _computed: {
        mode: 'compact' | 'vertical' | 'horizontal';
        showCovers: boolean;
        visibleCovers: number;
        supports2D: boolean;
    };
    _interacting: boolean;
    _resizeObserver: ResizeObserver | null;
    _cursorPos: {
        x: number;
        y: number;
    };
    _activeSlider: {
        entityId: string;
        type: 'position' | 'tilt';
        startX: number;
        startVal: number;
        currentVal: number;
    } | null;
    private _pointerStartX;
    private _pointerStartY;
    private _longPressTimer;
    private _clickTimer;
    private _pendingPointerId;
    connectedCallback(): void;
    disconnectedCallback(): void;
    protected firstUpdated(_changedProperties: PropertyValues): void;
    private _handleTouchMove;
    /**
     * Deterministic layout engine.
     * Instead of guessing modes, we measure what physically fits.
     *
     * Decision order:
     *   1. Can the header even fit?  → compact
     *   2. How many cover rows fit vertically vs horizontally?
     *   3. Which orientation gives sliders more width?
     *   4. Pick the winner.
     */
    private _updateLayout;
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
    private _lastClick;
    private _handlePointerDown;
    private _openMoreInfo;
    private _startInteraction;
    private _handlePointerUp;
    private _handlePointerMove;
    private _handleSliderDown;
    private _handleSliderMove;
    private _processSliderMove;
    private _applyLightState;
    render(): import("lit-html").TemplateResult<1>;
    private _renderCover;
    static get styles(): import("lit").CSSResult;
}
//# sourceMappingURL=light-control-card.d.ts.map