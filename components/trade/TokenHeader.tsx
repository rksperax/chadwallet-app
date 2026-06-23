"use client";

import { useToken } from "@/lib/hooks";
import {
  abbreviateNumber,
  cn,
  formatPercent,
  formatPrice,
  shortAddress,
} from "@/lib/format";
import TokenIcon from "@/components/ui/TokenIcon";
import { Copy, ExternalLink } from "lucide-react";

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[11px] uppercase tracking-wide text-muted">{label}</div>
      <div className="text-sm font-semibold">{value}</div>
    </div>
  );
}

export default function TokenHeader({ mint }: { mint: string }) {
  const { data } = useToken(mint);
  const t = data?.token;
  const up = (t?.priceChange24h ?? 0) >= 0;

  return (
    <div className="border-b border-border p-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <TokenIcon src={t?.logoURI} symbol={t?.symbol} size={44} />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold">{t?.symbol ?? "—"}</span>
              <span className="text-sm text-muted">{t?.name}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted">
              <span className="font-mono">{shortAddress(mint, 5)}</span>
              <button
                onClick={() => navigator.clipboard?.writeText(mint)}
                className="hover:text-foreground"
                title="Copy mint"
              >
                <Copy size={12} />
              </button>
              <a
                href={`https://solscan.io/token/${mint}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground"
                title="View on Solscan"
              >
                <ExternalLink size={12} />
              </a>
            </div>
          </div>
        </div>

        <div className="flex items-end gap-3">
          <div className="text-2xl font-bold">{formatPrice(t?.price)}</div>
          <div
            className={cn(
              "pb-1 text-sm font-semibold",
              up ? "text-positive" : "text-negative"
            )}
          >
            {formatPercent(t?.priceChange24h)}
          </div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-5">
        <Stat label="Market cap" value={"$" + abbreviateNumber(t?.marketCap)} />
        <Stat label="Liquidity" value={"$" + abbreviateNumber(t?.liquidity)} />
        <Stat label="24h Vol" value={"$" + abbreviateNumber(t?.volume24h)} />
        <Stat label="FDV" value={"$" + abbreviateNumber(t?.fdv)} />
        <Stat label="Holders" value={abbreviateNumber(t?.holders, 0)} />
      </div>
    </div>
  );
}
