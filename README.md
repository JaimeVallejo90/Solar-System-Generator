# Solar-System-Generator

One-click solar system generator that renders a radial map and a sticky orbital line with focus, tooltips, and full system details. Seeded generation makes results repeatable, or you can leave it blank for random rolls.

Live demo: https://jaimevallejo90.github.io/Solar-System-Generator/

## Features
- Seeded generation (16-character alphanumeric seeds; blank for random)
- Interactive radial map with orbits, belts, moons, and zoom-to-focus
- Sticky orbital line with labels, tooltips, and navigation controls
- System details panel with copyable text and hover breakdowns
- Shareable link for the current seed

## How to run
Open `index.html` in a browser. No build step required.

## Controls
- Click a star/body on the map or orbital line to lock selection
- Use Arrow keys to cycle focus, Esc to clear selection
- Use Prev/Next buttons (map HUD or orbital line) to browse bodies

## Seed behavior
- Leave the seed empty for random rolls
- Type a seed to lock results (max 16 characters)
- Clear the input to return to random mode
