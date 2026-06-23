import Link from "next/link";
import { ArrowRight, Zap } from "lucide-react";
import Button from "@/components/ui/Button";
import StoreBadges from "@/components/layout/StoreBadges";
import { DEFAULT_MINT } from "@/lib/constants";

export default function Hero() {
  return (
    <section className="bg-space relative overflow-hidden">
      <div className="mx-auto max-w-5xl px-6 py-24 text-center sm:py-32">
        <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface-2/60 px-4 py-1.5 text-xs text-muted">
          <Zap size={14} className="text-primary" />
          Powered by Solana · Jupiter · real-time market data
        </div>

        <h1 className="mx-auto max-w-4xl text-balance text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-7xl">
          where degens become <span className="text-gradient">legends</span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-balance text-lg text-muted sm:text-xl">
          From memecoins to viral tokens, trade any Solana coin in seconds.
          Sign in with Apple or Google — no seed phrases, no friction.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link href={`/trade/${DEFAULT_MINT}`}>
            <Button className="px-6 py-3 text-base">
              Launch the app <ArrowRight size={18} />
            </Button>
          </Link>
          <StoreBadges />
        </div>

        <p className="mt-8 text-sm text-muted">
          Join the chads trading on-chain — one tap to buy.
        </p>
      </div>
    </section>
  );
}
