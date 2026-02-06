/**
 * Energy Flow Card
 * @version 0.2.0
 */

import { LitElement, html, css } from 'lit';
import type { HomeAssistant, EnergyFlowCardConfig } from './types';

const CARD_VERSION = "0.2.0";

console.info(
  `%c ENERGY-FLOW-CARD %c ${CARD_VERSION} `,
  'color: white; background: #4caf50; font-weight: 700;',
  'color: #4caf50; background: white; font-weight: 700;'
);

export class EnergyFlowCard extends LitElement {
  hass!: HomeAssistant;
  config!: EnergyFlowCardConfig;

  static get properties() {
    return {
      hass: { attribute: false },
      config: { state: true },
    };
  }

  static getConfigElement() {
    return document.createElement("slick-energy-flow-card-editor");
  }

  static getStubConfig() {
    return {
      type: "custom:slick-energy-flow-card",
      title: "Energiefluss",
      solar_entity: "",
      grid_import_entity: "",
      grid_export_entity: "",
      battery_entity: "",
      battery_soc_entity: "",
      home_entity: ""
    };
  }

  setConfig(config: EnergyFlowCardConfig) {
    if (!config) throw new Error("Invalid configuration");

    const newConfig = {
      title: "Energiefluss",
      inverted_grid: false,
      inverted_battery: false,
      ...config
    };
    
    // Type validation
    if (newConfig.inverted_grid && typeof newConfig.inverted_grid !== 'boolean') throw new Error("inverted_grid must be a boolean");
    if (newConfig.inverted_battery && typeof newConfig.inverted_battery !== 'boolean') throw new Error("inverted_battery must be a boolean");

    this.config = newConfig as EnergyFlowCardConfig;
  }

  // --- STATE ---
  private _cachedGradients: string[] = ['', ''];
  private _activeIndex: number = 0;
  private _displayedGradient: string | null = null;
  
  // Responsive State
  private _resizeObserver?: ResizeObserver;
  private _width: number = 0;
  private _height: number = 0;

  public connectedCallback() {
      super.connectedCallback();
      this._resizeObserver = new ResizeObserver(entries => {
          for (const entry of entries) {
              const r = entry.contentRect;
              this._width = r.width;
              this._height = r.height;
              this.requestUpdate();
          }
      });
      this._resizeObserver.observe(this);
  }
  
  public disconnectedCallback() {
      if (this._resizeObserver) {
          this._resizeObserver.disconnect();
      }
      super.disconnectedCallback();
  }

  // --- HELPER ---
  private _getState(entity?: string): number {
    if (!this.hass || !entity || !this.hass.states[entity]) return 0;
    const val = parseFloat(this.hass.states[entity].state);
    return isNaN(val) ? 0 : val;
  }

  private _formatPower(watts: number): string {
    const w = Math.abs(watts);
    if (w >= 1000) return `${(w / 1000).toFixed(1)} kW`;
    return `${Math.round(w)} W`;
  }

