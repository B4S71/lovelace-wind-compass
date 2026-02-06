/**
 * Mini Weather Card
 * @version 0.2.0
 */

import { LitElement, html, css } from 'lit';
import type {
  HomeAssistant,
  MiniWeatherCardConfig,
  ForecastData,
  HistoryDataPoint,
} from './types';

const CARD_VERSION = "0.2.0";

console.info(
  `%c MINI-WEATHER-CARD %c ${CARD_VERSION} `,
  'color: white; background: #2980b9; font-weight: 700;',
  'color: #2980b9; background: white; font-weight: 700;'
);

// ----------------------------------------------------------------------
// CATMULL-ROM SPLINE LOGIK
// ----------------------------------------------------------------------
function catmullRom2bezier(x: number[], k: number): number[][] {
  const n = x.length - 1;
  if (n < 1) return [];
  const result: number[][] = [];
  const x1 = x[0], y1 = x[1];
  result.push([x1, y1]);

  for (let i = 0; i < n - 1; i++) {
    const p0 = i === 0 ? [x[0], x[1]] : [x[(i - 1) * 2], x[(i - 1) * 2 + 1]];
    const p1 = [x[i * 2], x[i * 2 + 1]];
    const p2 = [x[(i + 1) * 2], x[(i + 1) * 2 + 1]];
    const p3 = i + 2 > n ? p2 : [x[(i + 2) * 2], x[(i + 2) * 2 + 1]];

    const cp1x = p1[0] + (p2[0] - p0[0]) / 6 * k;
    const cp1y = p1[1] + (p2[1] - p0[1]) / 6 * k;
    const cp2x = p2[0] - (p3[0] - p1[0]) / 6 * k;
    const cp2y = p2[1] - (p3[1] - p1[1]) / 6 * k;

    result.push([cp1x, cp1y, cp2x, cp2y, p2[0], p2[1]]);
  }
  return result;
}

function generateSmoothPath(points: number[][]): string {
  if (points.length < 2) return "";
  const flatPoints = points.reduce((acc, p) => [...acc, p[0], p[1]], [] as number[]);
  const curves = catmullRom2bezier(flatPoints, 1); 
  if (curves.length === 0) return "";

  let d = `M ${curves[0][0]},${curves[0][1]} `;
  for (let i = 1; i < curves.length; i++) {
    const c = curves[i];
    d += `C ${c[0]},${c[1]} ${c[2]},${c[3]} ${c[4]},${c[5]} `;
  }
  return d;
}

// ----------------------------------------------------------------------
// TAGESZEIT & FARBVERLÄUFE (basierend auf Sonnenstand)
// ----------------------------------------------------------------------
type TimeOfDay = 'night' | 'early-dawn' | 'late-dawn' | 'morning' | 'noon' | 'early-afternoon' | 'late-afternoon' | 'early-dusk' | 'late-dusk';

function getTimeOfDayFromSun(elevation: number, rising: boolean): TimeOfDay {
  // Nacht: Sonne tief unter Horizont
  if (elevation < -18) return 'night';
  
  // Dämmerungsphasen
  if (elevation >= -18 && elevation < -6) {
    return rising ? 'early-dawn' : 'late-dusk';
  }
  
  if (elevation >= -6 && elevation < 0) {
    return rising ? 'late-dawn' : 'early-dusk';
  }
  
  // Tag: Sonne über Horizont
  if (elevation >= 0 && elevation < 15) {
    return rising ? 'morning' : 'late-afternoon';
  }
  
  if (elevation >= 15 && elevation < 35) {
    return rising ? 'morning' : 'early-afternoon';
  }
  
  if (elevation >= 35) {
    return 'noon';
  }
  
  return 'noon';
}

function isBadWeather(condition: string): boolean {
  const badConditions = ['rainy', 'pouring', 'lightning', 'snowy', 'hail', 'fog'];
  return badConditions.includes(condition);
}

interface Gradients {
  bright: string;
  dark: string;
}

