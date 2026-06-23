import Link from "next/link";

export default function Logo({ href = "/" }: { href?: string }) {
  return (
    <Link href={href} className="flex items-center gap-2 group">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/brand/logo.svg"
        alt="ChadWallet"
        width={32}
        height={32}
        className="transition-transform group-hover:scale-105"
      />
      <span className="text-lg font-bold tracking-tight">
        Chad<span className="text-gradient">Wallet</span>
      </span>
    </Link>
  );
}
