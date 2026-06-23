import { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/format";

type Variant = "primary" | "secondary" | "ghost" | "buy" | "sell";

const variants: Record<Variant, string> = {
  primary:
    "bg-primary text-primary-foreground hover:brightness-110 font-semibold",
  secondary:
    "bg-surface-2 text-foreground hover:bg-surface-3 border border-border",
  ghost: "text-muted hover:text-foreground hover:bg-surface-2",
  buy: "bg-positive text-white hover:brightness-110 font-semibold",
  sell: "bg-negative text-white hover:brightness-110 font-semibold",
};

export default function Button({
  variant = "primary",
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm transition disabled:cursor-not-allowed disabled:opacity-50",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}