function getGradients(timeOfDay: TimeOfDay, isBad: boolean): Gradients {
  const gradients: Record<string, Gradients> = {
    // SCHÖNWETTER
    'night-good': {
      bright: 'linear-gradient(180deg, #0f2027 0%, #203a43 50%, #2c5364 100%)',
      dark: 'linear-gradient(180deg, #000000 0%, #0a1929 50%, #1a2f42 100%)'
    },
    'early-dawn-good': {
      bright: 'linear-gradient(180deg, #2c3e50 0%, #3a5169 50%, #526c87 100%)',
      dark: 'linear-gradient(180deg, #1a1f2e 0%, #2b3a4d 50%, #3d5167 100%)'
    },
    'late-dawn-good': {
      bright: 'linear-gradient(180deg, #f3904f 0%, #f7b267 50%, #ffd89b 100%)',
      dark: 'linear-gradient(180deg, #d76d47 0%, #e89a5f 50%, #f5c98c 100%)'
    },
    'morning-good': {
      bright: 'linear-gradient(180deg, #56ccf2 0%, #87ceeb 50%, #a8daff 100%)',
      dark: 'linear-gradient(180deg, #3ba5d1 0%, #6bb8e0 50%, #8dc9f2 100%)'
    },
    'noon-good': {
      bright: 'linear-gradient(180deg, #1e88e5 0%, #42a5f5 50%, #64b5f6 100%)',
      dark: 'linear-gradient(180deg, #1565c0 0%, #1e88e5 50%, #42a5f5 100%)'
    },
    'early-afternoon-good': {
      bright: 'linear-gradient(180deg, #42a5f5 0%, #64b5f6 50%, #90caf9 100%)',
      dark: 'linear-gradient(180deg, #2196f3 0%, #42a5f5 50%, #64b5f6 100%)'
    },
    'late-afternoon-good': {
      bright: 'linear-gradient(180deg, #ff9a56 0%, #ffb07c 50%, #ffcda3 100%)',
      dark: 'linear-gradient(180deg, #f57c42 0%, #ff9656 50%, #ffb486 100%)'
    },
    'early-dusk-good': {
      bright: 'linear-gradient(180deg, #fa709a 0%, #fc8ba8 50%, #ffa7bd 100%)',
      dark: 'linear-gradient(180deg, #e85285 0%, #f56a94 50%, #fc8ba8 100%)'
    },
    'late-dusk-good': {
      bright: 'linear-gradient(180deg, #434343 0%, #5a5a5a 50%, #717171 100%)',
      dark: 'linear-gradient(180deg, #1a1a1a 0%, #2f2f2f 50%, #454545 100%)'
    },

    // SCHLECHTWETTER
    'night-bad': {
      bright: 'linear-gradient(180deg, #263238 0%, #37474f 50%, #455a64 100%)',
      dark: 'linear-gradient(180deg, #0d1117 0%, #1a1f2e 50%, #263238 100%)'
    },
    'early-dawn-bad': {
      bright: 'linear-gradient(180deg, #455a64 0%, #546e7a 50%, #607d8b 100%)',
      dark: 'linear-gradient(180deg, #2c3e50 0%, #34495e 50%, #455a64 100%)'
    },
    'late-dawn-bad': {
      bright: 'linear-gradient(180deg, #78909c 0%, #90a4ae 50%, #b0bec5 100%)',
      dark: 'linear-gradient(180deg, #546e7a 0%, #607d8b 50%, #78909c 100%)'
    },
    'morning-bad': {
      bright: 'linear-gradient(180deg, #607d8b 0%, #78909c 50%, #90a4ae 100%)',
      dark: 'linear-gradient(180deg, #455a64 0%, #546e7a 50%, #607d8b 100%)'
    },
    'noon-bad': {
      bright: 'linear-gradient(180deg, #546e7a 0%, #607d8b 50%, #78909c 100%)',
      dark: 'linear-gradient(180deg, #37474f 0%, #455a64 50%, #546e7a 100%)'
    },
    'early-afternoon-bad': {
      bright: 'linear-gradient(180deg, #607d8b 0%, #78909c 50%, #90a4ae 100%)',
      dark: 'linear-gradient(180deg, #455a64 0%, #546e7a 50%, #607d8b 100%)'
    },
    'late-afternoon-bad': {
      bright: 'linear-gradient(180deg, #78909c 0%, #8d9da6 50%, #a3b1ba 100%)',
      dark: 'linear-gradient(180deg, #546e7a 0%, #607d8b 50%, #78909c 100%)'
    },
    'early-dusk-bad': {
      bright: 'linear-gradient(180deg, #546e7a 0%, #607d8b 50%, #78909c 100%)',
      dark: 'linear-gradient(180deg, #37474f 0%, #455a64 50%, #546e7a 100%)'
    },
    'late-dusk-bad': {
      bright: 'linear-gradient(180deg, #37474f 0%, #455a64 50%, #546e7a 100%)',
      dark: 'linear-gradient(180deg, #1c2329 0%, #263238 50%, #37474f 100%)'
    }
  };

  const key = `${timeOfDay}-${isBad ? 'bad' : 'good'}`;
  return gradients[key] || gradients['noon-good'];
}

