import { NextRequest, NextResponse } from "next/server";
import { getTrades, hasBirdeyeKey } from "@/lib/birdeye";

export async function GET(req: NextRequest) {
  const address = req.nextUrl.searchParams.get("address");
  if (!address) {
    return NextResponse.json({ error: "address required" }, { status: 400 });
  }
  const trades = await getTrades(address, 50);
  return NextResponse.json({ trades, live: hasBirdeyeKey() });
}
