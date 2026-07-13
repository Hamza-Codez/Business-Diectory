import { Metadata } from "next";
import { Check, X } from "lucide-react";
import Container from "@/components/layout/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { getLang } from "@/lib/i18n";
import { MESSAGES } from "@/constants/messages";

export const metadata: Metadata = {
  title: "Pricing Plans | Japan Business Directory",
  description: "Choose the best pricing plan for your business needs. Upgrade to Lite, Standard, or Business.",
};

export default async function PricingPage() {
  const lang = await getLang();
  const m = MESSAGES[lang];
  const p = m.pricingPage;

  return (
    <main className="flex-1 bg-surface pb-20">
      {/* Header */}
      <section className="bg-white border-b border-line pt-20 pb-16">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <SectionHeading
              eyebrow={p.eyebrow}
              title={p.title}
              subtitle={p.subtitle}
              align="center"
            />
          </div>
        </Container>
      </section>

      <Container className="pt-16">
        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 max-w-6xl mx-auto">
          
          {/* Lite Plan */}
          <div className="flex flex-col bg-white border border-line p-8 hover:border-primary/50 transition-colors shadow-sm">
            <h3 className="font-display text-2xl font-semibold text-ink mb-2">{p.plans.lite.name}</h3>
            <p className="text-sm text-muted mb-6 h-10">{p.plans.lite.tagline}</p>
            <div className="mb-6">
              <span className="text-4xl font-display font-semibold text-ink">$449</span>
              <span className="text-muted">{p.intervals.perYear}</span>
            </div>
            <p className="text-sm text-primary font-mono bg-primary/5 inline-block py-1 px-3 mb-8 w-fit">{p.intervals.lessThanMonth}</p>
            <button className="w-full py-3 px-4 bg-white border border-primary text-primary font-mono text-sm uppercase tracking-wider hover:bg-primary/5 transition-colors mt-auto">
              {p.cta}
            </button>
          </div>

          {/* Standard Plan */}
          <div className="flex flex-col bg-white border border-line p-8 hover:border-primary/50 transition-colors shadow-sm relative">
            <h3 className="font-display text-2xl font-semibold text-ink mb-2">{p.plans.standard.name}</h3>
            <p className="text-sm text-muted mb-6 h-10">{p.plans.standard.tagline}</p>
            <div className="mb-6">
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-3xl font-display font-semibold text-ink">$349</span>
                <span className="text-muted text-sm">{p.intervals.perSixMonth}</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-display font-semibold text-ink">$549</span>
                <span className="text-muted">{p.intervals.perYear}</span>
              </div>
            </div>
            <p className="text-sm text-green-600 font-mono bg-green-50 inline-block py-1 px-3 mb-8 w-fit">{p.intervals.saveYear}</p>
            <button className="w-full py-3 px-4 bg-white border border-primary text-primary font-mono text-sm uppercase tracking-wider hover:bg-primary/5 transition-colors mt-auto">
              {p.cta}
            </button>
          </div>

          {/* Business Plan (Highlighted) */}
          <div className="flex flex-col bg-primary border border-primary p-8 shadow-md relative transform md:-translate-y-4">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-ink text-white text-xs font-mono px-3 py-1 uppercase tracking-widest">
              {p.badges.recommended}
            </div>
            <h3 className="font-display text-2xl font-semibold text-white mb-2">{p.plans.business.name}</h3>
            <p className="text-sm text-white/80 mb-6 h-10">{p.plans.business.tagline}</p>
            <div className="mb-6">
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-3xl font-display font-semibold text-white">$549</span>
                <span className="text-white/70 text-sm">{p.intervals.perSixMonth}</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-display font-semibold text-white">$849</span>
                <span className="text-white/70">{p.intervals.perYear}</span>
              </div>
            </div>
            <p className="text-sm text-white font-mono bg-white/20 inline-block py-1 px-3 mb-8 w-fit">{p.intervals.saveYear}</p>
            <button className="w-full py-3 px-4 bg-white text-primary font-mono text-sm uppercase tracking-wider hover:bg-white/90 transition-colors mt-auto">
              {p.cta}
            </button>
          </div>

        </div>

        {/* Feature Table */}
        <div className="max-w-6xl mx-auto overflow-x-auto pb-4">
          <table className="w-full min-w-[800px] border-collapse bg-white border border-line shadow-sm">
            <thead>
              <tr className="bg-surface border-b border-line">
                <th className="py-5 px-6 text-left font-display text-lg font-semibold text-ink w-2/5">{p.table.heading}</th>
                <th className="py-5 px-6 text-center font-display text-lg font-semibold text-ink w-1/5 border-l border-line">{p.plans.lite.name}</th>
                <th className="py-5 px-6 text-center font-display text-lg font-semibold text-ink w-1/5 border-l border-line">{p.plans.standard.name}</th>
                <th className="py-5 px-6 text-center font-display text-lg font-semibold text-primary w-1/5 border-l border-line">{p.plans.business.name}</th>
              </tr>
            </thead>
            <tbody>
              {p.table.features.map((feature, idx) => (
                <tr key={idx} className="border-b border-line hover:bg-surface/50 transition-colors">
                  <td className="py-4 px-6 text-sm text-ink font-medium">{feature.name}</td>
                  
                  {/* Lite */}
                  <td className="py-4 px-6 text-center border-l border-line">
                    {typeof feature.lite === "boolean" ? (
                      feature.lite ? <Check className="w-5 h-5 text-primary mx-auto" /> : <X className="w-5 h-5 text-muted mx-auto" />
                    ) : (
                      <span className="text-sm text-muted">{feature.lite}</span>
                    )}
                  </td>
                  
                  {/* Standard */}
                  <td className="py-4 px-6 text-center border-l border-line">
                    {typeof feature.standard === "boolean" ? (
                      feature.standard ? <Check className="w-5 h-5 text-primary mx-auto" /> : <X className="w-5 h-5 text-muted mx-auto" />
                    ) : (
                      <span className="text-sm text-muted">{feature.standard}</span>
                    )}
                  </td>

                  {/* Business */}
                  <td className="py-4 px-6 text-center border-l border-line bg-primary/5">
                    {typeof feature.business === "boolean" ? (
                      feature.business ? <Check className="w-5 h-5 text-primary mx-auto" /> : <X className="w-5 h-5 text-muted mx-auto" />
                    ) : (
                      <span className="text-sm text-ink font-medium">{feature.business}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
    </main>
  );
}
