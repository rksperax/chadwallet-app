import { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/format";

type Variant =
  | "primary"
  | "secondary"
  | "ghost"
  | "buy"
  | "sell"
  | "cta"
  | "glass";

const variants: Record<Variant, string> = {
  primary:
    "bg-primary text-primary-foreground hover:brightness-110 font-semibold",
  secondary:
    "bg-surface-2 text-foreground hover:bg-surface-3 border border-border",
  ghost: "text-muted hover:text-foreground hover:bg-surface-2",
  buy: "bg-positive text-white hover:brightness-110 font-semibold",
  sell: "bg-negative text-white hover:brightness-110 font-semibold",
  // Glossy indigo CTA: top highlight, soft glow, subtle lift on hover.
  cta: "relative overflow-hidden bg-gradient-to-b from-indigo-2 to-indigo text-white font-semibold ring-1 ring-inset ring-white/20 shadow-[0_10px_30px_-6px_rgba(91,84,214,0.65)] hover:-translate-y-0.5 hover:shadow-[0_14px_38px_-6px_rgba(91,84,214,0.8)] before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:h-1/2 before:bg-gradient-to-b before:from-white/25 before:to-transparent",
  // Frosted glass: translucent dark with a hairline border + blur.
  glass:
    "border border-white/10 bg-white/[0.06] text-white backdrop-blur-md hover:bg-white/[0.12] hover:-translate-y-0.5",
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
