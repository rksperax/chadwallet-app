import Link from "next/link";
import Button from "@/components/ui/Button";
import StoreBadges from "@/components/layout/StoreBadges";
import Starfield from "./Starfield";
import { DEFAULT_MINT } from "@/lib/constants";

const GRADIENTS = [
  "from-indigo to-accent",
  "from-accent to-indigo-2",
  "from-primary/80 to-indigo",
  "from-indigo-2 to-accent",
  "from-accent to-primary/70",
  "from-indigo to-periwinkle",
];

function Ring({
  radius,
  size,
  count,
  reverse,
  seed = 0,
}: {
  radius: number;
  size: number;
  count: number;
  reverse?: boolean;
  seed?: number;
}) {
  return (
    <div
      className="orbit-ring"
      style={{ width: radius * 2, height: radius * 2 }}
    >
      <div
        className={`relative h-full w-full ${reverse ? "orbit-rotate-rev" : "orbit-rotate"}`}
      >
        {Array.from({ length: count }).map((_, i) => {
          const angle = (360 / count) * i + seed;
          return (
            <span
              key={i}
              className={`absolute left-1/2 top-1/2 rounded-full bg-gradient-to-br ${GRADIENTS[(i + seed) % GRADIENTS.length]} ring-2 ring-background`}
              style={{
                width: size,
                height: size,
                transform: `rotate(${angle}deg) translateY(-${radius}px) translate(-50%, -50%)`,
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

export default function CommunityOrbit() {
  return (
    <section
      id="download"
      className="relative overflow-hidden bg-[radial-gradient(70%_70%_at_50%_40%,rgba(91,84,214,0.30),rgba(7,9,14,0)_70%)]"
    >
      <Starfield count={60} seed={23} />

      {/* orbit rings (decorative, behind content) */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-0 -translate-x-1/2 -translate-y-1/2">
        <Ring radius={340} size={44} count={7} seed={1} />
        <Ring radius={230} size={36} count={5} reverse seed={3} />
      </div>

      <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center px-6 py-32 text-center">
        <h2 className="font-display text-5xl font-bold leading-tight sm:text-7xl">
          a trading app
          <br />
          for the rest of us
        </h2>
        <p className="mt-5 text-lg text-muted">
          Join the chads making their name on ChadWallet.
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
          <Link href={`/trade/${DEFAULT_MINT}`}>
            <Button variant="cta" className="rounded-2xl px-8 py-4 text-base">
              Start trading
            </Button>
          </Link>
          <StoreBadges />
        </div>
      </div>
    </section>
  );
}
