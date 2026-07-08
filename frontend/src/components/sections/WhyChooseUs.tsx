import Image from "next/image";
import Container from "@/components/layout/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { MESSAGES } from "@/constants/messages";
import { getLang } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export default async function WhyChooseUs() {
  const lang = await getLang();
  const m = MESSAGES[lang];

  return (
    <section className="bg-white py-16 lg:py-24">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="relative aspect-[5/4]">
            <div className="absolute top-0 left-0 h-[62%] w-[65%]">
              <Image
                src="/assets/back.jpg"
                alt="back"
                fill
                sizes="(min-width: 1024px) 33vw, 65vw"
                className="object-cover grayscale"
              />
            </div>
            <div className="absolute right-0 bottom-0 h-[62%] w-[65%] border-l-4 border-primary">
              <Image
                src="/assets/front.jpg"
                alt="front"
                fill
                sizes="(min-width: 1024px) 33vw, 65vw"
                className="object-cover"
              />
            </div>
          </div>

          <div>
            <SectionHeading eyebrow="選ばれる理由 — WHY US" title={m.why.title} />
            <div className="mt-8 flex flex-col gap-4">
              {m.why.blocks.map((block, index) => (
                <div
                  key={block.claim}
                  className={cn(
                    "mx-3 -skew-x-3 px-6 py-5 lg:-skew-x-6",
                    index === 1 ? "bg-primary" : "bg-ink",
                  )}
                >
                  <div className="skew-x-3 lg:skew-x-6">
                    <p className="text-base font-semibold text-white">
                      {block.claim}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-white/80">
                      {block.support}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