  render() {
    if (!this.config) return html``;
    // Allow render if hass is missing, just to show structure (values will be 0)

    // --- FETCH DATA ---
    const _hass = this.hass; // Use local ref to avoid repeated check issues if type allows or just use directly
    const solar = _hass ? this._getState(this.config.solar_entity) : 0;
    
    // Grid Logic: Combined or Split
    let grid = 0;
    if (this.config.grid_entity) {
        grid = _hass ? this._getState(this.config.grid_entity) : 0;
        if (this.config.inverted_grid) grid = -grid; 
    } else {
        // SolarNet Logic: 
        // Import is usually positive counter. Export is usually positive counter.
        // We want Net Grid Flow: Import (Pos) - Export (Pos).
        // Result: + = Import, - = Export.
        const imp = this._getState(this.config.grid_import_entity); 
        const exp = this._getState(this.config.grid_export_entity); 
        grid = imp - exp; 
    }

    let battery = this._getState(this.config.battery_entity);
    const soc = this._getState(this.config.battery_soc_entity);
    
    // Optional Stats
    const autarky = this.config.autarky_entity ? this._getState(this.config.autarky_entity) : null;
    const selfCons = this.config.self_consumption_entity ? this._getState(this.config.self_consumption_entity) : null;

    if (this.config.inverted_battery) battery = -battery; // Standard: Positiv = Entladen, Negativ = Laden

    let home = 0;
    if (this.config.home_entity) {
        home = this._getState(this.config.home_entity);
    } else {
       // Calc Home
       // Basic Formula: Solar + Grid (Net) + Battery (Discharging positive)
       // Example: Solar 5000 + Grid -2000 (Exporting) + Battery 0 = 3000 Home
       // Example: Solar 0 + Grid 500 (Importing) + Battery 0 = 500 Home
       home = solar + grid + battery; 
    }
    // Handle negative home sensor (User provided -615W for Load sometimes)
    home = Math.abs(home);

    // --- VISUAL LOGIC ---
    const isExporting = grid < -10; // 10W Tolerance
    const isImporting = grid > 10;
    const hasBattery = (!!this.config.battery_entity && this.config.battery_entity !== '') || (!!this.config.battery_soc_entity && this.config.battery_soc_entity !== '');
    const isCharging = battery < -10;
    const isDischarging = battery > 10;

    // Determine Background
    let topColor, bottomColor;
    
    // Top Color: PV Srength (Dynamic Orange)
    // Scale: 50W (Dark) -> 4000W (Bright)
    // Dark Orange: #bf360c (Deep Orange 900)
    // Bright Orange: #ffd600 (Yellow 700 / Amber A400)
    if (solar <= 50) {
        topColor = '#102027'; // Night
    } else {
        // Interpolate or stepped
        if (solar < 1000) topColor = '#e65100'; // Dark Orange
        else if (solar < 2500) topColor = '#f57c00'; // Medium Orange
        else if (solar < 5000) topColor = '#ffa000'; // Amber
        else topColor = '#ffc107'; // Bright Amber/Yellow
    }

    // Bottom Color: Consumption vs Production
    // If Home Consumption > Solar Production (Deficit) -> Grey
    // If Home Consumption < Solar Production (Surplus) -> Blue
    if (home > solar) {
        bottomColor = '#455a64'; // Grey
    } else {
        bottomColor = '#1976d2'; // Blue (formerly Green #2e7d32)
    }
    
    // Balanced State Override: "Everything is just an orange gradient"
    // Active if Solar is producing AND Net Grid Consumption is low.
    // Standard Tolerance: 0-50W.
    // Extended Tolerance (Full Batt/Charging): 0-150W.
    const isFullOrCharging = isCharging || soc >= 99;
    const gridTolerance = isFullOrCharging ? 150 : 50;

    if (solar > 50 && grid >= 0 && grid <= gridTolerance) {
        // Balanced Mode -> Blue Gradient
        bottomColor = '#2196f3'; // Bright Blue
    }

    // Gradient: Lighter at bottom (180deg)
    const gradient = `linear-gradient(180deg, ${topColor} 0%, ${bottomColor} 100%)`;

    if (gradient !== this._displayedGradient) {
        const nextIndex = (this._activeIndex + 1) % 2;
        this._cachedGradients[nextIndex] = gradient;
        this._activeIndex = nextIndex;
        this._displayedGradient = gradient;
    }

    // Icons
    const iconSolar = html`<ha-icon icon="mdi:solar-power-variant"></ha-icon>`;
    const iconGrid = html`<ha-icon icon="mdi:transmission-tower"></ha-icon>`;
    const iconHome = html`<ha-icon icon="mdi:home"></ha-icon>`;
    
    // --- RESPONSIVE MODES ---
    // Tiny: H < 120 OR W < 200 (Minimal content)
    // Small: H < 200 (Compressed layout)
    const isTiny = this._height > 0 && (this._height < 120 || this._width < 200);
    const isSmall = this._height > 0 && !isTiny && this._height < 210;

    // Battery Icon Logic
    let iconBattName = "mdi:battery"; // Default
    
    // Calculate 10% steps for default state
    const socRound = Math.round(soc / 10) * 10;
    if (socRound <= 0) iconBattName = "mdi:battery-outline";
    else if (socRound >= 100) iconBattName = "mdi:battery";
    else iconBattName = `mdi:battery-${socRound}`;

    if (isCharging) {
        iconBattName = "mdi:battery-arrow-up";
    } else if (isDischarging) {
        iconBattName = "mdi:battery-arrow-down";
    }
    
    const iconBatt = html`<ha-icon icon="${iconBattName}"></ha-icon>`;

    return html`
      <ha-card class="${isTiny ? 'tiny' : ''} ${isSmall ? 'small' : ''}">
        <div class="bg-layer" style="background: ${this._cachedGradients[0]}; opacity: ${this._activeIndex === 0 ? 1 : 0}"></div>
        <div class="bg-layer" style="background: ${this._cachedGradients[1]}; opacity: ${this._activeIndex === 1 ? 1 : 0}"></div>
        
        <!-- Tiny Mode Battery Indicator (Top Right) -->
        ${isTiny && hasBattery ? html`
            <div class="status-badge" style="position: absolute; top: 6px; right: 8px; z-index: 2; display: flex; align-items: center; gap: 4px;">
                <span style="color: ${soc < 20 ? '#ff3b30' : 'inherit'}; display: flex; width: 14px;">${iconBatt}</span>
                <span>${Math.round(soc)}%</span>
            </div>
        ` : ''}

        <div class="content">
          ${!isTiny ? html`
              <div class="header">
                <span class="title">${this.config.title}</span>
                <div class="badges">
                     ${autarky !== null ? html`<span class="status-badge" title="Autarkie"><span class="badge-label">AUT</span> ${Math.round(autarky)}%</span>` : ''}
                     ${selfCons !== null ? html`<span class="status-badge" title="Eigenverbrauch"><span class="badge-label">EIG</span> ${Math.round(selfCons)}%</span>` : ''}
                     <span class="status-badge">${isExporting ? 'Export' : isImporting ? 'Import' : 'Balance'}</span>
                     
                     <!-- Small Mode Battery Badge (Inline) -->
                     ${isSmall && hasBattery ? html`
                        <span class="status-badge" style="display: inline-flex; align-items: center; gap: 4px; padding-left: 6px;">
                            <span style="color: ${soc < 20 ? '#ff3b30' : 'inherit'}; display: flex; width: 14px;">${iconBatt}</span>
                            ${Math.round(soc)}%
                        </span>
                     ` : ''}
                </div>
              </div>
          ` : ''}

          <div class="main-stats">
            <!-- SOLAR (Left) -->
            <div class="stat-block solar ${solar > 10 ? 'active' : ''}">
              <div class="icon-circle solar-icon">${iconSolar}</div>
              <div class="stat-value">${this._formatPower(solar)}</div>
              ${!isTiny ? html`<div class="stat-label">Solar</div>` : ''}
            </div>

            <!-- HOME (Center) -->
            <div class="stat-block home">
              <div class="icon-circle home-icon">${iconHome}</div>
              <div class="stat-value big">${this._formatPower(home)}</div>
              ${!isTiny ? html`<div class="stat-label">Haus</div>` : ''}
            </div>

            <!-- GRID (Right) -->
            <div class="stat-block grid ${Math.abs(grid) > 10 ? 'active' : ''}">
              <div class="icon-circle grid-icon">${iconGrid}</div>
              <div class="stat-value">${this._formatPower(Math.abs(grid))}</div>
              ${!isTiny ? html`<span class="stat-label">${grid > 0 ? 'Bezug' : 'Einsp.'}</span>` : ''}
            </div>
          </div>

          <!-- BATTERY (Bottom - Only Large Mode) -->
          ${hasBattery && !isTiny && !isSmall ? html`
            <div class="battery-section">
                <div class="batt-info">
                   <span class="batt-icon" style="color: ${soc < 20 ? '#ff3b30' : 'inherit'}">${iconBatt}</span>
                   <span class="batt-pct">${Math.round(soc)}%</span>
                   <span class="batt-power">${Math.abs(battery) > 0 ? this._formatPower(battery) : 'Standby'}</span>
                   <span class="batt-state">${isCharging ? 'Laden' : isDischarging ? 'Entladen' : ''}</span>
                </div>
                <div class="batt-bar-bg">
                    <div class="batt-bar-fill" style="width: ${soc}%; background-color: ${soc < 20 ? '#ff3b30' : 'white'}"></div>
                </div>
            </div>
          ` : ''}

        </div>
      </ha-card>
    `;
  }

