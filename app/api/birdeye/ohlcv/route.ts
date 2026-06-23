import { NextRequest, NextResponse } from "next/server";
import { getOhlcv, hasBirdeyeKey } from "@/lib/birdeye";

// Map UI timeframe -> BirdEye candle type + lookback window (minutes).
const RANGES: Record<string, { type: string; minutes: number }> = {
  "1m": { type: "1m", minutes: 60 * 6 },
  "5m": { type: "5m", minutes: 60 * 24 },
  "15m": { type: "15m", minutes: 60 * 24 * 3 },
  "1h": { type: "1H", minutes: 60 * 24 * 14 },
  "4h": { type: "4H", minutes: 60 * 24 * 60 },
  "1d": { type: "1D", minutes: 60 * 24 * 365 },
};

export async function GET(req: NextRequest) {
  const address = req.nextUrl.searchParams.get("address");
  const tf = req.nextUrl.searchParams.get("type") ?? "15m";
  if (!address) {
    return NextResponse.json({ error: "address required" }, { status: 400 });
  }
  const range = RANGES[tf] ?? RANGES["15m"];
  const candles = await getOhlcv(address, range.type, range.minutes);
  return NextResponse.json({ candles, live: hasBirdeyeKey() });
}
