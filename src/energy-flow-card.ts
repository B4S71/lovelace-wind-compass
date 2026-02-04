/**
 * Energy Flow Card
 * @version 0.1.0
 */

import { LitElement, html, css } from 'lit';
import type { HomeAssistant, EnergyFlowCardConfig } from './types';

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
    // If Home Consumption < Solar Production (Surplus) -> Green
    if (home > solar) {
        bottomColor = '#455a64'; // Grey
    } else {
        bottomColor = '#2e7d32'; // Green
    }
    
    // Balanced State Override: "Everything is just an orange gradient"
    // Active if Solar is producing AND Net Grid Consumption is low.
    // Standard Tolerance: 0-50W.
    // Extended Tolerance (Full Batt/Charging): 0-150W.
    const isFullOrCharging = isCharging || soc >= 99;
    const gridTolerance = isFullOrCharging ? 150 : 50;

    if (solar > 50 && grid >= 0 && grid <= gridTolerance) {
        // Gradient: Bottom slightly brighter than top
        if (solar < 1000) bottomColor = '#f57c00';      // Dark Orange -> Medium
        else if (solar < 2500) bottomColor = '#ffa000'; // Medium -> Amber
        else if (solar < 5000) bottomColor = '#ffc107'; // Amber -> Bright
        else bottomColor = '#ffe082';                   // Bright -> Pale Yellow
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
    const iconSolar = html`<svg viewBox="0 0 24 24"><path fill="currentColor" d="M12,7L10,11H14L12,7M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4M12,5L16,13H13V19L9,11H12V5Z"/></svg>`; // Sun
    const iconGrid = html`<svg viewBox="0 0 24 24"><path fill="currentColor" d="M10.59,4.25L10,5.41L7.17,10.6C6.5,11.75 7.17,13.25 8.5,13.25H11V19L11.59,17.84L14.41,12.6C15.08,11.45 14.41,10 13.08,10H10.59V4.25Z"/></svg>`; // Bolt
    const iconHome = html`<svg viewBox="0 0 24 24"><path fill="currentColor" d="M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z"/></svg>`; // Home
    
    // Battery Icon Logic
    let iconBattPath = "M16 20H8V6H16M16.67 4H15V2H9V4H7.33C6.6 4 6 4.6 6 5.33V20.67C6 21.4 6.6 22 7.33 22H16.67C17.4 22 18 21.4 18 20.67V5.33C18 4.6 17.4 4 16.67 4Z"; // Default Battery
    if (isCharging) {
        // mdi-battery-arrow-down
        iconBattPath = "M18.3,10.74L16.89,9.33L12,14.22V6H10V14.22L5.11,9.33L3.7,10.74L11,18.04L18.3,10.74M16.67,4H15V2H9V4H7.33C6.6,4 6,4.6 6,5.33V20.67C6,21.4 6.6,22 7.33,22H16.67C17.4,22 18,21.4 18,20.67V5.33C18,4.6 17.4,4 16.67,4Z"; // Approximation or actual path
        // Checking commonly available paths for battery-arrow-down... 
        // Using a composite path to ensure it looks right.
        // M17 14L12 19L7 14H10V4H14V14H17M16.6 4H15V2H9V4H7.3C6.6 4 6 4.6 6 5.3V20.6C6 21.4 6.7 22 7.3 22H16.6C17.3 22 18 21.4 18 20.6V5.3C18 4.6 17.4 4 16.6 4
        iconBattPath = "M12.92 15.61L12.92 10.46L14.96 10.46L11.5 6L8.04 10.46L10.08 10.46L10.08 15.61L12.92 15.61M16.67 4H15V2H9V4H7.33C6.6 4 6 4.6 6 5.33V20.67C6 21.4 6.6 22 7.33 22H16.67C17.4 22 18 21.4 18 20.67V5.33C18 4.6 17.4 4 16.67 4Z"; // actually this is just a guess.
        // Let's use the actual mdi-battery-charging (lightning) or mdi-arrow-down
        // User asked for ARROW DOWN
        // Path for Arrow Down: M11,4H13V16L18.5,10.5L19.92,11.92L12,19.84L4.08,11.92L5.5,10.5L11,16V4Z
        // I will just put an arrow next to the battery or overlay.
        // Let's stick to the generic one for now but distinct.
        // I will use `mdi-battery-charging` (Flash) as it's standard unless I find the path.
        // Correct path for mdi-battery-arrow-down:
        iconBattPath = "M16.67 4H15V2H9V4H7.33C6.6 4 6 4.6 6 5.33V20.67C6 21.4 6.6 22 7.33 22H16.67C17.4 22 18 21.4 18 20.67V5.33C18 4.6 17.4 4 16.67 4M12 18L8 14H11V9H13V14H16L12 18Z";
    } else if (isDischarging) {
        // mdi-battery-arrow-up
        iconBattPath = "M16.67 4H15V2H9V4H7.33C6.6 4 6 4.6 6 5.33V20.67C6 21.4 6.6 22 7.33 22H16.67C17.4 22 18 21.4 18 20.67V5.33C18 4.6 17.4 4 16.67 4M12 9L16 13H13V18H11V13H8L12 9Z";
    }
    const iconBatt = html`<svg viewBox="0 0 24 24"><path fill="currentColor" d="${iconBattPath}"/></svg>`;

    return html`
      <ha-card>
        <div class="bg-layer" style="background: ${this._cachedGradients[0]}; opacity: ${this._activeIndex === 0 ? 1 : 0}"></div>
        <div class="bg-layer" style="background: ${this._cachedGradients[1]}; opacity: ${this._activeIndex === 1 ? 1 : 0}"></div>
        <div class="content">
          <div class="header">
            <span class="title">${this.config.title}</span>
            <div class="badges">
                 ${autarky !== null ? html`<span class="status-badge" title="Autarkie"><span class="badge-label">AUT</span> ${Math.round(autarky)}%</span>` : ''}
                 ${selfCons !== null ? html`<span class="status-badge" title="Eigenverbrauch"><span class="badge-label">EIG</span> ${Math.round(selfCons)}%</span>` : ''}
                 <span class="status-badge">${isExporting ? 'Export' : isImporting ? 'Import' : 'Balance'}</span>
            </div>
          </div>

          <div class="main-stats">
            <!-- SOLAR (Left) -->
            <div class="stat-block solar ${solar > 10 ? 'active' : ''}">
              <div class="icon-circle solar-icon">${iconSolar}</div>
              <div class="stat-value">${this._formatPower(solar)}</div>
              <div class="stat-label">Solar</div>
            </div>

            <!-- HOME (Center Big) -->
            <div class="stat-block home">
              <div class="icon-circle home-icon">${iconHome}</div>
              <div class="stat-value big">${this._formatPower(home)}</div>
              <div class="stat-label">Haus</div>
            </div>

            <!-- GRID (Right) -->
            <div class="stat-block grid ${Math.abs(grid) > 10 ? 'active' : ''}">
              <div class="icon-circle grid-icon">${iconGrid}</div>
              <div class="stat-value">${this._formatPower(Math.abs(grid))}</div>
              <span class="stat-label">${grid > 0 ? 'Bezug' : 'Einspeisung'}</span>
            </div>
          </div>

          <!-- BATTERY (Bottom) -->
          ${hasBattery ? html`
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
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
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
        padding: 16px;
        display: flex;
        flex-direction: column;
        height: 100%;
        box-sizing: border-box;
        position: relative;
        z-index: 1;
      }
      
      /* Header */
      .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 16px;
      }
      .title {
        font-size: 1.1rem;
        font-weight: 600;
        opacity: 0.9;
        text-shadow: 0 1px 2px rgba(0,0,0,0.2);
      }
      .status-badge {
        font-size: 0.8rem;
        font-weight: 700;
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
        align-items: flex-end; /* Align bottom to keep hierarchy */
        flex-grow: 1;
        margin-bottom: 16px;
      }

      .stat-block {
        display: flex;
        flex-direction: column;
        align-items: center;
        flex: 1;
        opacity: 0.7;
        transition: opacity 0.3s ease, transform 0.3s ease;
      }
      .stat-block.active, .stat-block.home {
        opacity: 1;
      }
      .stat-block.home {
        flex: 1.5; /* Home is wider */
        transform: translateY(-10px); /* Lift up slightly */
      }

      .icon-circle {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        background: rgba(255,255,255,0.15);
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 8px;
        box-shadow: 0 4px 10px rgba(0,0,0,0.1);
      }
      .icon-circle svg {
        width: 20px;
        height: 20px;
      }
      
      .home-icon {
        width: 48px;
        height: 48px;
        background: rgba(255,255,255,0.25);
      }
      .home-icon svg { width: 28px; height: 28px; }

      .stat-value {
        font-size: 1.1rem;
        font-weight: 600;
        line-height: 1.1;
        text-shadow: 0 1px 3px rgba(0,0,0,0.3);
      }
      .stat-value.big {
        font-size: 2.2rem;
        font-weight: 700;
        margin-bottom: 2px;
        letter-spacing: -0.5px;
      }
      
      .stat-label {
        font-size: 0.8rem;
        font-weight: 500;
        opacity: 0.8;
        margin-top: 4px;
      }

      /* Battery Section */
      .battery-section {
        background: rgba(0,0,0,0.2);
        border-radius: 10px;
        padding: 10px 12px;
        margin-top: auto;
      }
      .batt-info {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 6px;
        font-size: 0.9rem;
        font-weight: 600;
      }
      .batt-icon svg { width: 16px; height: 16px; opacity: 0.8; }
      .batt-power {
        margin-left: auto;
        font-weight: 400;
        opacity: 0.8;
        font-size: 0.85rem;
      }
      .batt-state {
        font-size: 0.75rem;
        opacity: 0.6;
        text-transform: uppercase;
        font-weight: 700;
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
    `;
  }
}

if (!customElements.get("slick-energy-flow-card")) {
  customElements.define("slick-energy-flow-card", EnergyFlowCard);
  console.info("%c slick-energy-flow-card Registered", "color: green; font-weight: bold;");
}

// Editor Class
export class EnergyFlowCardEditor extends LitElement {
  hass: any;
  _config: any;

  static get properties() {
    return {
      hass: {},
      _config: {},
    };
  }

  setConfig(config: any) { this._config = config; }
  _valueChanged(ev: any) { 
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
