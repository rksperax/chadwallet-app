export interface TokenSummary {
  address: string;
  symbol: string;
  name: string;
  logoURI?: string;
  decimals: number;
  price?: number;
  priceChange24h?: number; // percent
  volume24h?: number;
  liquidity?: number;
  marketCap?: number;
  fdv?: number;
  holders?: number;
}

export interface Candle {
  time: number; // unix seconds (UTC)
  open: number;
  high: number;
  low: number;
  close: number;
  volume?: number;
}

export interface Holder {
  owner: string;
  amount: number;
  uiAmount: number;
  percentage?: number;
  rank?: number;
}

export interface Trade {
  txHash: string;
  side: "buy" | "sell";
  owner: string;
  priceUsd?: number;
  volumeUsd?: number;
  baseAmount?: number;
  blockUnixTime: number;
}

export interface JupQuote {
  inputMint: string;
  outputMint: string;
  inAmount: string;
  outAmount: string;
  otherAmountThreshold: string;
  priceImpactPct: string;
  routePlan?: { swapInfo?: { label?: string } }[];
  raw?: unknown;
}
