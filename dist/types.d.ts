/**
 * Type definitions for Home Assistant custom cards
 * @version 0.2.0
 */
export interface HomeAssistant {
    states: Record<string, HassEntity>;
    callApi: <T>(method: string, path: string, data?: any) => Promise<T>;
    callService: (domain: string, service: string, serviceData?: any) => Promise<void>;
    callWS: <T>(msg: any) => Promise<T>;
    config: any;
    connection: any;
    connected: boolean;
    language: string;
    selectedLanguage: string | null;
    localize: (key: string, ...args: any[]) => string;
    panels: any;
    panelUrl: string;
    resources: any;
    themes: any;
    user: any;
    areas: Record<string, any>;
    devices: Record<string, any>;
    entities: Record<string, any>;
}
declare global {
    interface Window {
        customCards: Array<{
            type: string;
            name: string;
            description: string;
            preview?: boolean;
        }>;
        customBadges: Array<{
            type: string;
            name: string;
            description: string;
            preview?: boolean;
        }>;
    }
}
export interface HassEntity {
    entity_id: string;
    state: string;
    last_changed: string;
    last_updated: string;
    attributes: Record<string, any>;
    context: {
        id: string;
        parent_id: string | null;
        user_id: string | null;
    };
}
export interface LovelaceCardConfig {
    type: string;
    [key: string]: any;
}
export interface WindCompassCardConfig extends LovelaceCardConfig {
    type: 'custom:slick-wind-compass-card';
    direction_entity: string;
    instant_direction_entity?: string;
    speed_entity: string;
    gust_entity?: string;
    max_speed?: number;
    raffstore_limit_entity?: string;
    rollo_limit_entity?: string;
    warn_multiplier?: number;
    bucket_size?: number;
    simple_mode?: boolean;
}
export interface HistoryState {
    entity_id: string;
    state: string;
    last_changed: string;
    last_updated: string;
    attributes: Record<string, any>;
}
export interface BucketData {
    duration: number;
    totalSpeed: number;
}
export interface MiniWeatherCardConfig extends LovelaceCardConfig {
    type: 'custom:slick-minimal-weather-card';
    entity: string;
    title?: string;
    mode?: 'daily' | 'hourly';
    temp_sensor?: string;
    history_entity?: string;
    sun_entity?: string;
    sampling_size?: number;
    history_hours?: number;
}
export interface ForecastData {
    datetime: string;
    condition: string;
    temperature?: number;
    temp_max?: number;
    templow?: number;
    temp_min?: number;
}
export interface HistoryDataPoint {
    time: number;
    state: number;
}
export interface SquircleClockCardConfig extends LovelaceCardConfig {
    type: 'custom:slick-squircle-clock-card';
    display_mode?: 'analog' | 'digital';
    font_style?: 'standard' | 'thin' | 'retro';
    timezone?: string;
    timezone_entity?: string;
}
export interface SimpleClimateCardConfig extends LovelaceCardConfig {
    type: 'custom:slick-simple-climate-card';
    entity: string;
    name?: string;
    sensors?: {
        temp?: string;
        target_high?: string;
        target_low?: string;
    };
}
export interface EnergyFlowCardConfig extends LovelaceCardConfig {
    type: 'custom:slick-energy-flow-card';
    title?: string;
    grid_entity?: string;
    grid_import_entity?: string;
    grid_export_entity?: string;
    solar_entity?: string;
    battery_entity?: string;
    battery_soc_entity?: string;
    home_entity?: string;
    autarky_entity?: string;
    self_consumption_entity?: string;
    inverted_grid?: boolean;
    inverted_battery?: boolean;
}
export interface PersonCardConfig extends LovelaceCardConfig {
    type: 'custom:slick-person-card';
    people?: string[];
    entity?: string;
    layout?: 'wrap' | 'horizontal';
}
export interface VacuumCardConfig extends LovelaceCardConfig {
    type: 'custom:slick-vacuum-card';
    entity: string;
    start_button_entity?: string;
    automation_entity?: string;
    schedule_time_entity?: string;
}
export interface MowerCardConfig extends LovelaceCardConfig {
    type: 'custom:slick-mower-card';
    entity: string;
    start_button_entity?: string;
    automation_entity?: string;
    schedule_time_entity?: string;
}
export interface CalendarRule {
    pattern: string;
    color: string;
}
export interface CalendarBadgeConfig {
    entity: string;
    icon?: string;
    days?: number;
    color?: string;
    rules?: CalendarRule[];
}
export interface EntityBadgeConfig {
    entity: string;
    icon?: string;
    color?: string;
}
export interface NotificationBadgeCardConfig extends LovelaceCardConfig {
    type: 'custom:slick-notification-badge-card';
    calendars?: CalendarBadgeConfig[];
    entities?: EntityBadgeConfig[];
}
export interface LightControlCardConfig extends LovelaceCardConfig {
    type: 'custom:slick-light-control-card';
    entity: string;
    name?: string;
    covers?: string[];
    layout?: 'auto' | 'compact' | 'small' | 'medium' | 'large';
}
//# sourceMappingURL=types.d.ts.map