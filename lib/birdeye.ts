import "server-only";
import type { Candle, Holder, TokenSummary, Trade } from "./types";

const BASE = "https://public-api.birdeye.so";

export function hasBirdeyeKey() {
  return Boolean(process.env.BIRDEYE_API_KEY);
}

async function birdeye<T>(
  path: string,
  params: Record<string, string | number | undefined> = {},
  revalidate = 15
): Promise<T | null> {
  const key = process.env.BIRDEYE_API_KEY;
  if (!key) return null;

  const url = new URL(BASE + path);
  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined) url.searchParams.set(k, String(v));
  }

  try {
    const res = await fetch(url.toString(), {
      headers: {
        "X-API-KEY": key,
        "x-chain": "solana",
        accept: "application/json",
      },
      next: { revalidate },
    });
    if (!res.ok) {
      console.error(`[birdeye] ${path} -> ${res.status}`);
      return null;
    }
    const json = await res.json();
    if (json?.success === false) return null;
    return (json?.data ?? json) as T;
  } catch (err) {
    console.error(`[birdeye] ${path} failed`, err);
    return null;
  }
}

/* ---------------- Trending ---------------- */

export async function getTrending(limit = 20): Promise<TokenSummary[]> {
  const data = await birdeye<{ tokens?: TrendingRaw[] }>(
    "/defi/token_trending",
    { sort_by: "rank", sort_type: "asc", offset: 0, limit },
    30
  );
  const tokens = data?.tokens ?? [];
  // BirdEye occasionally returns the same mint more than once — dedupe by
  // address so React keys stay unique and the list has no repeats.
  const seen = new Set<string>();
  const unique = tokens.filter((t) => {
    if (!t.address || seen.has(t.address)) return false;
    seen.add(t.address);
    return true;
  });
  return unique.map((t) => ({
    address: t.address,
    symbol: t.symbol ?? "?",
    name: t.name ?? t.symbol ?? "Unknown",
    logoURI: t.logoURI,
    decimals: t.decimals ?? 9,
    price: t.price,
    priceChange24h: t.price24hChangePercent,
    volume24h: t.volume24hUSD,
    liquidity: t.liquidity,
    marketCap: t.marketcap ?? t.fdv,
    fdv: t.fdv,
  }));
}

interface TrendingRaw {
  address: string;
  symbol?: string;
  name?: string;
  logoURI?: string;
  decimals?: number;
  price?: number;
  price24hChangePercent?: number;
  volume24hUSD?: number;
  liquidity?: number;
  marketcap?: number;
  fdv?: number;
}

/* ---------------- Token overview ---------------- */

export async function getTokenOverview(
  address: string
): Promise<TokenSummary | null> {
  const d = await birdeye<OverviewRaw>("/defi/token_overview", { address }, 15);
  if (!d) return null;
  return {
    address,
    symbol: d.symbol ?? "?",
    name: d.name ?? d.symbol ?? "Unknown",
    logoURI: d.logoURI,
    decimals: d.decimals ?? 9,
    price: d.price,
    priceChange24h: d.priceChange24hPercent,
    volume24h: d.v24hUSD ?? d.volume24hUSD,
    liquidity: d.liquidity,
    marketCap: d.marketCap ?? d.mc,
    fdv: d.fdv,
    holders: d.holder,
  };
}

interface OverviewRaw {
  symbol?: string;
  name?: string;
  logoURI?: string;
  decimals?: number;
  price?: number;
  priceChange24hPercent?: number;
  v24hUSD?: number;
  volume24hUSD?: number;
  liquidity?: number;
  marketCap?: number;
  mc?: number;
  fdv?: number;
  holder?: number;
}

/* ---------------- OHLCV ---------------- */

export async function getOhlcv(
  address: string,
  type = "15m",
  limitMinutes = 60 * 24 * 3
): Promise<Candle[]> {
  const now = Math.floor(Date.now() / 1000);
  const from = now - limitMinutes * 60;
  const d = await birdeye<{ items?: OhlcvRaw[] }>(
    "/defi/ohlcv",
    { address, type, time_from: from, time_to: now, currency: "usd" },
    30
  );
  const items = d?.items ?? [];
  return items.map((i) => ({
    time: i.unixTime,
    open: i.o,
    high: i.h,
    low: i.l,
    close: i.c,
    volume: i.v,
  }));
}

interface OhlcvRaw {
  unixTime: number;
  o: number;
  h: number;
  l: number;
  c: number;
  v: number;
}

/* ---------------- Holders ---------------- */

export async function getHolders(
  address: string,
  limit = 20
): Promise<Holder[]> {
  const d = await birdeye<{ items?: HolderRaw[] }>(
    "/defi/v3/token/holder",
    { address, offset: 0, limit },
    60
  );
  const items = d?.items ?? [];
  return items.map((h, idx) => ({
    owner: h.owner,
    amount: Number(h.amount ?? 0),
    uiAmount: h.ui_amount ?? Number(h.amount ?? 0),
    percentage: h.percentage,
    rank: idx + 1,
  }));
}

interface HolderRaw {
  owner: string;
  amount?: string | number;
  ui_amount?: number;
  percentage?: number;
}

/* ---------------- Trades ---------------- */

export async function getTrades(
  address: string,
  limit = 50
): Promise<Trade[]> {
  const d = await birdeye<{ items?: TradeRaw[] }>(
    "/defi/txs/token",
    { address, tx_type: "swap", sort_type: "desc", offset: 0, limit },
    5
  );
  const items = d?.items ?? [];
  return items.map((t) => {
    // BirdEye marks the "from"/"to" sides; "buy" = base token received.
    const isBuy = t.side ? t.side === "buy" : (t.to?.address === address);
    return {
      txHash: t.txHash,
      side: isBuy ? "buy" : "sell",
      owner: t.owner ?? t.from?.owner ?? "",
      priceUsd: t.from?.price ?? t.to?.price,
      volumeUsd: t.volumeUSD,
      baseAmount: isBuy ? t.to?.uiAmount : t.from?.uiAmount,
      blockUnixTime: t.blockUnixTime,
    };
  });
}

interface TradeRaw {
  txHash: string;
  side?: "buy" | "sell";
  owner?: string;
  volumeUSD?: number;
  blockUnixTime: number;
  from?: { address?: string; owner?: string; uiAmount?: number; price?: number };
  to?: { address?: string; owner?: string; uiAmount?: number; price?: number };
}
