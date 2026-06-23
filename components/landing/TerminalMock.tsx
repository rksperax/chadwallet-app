// A static, stylized preview of the ChadWallet web terminal (used on the
// landing page). Purely decorative — the real thing lives at /trade/[mint].
const TOKENS = [
  { s: "BONK", p: "$0.0000312", c: "+8.85%", up: true },
  { s: "WIF", p: "$2.41", c: "+1.91%", up: true },
  { s: "JUP", p: "$0.96", c: "-0.32%", up: false },
  { s: "POPCAT", p: "$1.44", c: "+5.98%", up: true },
  { s: "PNUT", p: "$0.78", c: "+3.43%", up: true },
  { s: "MEW", p: "$0.0094", c: "-0.91%", up: false },
  { s: "GIGA", p: "$0.045", c: "+6.4%", up: true },
];

// Deterministic candlestick heights.
const CANDLES = [
  [40, 70, true], [55, 80, true], [60, 50, false], [45, 75, true],
  [65, 90, true], [70, 60, false], [55, 85, true], [80, 95, true],
  [88, 70, false], [72, 92, true], [85, 100, true], [60, 78, false],
  [70, 88, true], [82, 96, true],
] as const;

export default function TerminalMock() {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-background shadow-2xl shadow-indigo/10">
      {/* window chrome */}
      <div className="flex items-center gap-3 border-b border-border px-4 py-2.5">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-negative/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#f7b500]/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-positive/70" />
        </div>
        <div className="mx-auto hidden w-1/3 rounded-md bg-surface-2 py-1 text-center text-[10px] text-muted sm:block">
          Search tokens or traders…
        </div>
        <div className="hidden gap-2 sm:flex">
          <span className="rounded-md bg-surface-2 px-2 py-1 text-[10px] text-muted">$4.32K</span>
          <span className="h-6 w-6 rounded-full bg-gradient-to-br from-indigo to-accent" />
        </div>
      </div>

      <div className="grid grid-cols-[1.1fr_2.2fr_1.2fr] text-[11px]">
        {/* left: token list */}
        <div className="border-r border-border">
          {TOKENS.map((t) => (
            <div
              key={t.s}
              className="flex items-center justify-between border-b border-border/40 px-3 py-2"
            >
              <div className="flex items-center gap-2">
                <span className="h-5 w-5 rounded-full bg-surface-3" />
                <span className="font-semibold text-foreground">{t.s}</span>
              </div>
              <div className="text-right">
                <div className="text-foreground">{t.p}</div>
                <div className={t.up ? "text-positive" : "text-negative"}>{t.c}</div>
              </div>
            </div>
          ))}
        </div>

        {/* middle: chart */}
        <div className="flex flex-col border-r border-border">
          <div className="flex items-center justify-between border-b border-border px-3 py-2">
            <div className="flex items-center gap-2">
              <span className="h-6 w-6 rounded-full bg-surface-3" />
              <span className="font-semibold text-foreground">BONK</span>
              <span className="text-positive">+8.85%</span>
            </div>
            <div className="hidden gap-3 text-muted md:flex">
              <span>MC $98.1M</span>
              <span>Vol $63.8M</span>
              <span>Holders 45.3K</span>
            </div>
          </div>
          <div className="flex flex-1 items-end gap-[3px] px-3 py-4" style={{ minHeight: 180 }}>
            {CANDLES.map(([body, wick, up], i) => (
              <div key={i} className="relative flex flex-1 items-end justify-center">
                <div
                  className={`w-[2px] ${up ? "bg-positive/60" : "bg-negative/60"}`}
                  style={{ height: `${wick}%` }}
                />
                <div
                  className={`absolute bottom-0 w-full rounded-sm ${up ? "bg-positive" : "bg-negative"}`}
                  style={{ height: `${body}%`, bottom: `${(wick - body) / 3}%` }}
                />
              </div>
            ))}
          </div>
          <div className="flex gap-2 border-t border-border px-3 py-1.5 text-[10px] text-muted">
            {["1m", "15m", "1H", "4H", "1D"].map((tf) => (
              <span key={tf} className={tf === "15m" ? "text-foreground" : ""}>{tf}</span>
            ))}
          </div>
        </div>

        {/* right: buy panel */}
        <div className="p-3">
          <div className="mb-2 grid grid-cols-2 gap-1 rounded-lg bg-surface-2 p-1">
            <span className="rounded-md bg-positive py-1 text-center font-semibold text-white">Buy</span>
            <span className="py-1 text-center text-muted">Sell</span>
          </div>
          <div className="mb-2 rounded-lg border border-border bg-background px-3 py-2.5 text-base font-semibold text-muted">
            0.5 <span className="float-right text-[10px] font-normal">SOL</span>
          </div>
          <div className="mb-3 grid grid-cols-4 gap-1">
            {["0.1", "0.5", "1", "5"].map((p) => (
              <span key={p} className="rounded bg-surface-2 py-1 text-center text-muted">{p}</span>
            ))}
          </div>
          <div className="rounded-lg bg-positive py-2 text-center font-semibold text-white">
            Buy BONK
          </div>
          <div className="mt-3 rounded-lg border border-border bg-surface-2 p-2">
            <div className="mb-1 text-[9px] uppercase tracking-wide text-muted">Your position</div>
            <div className="flex justify-between"><span className="text-muted">SOL</span><span>4.32</span></div>
            <div className="flex justify-between"><span className="text-muted">BONK</span><span>1.2M</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}