  static get styles() {
    return css`
      :host {
        display: block;
        height: 100%;
        isolation: isolate;
      }
      ha-card {
        height: 100%;
        border-radius: var(--ha-card-border-radius, 12px);
        box-shadow: var(--ha-card-box-shadow, none);
        border: none;
        color: white;
        overflow: hidden;
        position: relative;
        background: black; /* Fallback */
        container-type: size;
      }
      
      .bg-layer {
          position: absolute;
          top: 0; 
          left: 0; 
          width: 100%; 
          height: 100%;
          transition: opacity 2s ease;
          z-index: 0;
      }
      
      .content {
        padding: clamp(8px, 3cqi, 16px);
        display: flex;
        flex-direction: column;
        height: 100%;
        box-sizing: border-box;
        position: relative;
        z-index: 1;
        min-height: 0;
        overflow: hidden;
      }
      
      /* Header */
      .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: clamp(4px, 2cqi, 16px);
        flex: 0 0 auto;
      }
      .title {
        font-size: clamp(0.85rem, 3cqi, 1.2rem);
        font-weight: 400;
        opacity: 0.9;
        text-shadow: 0 1px 2px rgba(0,0,0,0.2);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .status-badge {
        font-size: 0.8rem;
        font-weight: 500;
        text-transform: uppercase;
        padding: 2px 8px;
        background: rgba(255,255,255,0.2);
        border-radius: 12px;
        backdrop-filter: blur(4px);
      }

      /* Main Stats Row */
      .main-stats {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        flex-grow: 1;
        margin-bottom: clamp(4px, 2cqi, 16px);
        min-height: 0;
      }

      .stat-block {
        display: flex;
        flex-direction: column;
        align-items: center;
        flex: 1;
        opacity: 0.7;
        transition: opacity 0.3s ease;
        min-width: 0;
      }
      .stat-block.active, .stat-block.home {
        opacity: 1;
      }
      .stat-block.home {
        flex: 1.5;
      }

      .icon-circle {
        width: clamp(24px, 8cqi, 36px);
        height: clamp(24px, 8cqi, 36px);
        border-radius: 50%;
        background: rgba(255,255,255,0.15);
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: clamp(2px, 1cqi, 8px);
        box-shadow: 0 4px 10px rgba(0,0,0,0.1);
      }
      .icon-circle svg {
        width: 20px;
        height: 20px;
      }
      
      .home-icon {
        width: clamp(32px, 10cqi, 48px);
        height: clamp(32px, 10cqi, 48px);
        background: rgba(255,255,255,0.25);
      }
      .home-icon svg { width: 28px; height: 28px; }

      .stat-value {
        font-size: clamp(0.85rem, 3.5cqi, 1.2rem);
        font-weight: 400;
        line-height: 1.1;
        text-shadow: 0 1px 3px rgba(0,0,0,0.3);
        white-space: nowrap;
      }
      .stat-value.big {
        font-size: clamp(1.4rem, 7cqi, 2.5rem);
        font-weight: 200;
        margin-bottom: 2px;
        letter-spacing: -0.5px;
      }
      
      .stat-label {
        font-size: 0.8rem;
        font-weight: 300;
        opacity: 0.8;
        margin-top: 4px;
      }

      /* Battery Section */
      .battery-section {
        background: rgba(0,0,0,0.2);
        border-radius: 10px;
        padding: clamp(6px, 2cqi, 10px) clamp(8px, 2cqi, 12px);
        margin-top: auto;
        flex: 0 0 auto;
      }
      .batt-info {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 6px;
        font-size: 0.9rem;
        font-weight: 400;
      }
      .batt-icon svg { width: 16px; height: 16px; opacity: 0.8; }
      .batt-power {
        margin-left: auto;
        font-weight: 300;
        opacity: 0.8;
        font-size: 0.85rem;
      }
      .batt-state {
        font-size: 0.75rem;
        opacity: 0.6;
        text-transform: uppercase;
        font-weight: 500;
      }

      .batt-bar-bg {
        width: 100%;
        height: 6px;
        background: rgba(255,255,255,0.1);
        border-radius: 3px;
        overflow: hidden;
      }
      .batt-bar-fill {
        height: 100%;
        background-color: white;
        border-radius: 3px;
        transition: width 0.5s ease;
      }

      /* Tiny Mode */
      ha-card.tiny .content {
        padding: 4px;
        justify-content: center;
        align-items: center;
        position: relative;
      }
      
      ha-card.tiny .main-stats {
        margin: 0;
        width: 100%;
        display: flex; 
        align-items: center;
        justify-content: space-evenly;
        flex-direction: row;
        gap: 4px;
      }
      
      ha-card.tiny .stat-block {
          flex: 0 1 auto;
          margin: 0;
          opacity: 0.9;
          transform: none;
          display: flex;
          flex-direction: column;
          align-items: center;
      }
      
      /* Specific override for Tiny Home to not be special */
      ha-card.tiny .stat-block.home {
        transform: none;
        flex: 0 1 auto;
      }

      ha-card.tiny .icon-circle {
        width: 22px; height: 22px;
        margin-bottom: 2px;
        background: rgba(255,255,255,0.1);
      }
      ha-card.tiny .icon-circle svg { width: 14px; height: 14px; }
      
      ha-card.tiny .stat-value {
        font-size: 0.85rem; 
        font-weight: 600;
        line-height: 1;
      }
      ha-card.tiny .stat-value.big {
        font-size: 0.9rem;
        margin: 0;
      }

      /* Small Mode */
      ha-card.small .content { 
        padding: 8px 12px; 
      }
      ha-card.small .header { margin-bottom: 4px; }
      ha-card.small .title { font-size: 0.95rem; }
      
      ha-card.small .main-stats {
        justify-content: space-between;
        align-items: center; /* Vertically align all */
        margin-bottom: 0;
        flex-grow: 1;
      }
      
      ha-card.small .stat-block {
         transform: none !important;
         opacity: 0.9;
         display: flex;
         flex-direction: column;
         align-items: center;
      }
      
      ha-card.small .stat-block.home {
         flex: 1;
         transform: none; /* Flatten hierarchy */
      }
      
      /* Equalize icons in Small Mode */
      ha-card.small .icon-circle { width: 32px; height: 32px; margin-bottom: 4px; }
      ha-card.small .home-icon { width: 32px; height: 32px; } 
      ha-card.small .icon-circle svg { width: 18px; height: 18px; }
      
      ha-card.small .stat-value { font-size: 1rem; }
      ha-card.small .stat-value.big { font-size: 1.1rem; margin-bottom: 0; }
      ha-card.small .stat-label { font-size: 0.75rem; margin-top: 2px; }
    `;
  }
}

