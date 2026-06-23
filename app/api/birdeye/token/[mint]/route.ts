import { NextRequest, NextResponse } from "next/server";
import { getTokenOverview, hasBirdeyeKey } from "@/lib/birdeye";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ mint: string }> }
) {
  const { mint } = await params;
  const token = await getTokenOverview(mint);
  return NextResponse.json({ token, live: hasBirdeyeKey() });
}
