"use client";

import { useHolders } from "@/lib/hooks";
import { abbreviateNumber, shortAddress } from "@/lib/format";

export default function HoldersList({ mint }: { mint: string }) {
  const { data, isLoading } = useHolders(mint);
  const holders = data?.holders ?? [];

  if (isLoading && holders.length === 0) {
    return <SkeletonRows />;
  }
  if (holders.length === 0) {
    return (
      <div className="p-4 text-xs text-muted">
        Holder data unavailable (requires a BirdEye plan with the holder
        endpoint).
      </div>
    );
  }

  return (
    <div className="scroll-thin h-full overflow-y-auto">
      <table className="w-full text-sm">
        <thead className="sticky top-0 bg-surface text-[11px] uppercase tracking-wide text-muted">
          <tr>
            <th className="px-4 py-2 text-left font-medium">#</th>
            <th className="px-4 py-2 text-left font-medium">Holder</th>
            <th className="px-4 py-2 text-right font-medium">Amount</th>
            <th className="px-4 py-2 text-right font-medium">Share</th>
          </tr>
        </thead>
        <tbody>
          {holders.map((h) => (
            <tr key={h.owner} className="border-b border-border/40">
              <td className="px-4 py-2 text-muted">{h.rank}</td>
              <td className="px-4 py-2 font-mono text-xs">
                <a
                  href={`https://solscan.io/account/${h.owner}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary"
                >
                  {shortAddress(h.owner, 4)}
                </a>
              </td>
              <td className="px-4 py-2 text-right">
                {abbreviateNumber(h.uiAmount)}
              </td>
              <td className="px-4 py-2 text-right text-muted">
                {h.percentage != null ? h.percentage.toFixed(2) + "%" : "—"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function SkeletonRows() {
  return (
    <div className="space-y-1 p-2">
      {Array.from({ length: 10 }).map((_, i) => (
        <div key={i} className="h-8 animate-pulse rounded bg-surface-2" />
      ))}
    </div>
  );
}
