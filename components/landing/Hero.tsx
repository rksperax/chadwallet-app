import LandingCtas from "./LandingCtas";

export default function Hero() {
  return (
    <section className="relative flex min-h-[calc(100svh-6.4rem)] w-full flex-col items-center justify-center overflow-hidden">
      {/* Real Earth-from-orbit backdrop — behind everything */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/brand/hero-space.webp"
        alt=""
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 h-full w-full select-none object-cover"
      />

      {/* Foreground content — sits ABOVE the astronaut so the buttons stay clickable */}
      <div className="relative z-10 flex flex-col items-center gap-5 desktop:gap-8">
        <div className="flex flex-col items-center gap-3 px-6 pt-10 text-center desktop:pt-20">
          <h1 className="text-6xl font-black leading-none tracking-tighter text-[#EAEDFF] sm:text-8xl desktop:text-[120px]">
            ChadWallet
          </h1>
          <p className="mt-2 text-center text-xl leading-tight tracking-tight text-[#EAEDFF] desktop:text-[34px]">
            where degens become legends.
          </p>
          <p className="text-center tracking-tight text-[#D1D8FF]/60 desktop:text-[22px]">
            Hunt every memecoin on Solana. One wallet to rule them all.
          </p>
        </div>

        <LandingCtas />
      </div>

      {/* Floating astronaut — BEHIND the buttons, non-interactive so it never blocks clicks */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/brand/astronaut-mobile.webp"
        alt=""
        aria-hidden
        className="animate-float-slow pointer-events-none relative z-0 -mt-16 w-[300px] desktop:hidden"
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/brand/astronaut.webp"
        alt=""
        aria-hidden
        className="animate-float pointer-events-none relative z-0 -mt-20 hidden h-[520px] object-contain desktop:block"
      />
    </section>
  );
}
