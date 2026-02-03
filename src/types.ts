/**
 * Type definitions for Home Assistant custom cards
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
  type: 'custom:wind-compass-card';
  direction_entity: string;
  instant_direction_entity?: string;
  speed_entity: string;
  gust_entity?: string;
  max_speed?: number;
  raffstore_limit_entity?: string;
  rollo_limit_entity?: string;
  warn_multiplier?: number;
  bucket_size?: number;
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
  type: 'custom:mini-weather-card';
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
  type: 'custom:squircle-clock-card';
  display_mode?: 'analog' | 'digital';
  font_style?: 'standard' | 'thin' | 'retro';
  timezone?: string;
  timezone_entity?: string;
}
