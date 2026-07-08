import Link from "next/link";
import { cn } from "@/lib/utils";

type ChipProps = {
  className?: string;
  children: React.ReactNode;
  /** Render as a link instead of a button */
  href?: string;
  /** Selected state — primary border and text */
  active?: boolean;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children">;

export default function Chip({
  className,
  children,
  href,
  active = false,
  ...props
}: ChipProps) {
  const classes = cn(
    "inline-block border border-line bg-transparent px-4 py-2 text-sm text-ink transition-colors duration-200",
    "hover:border-primary hover:text-primary",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
    active && "border-primary text-primary",
    className,
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  );
}
