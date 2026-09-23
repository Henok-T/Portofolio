# Asmara Web Design

Business and portfolio site for Asmara Web Design (hosted at asmaraweb.netlify.app). Plain HTML, CSS and JavaScript. No framework and no build step: deploy the folder as-is.

## Structure

```
/
├── index.html                 Homepage (hero, services, process, work, about, contact)
├── projects/
│   └── index.html             All projects
├── contact/index.html         Redirects old /contact links to /#contact
├── 404.html, offline.html
├── css/
│   ├── tokens.css             Colors (light + dark), type scale, spacing, radii
│   ├── base.css               Reset, typography, focus styles, helpers
│   ├── components.css         Header, nav, buttons, forms, placeholders, footer
│   └── sections.css           Page sections and page layouts
├── js/
│   ├── theme.js               Light/dark toggle (system default, saved choice)
│   ├── main.js                Mobile menu, header state, nav highlighting, service worker
│   └── contact.js             Form validation and delivery settings
├── assets/icons/              favicon + PWA icons (the mark on the ink navy plate)
├── assets/images/             logo-mark.png, logo-full.webp, og-image.png, aboutpage.webp (your portrait), projects/
├── _templates/                Copy-paste blocks (blocked in robots.txt)
├── manifest.webmanifest, sw.js
├── robots.txt, sitemap.xml
└── _headers, _redirects       Netlify caching, security headers, old-URL redirects
```

## Before you publish

1. **Logo.** Two files carry the brand:
   - `assets/images/logo-mark.png` — the tower-and-sun mark (256 × 256, transparent). Used in the header at 36px and as the source for the favicon and app icons. Never smaller than the header size.
   - `assets/images/logo-full.webp` — the full lockup with the wordmark (900 × 625, transparent). Used in the footer, and on the 404 and offline pages. Never render it narrower than 200px.
   - `assets/icons/` holds the mark rendered on the ink navy plate: `icon-192.png`, `icon-512.png`, `icon-maskable-512.png`, `apple-touch-icon.png`, `favicon-32.png`.

   To change the artwork, replace these files at the same dimensions.
2. **Portrait.** Replace `assets/images/aboutpage.webp` with your photo. A monogram shows until it loads.
3. **Screenshots.** Save 1600×1000 WebP files to `assets/images/projects/` and swap each `.shot` placeholder for the `<img>` shown in the comment above it.
4. **Hero "Recently resolved" list** (`index.html`). Every item must be a real fix. Edit them freely.
5. **Email and phone.** Uncomment the blocks in the Contact section and set `email` in `js/contact.js`.

## Connecting the contact form

The form never pretends to send. Until you configure delivery, it validates the fields and prepares the message for the visitor to copy (or open in their email app, if `email` is set).

Edit `FORM_CONFIG` at the top of `js/contact.js`:

- **Netlify Forms** (no extra service): set `provider: 'netlify'`, then add `data-netlify="true" netlify-honeypot="company_website"` to the `<form>` in `index.html`. Enable form detection in the Netlify dashboard and redeploy.
- **Formspree**: set `provider: 'formspree'` and `endpoint: 'https://formspree.io/f/YOUR_ID'`.

Spam protection that's already built in: a hidden honeypot field and a minimum fill time.

## Adding content

- **Project:** copy `_templates/project-row.html` into `projects/index.html` (and into the homepage if it should be featured).
- **Service:** copy one `<li class="service">` block in `index.html`, and add a matching `<option>` to the contact form and `SERVICE_LABELS` in `js/contact.js`.

## Adding a review

Reviews are stored in `data/reviews.json` as a JSON array. Each review is an object:

```json
{
  "id": "unique-slug",
  "author": "Client Name",
  "role": "Owner, Business Name",
  "text": "The review text, exactly as the client approved it.",
  "stars": 5,
  "date": "2026-09-22",
  "featured": true
}
```

- `stars` — integer 1–5.
- `featured` — set `true` to include the review in the homepage teaser (up to 3 are shown).
- `id` — any unique slug; not displayed, just used for tracking.

**To add a review:**
1. Get written approval from the client. Never publish without it.
2. Open `data/reviews.json` and append the new object to the array.
3. Bump `VERSION` in `sw.js` so the new JSON is fetched fresh.

**Nav link:** The "Reviews" link is hidden in the nav by default. `js/reviews.js` reveals it automatically once the array contains at least one review. No other change needed.

**Homepage teaser:** Reviews with `"featured": true` appear automatically on the homepage when the page loads. No HTML change required.

## Deploying changes

Bump `VERSION` in `sw.js` whenever CSS or JS changes, so returning visitors get the new files. Update `<lastmod>` in `sitemap.xml` for changed pages.

## Brand

Site voice is first person plural ("we") as Asmara Web Design. The About section is the one place that speaks as Henok T., founding owner. Keep that split when adding content.

The look is restrained Art Deco: symmetry, strong geometry, stepped forms, and thin gold rules, taking its cue from the tower-and-sun logo.

### Palette

Defined once in `css/tokens.css`. Each colour has a single role — stay inside it.

| Token | Hex | Role |
| --- | --- | --- |
| `--brand-sand` | `#F7D275` | Text and highlights on dark; small accents |
| `--brand-gold` | `#D69B2E` | Primary buttons and accents on dark; rules and borders |
| `--brand-bronze` | `#BB6A1A` | Hover states; large text only on light (never body text) |
| `--brand-navy` | `#0F3B6E` | Headings and links on light; dark surfaces |
| `--brand-blue` | `#1E5AA7` | Secondary links and focus rings on light |
| `--brand-steel` | `#2E6B9E` | Muted text on light; borders |
| `--brand-ink` | `#062545` | Darkest field: dark-mode background, footer, header plate |

Backgrounds also use white and two near-white tints (`#F5F7FA`, `#E8EDF4`). Gold and sand are never used as text or link colours on light backgrounds — they fail contrast. Muted and border tones are derived with `color-mix()` between palette colours and the background, so nothing off-brand appears. Every pairing meets WCAG AA (4.5:1 body text, 3:1 large text and UI borders).
