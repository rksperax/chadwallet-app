"use client";

import Link from "next/link";
import { useTrending } from "@/lib/hooks";
import { cn, formatPercent, formatPrice } from "@/lib/format";
import TokenIcon from "@/components/ui/TokenIcon";
import type { TokenSummary } from "@/lib/types";

function BannerItem({ t }: { t: TokenSummary }) {
  const up = (t.priceChange24h ?? 0) >= 0;
  return (
    <Link
      href={`/trade/${t.address}`}
      className="flex items-center gap-2 whitespace-nowrap px-4 py-2 hover:bg-surface-2"
    >
      <TokenIcon src={t.logoURI} symbol={t.symbol} size={20} />
      <span className="text-sm font-semibold">{t.symbol}</span>
      <span className="text-sm text-muted">{formatPrice(t.price)}</span>
      <span
        className={cn(
          "text-xs font-medium",
          up ? "text-positive" : "text-negative"
        )}
      >
        {formatPercent(t.priceChange24h)}
      </span>
    </Link>
  );
}

export default function TokenBanner({
  reverse = false,
  position = "top",
}: {
  reverse?: boolean;
  position?: "top" | "bottom";
}) {
  const { data } = useTrending(20);
  const tokens = data?.tokens ?? [];

  if (tokens.length === 0) {
    // Keep the strip height stable while loading / when no key is set.
    return (
      <div
        className={cn(
          "h-[37px] w-full bg-surface/60",
          position === "top" ? "border-b border-border" : "border-t border-border"
        )}
      />
    );
  }

  // Duplicate the list so the marquee can loop seamlessly.
  const loop = [...tokens, ...tokens];

  return (
    <div
      className={cn(
        "marquee w-full overflow-hidden bg-surface/60",
        reverse && "marquee-reverse",
        position === "top" ? "border-b border-border" : "border-t border-border"
      )}
    >
      <div
        className="marquee-track divide-x divide-border"
        style={{ ["--marquee-duration" as string]: "60s" }}
      >
        {loop.map((t, i) => (
          <BannerItem key={`${t.address}-${i}`} t={t} />
        ))}
      </div>
    </div>
  );
}
