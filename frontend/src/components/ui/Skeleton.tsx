import { cn } from "@/lib/utils";

/** Flat surface rectangle matching final layout — no shimmer (spec 6.6) */
export default function Skeleton({ className }: { className?: string }) {
  return <div aria-hidden="true" className={cn("bg-surface", className)} />;
}
