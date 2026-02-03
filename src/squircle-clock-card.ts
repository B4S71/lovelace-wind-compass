import type {
  HomeAssistant,
  SquircleClockCardConfig,
} from './types';

interface SchemaItem {
  name: string;
  label: string;
  selector: any;
}

// --- KONFIGURATIONSSCHEMA ---
const CARD_SCHEMA: SchemaItem[] = [
  {
    name: "display_mode",
    label: "Anzeigemodus",
    selector: {
      select: {
        mode: "dropdown",
        options: [
          { value: "analog", label: "Analog (Klassisch)" },
          { value: "digital", label: "Digital (Hybrid)" }
        ]
      }
    }
  },
  {
    name: "font_style",
    label: "Schriftart",
    selector: {
      select: {
        mode: "dropdown",
        options: [
          { value: "standard", label: "Standard (Apple Bold)" },
          { value: "thin", label: "Modern & Dünn (iOS)" },
          { value: "retro", label: "Retro Bahnhof (DIN-Style)" }
        ]
      }
    }
  }
];

class SquircleClockCard extends HTMLElement {
  private _hass?: HomeAssistant;
  private config!: SquircleClockCardConfig;
  private _timer?: number;
  private _resizeObserver?: ResizeObserver;
  private hourHand?: SVGLineElement | null;
  private minuteHand?: SVGLineElement | null;
  private secondHand?: SVGLineElement | null;
  private _center?: { x: number; y: number };
  private _timeDisplay?: HTMLElement | null;
  private _dateDisplay?: HTMLElement | null;
  private _ticks: (HTMLElement | null)[] = [];
  private _lastMin: number = -1;
  private _lastSecond: number = -1;

  static getConfigElement() {
    return document.createElement("squircle-clock-editor");
  }

  static getStubConfig() {
    return { 
      type: "custom:squircle-clock-card",
      display_mode: "analog",
      font_style: "standard"
    };
  }

  set hass(hass: HomeAssistant) { this._hass = hass; }
  
  setConfig(config: SquircleClockCardConfig) { 
    this.config = config; 
    if (this.shadowRoot) {
        this._render();
        this._drawContent(); 
    }
  }

  getLayoutOptions() {
    return {
      grid_rows: 2,
      grid_columns: 2,
      grid_min_rows: 1,
      grid_min_columns: 1,
    };
  }

  connectedCallback() {
    if (!this.shadowRoot) this.attachShadow({ mode: 'open' });
    this._render();
    this._drawContent();
    this._startClock();
    this._resizeObserver = new ResizeObserver(() => this._drawContent());
    this._resizeObserver.observe(this);
  }

  disconnectedCallback() {
    this._stopClock();
    this._resizeObserver?.disconnect();
  }

  _startClock() {
    if(this._timer) cancelAnimationFrame(this._timer);
    const update = () => {
      const now = new Date();
      let displayTime = now;

      // Zeitzonen-Logik
      let timezone = this.config.timezone;
      
      // Prüfe ob timezone_entity gesetzt ist und hole Zeitzone daraus
      if (this.config.timezone_entity && this._hass) {
        const entity = this._hass.states[this.config.timezone_entity];
        if (entity && entity.state) {
          timezone = entity.state;
        }
      }
      
      if (timezone) {
        try {
            const tzString = now.toLocaleString('en-US', { timeZone: timezone });
            displayTime = new Date(tzString);
            displayTime.setMilliseconds(now.getMilliseconds());
        } catch(e) {
            // Fallback falls Zeitzone ungültig
            displayTime = now;
        }
      }

      if (this.config.display_mode === 'digital') {
        this._updateDigital(displayTime);
      } else {
        this._updateAnalog(displayTime);
      }
      this._timer = requestAnimationFrame(update);
    };
    this._timer = requestAnimationFrame(update);
  }

  _stopClock() { if (this._timer) cancelAnimationFrame(this._timer); }

