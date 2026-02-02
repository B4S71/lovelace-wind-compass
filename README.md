# Wind Compass Card 🧭

A professional wind rose compass for Home Assistant. It visualizes wind speed, direction, and history in a linear tape style, similar to aviation or marine navigation displays.

![Screenshot](hhttps://raw.githubusercontent.com/B4S71/lovelace-wind-compass/refs/heads/docs/screenshots/screenshots/dark.png) 
## Features

* **Linear Compass Tape:** Smooth sliding compass showing 360° direction.
* **Live vs. Average:** Red marker indicates instant wind direction, background tape follows the average.
* **Wind History:** Bars indicate wind frequency (height) and intensity (opacity) over the last 24h.
* **Smart Buckets:** Automatically adjusts bar width to fit 360° perfectly without gaps.
* **Visual Limits:** Markers for Raffstore/Blind limits.
* **Critical Alerts:** Bars turn **RED** and opaque if wind speed exceeded a safety threshold (90% of limit).

## Installation

### HACS (Recommended)
1.  Open HACS > Frontend.
2.  Click the 3 dots (top right) > **Custom repositories**.
3.  Add the URL of this GitHub repository.
4.  Category: **Lovelace**.
5.  Click **Download**.

### Manual
1.  Download `wind-compass-card.js` from the releases.
2.  Upload it to your `/config/www/` directory.
3.  Add `/local/wind-compass-card.js` to your Dashboard Resources.

## Configuration

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