import { NextRequest, NextResponse } from "next/server";
import { getSolBalance, getTokenBalance } from "@/lib/solana";

export async function GET(req: NextRequest) {
  const owner = req.nextUrl.searchParams.get("owner");
  const mint = req.nextUrl.searchParams.get("mint");
  if (!owner || !mint) {
    return NextResponse.json(
      { error: "owner and mint are required" },
      { status: 400 }
    );
  }
  const [sol, token] = await Promise.all([
    getSolBalance(owner),
    getTokenBalance(owner, mint),
  ]);
  return NextResponse.json({ sol, token });
}
