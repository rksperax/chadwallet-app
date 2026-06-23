import Link from "next/link";
import Logo from "./Logo";
import LoginButton from "./LoginButton";
import { DEFAULT_MINT } from "@/lib/constants";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between gap-4 px-4 sm:px-6">
        <div className="flex items-center gap-8">
          <Logo />
          <nav className="hidden items-center gap-6 text-sm text-muted md:flex">
            <Link href={`/trade/${DEFAULT_MINT}`} className="hover:text-foreground">
              Trade
            </Link>
            <Link href="/#features" className="hover:text-foreground">
              Features
            </Link>
            <Link href="/#download" className="hover:text-foreground">
              Get the app
            </Link>
          </nav>
        </div>
        <LoginButton />
      </div>
    </header>
  );
}
