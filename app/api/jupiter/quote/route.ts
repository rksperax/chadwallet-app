import { NextRequest, NextResponse } from "next/server";
import { getJupiterQuote } from "@/lib/jupiter";

export async function GET(req: NextRequest) {
  const sp = req.nextUrl.searchParams;
  const inputMint = sp.get("inputMint");
  const outputMint = sp.get("outputMint");
  const amount = sp.get("amount");
  const slippageBps = Number(sp.get("slippageBps") ?? 50);

  if (!inputMint || !outputMint || !amount) {
    return NextResponse.json(
      { error: "inputMint, outputMint and amount are required" },
      { status: 400 }
    );
  }
  try {
    const quote = await getJupiterQuote({
      inputMint,
      outputMint,
      amount,
      slippageBps,
    });
    return NextResponse.json({ quote });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "quote failed" },
      { status: 502 }
    );
  }
}
