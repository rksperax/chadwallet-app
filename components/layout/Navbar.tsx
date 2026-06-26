import Logo from "./Logo";
import LoginButton from "./LoginButton";
import { STORE_LINKS } from "@/lib/constants";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 bg-transparent">
      <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between gap-4 px-4 sm:px-6">
        <Logo />
        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href={STORE_LINKS.ios}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Download on the App Store"
            className="hidden transition hover:opacity-90 md:block"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/app-store.png" alt="App Store" className="h-10 w-auto" />
          </a>
          <a
            href={STORE_LINKS.android}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Get it on Google Play"
            className="hidden transition hover:opacity-90 md:block"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/google-play.png" alt="Google Play" className="h-10 w-auto" />
          </a>
          <LoginButton />
        </div>
      </div>
    </header>
  );
}
