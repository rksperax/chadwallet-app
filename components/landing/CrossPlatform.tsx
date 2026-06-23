import TerminalMock from "./TerminalMock";

export default function CrossPlatform() {
  return (
    <section className="relative mx-auto max-w-6xl px-6 py-24">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="font-display text-4xl font-bold leading-tight sm:text-6xl">
          trade from anywhere.
          <br />
          never lose a beat.
        </h2>
        <p className="mt-5 text-balance text-lg text-muted">
          Open a trade on your phone, close it on your desktop — all in one app.
        </p>
      </div>

      <div className="relative mt-14">
        <div className="absolute -inset-x-10 -top-10 bottom-0 -z-10 bg-[radial-gradient(60%_60%_at_50%_0%,rgba(91,84,214,0.18),transparent_70%)]" />
        <TerminalMock />
      </div>
    </section>
  );
}
