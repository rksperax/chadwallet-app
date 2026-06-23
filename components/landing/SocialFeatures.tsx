import { Apple } from "lucide-react";

function Card({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col overflow-hidden rounded-3xl border border-border bg-surface p-6 transition hover:border-indigo/40">
      <div className="text-xs font-bold uppercase tracking-wider text-indigo-2">
        {eyebrow}
      </div>
      <h3 className="mt-2 font-display text-2xl font-bold leading-snug">{title}</h3>
      <div className="mt-5 flex-1">{children}</div>
    </div>
  );
}

function Leaderboard() {
  const rows = [
    { rank: "🥇", name: "@chadgod", pnl: "+$1,726,513" },
    { rank: "🥈", name: "@frankdegen", pnl: "+$1,236,362" },
    { rank: "🥉", name: "@logjam", pnl: "+$810,605" },
  ];
  return (
    <div className="space-y-2">
      {rows.map((r) => (
        <div
          key={r.name}
          className="flex items-center gap-3 rounded-xl border border-border/60 bg-surface-2 px-3 py-2 text-sm"
        >
          <span>{r.rank}</span>
          <span className="h-6 w-6 rounded-full bg-gradient-to-br from-indigo to-accent" />
          <span className="flex-1 truncate text-foreground">{r.name}</span>
          <span className="font-medium text-positive">{r.pnl}</span>
        </div>
      ))}
    </div>
  );
}

function Feed() {
  return (
    <div className="rounded-xl border border-border/60 bg-surface-2 p-3 text-sm">
      <div className="mb-2 flex items-center gap-2">
        <span className="h-6 w-6 rounded-full bg-gradient-to-br from-accent to-indigo" />
        <span className="font-medium text-foreground">remusofmars</span>
        <span className="rounded bg-surface-3 px-1.5 py-0.5 text-[10px] text-muted">Thesis</span>
        <span className="ml-auto text-[10px] text-muted">5m</span>
      </div>
      <p className="mb-2 text-foreground">we&apos;re so back 🚀</p>
      <div className="flex items-center justify-between rounded-lg bg-surface-3 px-3 py-2">
        <span className="text-muted">Position · BONK</span>
        <span className="text-positive">+$23.2K</span>
      </div>
    </div>
  );
}

function Alerts() {
  return (
    <div className="space-y-2">
      <div className="rounded-xl border border-border/60 bg-surface-2 px-3 py-2.5 text-sm">
        <div className="mb-0.5 flex justify-between">
          <span className="font-medium text-foreground">BONK is up 8.85%</span>
          <span className="text-[10px] text-muted">9:41 AM</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-muted">
          <span className="h-2 w-2 rounded-full bg-positive" />
          50 top traders bought $88,203
        </div>
      </div>
      <div className="rounded-xl border border-border/60 bg-surface-2 px-3 py-2.5 text-xs text-muted">
        <span className="h-2 w-2 rounded-full bg-indigo-2" /> WIF whale just aped $120K
      </div>
    </div>
  );
}

function Onboarding() {
  return (
    <div className="space-y-2.5">
      <div className="flex items-center justify-center gap-2 rounded-xl bg-white py-2.5 text-sm font-semibold text-black">
        <Apple size={16} /> Sign in with Apple
      </div>
      <div className="flex items-center justify-center gap-2 rounded-xl border border-border bg-surface-2 py-2.5 text-sm font-semibold text-foreground">
        <span className="flex h-4 w-4 items-center justify-center rounded-full bg-white text-[10px] font-bold text-black">G</span>
        Sign in with Google
      </div>
    </div>
  );
}

function TokenShapes() {
  return (
    <div className="flex items-center justify-center gap-3 py-2">
      <div className="h-16 w-16 rotate-6 rounded-2xl bg-gradient-to-br from-indigo to-accent shadow-lg shadow-indigo/30" />
      <div className="h-20 w-20 -rotate-6 rounded-2xl bg-gradient-to-br from-primary/80 to-indigo shadow-lg shadow-primary/20" />
      <div className="h-14 w-14 rotate-12 rounded-2xl bg-gradient-to-br from-accent to-indigo-2 shadow-lg shadow-accent/30" />
    </div>
  );
}

function BuyWidget() {
  return (
    <div className="rounded-xl border border-border/60 bg-surface-2 p-3">
      <div className="mb-2 rounded-lg border border-border bg-background px-3 py-2.5 text-lg font-semibold text-muted">
        $100
      </div>
      <div className="mb-2 grid grid-cols-4 gap-1 text-[11px]">
        {["$25", "$50", "$100", "$250"].map((p) => (
          <span key={p} className="rounded bg-surface-3 py-1 text-center text-muted">{p}</span>
        ))}
      </div>
      <div className="rounded-lg bg-primary py-2 text-center text-sm font-semibold text-primary-foreground">
        One-tap buy
      </div>
    </div>
  );
}

export default function SocialFeatures() {
  return (
    <section id="features" className="mx-auto max-w-6xl px-6 py-24">
      <div className="mb-12">
        <h2 className="font-display text-4xl font-bold sm:text-6xl">
          never miss out again
        </h2>
        <p className="mt-3 text-lg text-muted">the only social-first trading app</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card eyebrow="Leaderboard" title="become a legend, top the leaderboard">
          <Leaderboard />
        </Card>
        <Card eyebrow="Feed" title="discover and follow top traders">
          <Feed />
        </Card>
        <Card eyebrow="Alerts" title="real-time alerts on what the best are buying">
          <Alerts />
        </Card>
        <Card eyebrow="Easy onboarding" title="create an account in an instant">
          <Onboarding />
        </Card>
        <Card eyebrow="Solana-native" title="lightning fast & dirt-cheap fees">
          <TokenShapes />
        </Card>
        <Card eyebrow="One tap to buy" title="fund and ape in seconds">
          <BuyWidget />
        </Card>
      </div>
    </section>
  );
}
