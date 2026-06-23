"use client";
import useSWR from "swr";
import type { Candle, Holder, TokenSummary, Trade } from "./types";

const fetcher = (url: string) =>
  fetch(url).then((r) => {
    if (!r.ok) throw new Error("request failed");
    return r.json();
  });

export function useTrending(limit = 20) {
  return useSWR<{ tokens: TokenSummary[]; live: boolean }>(
    `/api/birdeye/trending?limit=${limit}`,
    fetcher,
    { refreshInterval: 30_000, revalidateOnFocus: false }
  );
}

export function useToken(mint?: string) {
  return useSWR<{ token: TokenSummary | null; live: boolean }>(
    mint ? `/api/birdeye/token/${mint}` : null,
    fetcher,
    { refreshInterval: 15_000, revalidateOnFocus: false }
  );
}

export function useOhlcv(mint?: string, type = "15m") {
  return useSWR<{ candles: Candle[]; live: boolean }>(
    mint ? `/api/birdeye/ohlcv?address=${mint}&type=${type}` : null,
    fetcher,
    { refreshInterval: 30_000, revalidateOnFocus: false }
  );
}

export function useHolders(mint?: string) {
  return useSWR<{ holders: Holder[]; live: boolean }>(
    mint ? `/api/birdeye/holders?address=${mint}` : null,
    fetcher,
    { refreshInterval: 60_000, revalidateOnFocus: false }
  );
}

export function useTrades(mint?: string) {
  return useSWR<{ trades: Trade[]; live: boolean }>(
    mint ? `/api/birdeye/trades?address=${mint}` : null,
    fetcher,
    { refreshInterval: 6_000, revalidateOnFocus: false }
  );
}

export function usePosition(owner?: string, mint?: string) {
  return useSWR<{ sol: number; token: number }>(
    owner && mint ? `/api/position?owner=${owner}&mint=${mint}` : null,
    fetcher,
    { refreshInterval: 20_000, revalidateOnFocus: false }
  );
}
