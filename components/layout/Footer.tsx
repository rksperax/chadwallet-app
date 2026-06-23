import Logo from "./Logo";
import { STORE_LINKS } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface/40">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 py-10 sm:flex-row">
        <div className="flex flex-col items-center gap-2 sm:items-start">
          <Logo />
          <p className="text-xs text-muted">
            The social-first trading app for Solana.
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted">
          <a href={STORE_LINKS.ios} className="hover:text-foreground" target="_blank" rel="noopener noreferrer">
            iOS
          </a>
          <a href={STORE_LINKS.android} className="hover:text-foreground" target="_blank" rel="noopener noreferrer">
            Android
          </a>
          <a href="https://birdeye.so" className="hover:text-foreground" target="_blank" rel="noopener noreferrer">
            Data by BirdEye
          </a>
          <a href="https://jup.ag" className="hover:text-foreground" target="_blank" rel="noopener noreferrer">
            Swaps by Jupiter
          </a>
        </div>
      </div>
      <div className="border-t border-border py-4 text-center text-xs text-muted">
        © {new Date().getFullYear()} ChadWallet. Crypto trading involves risk.
      </div>
    </footer>
  );
}
