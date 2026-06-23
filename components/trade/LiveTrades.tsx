"use client";

import { useTrades } from "@/lib/hooks";
import {
  abbreviateNumber,
  cn,
  formatPrice,
  shortAddress,
  timeAgo,
} from "@/lib/format";

export default function LiveTrades({ mint }: { mint: string }) {
  const { data, isLoading } = useTrades(mint);
  const trades = data?.trades ?? [];

  if (isLoading && trades.length === 0) {
    return (
      <div className="space-y-1 p-2">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="h-8 animate-pulse rounded bg-surface-2" />
        ))}
      </div>
    );
  }
  if (trades.length === 0) {
    return (
      <div className="p-4 text-xs text-muted">No recent trades found.</div>
    );
  }

  return (
    <div className="scroll-thin h-full overflow-y-auto">
      <table className="w-full text-sm">
        <thead className="sticky top-0 bg-surface text-[11px] uppercase tracking-wide text-muted">
          <tr>
            <th className="px-4 py-2 text-left font-medium">Time</th>
            <th className="px-4 py-2 text-left font-medium">Type</th>
            <th className="px-4 py-2 text-right font-medium">Price</th>
            <th className="px-4 py-2 text-right font-medium">Value</th>
            <th className="px-4 py-2 text-right font-medium">Maker</th>
          </tr>
        </thead>
        <tbody>
          {trades.map((t) => (
            <tr
              key={t.txHash}
              className={cn(
                "border-b border-border/40",
                t.side === "buy" ? "flash-green" : "flash-red"
              )}
            >
              <td className="px-4 py-2 text-muted">{timeAgo(t.blockUnixTime)}</td>
              <td
                className={cn(
                  "px-4 py-2 font-medium",
                  t.side === "buy" ? "text-positive" : "text-negative"
                )}
              >
                {t.side === "buy" ? "Buy" : "Sell"}
              </td>
              <td className="px-4 py-2 text-right">{formatPrice(t.priceUsd)}</td>
              <td className="px-4 py-2 text-right">
                ${abbreviateNumber(t.volumeUsd)}
              </td>
              <td className="px-4 py-2 text-right">
                <a
                  href={`https://solscan.io/tx/${t.txHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs text-muted hover:text-primary"
                >
                  {shortAddress(t.owner, 3)}
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
