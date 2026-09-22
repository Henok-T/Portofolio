# Henok T. website

Static site: HTML, CSS, and vanilla JavaScript only.

## Preview locally

Serve the folder (do not open files as `file://` if you want the service worker to register):

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

## Deploy

Upload the contents of this folder to Netlify, Cloudflare Pages, or any static host. Point the domain at `index.html`.

## Update later

- Projects: copy a card in `index.html` and `projects.html`. Add a file under `projects/` if you want case notes.
- Testimonials: replace the placeholder block in `index.html`.
- Contact delivery: keep the current validation, then post the same fields to a form service when you have one.
- Email / phone: add them to the contact list when you want them public.

Resume source used for content: https://hktcv.netlify.app