  // --- MATHEMATIK ---
  _getPointOnRoundedRect(angleDeg: number, w: number, h: number, radius: number, inset: number): { x: number; y: number } {
    const angleRad = (angleDeg - 90) * (Math.PI / 180);
    const xCenter = w / 2;
    const yCenter = h / 2;
    
    const width = Math.max(0, w - 2 * inset);
    const height = Math.max(0, h - 2 * inset);
    const r = Math.max(0, radius - inset);
    const halfW = width / 2;
    const halfH = height / 2;

    const absCos = Math.abs(Math.cos(angleRad));
    const absSin = Math.abs(Math.sin(angleRad));
    
    let x: number, y: number;
    if (halfW * absSin <= halfH * absCos) {
      x = halfW * Math.sign(Math.cos(angleRad));
      y = halfW * Math.tan(angleRad) * Math.sign(Math.cos(angleRad));
    } else {
      x = halfH / Math.tan(angleRad) * Math.sign(Math.sin(angleRad));
      y = halfH * Math.sign(Math.sin(angleRad));
    }

    const innerW = Math.max(0, halfW - r);
    const innerH = Math.max(0, halfH - r);

    if (Math.abs(x) > innerW && Math.abs(y) > innerH) {
      const dx = Math.abs(x) - innerW;
      const dy = Math.abs(y) - innerH;
      const dist = Math.sqrt(dx * dx + dy * dy);
      x = (innerW + (dx / dist) * r) * Math.sign(x);
      y = (innerH + (dy / dist) * r) * Math.sign(y);
    }
    return { x: xCenter + x, y: yCenter + y };
  }

  // --- CSS FÜR SCHRIFTARTEN ---
  _getFontStyle(): string {
      const style = this.config.font_style || 'standard';
      switch(style) {
          case 'thin':
              return `
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
                font-weight: 200;
              `;
          case 'retro':
              return `
                font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
                font-weight: 700;
                letter-spacing: 0.5px;
              `;
          case 'standard':
          default:
              return `
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
                font-weight: 600;
              `;
      }
  }

  // --- RENDERING ---
  _render() {
    if (!this.shadowRoot) return;
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block; width: 100%; height: 100%;
          background: var(--ha-card-background, var(--card-background-color, white));
          border-radius: var(--ha-card-border-radius, 12px);
          box-shadow: var(--ha-card-box-shadow, none);
          overflow: hidden;
          box-sizing: border-box;
          position: relative;
        }
        svg { width: 100%; height: 100%; display: block; position: absolute; top: 0; left: 0; }
        
        /* Analog Styles */
        text.analog-num {
          ${this._getFontStyle()}
          fill: var(--primary-text-color); 
          text-anchor: middle; dominant-baseline: middle;
        }
        #hour-hand, #minute-hand { stroke: var(--primary-text-color); stroke-width: 6; stroke-linecap: round; }
        #second-hand { stroke: #ff9500; stroke-width: 2.5; stroke-linecap: round; }
        #center-dot { fill: #ff9500; stroke: var(--primary-text-color); stroke-width: 1.5; }

        /* Digital Styles */
        .digital-container {
            position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
            text-align: center; 
            color: var(--primary-text-color); pointer-events: none;
            ${this._getFontStyle()}
        }
        .time-big { font-size: 1em; line-height: 1; font-variant-numeric: tabular-nums; }
        .date-small { 
            font-weight: 500; 
            opacity: 0.6; 
            margin-top: 4px; 
            text-transform: uppercase; 
            font-weight: ${this.config.font_style === 'thin' ? '400' : 'bold'};
        }
        
