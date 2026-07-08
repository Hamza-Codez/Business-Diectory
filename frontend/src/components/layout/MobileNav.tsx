"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X, ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";

type MobileNavProps = {
  links: { href: string; label: string }[];
  cta: { href: string; label: string };
};

export default function MobileNav({ links, cta }: MobileNavProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-label="Open menu"
        aria-expanded={open}
        onClick={() => setOpen(true)}
        className="flex h-11 w-11 items-center justify-center text-ink transition-colors duration-200 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        <Menu size={24} />
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex flex-col bg-ink">
          {/* Watermark to fill the void */}
          <div className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden pointer-events-none opacity-[0.03]">
            <span className="font-display text-[150px] font-bold text-white whitespace-nowrap -rotate-90 tracking-tighter">
              DIRECTORY
            </span>
          </div>

          <div className="relative z-10 flex h-20 items-center justify-end px-4 border-b border-white/10">
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="flex h-11 w-11 items-center justify-center text-white/60 transition-colors duration-200 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              <X size={28} />
            </button>
          </div>

          <nav
            aria-label="Mobile"
            className="relative z-10 flex flex-1 flex-col px-6 pt-6 overflow-y-auto"
          >
            {links.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="group flex items-center justify-between border-b border-white/10 py-6 transition-colors duration-200"
              >
                <div className="flex items-center gap-6">
                  <span className="font-mono text-xs text-primary">
                    0{i + 1}
                  </span>
                  <span className="font-display text-3xl font-semibold text-white transition-colors duration-200 group-hover:text-primary">
                    {link.label}
                  </span>
                </div>
                <ArrowRight size={20} className="text-white/20 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-primary" />
              </Link>
            ))}
          </nav>

          <div className="relative z-10 px-6 pb-10" onClick={() => setOpen(false)}>
            <div className="mb-8 flex flex-col items-center gap-2 text-center font-mono text-[10px] uppercase tracking-widest text-white/40">
              <p>Tokyo, Japan</p>
              <p>support@japanbusiness.dir</p>
            </div>
            <Button href={cta.href} size="lg" className="w-full h-14 bg-primary text-white hover:bg-primary-dark">
              {cta.label}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
