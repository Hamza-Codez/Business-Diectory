import Link from "next/link";
import Container from "@/components/layout/Container";
import { CTA_HREF, NAV_LINKS } from "@/constants/nav";
import { MESSAGES } from "@/constants/messages";
import { getLang } from "@/lib/i18n";

export default async function Footer() {
  const lang = await getLang();
  const m = MESSAGES[lang];
  const links = [
    ...NAV_LINKS.map((link) => ({ href: link.href, label: m.nav[link.key] })),
    { href: CTA_HREF, label: m.nav.cta },
  ];

  return (
    <footer className="bg-ink py-12 lg:py-16">
      <Container>
        <div className="flex flex-col items-center gap-8 text-center lg:flex-row lg:items-start lg:justify-between lg:text-left">
          <div>
            <Link
              href="/"
              className="inline-flex items-baseline gap-1 font-display text-xl font-semibold text-white"
            >
              Japan
              <span className="inline-block size-2 bg-primary" aria-hidden="true" />
              Directory
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/70">
              {m.footer.description}
            </p>
          </div>

          <nav
            aria-label="Footer"
            className="flex flex-wrap justify-center gap-x-6 gap-y-2 lg:justify-end"
          >
            {links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm text-white/70 transition-colors duration-200 hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <p className="mt-10 text-center font-mono text-xs text-white/50 lg:text-left">
          Business data © Geoapify | © OpenStreetMap contributors · Powered by
          Hot Pepper Gourmet Web Service
        </p>

        <div className="mt-4 flex flex-col items-center gap-2 border-t border-white/10 pt-6 sm:flex-row sm:justify-between">
          <p className="text-sm text-white/70">{m.footer.rights}</p>
          <div className="flex gap-6">
            <Link
              href="/privacy"
              className="text-sm text-white/70 transition-colors duration-200 hover:text-white"
            >
              {m.footer.privacy}
            </Link>
            <Link
              href="/terms"
              className="text-sm text-white/70 transition-colors duration-200 hover:text-white"
            >
              {m.footer.terms}
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
