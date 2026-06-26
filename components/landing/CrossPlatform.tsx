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
        <div className="@container relative mx-auto max-w-4xl">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/brand/terminal-desktop.webp"
            alt="ChadWallet web terminal"
            className="w-full"
          />

          {/* Re-brand the terminal header: cover the stock "fomo" wordmark with ChadWallet.
              Sized in container-query units so it tracks the mockup at any width. */}
          <div className="absolute left-[4.3%] top-[15.4%] flex items-center gap-[0.6cqw] rounded-[0.4cqw] bg-[#0a0a11] py-[0.4cqw] pl-[0.5cqw] pr-[1cqw]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/logo-mark.png" alt="" className="h-[2.4cqw] w-[2.4cqw]" />
            <span className="text-[2cqw] font-extrabold leading-none tracking-tight text-white">
              ChadWallet
            </span>
          </div>

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/brand/terminal-phone.webp"
            alt="ChadWallet mobile app"
            className="animate-float absolute bottom-[12%] right-[-3%] w-[33%] max-w-[320px]"
          />
        </div>
      </div>
    </section>
  );
}
