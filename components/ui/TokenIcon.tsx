"use client";
import { useState } from "react";
import { cn } from "@/lib/format";

export default function TokenIcon({
  src,
  symbol,
  size = 28,
  className,
}: {
  src?: string;
  symbol?: string;
  size?: number;
  className?: string;
}) {
  const [errored, setErrored] = useState(false);
  const letter = (symbol ?? "?").slice(0, 1).toUpperCase();

  if (!src || errored) {
    return (
      <span
        className={cn(
          "inline-flex items-center justify-center rounded-full bg-surface-3 text-muted font-semibold shrink-0",
          className
        )}
        style={{ width: size, height: size, fontSize: size * 0.42 }}
      >
        {letter}
      </span>
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={symbol ?? "token"}
      width={size}
      height={size}
      onError={() => setErrored(true)}
      className={cn("rounded-full bg-surface-3 object-cover shrink-0", className)}
      style={{ width: size, height: size }}
    />
  );
}
