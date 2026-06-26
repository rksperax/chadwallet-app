export default function CrossPlatform() {
  return (
    <section className="relative mx-auto max-w-6xl px-6 py-24">
      <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
        <div className="eyebrow mb-3 text-sm">NOW AVAILABLE ON WEB</div>
        <h2 className="font-display text-4xl font-bold leading-tight tracking-tighter sm:text-6xl">
          trade from anywhere.
          <br />
          never lose a beat.
        </h2>
        <p className="mt-5 text-balance text-lg tracking-tight text-[#EAEDFF]/60 sm:text-[22px]">
          Open a trade on your phone, close it on your desktop — all in one app.
        </p>
      </div>

      {/* Desktop terminal + phone device showcase */}
      <div className="relative mt-14">
        <div className="absolute -inset-x-10 top-0 bottom-10 -z-10 bg-[radial-gradient(55%_55%_at_50%_30%,rgba(91,84,214,0.25),transparent_70%)]" />
        <div className="relative mx-auto max-w-4xl">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/brand/terminal-desktop.webp"
            alt="ChadWallet web terminal"
            className="w-full"
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/brand/terminal-phone.webp"
            alt="ChadWallet mobile app"
            className="float-soft absolute -right-2 bottom-4 w-[26%] max-w-[220px] sm:-right-6 sm:bottom-10"
          />
        </div>
      </div>
    </section>
  );
}