if (!customElements.get("slick-energy-flow-card")) {
  customElements.define("slick-energy-flow-card", EnergyFlowCard);
}

// Editor Class
export class EnergyFlowCardEditor extends LitElement {
  hass!: HomeAssistant;
  _config!: EnergyFlowCardConfig;

  static get properties() {
    return {
      hass: { attribute: false },
      _config: { state: true },
    };
  }

  setConfig(config: EnergyFlowCardConfig) { this._config = config; }
  _valueChanged(ev: CustomEvent) { 
      this.dispatchEvent(new CustomEvent("config-changed", { detail: { config: { ...this._config, ...ev.detail.value } }, bubbles: true, composed: true })); 
  }
  render() {
    if (!this.hass || !this._config) return html``;
    const schema = [
      { name: "title", label: "Titel", selector: { text: {} } },
      { name: "solar_entity", label: "Solar Leistung", selector: { entity: { domain: "sensor" } } },
      { name: "grid_entity", label: "Netz Leistung", selector: { entity: { domain: "sensor" } } },
      { name: "battery_entity", label: "Batterie Leistung (Opt)", selector: { entity: { domain: "sensor" } } },
      { name: "battery_soc_entity", label: "Batterie Stand % (Opt)", selector: { entity: { domain: "sensor" } } },
      { name: "home_entity", label: "Haus Verbrauch (Opt)", selector: { entity: { domain: "sensor" } } },
      { name: "inverted_grid", label: "Invertiere Grid (+ ist Export)", selector: { boolean: {} } },
      { name: "inverted_battery", label: "Invertiere Batt (+ ist Laden)", selector: { boolean: {} } }
    ];
    return html`<ha-form .hass=${this.hass} .data=${this._config} .schema=${schema} .computeLabel=${(s: any)=>s.label} @value-changed=${this._valueChanged}></ha-form>`;
  }
}
if (!customElements.get("slick-energy-flow-card-editor")) {
  customElements.define("slick-energy-flow-card-editor", EnergyFlowCardEditor);
}

window.customCards = window.customCards || [];
window.customCards.push({
  type: "slick-energy-flow-card",
  name: "Slick Energy Flow",
  preview: true,
  description: "Modern energy flow visualization."
});