        /* Aktiver Sekunden-Tick (Digital) */
        .active-tick { 
            stroke: #ff9500 !important; 
            stroke-opacity: 1 !important; 
            stroke-width: 3px !important; 
        }
      </style>
      <div id="content"></div>
    `;
  }

  _drawContent() {
    if (!this.shadowRoot) return;
    const container = this.shadowRoot.getElementById('content');
    if (!container) return;

    const rect = this.getBoundingClientRect();
    const w = rect.width || 300;
    const h = rect.height || 300;
    const minDim = Math.min(w, h);

    const style = window.getComputedStyle(this);
    let rVal = parseFloat(style.borderTopLeftRadius);
    if (style.borderTopLeftRadius && style.borderTopLeftRadius.includes('%')) {
        rVal = (minDim * parseFloat(style.borderTopLeftRadius)) / 100;
    }
    const radius = rVal || (minDim * 0.22);

    const mode = this.config.display_mode || 'analog';

    if (mode === 'analog') {
        this._drawAnalog(container, w, h, radius, minDim);
    } else {
        this._drawDigital(container, w, h, radius, minDim);
    }
  }

  _drawAnalog(container: HTMLElement, w: number, h: number, radius: number, minDim: number) {
    let ticks = '';
    for (let i = 0; i < 60; i++) {
      const isHour = i % 5 === 0;
      const angle = i * 6;
      const p2 = this._getPointOnRoundedRect(angle, w, h, radius, 5); 
      const p1 = this._getPointOnRoundedRect(angle, w, h, radius, isHour ? 20 : 12);
      const color = isHour ? 'var(--primary-text-color)' : 'var(--secondary-text-color)';
      
      // Bei Retro dicke Striche, bei Thin dünne
      let sw = isHour ? 3 : 1.5;
      if (this.config.font_style === 'retro' && isHour) sw = 4.5;
      if (this.config.font_style === 'retro' && !isHour) sw = 2;
      
      ticks += `<line x1="${p1.x}" y1="${p1.y}" x2="${p2.x}" y2="${p2.y}" stroke="${color}" stroke-width="${sw}" stroke-linecap="round" />`;
    }

    const nPos = {
      12: this._getPointOnRoundedRect(0, w, h, radius, minDim*0.25),
      3:  this._getPointOnRoundedRect(90, w, h, radius, minDim*0.25),
      6:  this._getPointOnRoundedRect(180, w, h, radius, minDim*0.25),
      9:  this._getPointOnRoundedRect(270, w, h, radius, minDim*0.25)
    };

    container.innerHTML = `
      <svg viewBox="0 0 ${w} ${h}">
        ${ticks}
        <text class="analog-num" style="font-size: ${Math.max(12, minDim/10)}px" x="${nPos[12].x}" y="${nPos[12].y}">12</text>
        <text class="analog-num" style="font-size: ${Math.max(12, minDim/10)}px" x="${nPos[3].x}" y="${nPos[3].y}">3</text>
        <text class="analog-num" style="font-size: ${Math.max(12, minDim/10)}px" x="${nPos[6].x}" y="${nPos[6].y}">6</text>
        <text class="analog-num" style="font-size: ${Math.max(12, minDim/10)}px" x="${nPos[9].x}" y="${nPos[9].y}">9</text>
        <line id="hour-hand" x1="${w/2}" y1="${h/2}" x2="${w/2}" y2="${h/2 - minDim/4}" />
        <line id="minute-hand" x1="${w/2}" y1="${h/2}" x2="${w/2}" y2="${h/2 - minDim/2.8}" />
        <line id="second-hand" x1="${w/2}" y1="${h/2 + 15}" x2="${w/2}" y2="${h/2 - minDim/2.4}" />
        <circle id="center-dot" cx="${w/2}" cy="${h/2}" r="3.5" />
      </svg>
    `;
    this.hourHand = this.shadowRoot?.querySelector('#hour-hand');
    this.minuteHand = this.shadowRoot?.querySelector('#minute-hand');
    this.secondHand = this.shadowRoot?.querySelector('#second-hand');
    this._center = { x: w/2, y: h/2 };
  }

  _drawDigital(container: HTMLElement, w: number, h: number, radius: number, minDim: number) {
    let ticks = '';
    for (let i = 0; i < 60; i++) {
      const angle = i * 6;
      const p2 = this._getPointOnRoundedRect(angle, w, h, radius, 6); 
      const p1 = this._getPointOnRoundedRect(angle, w, h, radius, 14); 
      
      ticks += `<line id="tick-${i}" x1="${p1.x}" y1="${p1.y}" x2="${p2.x}" y2="${p2.y}" 
                stroke="var(--secondary-text-color)" 
                stroke-opacity="0.4" 
                stroke-width="1.5" 
                stroke-linecap="round" />`;
    }

    container.innerHTML = `
      <svg viewBox="0 0 ${w} ${h}">${ticks}</svg>
      <div class="digital-container">
        <div class="time-big" id="time-display" style="font-size: ${minDim * 0.25}px">--:--</div>
        <div class="date-small" id="date-display" style="font-size: ${minDim * 0.08}px">--</div>
      </div>
    `;
    this._timeDisplay = this.shadowRoot?.querySelector('#time-display');
    this._dateDisplay = this.shadowRoot?.querySelector('#date-display');
    this._ticks = [];
    for(let i=0; i<60; i++) this._ticks.push(this.shadowRoot?.querySelector(`#tick-${i}`) || null);
    
