# Asmara Web Design

Portfolio site for Asmara Web Design — a web design and technical support studio in Metro Atlanta, GA.

Built in plain HTML, CSS, and JavaScript with no build step. Deployed on Netlify.

## Checks

Three jobs run on every push and pull request to `master`. They run in parallel.

| Check | Tool | Fails the build? |
|---|---|:---:|
| HTML validation | `html-validate` (recommended preset) | Yes — any error |
| Internal & fragment links broken | lychee | Yes |
| External links broken | lychee | **No** — report only |
| Lighthouse performance < 70 | Lighthouse CI | Yes |
| Lighthouse accessibility < 90 | Lighthouse CI | Yes |
| Lighthouse best practices < 50 | Lighthouse CI | No — warning only |
| Lighthouse SEO < 50 | Lighthouse CI | No — warning only |

Lighthouse runs both mobile and desktop. Full HTML/JSON reports are uploaded as workflow artifacts on each run. Link-check and Lighthouse scores are printed in the job summary so you can read them without opening logs.

External links are excluded from build failures because client sites and social links go down for reasons unrelated to a commit. LinkedIn and Google Fonts are additionally excluded from the external check because they block or rate-limit CI runners.

### Run locally before pushing

```bash
# HTML validation
npx html-validate index.html offline.html

# Internal/fragment links  (requires lychee: brew install lychee  or  cargo install lychee)
lychee --exclude "https?://" index.html offline.html

# External links (report only — exit code ignored)
lychee --include "https?://" --timeout 30 --max-retries 2 index.html offline.html || true

# Lighthouse  (start a server first, then run LHCI)
npx --yes serve@14 -l 8080 . &
npx --yes lhci autorun --collect.url=http://localhost:8080/ --collect.numberOfRuns=1
```
