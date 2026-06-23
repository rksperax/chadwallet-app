import { Trophy, Rss, Bell, Sparkles, ShieldCheck, Gauge } from "lucide-react";

const features = [
  {
    icon: Trophy,
    title: "Leaderboard",
    body: "Climb the ranks. Compete with the best traders on Solana and prove you're a chad.",
  },
  {
    icon: Rss,
    title: "Feed",
    body: "Discover and follow top traders. See what's being bought before it goes viral.",
  },
  {
    icon: Bell,
    title: "Alerts",
    body: "Real-time notifications for what the best are buying — never miss the next runner.",
  },
  {
    icon: Sparkles,
    title: "Easy onboarding",
    body: "Sign in with Apple or Google. An embedded Solana wallet is created for you instantly.",
  },
  {
    icon: Gauge,
    title: "One tap to buy",
    body: "Live Jupiter routing finds the best price. Zero complexity, maximum speed.",
  },
  {
    icon: ShieldCheck,
    title: "Self-custodial",
    body: "Your keys, secured by Privy. Export anytime — you stay in control of your funds.",
  },
];

export default function SocialFeatures() {
  return (
    <section id="features" className="mx-auto max-w-6xl px-6 py-20">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold sm:text-4xl">
          The only <span className="text-gradient">social-first</span> trading app
        </h2>
        <p className="mt-4 text-muted">
          Trading is better with the squad. ChadWallet blends a pro trading
          terminal with a social feed so you always know where the money&apos;s
          flowing.
        </p>
      </div>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f) => (
          <div
            key={f.title}
            className="rounded-2xl border border-border bg-surface p-6 transition hover:border-primary/40"
          >
            <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-surface-2 text-primary">
              <f.icon size={22} />
            </div>
            <h3 className="mb-2 text-lg font-semibold">{f.title}</h3>
            <p className="text-sm text-muted">{f.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
