import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const styles = {
  coral:
    "bg-coral text-surface hover:bg-coral/90",
  ink: "bg-ink text-bg hover:bg-ink/90",
  ghost:
    "bg-surface text-ink border border-line hover:border-ink",
  text: "bg-transparent text-lagoon px-0 hover:underline underline-offset-4",
} as const;

type Variant = keyof typeof styles;

export function Button({
  variant = "coral",
  className,
  type = "button",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold transition-transform duration-150 ease-out active:not-disabled:scale-[0.96] disabled:cursor-not-allowed disabled:opacity-60",
        styles[variant],
        className,
      )}
      {...props}
    />
  );
}
