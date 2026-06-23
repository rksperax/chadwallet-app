# ChadWallet brand assets

This folder holds the brand assets used across the web app. The current
`logo.svg` is a **placeholder** generated to match the Solana-flavored
green/purple theme.

## Dropping in the real assets

The official assets live in the shared Google Drive folder:
https://drive.google.com/drive/folders/1j4PZng-sJHxqAATUF1WYw1_jm8nyQwCE
(it wasn't reachable from the build tooling, so swap them in here).

1. **Logo / icon** — replace `public/brand/logo.svg` (keep the filename) or add
   `logo.png` and update the `src` in `components/layout/Logo.tsx`.
2. **Wordmark** — if you have a full "ChadWallet" wordmark, drop it as
   `public/brand/wordmark.svg` and use it in `Logo.tsx`.
3. **Colors** — set the exact hex values in `app/globals.css` under `:root`
   (`--primary`, `--accent`, `--background`, …). Everything themes off those.
4. **OG / social image** — add `public/og.png` (1200×630) for link previews.
5. **Favicon** — replace `app/favicon.ico`.

No other code changes are required — the rest of the UI reads from these.
