import HeroCarousel from "@/components/sections/HeroCarousel";
import Container from "@/components/layout/Container";
import HeroSearchTeaser from "@/components/sections/HeroSearchTeaser";
import HeroStats from "@/components/sections/HeroStats";
import { MESSAGES } from "@/constants/messages";
import { getLang } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export default async function Hero() {
  const lang = await getLang();
  const m = MESSAGES[lang];

  return (
    <section className="relative flex min-h-[70svh] items-center lg:min-h-[80svh] overflow-hidden">
      <HeroCarousel />
      <Container className="relative py-16 lg:py-24">
        <p className="font-mono text-xs uppercase tracking-widest text-white/80">
          日本のビジネス — Japan Business Directory
        </p>
        <h1
          className={cn(
            "mt-4 max-w-2xl font-display leading-tight font-semibold text-white",
            lang === "ja" ? "text-2xl lg:text-4xl" : "text-3xl lg:text-5xl",
          )}
        >
          {m.hero.title}
        </h1>
        <p
          className={cn(
            "mt-4 max-w-xl leading-relaxed text-white/80",
            lang === "ja" ? "text-sm lg:text-base" : "text-base",
          )}
        >
          {m.hero.subtitle}
        </p>
        <div className="mt-8">
          <HeroSearchTeaser
            lang={lang}
            ctaText={m.hero.cta}
            placeholder={m.searchBand.keywordPlaceholder}
          />
        </div>
        <HeroStats />
      </Container>
    </section>
  );
}
