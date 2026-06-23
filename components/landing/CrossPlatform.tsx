import Link from "next/link";
import { ArrowRight, Smartphone, Monitor } from "lucide-react";
import Button from "@/components/ui/Button";
import { DEFAULT_MINT } from "@/lib/constants";

export default function CrossPlatform() {
  return (
    <section className="border-y border-border bg-surface/40">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 lg:grid-cols-2">
        <div>
          <div className="mb-4 flex items-center gap-3 text-primary">
            <Smartphone size={22} />
            <ArrowRight size={16} className="text-muted" />
            <Monitor size={22} />
          </div>
          <h2 className="text-3xl font-bold sm:text-4xl">
            Open a trade on your phone, close it on desktop
          </h2>
          <p className="mt-4 text-muted">
            One account, everywhere. Your positions, watchlists and wallet sync
            across the mobile app and the web terminal — so you can react the
            second a token moves, wherever you are.
          </p>
          <div className="mt-8">
            <Link href={`/trade/${DEFAULT_MINT}`}>
              <Button variant="secondary">
                Open the web terminal <ArrowRight size={16} />
              </Button>
            </Link>
          </div>
        </div>

        {/* Stylized terminal preview */}
        <div className="rounded-2xl border border-border bg-background p-3 shadow-2xl">
          <div className="mb-3 flex gap-1.5 px-2 pt-1">
            <span className="h-2.5 w-2.5 rounded-full bg-negative/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#f7b500]/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-positive/70" />
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div className="space-y-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="h-7 rounded-md bg-surface-2" />
              ))}
            </div>
            <div className="col-span-1 space-y-2">
              <div className="flex h-28 items-end gap-1 rounded-md bg-surface-2 p-2">
                {[40, 65, 50, 80, 60, 95, 72, 88].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-sm bg-primary/60"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
              <div className="h-7 rounded-md bg-surface-2" />
              <div className="h-7 rounded-md bg-surface-2" />
            </div>
            <div className="space-y-2">
              <div className="h-9 rounded-md bg-positive/30" />
              <div className="h-9 rounded-md bg-negative/20" />
              <div className="h-7 rounded-md bg-surface-2" />
              <div className="h-7 rounded-md bg-surface-2" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
