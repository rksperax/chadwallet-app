import Link from "next/link";

export default function Logo({ href = "/" }: { href?: string }) {
  return (
    <Link href={href} className="flex items-center gap-2.5 group">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/brand/logo-mark.png"
        alt="ChadWallet"
        width={34}
        height={34}
        className="h-[34px] w-[34px] transition-transform group-hover:scale-105"
      />
      <span className="text-lg font-bold tracking-tight">
        Chad<span className="text-gradient">Wallet</span>
      </span>
    </Link>
  );
}
