import LandingCtas from "./LandingCtas";

export default function CommunityOrbit() {
  return (
    <section
      id="download"
      className="relative flex items-center justify-center self-stretch py-40 desktop:py-0"
    >
      {/* Crowd of traders looking up */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/brand/legends.webp"
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-background to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />

      <div className="w-[80vw] px-8">
        <div className="relative flex aspect-square flex-col items-center justify-center">
          <div className="relative z-10 flex w-[70vw] flex-col items-center gap-3 desktop:gap-6">
            <h2 className="text-center text-[40px] font-bold leading-10 tracking-tighter desktop:text-[60px] desktop:leading-[1.05]">
              a trading app
              <br />
              for the rest of us
            </h2>
            <p className="text-center tracking-tight text-text-secondary desktop:text-[22px] desktop:leading-7">
              join thousands of traders making their name on ChadWallet
            </p>
            <div className="pt-6">
              <LandingCtas />
            </div>
          </div>

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/brand/inner-circle.webp"
            alt=""
            aria-hidden
            className="absolute inset-0 z-[1] m-auto w-[35vw] animate-[spin_30s_linear_infinite_reverse] desktop:w-[30vw]"
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/brand/outer-circle.webp"
            alt=""
            aria-hidden
            className="absolute inset-0 z-[1] m-auto w-screen animate-[spin_45s_linear_infinite] desktop:w-[55vw] desktop:max-w-[1100px]"
          />
        </div>
      </div>
    </section>
  );
}
