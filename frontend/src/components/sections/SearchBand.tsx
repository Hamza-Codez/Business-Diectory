import Image from "next/image";
import Container from "@/components/layout/Container";
import SearchBandForm from "@/components/sections/SearchBandForm";
import { MESSAGES } from "@/constants/messages";
import { getLang } from "@/lib/i18n";

export default async function SearchBand() {
  const lang = await getLang();
  const m = MESSAGES[lang];

  return (
    <section id="search" className="relative py-20 lg:py-28">
      <Image
        src="/assets/searchBand.png"
        alt="Quiet Japanese street at night with dim lantern signage"
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-ink/30" aria-hidden="true" />
      <Container className="relative">
        <div className="text-center">
          <p className="font-mono text-xs uppercase tracking-widest text-white/80">
            検索 — SEARCH
          </p>
          <h2 className="mt-3 font-display text-2xl font-semibold text-white lg:text-4xl">
            {m.searchBand.title}
          </h2>
          <div className="mt-10">
            <SearchBandForm lang={lang} />
          </div>
        </div>
      </Container>
    </section>
  );
}
