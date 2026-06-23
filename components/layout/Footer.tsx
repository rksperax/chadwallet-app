import Link from "next/link";
import Logo from "./Logo";
import { DEFAULT_MINT, SOCIAL_LINKS, STORE_LINKS } from "@/lib/constants";

const COLUMNS: { heading: string; links: { label: string; href: string }[] }[] = [
  {
    heading: "Product",
    links: [
      { label: "Trade", href: `/trade/${DEFAULT_MINT}` },
      { label: "Features", href: "/#features" },
      { label: "Get the app", href: "/#download" },
    ],
  },
  {
    heading: "Social",
    links: [
      { label: "X / Twitter", href: SOCIAL_LINKS.x },
      { label: "Discord", href: SOCIAL_LINKS.discord },
      { label: "Instagram", href: SOCIAL_LINKS.instagram },
      { label: "YouTube", href: SOCIAL_LINKS.youtube },
    ],
  },
  {
    heading: "Download",
    links: [
      { label: "iOS App Store", href: STORE_LINKS.ios },
      { label: "Google Play", href: STORE_LINKS.android },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface/40">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 md:grid-cols-[2fr_1fr_1fr_1fr]">
        <div className="flex flex-col gap-3">
          <Logo />
          <p className="max-w-xs text-sm text-muted">
            where degens become legends. The social-first trading app for Solana.
          </p>
        </div>

        {COLUMNS.map((col) => (
          <div key={col.heading}>
            <div className="mb-3 text-xs font-bold uppercase tracking-wider text-muted">
              {col.heading}
            </div>
            <ul className="space-y-2 text-sm">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    target={l.href.startsWith("http") ? "_blank" : undefined}
                    rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="text-muted transition hover:text-foreground"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-border py-5 text-center text-xs text-muted">
        © {new Date().getFullYear()} ChadWallet. Crypto trading involves risk —
        data by BirdEye, swaps by Jupiter.
      </div>
    </footer>
  );
}
