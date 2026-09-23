import { cn } from "@/lib/utils";

export function Mark({ className }: { className?: string }) {
  return (
    <img
      src="/logo.png?v=ivory"
      alt=""
      width={188}
      height={88}
      className={cn("h-12 w-auto shrink-0", className)}
    />
  );
}
