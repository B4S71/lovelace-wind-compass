/**
 * Type definitions for Home Assistant custom cards
 * @version 0.1.0
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

// Mini Weather Card Types
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

// Squircle Clock Card Types
export interface SquircleClockCardConfig extends LovelaceCardConfig {
  type: 'custom:slick-squircle-clock-card';
  display_mode?: 'analog' | 'digital';
  font_style?: 'standard' | 'thin' | 'retro';
  timezone?: string;
  timezone_entity?: string;
}

// Simple Climate Card Types
export interface SimpleClimateCardConfig extends LovelaceCardConfig {
  type: 'custom:slick-simple-climate-card';
  entity: string;
  name?: string;
  sensors?: {
    temp?: string;        // override current temp
    target_high?: string; // override target high
    target_low?: string;  // override target low
  };
}

// Energy Flow Card Types
export interface EnergyFlowCardConfig extends LovelaceCardConfig {
  type: 'custom:slick-energy-flow-card';
  title?: string;
  grid_entity?: string;
  grid_import_entity?: string; // Optional separate
  grid_export_entity?: string; // Optional separate
  solar_entity?: string;
  battery_entity?: string;
  battery_soc_entity?: string;
  home_entity?: string;
  autarky_entity?: string;     // New
  self_consumption_entity?: string; // New
  inverted_grid?: boolean;   // true = negative is import
  inverted_battery?: boolean; // true = negative is charge
}

// Person Card Types
export interface PersonCardConfig extends LovelaceCardConfig {
  type: 'custom:slick-person-card';
  people?: string[];
  entity?: string;
  layout?: 'wrap' | 'horizontal';
}

// Vacuum Card Types
export interface VacuumCardConfig extends LovelaceCardConfig {
  type: 'custom:slick-vacuum-card';
  entity: string;
  start_button_entity?: string;
  automation_entity?: string;
  schedule_time_entity?: string;
}

// Mower Card Types
export interface MowerCardConfig extends LovelaceCardConfig {
  type: 'custom:slick-mower-card';
  entity: string;
  start_button_entity?: string;
  automation_entity?: string;
  schedule_time_entity?: string;
}

// Notification Badge Card Types
export interface CalendarRule {
  pattern: string;
  color: string;
}

export interface CalendarBadgeConfig {
  entity: string;
  icon?: string;
  days?: number; // Days lookahead (default 7)
  color?: string; // Default color
  rules?: CalendarRule[]; // Color rules based on content
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




