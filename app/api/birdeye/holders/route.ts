import { NextRequest, NextResponse } from "next/server";
import { getHolders, hasBirdeyeKey } from "@/lib/birdeye";

export async function GET(req: NextRequest) {
  const address = req.nextUrl.searchParams.get("address");
  if (!address) {
    return NextResponse.json({ error: "address required" }, { status: 400 });
  }
  const holders = await getHolders(address, 20);
  return NextResponse.json({ holders, live: hasBirdeyeKey() });
}
