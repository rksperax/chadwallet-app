import StoreBadges from "@/components/layout/StoreBadges";

export default function DownloadCTA() {
  return (
    <section id="download" className="mx-auto max-w-6xl px-6 py-20">
      <div className="bg-space relative overflow-hidden rounded-3xl border border-border px-8 py-16 text-center">
        <h2 className="mx-auto max-w-2xl text-3xl font-bold sm:text-4xl">
          Ready to become a <span className="text-gradient">legend</span>?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-muted">
          Download ChadWallet and start trading Solana in seconds. Free to use,
          self-custodial, and built for speed.
        </p>
        <div className="mt-8 flex justify-center">
          <StoreBadges />
        </div>
      </div>
    </section>
  );
}