    this._lastMin = -1;
    this._lastSecond = -1;
    const now = new Date();
    // Falls Zeitzone konfiguriert ist, direkt anwenden für Initial-Render
    if (this.config.timezone) {
        try {
            const tzString = now.toLocaleString('en-US', { timeZone: this.config.timezone });
            const tzTime = new Date(tzString);
            this._updateDigital(tzTime, true);
        } catch(e) { this._updateDigital(now, true); }
    } else {
        this._updateDigital(now, true);
    }
  }

  _updateAnalog(time: Date) {
    if (!this.hourHand) return;
    const s = time.getSeconds() + time.getMilliseconds() / 1000;
    const m = time.getMinutes() + s / 60;
    const h = (time.getHours() % 12) + m / 60;
    const { x, y } = this._center || { x: 0, y: 0 };
    this.secondHand?.setAttribute('transform', `rotate(${s * 6} ${x} ${y})`);
    this.minuteHand?.setAttribute('transform', `rotate(${m * 6} ${x} ${y})`);
    this.hourHand.setAttribute('transform', `rotate(${h * 30} ${x} ${y})`);
  }

  _updateDigital(time: Date, force: boolean = false) {
    if (!this._timeDisplay) return;
    const seconds = time.getSeconds();

    if (force || this._lastMin !== time.getMinutes()) {
        const hours = String(time.getHours()).padStart(2, '0');
        const minutes = String(time.getMinutes()).padStart(2, '0');
        this._timeDisplay.textContent = `${hours}:${minutes}`;
        
        const options: Intl.DateTimeFormatOptions = { weekday: 'short', day: 'numeric' };
        const localeOptions: Intl.DateTimeFormatOptions = { ...options };
        if (this.config.timezone) localeOptions.timeZone = this.config.timezone;
        if (this._dateDisplay) {
          this._dateDisplay.textContent = new Date().toLocaleDateString('de-DE', localeOptions);
        }
        this._lastMin = time.getMinutes();
    }

    if (force || this._lastSecond !== seconds) {
        if (this._lastSecond !== -1 && this._ticks[this._lastSecond]) {
            this._ticks[this._lastSecond]?.classList.remove('active-tick');
        }
        if (this._ticks[seconds]) {
            this._ticks[seconds]?.classList.add('active-tick');
        }
        this._lastSecond = seconds;
    }
  }
}

// --- EDITOR (NATIVE) ---
class SquircleClockEditor extends HTMLElement {
  private _config!: SquircleClockCardConfig;
  private _hass?: HomeAssistant;
  private _form?: any;

  setConfig(config: SquircleClockCardConfig) {
    this._config = config;
  }

  set hass(hass: HomeAssistant) {
    this._hass = hass;
    // WICHTIG: Hass an das Formular weitergeben, sobald verfügbar
    if (this._form) {
      this._form.hass = hass;
    }
  }

  connectedCallback() {
    this._render();
  }

  _render() {
    if (!this._form) {
      this._form = document.createElement("ha-form");
      this._form.schema = CARD_SCHEMA;
      this._form.computeLabel = (schema: SchemaItem) => schema.label || schema.name;
      this._form.addEventListener("value-changed", (ev: Event) => this._valueChanged(ev as CustomEvent));
      this.appendChild(this._form);
    }
    this._form.data = this._config;
    // Hier sicherstellen, dass hass existiert, bevor es übergeben wird
    if(this._hass) this._form.hass = this._hass;
  }

  _valueChanged(ev: CustomEvent) {
    const newConfig = { ...this._config, ...ev.detail.value };
    const event = new CustomEvent("config-changed", {
      detail: { config: newConfig },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }
}

customElements.define('squircle-clock-card', SquircleClockCard);
customElements.define('squircle-clock-editor', SquircleClockEditor);

declare global {
  interface Window {
    customCards: Array<{
      type: string;
      name: string;
      preview?: boolean;
      description?: string;
    }>;
  }
}

window.customCards = window.customCards || [];
window.customCards.push({
  type: "squircle-clock-card",
  name: "Squircle Clock Card",
  preview: true,
  description: "Native HA-Konfiguration verfügbar."
});
