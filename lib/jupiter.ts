// Jupiter swap API helpers. Free "lite" tier needs no API key.
// Docs: https://developers.jup.ag/docs/get-started
const JUP_BASE = "https://lite-api.jup.ag/swap/v1";

export async function getJupiterQuote(params: {
  inputMint: string;
  outputMint: string;
  amount: string; // in base units (lamports / token atomic units)
  slippageBps?: number;
}) {
  const url = new URL(JUP_BASE + "/quote");
  url.searchParams.set("inputMint", params.inputMint);
  url.searchParams.set("outputMint", params.outputMint);
  url.searchParams.set("amount", params.amount);
  url.searchParams.set("slippageBps", String(params.slippageBps ?? 50));
  url.searchParams.set("restrictIntermediateTokens", "true");

  const res = await fetch(url.toString(), {
    headers: { accept: "application/json" },
    cache: "no-store",
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Jupiter quote failed (${res.status}): ${text}`);
  }
  return res.json();
}

// Builds (does not send) the swap transaction. Returns base64 serialized tx.
export async function buildJupiterSwap(params: {
  quoteResponse: unknown;
  userPublicKey: string;
}) {
  const res = await fetch(JUP_BASE + "/swap", {
    method: "POST",
    headers: { "content-type": "application/json", accept: "application/json" },
    body: JSON.stringify({
      quoteResponse: params.quoteResponse,
      userPublicKey: params.userPublicKey,
      wrapAndUnwrapSol: true,
      dynamicComputeUnitLimit: true,
      prioritizationFeeLamports: { priorityLevelWithMaxLamports: { priorityLevel: "high", maxLamports: 1_000_000 } },
    }),
    cache: "no-store",
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Jupiter swap build failed (${res.status}): ${text}`);
  }
  return res.json();
}
