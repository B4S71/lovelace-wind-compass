# Copilot Instructions for Lovelace Slick Screen Cards

## Architecture Overview

This is a **Home Assistant Lovelace custom card collection** compiled into ES modules via Rollup. Three independent cards share type definitions but are built as separate entry points.

### Multi-Card Build Pattern
- **Entry points:** Each card (wind-compass, minimal-weather, squircle-clock) has its own `src/*.ts` file
- **Rollup config:** Generates separate `dist/*.js` outputs + bundled `dist/slick-screen-cards.js`
- **Index file:** `src/index.ts` imports all cards for bundled distribution; individual cards can load standalone
- **Key file:** [rollup.config.mjs](../rollup.config.mjs) — defines 4 build outputs, all with Terser minification and sourcemaps

### Shared Type Definitions
[src/types.ts](../src/types.ts) defines interfaces for:
- `HomeAssistant` — Home Assistant object passed to card's `hass` setter (states, callService, callApi)
- `LovelaceCardConfig` — base config; specific cards extend this (e.g., `WindCompassCardConfig`, `MiniWeatherCardConfig`)
- `HassEntity` — individual entity state with attributes and context

## Key Development Patterns

### Card Class Structure
All cards extend `HTMLElement` with these required methods/properties:
```typescript
class YourCard extends HTMLElement {
  private _hass?: HomeAssistant;
  private config!: YourCardConfig;
  
  set hass(hass: HomeAssistant) { /* update on Home Assistant state changes */ }
  setConfig(config: YourCardConfig) { /* validate config, throw if invalid */ }
  static getConfigElement() { /* returns editor element */ }
  static getStubConfig() { /* returns minimal valid config example */ }
}

customElements.define('custom:your-card', YourCard);
```

