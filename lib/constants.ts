export const SOL_MINT = "So11111111111111111111111111111111111111112";
export const USDC_MINT = "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v";

export const DEFAULT_MINT =
  process.env.NEXT_PUBLIC_DEFAULT_MINT || SOL_MINT;

export const ENABLE_LIVE_SWAPS =
  process.env.NEXT_PUBLIC_ENABLE_LIVE_SWAPS === "true";

export const STORE_LINKS = {
  android: "https://play.google.com/store/apps/details?id=xyz.chadwallet.www",
  ios: "https://apps.apple.com/us/app/chadwallet/id6757367474",
};

export const RPC_URL =
  process.env.NEXT_PUBLIC_SOLANA_RPC_URL ||
  "https://api.mainnet-beta.solana.com";
