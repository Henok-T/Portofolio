# Design & architecture plan

## Review notes

Current site (`henok.netlify.app`) leads with a stock photo, a search-bar gimmick, and almost no services, experience, or contact path. Copy has grammar issues. Projects exist but are hard to scan and do not explain the business.

References were used only for UX patterns:
- Clear identity in the first screen
- Scannable project blocks with tech and links
- Service framing that talks about problems, not just stacks
- Light motion, strong type, reserved color

None of those layouts, palettes, or voice were copied.

## Site structure

Hybrid: a complete homepage plus slim inner pages so content can grow.

- `index.html` — hero, services, work, skills, experience, about, testimonial placeholder, contact
- `services.html`, `projects.html`, `about.html`, `contact.html`
- `projects/*.html` — case notes that can be duplicated
- Shared `css/style.css`, `js/theme.js`, `js/main.js`

Adding a project: duplicate a card on the homepage / projects index, then copy a case-notes file if there is enough detail.

## Visual direction

Premium-technical, not template-luxury. Cool teal on slate paper. Dark theme is a designed night surface, not an invert.

- Display type: Sora
- Body type: Source Sans 3
- Primary: teal (`#0e6e6a` / `#4ecdc4` in dark)
- Accent: steel blue for links
- Surfaces: white / off-white vs deep blue-slate

Theme follows `prefers-color-scheme`, can be overridden, and persists in `localStorage`.

## Conversion

One primary action per band: view work in the hero, discuss a project in the header and close. Contact form is honest — it validates and prepares a LinkedIn draft because no mail backend exists yet.

## Performance & a11y

No frameworks. One CSS file. Small JS. Portrait is a single optimized PNG. Fonts load with `display=swap`. Reduced-motion disables transitions. Focus states are visible. Semantic headings and form labels are in place.

## PWA

Optional installability via `manifest.webmanifest` and a small service worker that caches the shell and serves `offline.html`.
