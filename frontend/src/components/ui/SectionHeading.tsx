import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  /** Bilingual eyebrow, e.g. "カテゴリー — CATEGORIES" */
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  /** Title color — Featured Categories uses primary per reference */
  tone?: "ink" | "primary";
};

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  tone = "ink",
}: SectionHeadingProps) {
  return (
    <div className={cn(align === "center" && "text-center")}>
      <p className="font-mono text-xs uppercase tracking-widest text-primary">
        {eyebrow}
      </p>
      <h2
        className={cn(
          "mt-3 font-display text-2xl font-semibold lg:text-4xl",
          tone === "primary" ? "text-primary" : "text-ink",
        )}
      >
        {title}
      </h2>
      {subtitle && <p className="mt-3 text-base text-muted">{subtitle}</p>}
    </div>
  );
}
