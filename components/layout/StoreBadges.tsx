import { Apple, Play } from "lucide-react";
import { STORE_LINKS } from "@/lib/constants";

export default function StoreBadges({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      <a
        href={STORE_LINKS.ios}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 rounded-xl border border-border bg-surface-2 px-4 py-2.5 transition hover:bg-surface-3"
      >
        <Apple size={24} />
        <span className="leading-tight">
          <span className="block text-[10px] text-muted">Download on the</span>
          <span className="block text-sm font-semibold">App Store</span>
        </span>
      </a>
      <a
        href={STORE_LINKS.android}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 rounded-xl border border-border bg-surface-2 px-4 py-2.5 transition hover:bg-surface-3"
      >
        <Play size={22} />
        <span className="leading-tight">
          <span className="block text-[10px] text-muted">Get it on</span>
          <span className="block text-sm font-semibold">Google Play</span>
        </span>
      </a>
    </div>
  );
}
