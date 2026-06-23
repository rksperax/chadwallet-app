"use client";

import { useEffect, useMemo, useState } from "react";
import { usePrivy } from "@privy-io/react-auth";
import { useWallets, useSignTransaction, useSignAndSendTransaction } from "@privy-io/react-auth/solana";
import Button from "@/components/ui/Button";
import { useToken, usePosition } from "@/lib/hooks";
import { ENABLE_LIVE_SWAPS, SOL_MINT } from "@/lib/constants";
import { abbreviateNumber, cn, formatPrice } from "@/lib/format";
import type { TokenSummary } from "@/lib/types";

const HAS_PRIVY = Boolean(process.env.NEXT_PUBLIC_PRIVY_APP_ID);
const PRESETS_BUY = [0.1, 0.5, 1, 5];

function base64ToBytes(b64: string): Uint8Array {
  const bin = atob(b64);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return bytes;
}

interface Quote {
  outAmount: string;
  priceImpactPct: string;
  routePlan?: { swapInfo?: { label?: string } }[];
}

export default function TradePanel({ mint }: { mint: string }) {
  const { data } = useToken(mint);
  const token = data?.token;
  const [side, setSide] = useState<"buy" | "sell">("buy");
  const [amount, setAmount] = useState("");

  const isSol = mint === SOL_MINT;
  const tokenDecimals = token?.decimals ?? 9;

  // Build quote params.
  const inputMint = side === "buy" ? SOL_MINT : mint;
  const outputMint = side === "buy" ? mint : SOL_MINT;
  const inputDecimals = side === "buy" ? 9 : tokenDecimals;
  const outputDecimals = side === "buy" ? tokenDecimals : 9;

  const [quote, setQuote] = useState<Quote | null>(null);
  const [quoteErr, setQuoteErr] = useState<string | null>(null);
  const [quoting, setQuoting] = useState(false);

  const amountNum = parseFloat(amount);
  const baseAmount = useMemo(() => {
    if (!amountNum || amountNum <= 0) return null;
    return Math.floor(amountNum * 10 ** inputDecimals).toString();
  }, [amountNum, inputDecimals]);

  // Fetch quote (debounced). SOL->SOL has no route, so we skip fetching and let
  // the render below show a derived message — no setState in the effect body.
  useEffect(() => {
    if (!baseAmount || isSol) return;
    const ctrl = new AbortController();
    const id = setTimeout(async () => {
      setQuoting(true);
      setQuoteErr(null);
      try {
        const res = await fetch(
          `/api/jupiter/quote?inputMint=${inputMint}&outputMint=${outputMint}&amount=${baseAmount}&slippageBps=50`,
          { signal: ctrl.signal }
        );
        const json = await res.json();
        if (!res.ok) throw new Error(json.error || "quote failed");
        setQuote(json.quote);
      } catch (e) {
        if ((e as Error).name !== "AbortError") {
          setQuoteErr((e as Error).message);
          setQuote(null);
        }
      } finally {
        setQuoting(false);
      }
    }, 350);
    return () => {
      clearTimeout(id);
      ctrl.abort();
    };
  }, [baseAmount, inputMint, outputMint, isSol]);

  // Only treat the quote as active when the inputs that produced it still apply.
  const activeQuote = baseAmount && !isSol ? quote : null;
  const displayErr = isSol ? "Pick a token other than SOL to trade." : quoteErr;
  const outUi = activeQuote
    ? Number(activeQuote.outAmount) / 10 ** outputDecimals
    : null;
  const priceImpact = activeQuote
    ? parseFloat(activeQuote.priceImpactPct) * 100
    : null;
  const route = activeQuote?.routePlan
    ?.map((r) => r.swapInfo?.label)
    .filter(Boolean)
    .join(" → ");

  return (
    <div className="flex flex-col gap-4 p-4">
      {/* Buy / Sell toggle */}
      <div className="grid grid-cols-2 gap-1 rounded-xl bg-surface-2 p-1">
        {(["buy", "sell"] as const).map((s) => (
          <button
            key={s}
            onClick={() => {
              setSide(s);
              setAmount("");
            }}
            className={cn(
              "rounded-lg py-2 text-sm font-semibold capitalize transition",
              side === s
                ? s === "buy"
                  ? "bg-positive text-white"
                  : "bg-negative text-white"
                : "text-muted hover:text-foreground"
            )}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Amount */}
      <div>
        <div className="mb-1 flex items-center justify-between text-xs text-muted">
          <span>You pay</span>
          <span>{side === "buy" ? "SOL" : token?.symbol ?? "token"}</span>
        </div>
        <input
          inputMode="decimal"
          value={amount}
          onChange={(e) => setAmount(e.target.value.replace(/[^0-9.]/g, ""))}
          placeholder="0.0"
          className="w-full rounded-xl border border-border bg-background px-4 py-3 text-lg outline-none focus:border-primary"
        />
        {side === "buy" && (
          <div className="mt-2 flex gap-2">
            {PRESETS_BUY.map((p) => (
              <button
                key={p}
                onClick={() => setAmount(String(p))}
                className="flex-1 rounded-lg border border-border bg-surface-2 py-1.5 text-xs hover:bg-surface-3"
              >
                {p}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Quote readout */}
      <div className="rounded-xl border border-border bg-surface-2 p-3 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-muted">You receive</span>
          <span className="font-semibold">
            {quoting
              ? "…"
              : outUi != null
              ? `${abbreviateNumber(outUi, outUi < 1 ? 6 : 2)} ${
                  side === "buy" ? token?.symbol ?? "" : "SOL"
                }`
              : "—"}
          </span>
        </div>
        <div className="mt-1 flex items-center justify-between text-xs text-muted">
          <span>Price impact</span>
          <span className={cn(priceImpact != null && priceImpact > 5 && "text-negative")}>
            {priceImpact != null ? priceImpact.toFixed(2) + "%" : "—"}
          </span>
        </div>
        {route && (
          <div className="mt-1 flex items-center justify-between text-xs text-muted">
            <span>Route</span>
            <span className="max-w-[60%] truncate" title={route}>{route}</span>
          </div>
        )}
        {displayErr && (
          <div className="mt-2 text-xs text-negative">{displayErr}</div>
        )}
      </div>

      {/* Action + position (gated on Privy) */}
      {HAS_PRIVY ? (
        <ConnectedTrade
          mint={mint}
          token={token}
          side={side}
          quote={activeQuote}
          baseAmount={baseAmount}
          amountLabel={amount}
        />
      ) : (
        <div className="rounded-xl border border-dashed border-border p-3 text-center text-xs text-muted">
          Set <code>NEXT_PUBLIC_PRIVY_APP_ID</code> in <code>.env.local</code> to
          enable sign-in &amp; trading.
        </div>
      )}
    </div>
  );
}

/* ---------------- Connected (Privy) trade action + position ---------------- */

function ConnectedTrade({
  mint,
  token,
  side,
  quote,
  baseAmount,
}: {
  mint: string;
  token?: TokenSummary | null;
  side: "buy" | "sell";
  quote: Quote | null;
  baseAmount: string | null;
  amountLabel: string;
}) {
  const { authenticated, login } = usePrivy();
  const { wallets } = useWallets();
  const { signTransaction } = useSignTransaction();
  const { signAndSendTransaction } = useSignAndSendTransaction();
  const wallet = wallets[0];
  const { data: pos } = usePosition(wallet?.address, mint);

  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState<{ kind: "ok" | "err"; msg: string } | null>(
    null
  );

  async function execute() {
    if (!quote || !wallet) return;
    setBusy(true);
    setStatus(null);
    try {
      const res = await fetch("/api/jupiter/swap", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          quoteResponse: quote,
          userPublicKey: wallet.address,
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "swap build failed");
      const txBytes = base64ToBytes(json.swapTransaction);

      if (ENABLE_LIVE_SWAPS) {
        const { signature } = await signAndSendTransaction({
          transaction: txBytes,
          wallet,
        });
        const sig = Array.from(signature)
          .map((b) => b.toString(16).padStart(2, "0"))
          .join("");
        setStatus({ kind: "ok", msg: `Submitted: ${sig.slice(0, 16)}…` });
      } else {
        await signTransaction({ transaction: txBytes, wallet });
        setStatus({
          kind: "ok",
          msg: "Built & signed ✓ — broadcast disabled (set NEXT_PUBLIC_ENABLE_LIVE_SWAPS=true to go live).",
        });
      }
    } catch (e) {
      setStatus({ kind: "err", msg: (e as Error).message });
    } finally {
      setBusy(false);
    }
  }

  if (!authenticated) {
    return (
      <Button onClick={login} className="w-full py-3">
        Sign in to trade
      </Button>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <Button
        variant={side}
        className="w-full py-3 text-base"
        disabled={!quote || !baseAmount || busy}
        onClick={execute}
      >
        {busy
          ? "Confirm in wallet…"
          : side === "buy"
          ? `Buy ${token?.symbol ?? ""}`
          : `Sell ${token?.symbol ?? ""}`}
      </Button>

      {!ENABLE_LIVE_SWAPS && (
        <p className="text-center text-[11px] text-muted">
          Live swaps are off — orders are built &amp; signed but not broadcast.
        </p>
      )}

      {status && (
        <p
          className={cn(
            "break-words rounded-lg bg-surface-2 p-2 text-xs",
            status.kind === "ok" ? "text-positive" : "text-negative"
          )}
        >
          {status.msg}
        </p>
      )}

      {/* Position */}
      <div className="rounded-xl border border-border bg-surface-2 p-3">
        <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted">
          Your position
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted">SOL</span>
          <span>{pos ? abbreviateNumber(pos.sol, 4) : "—"}</span>
        </div>
        <div className="mt-1 flex items-center justify-between text-sm">
          <span className="text-muted">{token?.symbol ?? "Token"}</span>
          <span>{pos ? abbreviateNumber(pos.token, 4) : "—"}</span>
        </div>
        {pos && token?.price != null && (
          <div className="mt-2 flex items-center justify-between border-t border-border pt-2 text-sm">
            <span className="text-muted">Value</span>
            <span className="font-semibold">
              {formatPrice(pos.token * token.price)}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
