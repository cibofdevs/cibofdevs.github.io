# Ahmad Wijaya — Personal Website

A responsive, static portfolio hosted on GitHub Pages, using the Soft Bento theme.

Run a local preview from the repository root:

```sh
python3 -m http.server 8000
```

Open `http://localhost:8000`. No installation or build step is required.

- `index.html`: profile, projects, experience, certifications, and contact form.
- `styles/style.css`: responsive layouts, typography, and theme colors.
- `scripts/main.js`: sticky/mobile navigation, animated role and certification disclosures, and contact form.
- `scripts/motion.js`: reversible mobile-menu and earlier-role animations, plus one-time section reveals. Content stays visible if the animation APIs are unavailable.
- `scripts/config.js`: existing EmailJS public configuration.
- `assets/projects/`: optimized project previews in 640px and 1200px WebP sizes. Original public page and Open Graph image URLs are recorded in `sources.json`.

The contact form uses EmailJS. Profile content and navigation remain accessible when JavaScript is unavailable; direct email is also available.

Experience cards show two key contributions with full role details available on demand. Role and certification panels retain native details behavior without JavaScript, and their enhanced animations respect reduced motion preferences.

The mobile menu opens over 200ms, earlier roles expand over 280ms, and sections reveal once on entry. Project cards lift slightly on mouse hover. Reduced motion preferences disable these movement effects.

Theme colors are defined in `styles/style.css`: indigo for actions and navigation, green for the current role and success messages, and balanced lavender, sage, and butter surfaces. Secondary text shares one contrast-conscious color. Expanded disclosure toggles use a white cross on indigo and transition back to a blue plus on pale lavender when closed.
