import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";
import { DEFAULT_MINT, STORE_LINKS } from "@/lib/constants";

// Matches the repo's hero CTAs: translucent periwinkle "Start trading" with an
// arrow that slides in on hover, and a glass "Download app" with a download
// icon that slides in.
export default function LandingCtas() {
  return (
    <div className="flex gap-3">
      <Link
        href={`/trade/${DEFAULT_MINT}`}
        className="group z-2 flex w-50 items-center justify-center overflow-hidden rounded-xl border border-bg-tertiary bg-[#606AF7]/50 py-3 text-lg font-bold text-white backdrop-blur-md transition-colors duration-150 hover:bg-[#606AF7]/80"
      >
        <span>Start trading</span>
        <span className="flex w-0 items-center overflow-hidden opacity-0 transition-all duration-150 ease-out group-hover:w-7 group-hover:opacity-100">
          <ArrowRight className="ml-2 size-5 shrink-0" />
        </span>
      </Link>

      <a
        href={STORE_LINKS.ios}
        target="_blank"
        rel="noopener noreferrer"
        className="group z-2 flex w-50 items-center justify-center overflow-hidden rounded-xl border border-bg-tertiary bg-white/[0.12] py-3 text-lg font-bold text-white backdrop-blur-md transition-colors duration-150 hover:bg-white/20"
      >
        <span className="flex w-0 items-center overflow-hidden opacity-0 transition-all duration-150 ease-out group-hover:w-7 group-hover:opacity-100">
          <Download className="mr-2 size-5 shrink-0" />
        </span>
        <span>Download app</span>
      </a>
    </div>
  );
}
