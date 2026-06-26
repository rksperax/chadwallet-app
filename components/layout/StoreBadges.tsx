import { Apple, Play } from "lucide-react";
import { STORE_LINKS } from "@/lib/constants";

export default function StoreBadges({
  className = "",
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  const pad = compact ? "px-3 py-1.5" : "px-4 py-2.5";
  const iconSize = compact ? 18 : 24;
  const eyebrow = compact ? "text-[8px]" : "text-[10px]";
  const label = compact ? "text-xs" : "text-sm";

  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      <a
        href={STORE_LINKS.ios}
        target="_blank"
        rel="noopener noreferrer"
        className={`flex items-center gap-2 rounded-lg border border-border bg-white/[0.08] backdrop-blur-md transition hover:bg-white/[0.14] ${pad}`}
      >
        <Apple size={iconSize} />
        <span className="leading-tight">
          <span className={`block text-muted ${eyebrow}`}>Download on the</span>
          <span className={`block font-semibold ${label}`}>App Store</span>
        </span>
      </a>
      <a
        href={STORE_LINKS.android}
        target="_blank"
        rel="noopener noreferrer"
        className={`flex items-center gap-2 rounded-lg border border-border bg-white/[0.08] backdrop-blur-md transition hover:bg-white/[0.14] ${pad}`}
      >
        <Play size={iconSize - 2} />
        <span className="leading-tight">
          <span className={`block text-muted ${eyebrow}`}>Get it on</span>
          <span className={`block font-semibold ${label}`}>Google Play</span>
        </span>
      </a>
    </div>
  );
}
