import { Metadata } from "next";
import Image from "next/image";
import { Zap, Briefcase, MapPin, Mail } from "lucide-react";
import Container from "@/components/layout/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Button from "@/components/ui/Button";
import { MESSAGES } from "@/constants/messages";
import { getLang } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Contact Us | Japan Business Directory",
  description: "Get in touch with the Japan Business Directory team.",
};

export default async function ContactPage() {
  const lang = await getLang();
  const t = MESSAGES[lang].contact;
  return (
    <main className="flex-1 bg-surface py-12 lg:py-24 min-h-[80svh]">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          
          {/* Left Column: Images & Takeaways */}
          <div className="flex flex-col gap-10">
            <div>
              <SectionHeading
                align="left"
                eyebrow={t.eyebrow}
                title={t.title}
                subtitle={t.subtitle}
              />
            </div>

            {/* Overlapping Images */}
            <div className="relative h-[320px] sm:h-[450px] w-full">
              {/* Landscape Image (Background/Left) */}
              <div className="absolute top-0 left-0 w-[75%] h-[70%] border border-line shadow-sm z-0">
                <Image
                  src="/assets/contact2.jpg"
                  alt="Japan Office landscape"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 75vw, 40vw"
                />
              </div>
              {/* Portrait Image (Foreground/Right) */}
              <div className="absolute bottom-0 right-0 w-[55%] h-[75%] border-8 border-surface shadow-2xl z-10">
                <Image
                  src="/assets/contact1.jpg"
                  alt="Business Meeting portrait"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 55vw, 30vw"
                />
              </div>
            </div>

            {/* Quick Takeaways Vector Block */}
            <div className="bg-ink text-white p-8 md:p-10 border-l-8 border-primary relative overflow-hidden mt-4">
              <h3 className="font-display text-2xl font-semibold mb-8 relative z-10">{t.whyPartner}</h3>
              <ul className="space-y-6 relative z-10">
                <li className="flex items-start gap-4">
                  <div className="bg-primary p-2 text-white">
                    <Zap size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg font-display">{t.rapidResponse}</h4>
                    <p className="text-white/70 text-sm mt-1 leading-relaxed">{t.rapidResponseDesc}</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="bg-primary p-2 text-white">
                    <Briefcase size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg font-display">{t.b2bFocused}</h4>
                    <p className="text-white/70 text-sm mt-1 leading-relaxed">{t.b2bFocusedDesc}</p>
                  </div>
                </li>
              </ul>
              
              {/* Geometric Vector Embellishment */}
              <div className="absolute -bottom-16 -right-16 opacity-5 pointer-events-none">
                <svg width="200" height="200" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" stroke="white" strokeWidth="8" fill="none" />
                  <rect x="20" y="20" width="60" height="60" stroke="white" strokeWidth="4" fill="none" transform="rotate(45 50 50)" />
                </svg>
              </div>
            </div>
          </div>

          {/* Right Column: Embellished Contact Form */}
          <div className="relative mt-8 lg:mt-0">
            {/* Black & Primary Embellishments */}
            <div className="absolute -inset-4 bg-ink transform translate-y-6 translate-x-4 z-0 hidden sm:block"></div>
            
            <form className="relative z-10 bg-white p-8 md:p-12 border-t-8 border-primary border-l border-r border-b border-line shadow-xl flex flex-col gap-6">
              <h3 className="font-display text-2xl font-semibold text-ink mb-2">{t.sendMessage}</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="firstName" className="font-mono text-xs uppercase tracking-widest text-ink/80 font-medium">{t.firstName}</label>
                  <Input id="firstName" name="firstName" placeholder={t.firstNamePlaceholder} required />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="lastName" className="font-mono text-xs uppercase tracking-widest text-ink/80 font-medium">{t.lastName}</label>
                  <Input id="lastName" name="lastName" placeholder={t.lastNamePlaceholder} required />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="email" className="font-mono text-xs uppercase tracking-widest text-ink/80 font-medium">{t.email}</label>
                <Input id="email" type="email" name="email" placeholder={t.emailPlaceholder} required />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="subject" className="font-mono text-xs uppercase tracking-widest text-ink/80 font-medium">{t.subject}</label>
                <Input id="subject" name="subject" placeholder={t.subjectPlaceholder} required />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="message" className="font-mono text-xs uppercase tracking-widest text-ink/80 font-medium">{t.message}</label>
                <Textarea id="message" name="message" placeholder={t.messagePlaceholder} required />
              </div>

              <div className="mt-6">
                <Button type="submit" className="w-full bg-ink hover:bg-primary text-white py-4 text-sm font-mono uppercase tracking-widest transition-colors duration-300">
                  {t.submit}
                </Button>
              </div>
              
              {/* Form Footer */}
              <div className="mt-8 pt-8 border-t border-line grid grid-cols-2 gap-4 font-mono text-xs text-muted">
                <div className="flex items-start gap-2">
                  <MapPin size={14} className="text-primary mt-0.5 shrink-0" />
                  <span>1-1-1 Marunouchi<br/>Tokyo 100-0005</span>
                </div>
                <div className="flex items-start gap-2">
                  <Mail size={14} className="text-primary mt-0.5 shrink-0" />
                  <span>hello@japanbusiness<br/>directory.com</span>
                </div>
              </div>
            </form>
          </div>

        </div>
      </Container>
    </main>
  );
}