**Examples:**
- Wind Compass: Extends HTMLElement with custom rendering, manual DOM manipulation [src/wind-compass-card.ts#L19-L80](../src/wind-compass-card.ts#L19-L80)
- Mini Weather: Uses `LitElement` from Lit library for reactive templating [src/minimal-weather-card.ts#L1-L20](../src/minimal-weather-card.ts#L1-L20)
- Heating/Cooling: SVG-based visualization with ResizeObserver for responsive layout [src/heating-cooling-card.ts#L17-L60](../src/heating-cooling-card.ts#L17-L60)

### Two Implementation Approaches
1. **Vanilla HTMLElement** (Wind Compass, Squircle Clock): Manual DOM updates in `hass` setter, CSS via template literals
2. **LitElement** (Mini Weather): Declarative reactive templates, `@property` decorators for reactivity

Choose based on complexity: vanilla for simple cards, Lit for complex dynamic rendering.

### Home Assistant Integration Points
- **Entity access:** `this._hass.states[entity_id]` returns `HassEntity` with `.state` and `.attributes`
- **History data:** Use `this._hass.callApi('GET', '/api/history/period/' + entityId)` to fetch historical data
- **Service calls:** `this._hass.callService('domain', 'service', { data })`
- **Config validation:** Throw error in `setConfig()` if required fields missing; Home Assistant will display error

## Build & Development Commands

```bash
npm run build    # Full build via Rollup + copy slick-screen-cards.js to repo root
npm run watch    # Rollup watch mode for development
npm run lint     # ESLint on src/**/*.ts (TypeScript + ESLint plugins)
```

**Build outputs:**
- `dist/slick-screen-cards.js` — bundled (imports index.ts)
- `dist/wind-compass-card.js`, `dist/minimal-weather-card.js`, `dist/squircle-clock-card.js` — individual standalone entries
- `slick-screen-cards.js` — copy of bundle in root (for HACS distribution)

## Project-Specific Conventions

### TypeScript Configuration
- **Strict mode enabled:** `noUnusedLocals`, `noUnusedParameters`, `noImplicitReturns`
- **Target:** ES2020, ESNext modules
- **DOM lib included:** Can use DOM APIs directly (HTMLElement, SVG, etc.)

### Card Configuration Pattern
Config interfaces extend `LovelaceCardConfig` with `type: 'custom:card-name'` literal:
```typescript
export interface MyCardConfig extends LovelaceCardConfig {
  type: 'custom:my-card';
  required_entity: string;
  optional_param?: number;
}
```
**Why:** Enables config validation at runtime; Home Assistant editor parses these.

### Error Handling in setConfig()
```typescript
setConfig(config: YourCardConfig) {
  if (!config.required_field) throw new Error('required_field is required');
  this.config = config;
}
```
Throw errors here—Home Assistant displays them in the UI, preventing silent failures.

### Console Info Pattern
All cards log a styled console.info on load (e.g., `%c Card Name Loaded`). Use for debugging HACS/browser load issues.

## Critical Files to Know

| File | Purpose |
|------|---------|
| [tsconfig.json](../tsconfig.json) | Strict TypeScript config, ES2020 target |
| [rollup.config.mjs](../rollup.config.mjs) | Multi-entry bundling + Terser minification |
| [hacs.json](../hacs.json) | HACS metadata; points to `slick-screen-cards.js` |
| [src/types.ts](../src/types.ts) | Shared HomeAssistant and card config types |
| [src/index.ts](../src/index.ts) | Bundled card loader |

## Common Tasks

### Adding a New Card
1. Create `src/new-card.ts` extending `HTMLElement` or `LitElement`
2. Add config interface to [src/types.ts](../src/types.ts)
3. Add new Rollup entry to [rollup.config.mjs](../rollup.config.mjs)
4. Import in [src/index.ts](../src/index.ts) for bundled version
5. Test: `npm run watch` → install in Home Assistant → add to YAML config

### Accessing Entity State
```typescript
const entity = this._hass.states[config.entity_id];
const currentValue = entity.state;
const attributes = entity.attributes; // e.g., unit_of_measurement, icon
```

### Fetching Historical Data
```typescript
const historyResponse = await this._hass.callApi(
  'GET',
  `/api/history/period/${new Date(Date.now() - 24 * 3600000).toISOString()}?filter_entity_ids=${entityId}`
);
```

## Linting & Quality
- ESLint config: TypeScript + recommended rules
- No Prettier/formatting tool—follow existing style (2-space indent, `const` over `let`)
- Disable eslint rules only when justified (e.g., `/* eslint-disable @typescript-eslint/no-explicit-any */` for Home Assistant type gaps)

## Heating/Cooling Card Pattern

The heating/cooling card ([src/heating-cooling-card.ts](../src/heating-cooling-card.ts)) demonstrates an **SVG-based visualization pattern** for displaying overlapping data ranges. Key techniques:

### ResizeObserver for Responsive Scaling
```typescript
connectedCallback() {
  this._resizeObserver = new ResizeObserver(() => {
    this._render(); // Re-render on size changes
  });
  this._resizeObserver.observe(this);
}
```
This enables responsive SVG visualization that adapts to container width/height without media queries.

### SVG Coordinate Mapping
Convert temperature values to pixel positions:
```typescript
const tempRange = this._maxTemp - this._minTemp;
const pixelsPerDegree = width / tempRange;
const heatPixels = (this._heatSetpoint - this._minTemp) * pixelsPerDegree;
```

### Configuration Pattern for Climate Entities
The card expects a climate entity with these attributes:
- `current_temperature` or `state` (current temp)
- `target_temp_low` or `target_temperature` (heating setpoint)
- `target_temp_high` (cooling setpoint, optional—defaults to target_temperature)
- `unit_of_measurement` (°C, °F, etc.)

Config example:
```yaml
type: custom:heating-cooling-card
entity: climate.living_room
title: "Climate Control"
min_temp: 15          # Left edge of visualization
max_temp: 30          # Right edge of visualization
unit: "°C"            # Override entity's unit
```

### Visual Design: Overlapping Bars
- **Blue bar** (left-aligned, represents heating setpoint)
- **Red bar** (right-aligned, represents cooling setpoint)
- **Green zone** (center deadzone/comfort zone between setpoints)
- **Gold indicator** (current temperature position and marker)

This pattern avoids overlapping DOM elements by using SVG layering—render blue first, then green zone (if deadzone exists), then red on top.
