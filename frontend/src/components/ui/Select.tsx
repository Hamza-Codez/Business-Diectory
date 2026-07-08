import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

type SelectProps = {
  /** Applied to the wrapper — use for height/width overrides (default h-12) */
  className?: string;
  children: React.ReactNode;
} & Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "className" | "children">;

export default function Select({ className, children, ...props }: SelectProps) {
  return (
    <div className={cn("relative h-12", className)}>
      <select
        className={cn(
          "h-full w-full appearance-none border border-line bg-white px-4 pr-10 text-base text-body",
          "focus:border-primary focus:outline-none",
        )}
        {...props}
      >
        {children}
      </select>
      <ChevronDown
        size={20}
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-muted"
      />
    </div>
  );
}
