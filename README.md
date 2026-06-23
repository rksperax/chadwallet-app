# ChadWallet — web

A [fomo.family](https://fomo.family)-style landing page **and** a full web trading
terminal for the [ChadWallet](https://play.google.com/store/apps/details?id=xyz.chadwallet.www)
Solana app. Powered by real market data (BirdEye), real swaps (Jupiter), real
balances (Alchemy RPC), and Apple/Google sign-in with embedded Solana wallets
(Privy).

## Features

- **Landing page** — hero, cross-platform section, social/feature grid, app-store
  download CTAs, footer.
- **Rotating token banners** top & bottom (trending tokens) — tap a token to open
  its trading page.
- **Sign in with Apple / Google** via Privy, which auto-creates an embedded
  Solana wallet.
- **Trading page** (`/trade/[mint]`) — 3-column terminal:
  - **Left:** trending tokens list.
  - **Middle:** token header/stats, candlestick price chart (lightweight-charts +
    BirdEye OHLCV), and tabs for live trades / top holders.
  - **Right:** Buy/Sell panel with live Jupiter quotes + your position.

## Tech

Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · Privy · BirdEye ·
Jupiter · Alchemy RPC · lightweight-charts · SWR.

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in your keys (all have free tiers)
npm run dev                  # http://localhost:3000
```

The app runs **without** keys — it shows graceful empty states and Jupiter quotes
still work (keyless). Add keys to light up the rest.

### Environment variables

| Var | Used for | Where |
| --- | --- | --- |
| `NEXT_PUBLIC_PRIVY_APP_ID` | Apple/Google sign-in + embedded Solana wallet | [dashboard.privy.io](https://dashboard.privy.io) |
| `BIRDEYE_API_KEY` | Trending, token stats, OHLCV, holders, trades (server-only) | [birdeye.so/data-api](https://birdeye.so/data-api) |
| `SOLANA_RPC_URL` / `NEXT_PUBLIC_SOLANA_RPC_URL` | Balances & broadcast | [alchemy.com/rpc-api](https://www.alchemy.com/rpc-api) |
| `NEXT_PUBLIC_ENABLE_LIVE_SWAPS` | Safety switch (default `false`) | — |
| `NEXT_PUBLIC_DEFAULT_MINT` | Default token on `/trade` | — |

In the **Privy dashboard**, enable Google + Apple login and turn on **Solana**
embedded wallets.

### Live swaps safety switch

`NEXT_PUBLIC_ENABLE_LIVE_SWAPS` defaults to **`false`**. In that mode the Buy/Sell
flow fetches a real Jupiter quote, builds the swap transaction, and prompts the
user to **sign** it — but it does **not** broadcast to mainnet. Set it to `true`
only after you've tested, to enable real on-chain execution.

## Architecture notes

- **Secrets stay server-side.** BirdEye and the RPC are only ever called from
  Next.js route handlers under `app/api/*`; the browser never sees those keys.
- **Charts** use TradingView's open-source `lightweight-charts` fed by BirdEye
  OHLCV (no TradingView license needed).
- **Node 25 note:** the npm scripts run through `scripts/run-next.mjs`, which
  adds Node's `--localstorage-file` flag **only on Node ≥25** (whose experimental
  `localStorage` global otherwise throws during SSR and crashes wallet SDKs).
  On Node ≤22 (e.g. Vercel) the flag isn't added and builds run normally.
  `next.config.ts` also installs an in-memory `localStorage` shim as a fallback.

## Brand assets

`public/brand/logo.svg` is a **placeholder** matching the Solana green/purple
theme. To drop in the official ChadWallet assets (logo, colors, OG image), see
[`public/brand/README.md`](public/brand/README.md) — it's a one-file swap, and
brand colors live in `app/globals.css` under `:root`.

## Deploy

Deploys to Vercel out of the box. Add the env vars in the Vercel project settings.

```bash
npm run build && npm start
```