// ----------------------------------------------------------------------
// HAUPT KARTE
// ----------------------------------------------------------------------
export class MiniWeatherCard extends LitElement {
  hass!: HomeAssistant;
  config!: MiniWeatherCardConfig;
  _forecast: ForecastData[] | null = null;
  _historyData: HistoryDataPoint[] = [];
  _cardHeight: number = 200;
  _cardWidth: number = 300;
  _resizeObserver!: ResizeObserver;
  _unsub?: () => void;
  _historyTimeout?: number;
  
  static get properties() {
    return {
      hass: { attribute: false },
      config: { state: true },
      _forecast: { state: true },
      _historyData: { state: true },
      _cardWidth: { state: true },
      _cardHeight: { state: true }
    };
  }

  static getConfigElement() { return document.createElement("slick-minimal-weather-card-editor"); }
  
  static getStubConfig(hass: HomeAssistant) {
    let entity = "";
    if (hass && hass.states) {
       const weatherEntities = Object.keys(hass.states).filter(id => id.startsWith("weather."));
       if (weatherEntities.length > 0) entity = weatherEntities[0];
    }
    return { 
        type: 'custom:slick-minimal-weather-card', 
        entity: entity, 
        title: "Wetter", 
        mode: "daily", 
        sampling_size: 50, 
        history_hours: 24 
    }; 
  }

