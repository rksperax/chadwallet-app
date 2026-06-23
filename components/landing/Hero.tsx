import Link from "next/link";
import Button from "@/components/ui/Button";
import Starfield from "./Starfield";
import { DEFAULT_MINT } from "@/lib/constants";

export default function Hero() {
  return (
    <section className="hero-space relative overflow-hidden">
      <div className="planet-arc" />
      <Starfield count={110} seed={11} />

      <div className="relative mx-auto flex max-w-5xl flex-col items-center px-6 pb-28 pt-24 text-center sm:pt-32">
        <h1 className="font-display text-7xl font-bold leading-none text-periwinkle-gradient sm:text-8xl md:text-[10rem]">
          ChadWallet
        </h1>

        <p className="mt-8 font-display text-3xl font-bold tracking-tight sm:text-5xl">
          where degens become legends.
        </p>
        <p className="mt-4 max-w-2xl text-balance text-base text-muted sm:text-lg">
          From memecoins to viral tokens, trade any Solana coin in seconds.
        </p>

        <div className="mt-10 flex flex-col items-center gap-3.5 sm:flex-row">
          <Link href={`/trade/${DEFAULT_MINT}`} className="w-full sm:w-auto">
            <Button
              variant="cta"
              className="w-full min-w-[200px] rounded-2xl px-8 py-4 text-base sm:w-auto"
            >
              Start trading
            </Button>
          </Link>
          <Link href="/#download" className="w-full sm:w-auto">
            <Button
              variant="glass"
              className="w-full min-w-[200px] rounded-2xl px-8 py-4 text-base sm:w-auto"
            >
              Download app
            </Button>
          </Link>
        </div>

        {/* Chad mascot floating in orbit */}
        <div className="relative mt-16 h-40 w-40 sm:h-52 sm:w-52">
          <div className="absolute inset-0 rounded-full bg-indigo/30 blur-3xl" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/brand/logo-mark.png"
            alt="ChadWallet"
            className="float-soft relative h-full w-full object-contain drop-shadow-[0_0_40px_rgba(120,120,255,0.45)]"
          />
        </div>
      </div>
    </section>
  );
}
