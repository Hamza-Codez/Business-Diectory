import Link from "next/link";
import Button from "@/components/ui/Button";
import Container from "@/components/layout/Container";
import LanguageToggle from "@/components/layout/LanguageToggle";
import MobileNav from "@/components/layout/MobileNav";
import { CTA_HREF, NAV_LINKS } from "@/constants/nav";
import { MESSAGES } from "@/constants/messages";
import { getLang } from "@/lib/i18n";

import Image from "next/image";

export function Wordmark() {
  return (
    <Link
      href="/"
      className="flex items-center gap-2 font-display text-sm sm:text-xl font-semibold text-ink sm:gap-2.5"
    >
      <Image
        src="/assets/cherry.png"
        alt="Cherry Logo"
        width={24}
        height={24}
        className="shrink-0 animate-[spin_8s_linear_infinite]"
      />
      <span className="leading-tight">Japan Business Directory</span>
    </Link>
  );
}

export default async function Header() {
  const lang = await getLang();
  const m = MESSAGES[lang];
  const links = NAV_LINKS.map((link) => ({
    href: link.href,
    label: m.nav[link.key],
  }));

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white">
      <Container className="flex h-16 items-center justify-between lg:h-[72px]">
        <Wordmark />

        <nav aria-label="Main" className="hidden items-center gap-8 lg:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-base text-ink transition-colors duration-200 hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
          <Button href={CTA_HREF}>{m.nav.cta}</Button>
          <LanguageToggle lang={lang} />
        </nav>

        <div className="flex items-center gap-2 sm:gap-3 lg:hidden shrink-0">
          <LanguageToggle lang={lang} />
          <MobileNav links={links} cta={{ href: CTA_HREF, label: m.nav.cta }} />
        </div>
      </Container>
    </header>
  );
}