  constructor() {
    super();
    this._forecast = null;
    this._historyData = [];
    this._cardHeight = 200;
    this._cardWidth = 300;
    
    this._resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
            this._cardWidth = entry.contentRect.width;
            this._cardHeight = entry.contentRect.height;
            this.requestUpdate();
        }
    });
  }

  connectedCallback() {
    super.connectedCallback();
    this._resizeObserver.observe(this as unknown as Element);
    if (this.hass && this.config) {
      this._subscribeForecast();
      this._updateHistory();
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._resizeObserver.disconnect();
    this._unsubscribeForecast();
  }

  setConfig(config: MiniWeatherCardConfig) {
    if (!config) throw new Error("Invalid configuration");

    const newConfig = {
      title: "Wetter",
      mode: "daily",
      temp_sensor: undefined,
      history_entity: undefined,
      sun_entity: "sun.sun",
      sampling_size: 50,
      history_hours: 24,
      ...config
    };

    if (newConfig.mode && !['daily', 'hourly'].includes(newConfig.mode)) {
        throw new Error(`Invalid mode: ${newConfig.mode}. Expected 'daily' or 'hourly'.`);
    }

    this.config = newConfig as MiniWeatherCardConfig;
  }

  updated(changedProps: Map<string, any>) {
    super.updated(changedProps);
    if (changedProps.has('config') || changedProps.has('hass')) {
      if (!this._unsub && this.config.entity) this._subscribeForecast();
      if (this._historyTimeout) clearTimeout(this._historyTimeout);
      this._historyTimeout = window.setTimeout(() => this._updateHistory(), 10000);
    }
  }

  async _subscribeForecast() {
    this._unsubscribeForecast();
    if (!this.hass || !this.config || !this.config.entity || !this.hass.connection) return;
    const entityId = this.config.entity;
    const stateObj = this.hass.states[entityId];
    if (!stateObj) return;

    if (this.config.mode === 'daily' && stateObj.attributes.forecast?.length > 0) {
        this._forecast = stateObj.attributes.forecast;
        return;
    }

    try {
        this._unsub = await this.hass.connection.subscribeMessage(
            (event: any) => { if (event && event.forecast) { this._forecast = event.forecast; this.requestUpdate(); } },
            { type: "weather/subscribe_forecast", forecast_type: this.config.mode || 'daily', entity_id: entityId }
        );
    } catch (err) { console.error("MiniWeatherCard: Subscription failed", err); }
  }

  _unsubscribeForecast() {
    if (this._unsub) { this._unsub(); this._unsub = undefined; }
  }

  async _updateHistory() {
    if (!this.hass || !this.config.history_entity) { this._historyData = []; return; }
    
    const entityId = this.config.history_entity;
    const hoursBack = parseInt(String(this.config.history_hours)) || 24;
    
    const endTime = new Date();
    const startTime = new Date(endTime.getTime() - hoursBack * 60 * 60 * 1000);
    
    const startStr = encodeURIComponent(startTime.toISOString());
    const endStr = encodeURIComponent(endTime.toISOString());
    const entityStr = encodeURIComponent(entityId);

    try {
        const history = await this.hass.callApi<any[][]>("GET", `history/period/${startStr}?filter_entity_id=${entityStr}&end_time=${endStr}&minimal_response`);
        if (history && history.length > 0 && history[0].length > 0) {
            const rawData: HistoryDataPoint[] = history[0]
                .map((pt: any) => ({ time: new Date(pt.last_changed).getTime(), state: parseFloat(pt.state) }))
                .filter((pt: HistoryDataPoint) => !isNaN(pt.state));
            
            const targetPoints = this.config.sampling_size || 50;
            if (rawData.length > targetPoints) {
                const step = Math.ceil(rawData.length / targetPoints);
                this._historyData = rawData.filter((_, i) => i % step === 0);
            } else {
                this._historyData = rawData;
            }
        } else {
            this._historyData = [];
        }
    } catch (err) { this._historyData = []; }
  }

  _calculatePathPoints() {
    const data = this._historyData;
    if (!data || data.length < 2 || this._cardWidth === 0 || this._cardHeight === 0) return null;

    const marginY = 20; 
    const width = this._cardWidth;
    const height = this._cardHeight;
    const graphHeight = height - (marginY * 2);

    let minVal = data[0].state;
    let maxVal = data[0].state;
    const minTime = data[0].time;
    const maxTime = data[data.length - 1].time;

    data.forEach(pt => {
        if (pt.state < minVal) minVal = pt.state;
        if (pt.state > maxVal) maxVal = pt.state;
    });

    if (maxVal === minVal) { maxVal += 0.5; minVal -= 0.5; }
    const valRange = maxVal - minVal;
    const timeRange = maxTime - minTime;
    if (timeRange <= 0) return null;

    const points = data.map(pt => {
        const x = ((pt.time - minTime) / timeRange) * width;
        const yNormalized = (pt.state - minVal) / valRange;
        const y = height - marginY - (yNormalized * graphHeight);
        return [x, y];
    });

    const linePath = generateSmoothPath(points);
    if (!linePath) return null;

    return {
        line: linePath,
        area: linePath + ` L ${width},${height} L 0,${height} Z`
    };
  }

  render() {
    if (!this.config) return html``;
    if (!this.hass) return html``;

    const stateObj = this.config.entity ? this.hass.states[this.config.entity] : undefined;

    let currentTemp: number | string = stateObj?.attributes?.temperature ?? '--';
    if (this.config.temp_sensor) {
        const sensorState = this.hass.states[this.config.temp_sensor];
        if (sensorState && !isNaN(parseFloat(sensorState.state))) currentTemp = sensorState.state;
    }

    const FIXED_HEIGHT = 110; const ROW_HEIGHT = 28;
    let maxRows = Math.floor((this._cardHeight - FIXED_HEIGHT) / ROW_HEIGHT);
    if (maxRows < 0) maxRows = 0;
    const showForecast = this._cardHeight > 140;
    const forecast = this._forecast ? this._forecast.slice(0, maxRows) : [];
    
    const isHourly = this.config.mode === 'hourly';
    let headerLabel: any = html`&nbsp;`;
    const fullForecast = this._forecast || [];
    if (fullForecast.length > 0) {
        const today = fullForecast[0];
        const h = today.temperature ?? today.temp_max;
        const l = today.templow ?? today.temp_min;
        const hVal = h !== undefined ? Math.round(h) : '--';
        const lVal = l !== undefined ? Math.round(l) : '--';
        if (isHourly) headerLabel = html`${hVal}°`;
        else headerLabel = lVal === '--' ? html`H:${hVal}°` : html`H:${hVal}° L:${lVal}°`;
    }

    const pathData = this._calculatePathPoints();
    const clipPathStyle = pathData ? `path('${pathData.area}')` : 'none';
    const gradients = this._getCurrentGradients();

    return html`
      <ha-card @click="${this._openMoreInfo}" style="cursor: pointer;">
        <div class="bg-container">
            <div class="bg-layer bright" style="background: ${gradients.bright};"></div>
            <div class="bg-layer dark" style="background: ${gradients.dark}; clip-path: ${clipPathStyle}; -webkit-clip-path: ${clipPathStyle};"></div>
            
            ${this.config.history_entity && pathData ? html`
                <svg class="history-svg" viewBox="0 0 ${this._cardWidth} ${this._cardHeight}" preserveAspectRatio="none">
                    <defs>
                        <linearGradient id="lineFade" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" style="stop-color:white; stop-opacity:0.0;" />
                            <stop offset="20%" style="stop-color:white; stop-opacity:0.1;" />
                            <stop offset="100%" style="stop-color:white; stop-opacity:0.8;" />
                        </linearGradient>
                    </defs>
                    
                    <path d="${pathData.line}" fill="none" stroke="url(#lineFade)" stroke-width="1.2" stroke-linecap="round" vector-effect="non-scaling-stroke" />
                </svg>
            ` : ''}
        </div>

        <div class="container content-layer">
            <div class="header">
                <div class="temp-big">${currentTemp !== undefined ? Math.round(Number(currentTemp)) + "°" : "--"}</div>
                <div class="header-right">
                    <ha-icon icon="${this._getIcon(stateObj ? stateObj.state : '')}" class="main-icon"></ha-icon>
                    <div class="hl-label">${headerLabel}</div>
                </div>
            </div>

            ${showForecast ? html`
                <div class="forecast-list">
                    ${(() => {
                      let globalMin = Infinity, globalMax = -Infinity;
                      for (const f of forecast) {
                        const hi = f.temperature ?? f.temp_max;
                        const lo = f.templow ?? f.temp_min;
                        if (lo !== undefined && lo < globalMin) globalMin = lo;
                        if (hi !== undefined && hi > globalMax) globalMax = hi;
                        if (lo === undefined && hi !== undefined && hi < globalMin) globalMin = hi;
                      }
                      if (!isFinite(globalMin)) globalMin = 0;
                      if (!isFinite(globalMax)) globalMax = globalMin + 1;
                      if (globalMax === globalMin) globalMax = globalMin + 1;
                      return forecast.map((day: ForecastData) => this._renderRow(day, globalMin, globalMax));
                    })()}
                    ${fullForecast.length === 0 ? html`<div class="loading">Lade...</div>` : ''}
                </div>
            ` : html`<div style="flex:1;"></div>`} 

            <div class="footer">${this.config.title}</div>
        </div>
      </ha-card>
    `;
  }

  _renderRow(day: ForecastData, globalMin: number = 0, globalMax: number = 1) {
    const date = new Date(day.datetime);
    const isHourly = this.config.mode === 'hourly';
    const label = isHourly ? date.toLocaleTimeString(this.hass.language, { hour: '2-digit', minute: '2-digit' }) : date.toLocaleDateString(this.hass.language, { weekday: 'short' });
    const temp = day.temperature ?? day.temp_max;
    const low = day.templow ?? day.temp_min;

    if (isHourly && temp !== undefined) return html`<div class="row hourly"><div class="day-name">${label}</div><div class="icon-small"><ha-icon icon="${this._getIcon(day.condition)}"></ha-icon></div><div class="temp-single">${Math.round(temp)}°</div></div>`;
    else if (low !== undefined && temp !== undefined) {
      const range = globalMax - globalMin;
      const leftPct = ((low - globalMin) / range) * 100;
      const rightPct = ((globalMax - temp) / range) * 100;
      return html`<div class="row"><div class="day-name">${label}</div><div class="icon-small"><ha-icon icon="${this._getIcon(day.condition)}"></ha-icon></div><div class="bars"><span class="val-low">${Math.round(low)}°</span><div class="bar-track"><div class="bar-fill" style="left:${leftPct}%;right:${rightPct}%"></div></div><span class="val-high">${Math.round(temp)}°</span></div></div>`;
    }
    return html``;
  }

  _getIcon(condition: string): string {
    const map: Record<string, string> = { 'sunny': 'mdi:weather-sunny', 'clear-night': 'mdi:weather-night', 'partlycloudy': 'mdi:weather-partly-cloudy', 'cloudy': 'mdi:cloud', 'rainy': 'mdi:weather-rainy', 'pouring': 'mdi:weather-pouring', 'fog': 'mdi:weather-fog', 'hail': 'mdi:weather-hail', 'snowy': 'mdi:weather-snowy', 'lightning': 'mdi:weather-lightning' };
    return map[condition] || 'mdi:weather-cloudy';
  }

  _openMoreInfo() {
    if (this.config.entity) {
      this.dispatchEvent(new CustomEvent('hass-more-info', { 
        composed: true,
        detail: { entityId: this.config.entity }
      }));
    }
  }

  _getCurrentGradients(): Gradients {
    if (!this.hass || !this.config || !this.config.entity) {
      return { bright: 'linear-gradient(180deg, #2c3e50 0%, #151a1e 100%)', dark: 'linear-gradient(180deg, #243342 0%, #0a0a0a 100%)' };
    }

    const stateObj = this.hass.states[this.config.entity];
    if (!stateObj) {
      return { bright: 'linear-gradient(180deg, #2c3e50 0%, #151a1e 100%)', dark: 'linear-gradient(180deg, #243342 0%, #0a0a0a 100%)' };
    }

    const sunEntityId = this.config.sun_entity || 'sun.sun';
    const sunEntity = this.hass.states[sunEntityId];
    let timeOfDay: TimeOfDay = 'noon';
    
    if (sunEntity && sunEntity.attributes) {
      const elevation = sunEntity.attributes.elevation || 0;
      const rising = sunEntity.attributes.rising || false;
      timeOfDay = getTimeOfDayFromSun(elevation, rising);
    }

    const condition = stateObj.state;
    const isBad = isBadWeather(condition);

    return getGradients(timeOfDay, isBad);
  }

  static get styles() {
    return css`
      :host { display: block; height: 100%; isolation: isolate; }
      ha-card {
        background: transparent; color: white;
        border-radius: var(--ha-card-border-radius, 12px);
        height: 100%; box-sizing: border-box; overflow: hidden; display: flex; flex-direction: column;
        box-shadow: var(--ha-card-box-shadow, none); position: relative;
        container-type: size;
      }
      .bg-container { position: absolute; top: 0; left: 0; right: 0; bottom: 0; z-index: 0; overflow: hidden; border-radius: var(--ha-card-border-radius, 12px); }
      .bg-layer { position: absolute; top: 0; left: 0; right: 0; bottom: 0; transition: background 1s ease; }
      .bg-layer.bright { z-index: 1; }
      .bg-layer.dark { z-index: 2; }
      .history-svg { position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 3; pointer-events: none; }
      .content-layer { position: relative; z-index: 4; }
      .container { padding: clamp(12px, 4cqi, 20px); height: 100%; display: flex; flex-direction: column; box-sizing: border-box; min-height: 0; overflow: hidden; }
      .header { display: flex; justify-content: space-between; align-items: flex-start; flex: 0 0 auto; margin-bottom: clamp(4px, 2cqi, 10px); }
      .temp-big { font-size: clamp(2rem, 10cqi, 4rem); font-weight: 100; line-height: 1; text-shadow: 0 1px 5px rgba(0,0,0,0.5); white-space: nowrap; letter-spacing: -1px; overflow: hidden; }
      .header-right { display: flex; flex-direction: column; align-items: flex-end; text-shadow: 0 1px 5px rgba(0,0,0,0.5); }
      .main-icon { --mdc-icon-size: clamp(22px, 7cqi, 36px); margin-bottom: 4px; filter: drop-shadow(0 1px 5px rgba(0,0,0,0.5)); }
      .hl-label { font-size: clamp(0.75rem, 3cqi, 1rem); font-weight: 300; opacity: 0.9; white-space: nowrap; }
      .forecast-list { display: flex; flex-direction: column; gap: 0; flex: 1 1 auto; overflow: hidden; justify-content: flex-start; text-shadow: 0 1px 3px rgba(0,0,0,0.8); }
      .row { display: grid; grid-template-columns: minmax(30px, 50px) 30px 1fr; align-items: center; font-size: clamp(0.75rem, 3cqi, 1rem); height: 28px; }
      .day-name { font-weight: 400; opacity: 0.9; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
      .icon-small { text-align: center; }
      .icon-small ha-icon { --mdc-icon-size: 20px; filter: drop-shadow(0 1px 2px rgba(0,0,0,0.8)); }
      .bars { display: flex; align-items: center; gap: 8px; justify-content: flex-end; }
      .val-low { opacity: 0.6; width: 25px; text-align: right; }
      .val-high { font-weight: 500; width: 25px; text-align: right; }
      .bar-track { flex-grow: 1; height: 5px; background: rgba(255,255,255,0.15); border-radius: 3px; position: relative; min-width: 50px; max-width: 100px; overflow: hidden; box-shadow: inset 0 1px 2px rgba(0,0,0,0.2); }
      .bar-fill { position: absolute; top: 0; bottom: 0; background: linear-gradient(90deg, #4facfe 0%, #00f2fe 50%, #f5af19 100%); border-radius: 3px; opacity: 0.85; transition: left 0.4s ease, right 0.4s ease; }
      .hourly .temp-single { text-align: right; font-weight: 500; padding-right: 5px; }
      .footer { margin-top: auto; padding-top: 6px; text-align: center; font-size: clamp(0.6rem, 2cqi, 0.75rem); opacity: 0.5; text-transform: uppercase; letter-spacing: 1px; flex: 0 0 auto; text-shadow: 0 1px 2px rgba(0,0,0,0.5); font-weight: 300; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
      .loading { text-align: center; font-size: 0.8rem; opacity: 0.5; padding: 10px; }
    `;
  }
}
if (!customElements.get("slick-minimal-weather-card")) {
  customElements.define("slick-minimal-weather-card", MiniWeatherCard);
}

