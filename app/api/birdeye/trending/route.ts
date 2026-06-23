import { NextRequest, NextResponse } from "next/server";
import { getTrending, hasBirdeyeKey } from "@/lib/birdeye";

export async function GET(req: NextRequest) {
  const limit = Number(req.nextUrl.searchParams.get("limit") ?? 20);
  const tokens = await getTrending(limit);
  return NextResponse.json({ tokens, live: hasBirdeyeKey() });
}
