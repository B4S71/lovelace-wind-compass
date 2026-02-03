## Wind Compass Card 🧭

A professional wind rose compass for Home Assistant. It visualizes wind speed, direction, and history in a linear tape style, similar to aviation or marine navigation displays. Built with TypeScript for reliability and maintainability.

![Screenshot](https://github.com/B4S71/lovelace-wind-compass/blob/master/screenshots/dark.png?raw=true)
### Features

* **TypeScript:** Type-safe, maintainable codebase
* **Linear Compass Tape:** Smooth sliding compass showing 360° direction.
* **Live vs. Average:** Red marker indicates instant wind direction, background tape follows the average.
* **Wind History:** Bars indicate wind frequency (height) and intensity (opacity) over the last 24h.
* **Smart Buckets:** Automatically adjusts bar width to fit 360° perfectly without gaps.
* **Visual Limits:** Markers for Raffstore/Blind limits.
* **Critical Alerts:** Bars turn **RED** and opaque if wind speed exceeded a safety threshold (90% of limit).

### Installation

#### HACS (Recommended)
1.  Open HACS > Frontend.
2.  Click the 3 dots (top right) > **Custom repositories**.
3.  Add the URL of this GitHub repository.
4.  Category: **Lovelace**.
5.  Click **Download**.

#### Manual
1.  Download `wind-compass-card.js` from the `dist/` folder in the releases.
2.  Upload it to your `/config/www/` directory.
3.  Add `/local/wind-compass-card.js` to your Dashboard Resources.

### Development

This card is built with TypeScript for improved code quality and maintainability.

#### Prerequisites
- Node.js (v18 or higher recommended)
- npm

#### Building from Source

```bash
# Install dependencies
npm install

# Build the card
npm run build

# Watch for changes during development
npm run watch

# Lint the code
npm run lint
```

The built files will be in the `dist/` directory.

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
   - Attach the built files (`wind-compass-card.js` and source map)
   - Create a zip archive of the release

#### Continuous Integration

The CI workflow runs on every push and pull request to `main`/`master`:
- Lints the TypeScript code
- Builds the project
- Uploads build artifacts for inspection

### Configuration

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
