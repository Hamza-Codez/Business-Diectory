import { Metadata } from "next";
import Image from "next/image";
import { Building2, MapPin, Globe, CheckCircle2, TrendingUp, Users, ShieldCheck } from "lucide-react";
import Container from "@/components/layout/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Button from "@/components/ui/Button";
import { MESSAGES } from "@/constants/messages";
import { getLang } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Add Business | Japan Business Directory",
  description: "List your company or service in the Japan Business Directory.",
};

export default async function AddBusinessPage() {
  const lang = await getLang();
  const t = MESSAGES[lang].addBusiness;
  return (
    <main className="flex-1 bg-surface py-12 lg:py-20 min-h-[80svh]">
      <Container>
        
        {/* Header Section */}
        <div className="mb-12">
          <SectionHeading
            align="center"
            eyebrow={t.eyebrow}
            title={t.title}
            subtitle={t.subtitle}
          />
        </div>

        {/* Elegant Triptych Image Display (Thin embellishments) */}
        <div className="relative w-full h-[240px] sm:h-[320px] md:h-[400px] mb-16 grid grid-cols-3 gap-2 md:gap-4">
          <div className="relative w-full h-full border border-ink/10 overflow-visible group">
            <div className="relative w-full h-full overflow-hidden">
              <Image
                src="/assets/addbusiness1.jpg"
                alt="Business collaboration"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 border-[0.5px] border-black/5 pointer-events-none"></div>
            </div>
            {/* Overlapping Primary Vector */}
            <div className="absolute -bottom-6 -right-4 md:-right-8 bg-primary text-white p-3 md:p-4 shadow-lg z-20 flex items-center gap-3 w-40 md:w-48 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
              <TrendingUp size={20} className="shrink-0" />
              <span className="font-display text-xs md:text-sm font-semibold tracking-wide">{t.highVisibility}</span>
            </div>
          </div>
          
          <div className="relative w-full h-full border border-ink/10 overflow-visible group mt-4 md:mt-8">
            <div className="relative w-full h-full overflow-hidden">
              <Image
                src="/assets/addbusiness2.jpg"
                alt="Tokyo office space"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 border-[0.5px] border-black/5 pointer-events-none"></div>
            </div>
            {/* Overlapping Black Vector */}
            <div className="absolute -top-6 -left-4 md:-left-8 bg-ink text-white p-3 md:p-4 shadow-lg z-20 flex items-center gap-3 w-40 md:w-48 transform -translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
              <Users size={20} className="shrink-0 text-primary" />
              <span className="font-display text-xs md:text-sm font-semibold tracking-wide">{t.b2bNetwork}</span>
            </div>
          </div>
          
          <div className="relative w-full h-full border border-ink/10 overflow-visible group">
            <div className="relative w-full h-full overflow-hidden">
              <Image
                src="/assets/addbusiness3.jpg"
                alt="Corporate networking"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 border-[0.5px] border-black/5 pointer-events-none"></div>
            </div>
            {/* Overlapping Primary Vector */}
            <div className="absolute -bottom-6 -left-4 md:-left-8 bg-primary text-white p-3 md:p-4 shadow-lg z-20 flex items-center gap-3 w-40 md:w-48 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
              <ShieldCheck size={20} className="shrink-0" />
              <span className="font-display text-xs md:text-sm font-semibold tracking-wide">{t.verifiedTrust}</span>
            </div>
          </div>
          
          {/* Thin, refined embellishments */}
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-1/3 h-[1px] bg-primary/40 z-0 hidden sm:block"></div>
          <div className="absolute top-1/2 -left-4 -translate-y-1/2 w-[1px] h-1/3 bg-ink/20 z-0 hidden sm:block"></div>
          <div className="absolute top-1/2 -right-4 -translate-y-1/2 w-[1px] h-1/3 bg-ink/20 z-0 hidden sm:block"></div>
        </div>

        {/* Landscapic, Dense, Minimalistic Form */}
        <div className="relative border border-ink/10 shadow-sm overflow-hidden">
          {/* Subtle primary accent line */}
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-primary via-ink to-primary opacity-80 z-10"></div>
          
          <form className="flex flex-col">
            
            {/* TOP 70% - WHITE BACKGROUND */}
            <div className="bg-white p-6 md:p-10 lg:p-12 flex flex-col gap-8">
              {/* Section 1: Basic Info */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Building2 size={16} className="text-primary" />
                  <h3 className="font-mono text-sm uppercase tracking-widest text-ink">{t.basicInfo}</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
                  <div className="flex flex-col gap-1.5 lg:col-span-2">
                    <label htmlFor="businessName" className="font-mono text-[10px] uppercase tracking-widest text-ink/60">{t.businessName}</label>
                    <Input id="businessName" name="businessName" placeholder={t.businessNamePlaceholder} required className="h-10 text-sm border-l-2 border-primary/60 border-ink/10 focus:border-primary" />
                  </div>
                  <div className="flex flex-col gap-1.5 lg:col-span-1">
                    <label htmlFor="category" className="font-mono text-[10px] uppercase tracking-widest text-ink/60">{t.category}</label>
                    <select id="category" name="category" className="h-10 w-full border border-l-2 border-primary/60 border-ink/10 bg-white px-3 text-sm text-body focus:border-primary focus:outline-none" required>
                      <option value="">{t.selectCategory}</option>
                      <option value="manufacturing">{t.catManufacturing}</option>
                      <option value="technology">{t.catTechnology}</option>
                      <option value="retail">{t.catRetail}</option>
                      <option value="services">{t.catServices}</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-1.5 lg:col-span-1">
                    <label htmlFor="established" className="font-mono text-[10px] uppercase tracking-widest text-ink/60">{t.yearEstablished}</label>
                    <Input id="established" name="established" placeholder={t.yearEstablishedPlaceholder} className="h-10 text-sm border-l-2 border-primary/60 border-ink/10 focus:border-primary" />
                  </div>
                </div>
              </div>

              <div className="h-[1px] w-full bg-line/60"></div>

              {/* Section 2: Contact & Location */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <MapPin size={16} className="text-primary" />
                  <h3 className="font-mono text-sm uppercase tracking-widest text-ink">{t.locationContact}</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
                  <div className="flex flex-col gap-1.5 lg:col-span-2">
                    <label htmlFor="address" className="font-mono text-[10px] uppercase tracking-widest text-ink/60">{t.fullAddress}</label>
                    <Input id="address" name="address" placeholder={t.fullAddressPlaceholder} required className="h-10 text-sm border-l-2 border-primary/60 border-ink/10 focus:border-primary" />
                  </div>
                  <div className="flex flex-col gap-1.5 lg:col-span-1">
                    <label htmlFor="phone" className="font-mono text-[10px] uppercase tracking-widest text-ink/60">{t.phone}</label>
                    <Input id="phone" name="phone" placeholder={t.phonePlaceholder} required className="h-10 text-sm border-l-2 border-primary/60 border-ink/10 focus:border-primary" />
                  </div>
                  <div className="flex flex-col gap-1.5 lg:col-span-1">
                    <label htmlFor="email" className="font-mono text-[10px] uppercase tracking-widest text-ink/60">{t.publicEmail}</label>
                    <Input id="email" type="email" name="email" placeholder={t.publicEmailPlaceholder} className="h-10 text-sm border-l-2 border-primary/60 border-ink/10 focus:border-primary" />
                  </div>
                </div>
              </div>
            </div>

            {/* BOTTOM 30% - BLACK BACKGROUND */}
            <div className="bg-ink p-6 md:p-10 lg:p-12 flex flex-col gap-8 border-t border-primary/20">
              {/* Section 3: Digital Presence */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Globe size={16} className="text-primary" />
                  <h3 className="font-mono text-sm uppercase tracking-widest text-white">{t.digitalPresence}</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-5">
                  <div className="flex flex-col gap-1.5 lg:col-span-1">
                    <label htmlFor="website" className="font-mono text-[10px] uppercase tracking-widest text-white/60">{t.website}</label>
                    <Input id="website" name="website" placeholder={t.websitePlaceholder} className="h-10 text-sm border-white/10 focus:border-primary" />
                  </div>
                  <div className="flex flex-col gap-1.5 lg:col-span-3">
                    <label htmlFor="description" className="font-mono text-[10px] uppercase tracking-widest text-white/60">{t.description}</label>
                    <Textarea id="description" name="description" placeholder={t.descriptionPlaceholder} required className="h-20 text-sm border-white/10 focus:border-primary resize-none py-2" />
                  </div>
                </div>
              </div>

              {/* Submit Area */}
              <div className="mt-2 flex flex-col sm:flex-row items-center justify-between gap-6 bg-white/5 p-4 border border-white/10">
                <div className="flex items-start gap-3">
                  <CheckCircle2 size={20} className="text-primary shrink-0 mt-0.5" />
                  <p className="text-xs text-white/60 leading-relaxed max-w-md">
                    {t.disclaimer}
                  </p>
                </div>
                <Button type="submit" className="w-full sm:w-auto bg-primary hover:bg-primary-dark text-white px-10 py-3 text-xs font-mono uppercase tracking-widest transition-all duration-300">
                  {t.submit}
                </Button>
              </div>
            </div>

          </form>
        </div>

      </Container>
    </main>
  );
}
