"use client";

import Link from "next/link";
import { useTrending } from "@/lib/hooks";
import { cn, formatPercent, formatPrice, abbreviateNumber } from "@/lib/format";
import TokenIcon from "@/components/ui/TokenIcon";
import { TrendingUp } from "lucide-react";

export default function TrendingList({ activeMint }: { activeMint?: string }) {
  const { data, isLoading } = useTrending(20);
  const tokens = data?.tokens ?? [];

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-2 border-b border-border px-4 py-3">
        <TrendingUp size={16} className="text-primary" />
        <h2 className="text-sm font-semibold">Trending</h2>
      </div>

      <div className="scroll-thin flex-1 overflow-y-auto">
        {isLoading && tokens.length === 0 && (
          <div className="space-y-1 p-2">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="h-12 animate-pulse rounded-lg bg-surface-2" />
            ))}
          </div>
        )}

        {!isLoading && tokens.length === 0 && (
          <div className="p-4 text-xs text-muted">
            No trending data. Add <code>BIRDEYE_API_KEY</code> to{" "}
            <code>.env.local</code>.
          </div>
        )}

        {tokens.map((t, i) => {
          const up = (t.priceChange24h ?? 0) >= 0;
          const active = t.address === activeMint;
          return (
            <Link
              key={t.address}
              href={`/trade/${t.address}`}
              className={cn(
                "flex items-center gap-3 border-b border-border/50 px-4 py-2.5 transition hover:bg-surface-2",
                active && "bg-surface-2"
              )}
            >
              <span className="w-4 text-xs text-muted">{i + 1}</span>
              <TokenIcon src={t.logoURI} symbol={t.symbol} size={28} />
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-semibold">{t.symbol}</div>
                <div className="truncate text-xs text-muted">
                  V {abbreviateNumber(t.volume24h)}
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm">{formatPrice(t.price)}</div>
                <div
                  className={cn(
                    "text-xs",
                    up ? "text-positive" : "text-negative"
                  )}
                >
                  {formatPercent(t.priceChange24h)}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
