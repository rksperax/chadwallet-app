"use client";

import { useState } from "react";
import { cn } from "@/lib/format";
import HoldersList from "./HoldersList";
import LiveTrades from "./LiveTrades";

export default function ActivityPanel({ mint }: { mint: string }) {
  const [tab, setTab] = useState<"trades" | "holders">("trades");

  return (
    <div className="flex h-[360px] flex-col">
      <div className="flex items-center gap-1 border-b border-border px-3 py-2">
        {(["trades", "holders"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              "rounded-md px-3 py-1.5 text-sm font-medium capitalize transition",
              tab === t
                ? "bg-surface-3 text-foreground"
                : "text-muted hover:text-foreground"
            )}
          >
            {t === "trades" ? "Live trades" : "Top holders"}
          </button>
        ))}
      </div>
      <div className="flex-1 overflow-hidden">
        {tab === "trades" ? <LiveTrades mint={mint} /> : <HoldersList mint={mint} />}
      </div>
    </div>
  );
}
