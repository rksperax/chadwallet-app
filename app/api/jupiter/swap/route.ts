import { NextRequest, NextResponse } from "next/server";
import { buildJupiterSwap } from "@/lib/jupiter";

// Builds (does NOT broadcast) the swap transaction. The client signs it and,
// only if NEXT_PUBLIC_ENABLE_LIVE_SWAPS is true, sends it to the network.
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { quoteResponse, userPublicKey } = body ?? {};
    if (!quoteResponse || !userPublicKey) {
      return NextResponse.json(
        { error: "quoteResponse and userPublicKey are required" },
        { status: 400 }
      );
    }
    const result = await buildJupiterSwap({ quoteResponse, userPublicKey });
    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "swap build failed" },
      { status: 502 }
    );
  }
}
