# Lovelace Slick Screen Cards 🎨

A collection of professional custom cards for Home Assistant, built with TypeScript for reliability and maintainability.

## Cards Included

### 1. Wind Compass Card 🧭

A professional wind rose compass for Home Assistant. It visualizes wind speed, direction, and history in a linear tape style, similar to aviation or marine navigation displays.

![Screenshot](https://github.com/B4S71/lovelace-wind-compass/blob/master/screenshots/dark.png?raw=true)

#### Features

* **TypeScript:** Type-safe, maintainable codebase
* **Linear Compass Tape:** Smooth sliding compass showing 360° direction
* **Live vs. Average:** Red marker indicates instant wind direction, background tape follows the average
* **Wind History:** Bars indicate wind frequency (height) and intensity (opacity) over the last 24h
* **Smart Buckets:** Automatically adjusts bar width to fit 360° perfectly without gaps
* **Visual Limits:** Markers for Raffstore/Blind limits
* **Critical Alerts:** Bars turn **RED** and opaque if wind speed exceeded a safety threshold (90% of limit)

#### Configuration

```yaml
type: custom:wind-compass-card
direction_entity: sensor.wind_direction_avg    # 10min average (moves the tape)
instant_direction_entity: sensor.wind_direction # Instant value (moves the red marker)
speed_entity: sensor.wind_speed
gust_entity: sensor.wind_gust
max_speed: 60                                  # Maximum scale for speed bars

# --- Optional Limit Markers ---
raffstore_limit_entity: input_number.wind_limit_blinds
rollo_limit_entity: input_number.wind_limit_shutters

# --- Customization ---
warn_multiplier: 0.9    # At what % of the limit should bars turn red? (0.9 = 90%)
bucket_size: 10         # Width of history bars in degrees (default: 5)
```

### 2. Mini Weather Card ☀️

An Apple-style weather card with dynamic gradients based on time of day and weather conditions, featuring smooth temperature history graphs.

#### Features

* **Dynamic Gradients:** Beautiful gradients that change based on sun position and weather
* **Temperature History:** Smooth animated graphs showing temperature trends
* **Forecast Display:** Daily or hourly weather forecast with beautiful icons
* **Responsive Design:** Adapts to available space
* **Customizable:** Configure history duration, data sampling, and more

#### Configuration

```yaml
type: custom:mini-weather-card
entity: weather.home
title: "Weather"
mode: daily                    # daily or hourly
temp_sensor: sensor.temperature # Optional: Override temperature sensor
history_entity: sensor.temperature # Optional: Show temperature history
sun_entity: sun.sun            # Used for gradient colors
history_hours: 24              # 1, 6, 12, 24, 48, 72, or 168
sampling_size: 50              # Number of data points (5-200)
```

### 3. Squircle Clock Card 🕐

A beautiful clock card with rounded square (squircle) design, supporting both analog and digital modes.

#### Features

* **Dual Modes:** Analog or digital clock display
* **Font Styles:** Standard, Thin (iOS), or Retro (DIN-style)
* **Timezone Support:** Display time from different timezones
* **Smooth Animation:** Fluid clock hand movements and transitions
* **Customizable:** Adapts to Home Assistant themes

#### Configuration

```yaml
type: custom:squircle-clock-card
display_mode: analog           # analog or digital
font_style: standard          # standard, thin, or retro
timezone: Europe/Berlin       # Optional: specific timezone
timezone_entity: sensor.timezone # Optional: get timezone from entity
```

## Installation

All cards are built together as part of the same package.

### HACS (Recommended)
1.  Open HACS > Frontend
2.  Click the 3 dots (top right) > **Custom repositories**
3.  Add the URL of this GitHub repository
4.  Category: **Lovelace**
5.  Click **Download**

### Manual
1.  Download the desired card files from the `dist/` folder in the releases:
    - `wind-compass-card.js`
    - `minimal-weather-card.js`
    - `squircle-clock-card.js`
2.  Upload them to your `/config/www/` directory
3.  Add the corresponding files to your Dashboard Resources:
    - `/local/wind-compass-card.js`
    - `/local/minimal-weather-card.js`
    - `/local/squircle-clock-card.js`

### Development

All cards are built with TypeScript for improved code quality and maintainability.

#### Prerequisites
- Node.js (v18 or higher recommended)
- npm

#### Building from Source

```bash
# Install dependencies
npm install

# Build all cards
npm run build

# Watch for changes during development
npm run watch

# Lint the code
npm run lint
```

The built files will be in the `dist/` directory:
- `wind-compass-card.js`
- `minimal-weather-card.js`
- `squircle-clock-card.js`

### Releasing

This project uses GitHub Actions for automated builds and releases.

#### Creating a Release

1. Update the version in `package.json`
2. Commit the changes
3. Create and push a tag with the version:
   ```bash
   git tag -a v0.1.0 -m "Release v0.1.0"
   git push origin v0.1.0
   ```
4. GitHub Actions will automatically:
   - Build the TypeScript code
   - Create a GitHub release
   - Attach all built card files and source maps
   - Create a zip archive of the release

#### Continuous Integration

The CI workflow runs on every push and pull request to `main`/`master`:
- Lints the TypeScript code
- Builds all cards
- Uploads build artifacts for inspection

## Project Structure

```
.
├── src/                    # TypeScript source files
│   ├── types.ts           # Shared type definitions
│   ├── wind-compass-card.ts
│   ├── minimal-weather-card.ts
│   └── squircle-clock-card.ts
├── dist/                  # Built JavaScript files (generated)
├── rollup.config.mjs     # Build configuration
├── tsconfig.json         # TypeScript configuration
└── package.json          # Project dependencies
```

## License

MIT
