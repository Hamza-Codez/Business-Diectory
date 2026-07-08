import Link from "next/link";
import Image from "next/image";
import { Clock, ExternalLink, JapaneseYen, MapPin, Phone } from "lucide-react";
import { CATEGORIES, categoryLabel } from "@/constants/categories";
import { MESSAGES, type Lang } from "@/constants/messages";
import type { Business } from "@/types";
import { getBusinessImage } from "@/lib/utils";

export default function BusinessCard({
  business,
  lang = "en",
}: {
  business: Business;
  lang?: Lang;
}) {
  const categoryDef = CATEGORIES.find((c) => c.slug === business.category);
  const FallbackIcon = categoryDef?.icon;
  const t = MESSAGES[lang].businessCard;

  const imageSrc = getBusinessImage(business);

  return (
    <div className="group relative flex gap-4 border border-line bg-white p-4 lg:p-5 hover:border-primary transition-colors focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2">
      <Link href={`/business/${encodeURIComponent(business.id)}`} className="absolute inset-0 z-10">
        <span className="sr-only">{t.viewDetails} {business.name}</span>
      </Link>

      <div className="relative h-24 w-24 shrink-0 sm:h-28 sm:w-28 bg-surface pointer-events-none">
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={business.name}
            fill
            sizes="(min-width: 640px) 112px, 96px"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-surface">
            {FallbackIcon && (
              <FallbackIcon size={28} aria-hidden="true" className="text-muted" />
            )}
          </div>
        )}
      </div>

      <div className="min-w-0 flex-1 pointer-events-none">
        {categoryDef && (
          <div className="relative z-20 pointer-events-auto w-fit">
            <Link
              href={`/search?category=${categoryDef.slug}`}
              className="font-mono text-xs uppercase tracking-widest text-primary hover:text-primary-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary inline-block transition-colors"
            >
              {categoryLabel(categoryDef, lang)}
            </Link>
          </div>
        )}
        <h2 className="mt-1 text-base font-semibold text-ink group-hover:text-primary transition-colors">{business.name}</h2>

        <ul className="mt-2 space-y-1">
          {business.address.formatted && (
            <li className="flex items-start gap-2">
              <MapPin size={16} aria-hidden="true" className="mt-0.5 shrink-0 text-muted" />
              <span className="line-clamp-2 text-sm leading-relaxed text-body">
                {business.address.formatted}
              </span>
            </li>
          )}
          {business.phone && (
            <li className="flex items-center gap-2">
              <Phone size={16} aria-hidden="true" className="shrink-0 text-muted" />
              <span className="font-mono text-sm text-body">
                {business.phone}
              </span>
            </li>
          )}
          {business.hours && (
            <li className="flex items-start gap-2">
              <Clock size={16} aria-hidden="true" className="mt-0.5 shrink-0 text-muted" />
              <span className="line-clamp-1 font-mono text-sm text-muted">
                {business.hours}
              </span>
            </li>
          )}
          {business.budget && (
            <li className="flex items-center gap-2">
              <JapaneseYen size={16} aria-hidden="true" className="shrink-0 text-muted" />
              <span className="font-mono text-sm text-muted">{business.budget}</span>
            </li>
          )}
        </ul>

        {business.website && (
          <div className="mt-3 inline-flex items-center gap-1.5 text-sm text-primary">
            {t.website}
            <ExternalLink size={14} aria-hidden="true" />
          </div>
        )}
      </div>
    </div>
  );
}
