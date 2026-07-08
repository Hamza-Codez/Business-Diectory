import Image from "next/image";
import { MessageSquareText, TrendingUp, Target, Zap } from "lucide-react";
import Button from "@/components/ui/Button";
import Container from "@/components/layout/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { MESSAGES } from "@/constants/messages";
import { getLang } from "@/lib/i18n";

export default async function ConnectCta() {
  const lang = await getLang();
  const m = MESSAGES[lang];

  return (
    <section className="bg-white py-16 lg:py-24 relative overflow-hidden">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="relative">
            {/* Text Embellishment */}
            <div className="absolute -left-6 top-2 w-[3px] h-16 bg-primary hidden lg:block z-0"></div>
            
            <div className="relative z-10">
              <SectionHeading eyebrow="つながる — CONNECT" title={m.connect.title} />
              <p className="mt-6 text-base leading-relaxed text-body font-medium">
                {m.connect.p1}
              </p>
              <p className="mt-4 text-base leading-relaxed text-body font-medium border-l-2 border-ink/10 pl-4">
                {m.connect.p2}
              </p>
              <div className="mt-8 flex items-center gap-4">
                <Button href="/contact" size="lg" className="shadow-lg hover:shadow-primary/20 hover:-translate-y-0.5 transition-all">
                  {m.connect.cta}
                </Button>
              </div>

              {/* 50/50 Black and Primary Slogan Box */}
              <div className="mt-12 grid grid-cols-2 shadow-xl transform hover:-translate-y-1 transition-all duration-700 group cursor-default">
                <div className="bg-ink group-hover:bg-primary transition-colors duration-700 p-6 md:p-8 flex flex-col justify-between items-start gap-4 border border-white/5">
                  <Target size={28} className="text-primary group-hover:text-white transition-colors duration-700 shrink-0" />
                  <div>
                    <h4 className="font-display text-sm md:text-base font-semibold tracking-wide text-white mb-1">Stand Out Locally</h4>
                    <p className="text-xs md:text-sm text-white/70 group-hover:text-white/90 transition-colors duration-700 leading-relaxed">Help customers discover what makes you unique.</p>
                  </div>
                </div>
                <div className="bg-primary group-hover:bg-ink transition-colors duration-700 p-6 md:p-8 flex flex-col justify-between items-start gap-4 border border-ink/10">
                  <Zap size={28} className="text-white group-hover:text-primary transition-colors duration-700 shrink-0" />
                  <div>
                    <h4 className="font-display text-sm md:text-base font-semibold tracking-wide text-white mb-1">Seamless Setup</h4>
                    <p className="text-xs md:text-sm text-white/90 group-hover:text-white/70 transition-colors duration-700 leading-relaxed">Create your listing in minutes and get noticed.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative mt-6 ml-6 lg:ml-12 group">
            {/* Image Semibold Embellishments */}
            <div className="absolute -top-10 left-8 w-[4px] h-20 bg-primary z-0 transform -translate-y-2 group-hover:translate-y-0 transition-transform duration-700"></div>
            <div className="absolute top-1/2 -right-8 w-20 h-[4px] bg-ink z-0 transform translate-x-2 group-hover:translate-x-0 transition-transform duration-700"></div>

            <div
              className="absolute -top-6 -left-6 h-full w-full bg-surface"
              aria-hidden="true"
            />
            <div className="relative border-8 border-ink shadow-2xl overflow-hidden">
              <div className="relative aspect-[4/3] transform group-hover:scale-105 transition-transform duration-700">
                <Image
                  src="/assets/connect.png"
                  alt="Japanese shopkeeper greeting a customer across the counter"
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-ink/5 group-hover:bg-transparent transition-colors duration-500"></div>
              </div>
            </div>

            {/* Overlapping Black Vector */}
            <div className="absolute -top-8 -right-4 sm:-right-8 bg-ink text-white p-4 shadow-xl z-20 flex items-center gap-3 w-48 transform -translate-y-2 group-hover:translate-y-0 transition-transform duration-500 border border-white/10">
              <MessageSquareText size={24} className="shrink-0 text-primary" />
              <span className="font-display text-sm font-semibold tracking-wide">Direct Inquiries</span>
            </div>

            {/* Overlapping Primary Vector */}
            <div className="absolute -bottom-8 -left-4 sm:-left-8 bg-primary text-white p-4 shadow-xl z-20 flex items-center gap-3 w-48 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500 border border-ink/10">
              <TrendingUp size={24} className="shrink-0 text-white" />
              <span className="font-display text-sm font-semibold tracking-wide">Drive Growth</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
