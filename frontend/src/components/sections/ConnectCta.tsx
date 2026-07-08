import Image from "next/image";
import Button from "@/components/ui/Button";
import Container from "@/components/layout/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { MESSAGES } from "@/constants/messages";
import { getLang } from "@/lib/i18n";

export default async function ConnectCta() {
  const lang = await getLang();
  const m = MESSAGES[lang];

  return (
    <section className="bg-white py-16 lg:py-24">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="つながる — CONNECT" title={m.connect.title} />
            <p className="mt-6 text-base leading-relaxed text-body">
              {m.connect.p1}
            </p>
            <p className="mt-4 text-base leading-relaxed text-body">
              {m.connect.p2}
            </p>
            <div className="mt-8">
              <Button href="/contact">{m.connect.cta}</Button>
            </div>
          </div>

          <div className="relative mt-6 ml-6">
            <div
              className="absolute -top-6 -left-6 h-full w-full bg-surface"
              aria-hidden="true"
            />
            <div className="relative border-8 border-ink">
              <div className="relative aspect-[4/3]">
                <Image
                  src="/assets/connect.png"
                  alt="Japanese shopkeeper greeting a customer across the counter"
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