class MiniWeatherCardEditor extends LitElement {
  hass!: HomeAssistant;
  _config!: MiniWeatherCardConfig;
  
  static get properties() { return { hass: {}, _config: {} }; }
  setConfig(config: MiniWeatherCardConfig) { this._config = config; }
  _valueChanged(ev: CustomEvent) { const newConfig = ev.detail.value; const event = new CustomEvent("config-changed", { detail: { config: newConfig }, bubbles: true, composed: true, }); this.dispatchEvent(event); }
  render() { 
    if (!this.hass || !this._config) return html``;
    const schema = [
      { name: "entity", label: "Wetter Entität", selector: { entity: { domain: "weather" } } },
      { name: "title", label: "Titel", selector: { text: {} } },
      { name: "temp_sensor", label: "Temp. Override (Sensor)", selector: { entity: { domain: "sensor" } } },
      { name: "history_entity", label: "Verlauf (Hintergrund)", selector: { entity: { domain: "sensor" } } },
      { name: "sun_entity", label: "Sonnen-Sensor", selector: { entity: { domain: "sun" } } },
      
      { 
        name: "history_hours", 
        label: "Verlauf Zeitraum", 
        selector: { 
            select: { 
                options: [
                    { value: "1", label: "1 Stunde" },
                    { value: "6", label: "6 Stunden" },
                    { value: "12", label: "12 Stunden" },
                    { value: "24", label: "24 Stunden" },
                    { value: "48", label: "2 Tage" },
                    { value: "72", label: "3 Tage" },
                    { value: "168", label: "7 Tage" }
                ] 
            } 
        } 
      },

      { name: "sampling_size", label: "Glättung (Punkte)", selector: { number: { min: 5, max: 200, mode: "slider" } } },
      { name: "mode", label: "Modus", selector: { select: { options: [ { value: "daily", label: "Täglich" }, { value: "hourly", label: "Stündlich" } ] } } }
    ];
    return html`<ha-form .hass=${this.hass} .data=${this._config} .schema=${schema} .computeLabel=${(s: any) => s.label} @value-changed=${this._valueChanged}></ha-form>`; 
  }
}
if (!customElements.get("slick-minimal-weather-card-editor")) {
  customElements.define("slick-minimal-weather-card-editor", MiniWeatherCardEditor);
}

window.customCards = window.customCards || [];
window.customCards.push({ 
  type: "slick-minimal-weather-card", 
  name: "Slick Minimal Weather", 
  preview: true,
  description: "Minimalist weather card with history and forecasting." 
});
