# Realty Creditors — Documentation

## Functionality

Realty Creditors is a real-estate financing landing page: a hero section with a multi-step loan application form, property/feature highlights, calculators, and lender matching. It ships with contact, privacy, and terms pages, is localized in English/Spanish/Amharic via `@nuxtjs/i18n`, and works offline as an installable PWA. Dark mode is an SSR-safe Pinia store that toggles a `dark` class on the document root.

## Stack

- Nuxt 4 (`nuxt ^4.4.8`, `compatibilityVersion: 4`)
- Vue 3 (`vue ^3.5.38`, Composition API)
- Tailwind CSS 3.4 (via `@nuxtjs/tailwindcss ^6.14.0`)
- `@nuxtjs/i18n ^10.4.0` (3 locales, lazy loading)
- `@vite-pwa/nuxt ^1.1.1` (+ `vite-plugin-pwa ^1.3.0`)
- `nuxt-security ^2.6.0` (CSP, rate limiter, XSS validator)
- Pinia `^3.0.4` (dark-mode store)
- `vue-router ^5.1.0`
- Testing: Vitest `^4.1.9`, `@playwright/test ^1.61.1`, `@vue/test-utils ^2.4.11`, `happy-dom ^20.10.6`

## Steps Taken

- `1eaeff6` nuxt4 migration/creation + realty-creditors-nuxt4
- `2376fb0` add README.txt with deploy instructions + project overview
- `f001d0f` convert README.txt to README.md with GitHub markdown formatting
- `c677e7f` fix README.md formatting
- `840e0c7` fix(i18n+security): detectBrowserLanguage:false, $t→t, missing keys, CSP nonce, lazy i18n, branded PWA
- `4323d4a` fix(netlify): node 24 + legacy-peer-deps (nuxt-security@2.6.0 needs >=24)
- `449886a` fix(netlify): root / redirect to /en/ (prefix strategy) + SPA fallback to /200.html

## Pitfalls & Fixes

**Shared (all sh1r00 templates):**

- **nuxt-security@2.6.0 needs Node ≥ 24.** Deploying on Node 22 failed with `EBADENGINE`. Fixed by `NODE_VERSION = "24"` in `netlify.toml`.
- **esbuild peer conflict.** `vite@8` (Nuxt 4) vs `@intlify/bundle-utils` (i18n) peer ranges conflict. Fixed with `npm install --legacy-peer-deps` (also set in the `netlify.toml` build command).
- **i18n v10 browser detection.** Set `detectBrowserLanguage: false` and build locale-aware links with `const localePath = useLocalePath()`.
- **`$t()` banned in templates.** `$t` isn't exposed in `<script setup>` templates; use `const { t } = useI18n()` and call `t('key')`.
- **Component auto-import naming.** Without `pathPrefix: false`, nested dirs auto-import as `OrganismsOHeroSection`, which resolves to a blank screen.
- **PWA precache + fallback.** Precached HTML plus a `/` `navigateFallback` made non-precached routes render blank. Fix: `navigateFallback: null` and exclude HTML from the precache manifest (this template instead pairs `navigateFallback: '/'` with the Netlify `/* → /200.html` 200 rewrite).
- **i18n `prefix` root redirect.** With `strategy: 'prefix'`, `/` must 302 to `/en/` (not `/* → /index.html`), or the bare domain breaks.
- **`defineProps()` without `const props =`.** Referencing `props` in `<script setup>` after a bare `defineProps()` call throws `props is not defined`; always assign `const props = defineProps(...)`.
- **SSG vs SSR output dirs.** `nuxt generate` (SSG) → `.output/public`; `nuxt build` (SSR) → `.output/server` + Node server. Netlify must run `generate` and publish `.output/public`.

**Project-specific:**

- Only `atoms/` and `organisms/` are registered in `components.dirs` (`pathPrefix: false`); there is no `molecules/` folder in this template (the README references molecules generically).
- Locales are lazy-loaded from `i18n/locales/*.json` via `langDir: 'locales/'` + `file: 'en.json'`, with `baseUrl` from `APP_BASE_URL`.
- Unlike the profile templates, there is no `dist -> .output/public` symlink; Netlify publishes `.output/public` directly.

## Deployment

Static (SSG) deployment:

```bash
npm install --legacy-peer-deps
npm run generate   # emits static files to .output/public
```

`netlify.toml` publishes `.output/public`, sets `NODE_VERSION = "24"`, installs with `--legacy-peer-deps`, and applies redirects:

- `/` → `/en/` (302) for the i18n `prefix` strategy
- `/*` → `/200.html` (200) SPA fallback

Live: https://realty-creditors.netlify.app

## TODO / Roadmap
- [ ] Point a custom domain (optional) — for client-facing work; a single wildcard domain can cover all sites.
