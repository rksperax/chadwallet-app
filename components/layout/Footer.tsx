import Link from "next/link";
import { SOCIAL_LINKS, STORE_LINKS } from "@/lib/constants";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mx-auto flex w-full max-w-[1400px] flex-col items-start justify-between gap-10 px-10 pb-12 pt-8 desktop:flex-row">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <Link
            aria-label="ChadWallet home"
            className="flex items-center gap-2 text-text-primary"
            href="/"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/brand/logo-light.png"
              alt="ChadWallet"
              width={30}
              height={30}
              className="h-7 w-7 rounded-lg"
            />
            <span className="text-xl font-black tracking-tight">ChadWallet</span>
          </Link>
          <div className="text-2xl leading-7 tracking-tighter text-text-secondary">
            where degens become legends.
          </div>
        </div>
        <div className="hidden text-text-tertiary desktop:block">
          © {year} ChadWallet
        </div>
      </div>

      <div className="flex flex-col items-start gap-8 desktop:flex-row desktop:gap-2">
        <div className="flex min-w-40 flex-col items-start gap-2">
          <div className="font-mono text-sm tracking-wider text-text-tertiary">SOCIAL</div>
          <FooterLink href={SOCIAL_LINKS.discord}>Discord</FooterLink>
          <FooterLink href={SOCIAL_LINKS.x}>X/Twitter</FooterLink>
          <FooterLink href={SOCIAL_LINKS.instagram}>Instagram</FooterLink>
        </div>

        <div className="flex min-w-40 flex-col items-start gap-2">
          <div className="font-mono text-sm tracking-wider text-text-tertiary">DOWNLOAD</div>
          <FooterLink href={STORE_LINKS.ios}>App Store</FooterLink>
          <FooterLink href={STORE_LINKS.android}>Google Play</FooterLink>
        </div>

        <div className="flex min-w-40 flex-col items-start gap-2">
          <div className="font-mono text-sm tracking-wider text-text-tertiary">LEGAL</div>
          <FooterLink href="#">Privacy Policy</FooterLink>
          <FooterLink href="#">Terms of Service</FooterLink>
        </div>
      </div>

      <div className="block text-text-tertiary desktop:hidden">© {year} ChadWallet</div>
    </footer>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="text-sm text-text-tertiary transition-colors hover:text-text-secondary"
    >
      {children}
    </a>
  );
}
