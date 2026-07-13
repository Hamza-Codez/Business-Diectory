"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { Search } from "lucide-react";
import { CATEGORIES, categoryLabel } from "@/constants/categories";
import { cn } from "@/lib/utils";
import Button from "@/components/ui/Button";

type Lang = "en" | "ja";

export default function HeroSearchTeaser({
  lang,
  ctaText,
  placeholder,
}: {
  lang: Lang;
  ctaText: string;
  placeholder: string;
}) {
  const [mounted, setMounted] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [entered, setEntered] = useState(false);

  const [phase, setPhase] = useState<"paused" | "typing" | "holding" | "deleting" | "waiting">("paused");
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [words, setWords] = useState<string[]>([]);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setReducedMotion(isReduced);
    setMounted(true);

    if (isReduced) {
      setEntered(true);
      return;
    }

    const shuffled = [...CATEGORIES]
      .map((c) => categoryLabel(c, lang))
      .sort(() => Math.random() - 0.5);
    setWords(shuffled);

    const enterTimer = setTimeout(() => {
      setEntered(true);
    }, 300);

    return () => clearTimeout(enterTimer);
  }, [lang]);

  useEffect(() => {
    if (!entered || reducedMotion || words.length === 0) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          setPhase("paused");
        } else {
          setPhase((p) => (p === "paused" ? "typing" : p));
        }
      },
      { threshold: 0 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    const onVisibilityChange = () => {
      if (document.hidden) {
        setPhase("paused");
      } else {
        setPhase((p) => (p === "paused" ? "typing" : p));
      }
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [entered, reducedMotion, words.length]);

  useEffect(() => {
    if (phase === "paused" || words.length === 0) return;

    let timer: NodeJS.Timeout;
    const currentWord = words[wordIndex % words.length];

    if (phase === "typing") {
      if (charIndex < currentWord.length) {
        timer = setTimeout(() => {
          setCharIndex((c) => c + 1);
        }, 80);
      } else {
        setPhase("holding");
      }
    } else if (phase === "holding") {
      timer = setTimeout(() => {
        setPhase("deleting");
      }, 1000);
    } else if (phase === "deleting") {
      if (charIndex > 0) {
        timer = setTimeout(() => {
          setCharIndex((c) => c - 1);
        }, 40);
      } else {
        setPhase("waiting");
      }
    } else if (phase === "waiting") {
      timer = setTimeout(() => {
        setWordIndex((w) => w + 1);
        setPhase("typing");
      }, 400);
    }

    return () => clearTimeout(timer);
  }, [phase, charIndex, wordIndex, words]);



  const currentText = words.length > 0 ? words[wordIndex % words.length].slice(0, charIndex) : "";

  return (
    <div
      ref={containerRef}
      className="group flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full"
    >
      <style>{`
        @keyframes custom-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .animate-custom-blink {
          animation: custom-blink 1s steps(2, start) infinite;
        }
      `}</style>
      <noscript>
        <style>{`
          .hero-teaser-bar { clip-path: inset(0) !important; opacity: 1 !important; }
          .hero-teaser-btn { transform: translateX(0) !important; }
        `}</style>
      </noscript>

      <div className="relative w-full sm:w-[280px] shrink-0 m-0 p-0">
        <div
          className={cn(
            "hero-teaser-bar relative flex items-center bg-white border border-line h-13 px-4 w-full overflow-hidden outline-none transition-all duration-500 ease-out sm:origin-left hover:bg-neutral-50",
            !mounted
              ? "opacity-0 sm:opacity-100 sm:[clip-path:inset(0_100%_0_0)]"
              : entered || reducedMotion
              ? "opacity-100 sm:opacity-100 [clip-path:inset(0_0_0_0)]"
              : "opacity-0 sm:opacity-100 sm:[clip-path:inset(0_100%_0_0)]"
          )}
        >
          <Search className="w-5 h-5 text-muted shrink-0" />
          <span aria-hidden="true" className="text-base text-muted truncate ml-3 flex-1 flex items-center text-left">
            {!mounted || reducedMotion ? (
              placeholder
            ) : (
              <>
                {currentText}
                <span
                  className={cn(
                    "w-[2px] h-5 bg-ink ml-[1px]",
                    (phase === "holding" || phase === "paused") && !reducedMotion ? "animate-custom-blink" : ""
                  )}
                />
              </>
            )}
          </span>
        </div>
      </div>

      <div
        className={cn(
          "hero-teaser-btn transition-transform duration-500 ease-out",
          !mounted
            ? "sm:-translate-x-[296px]" // 280px width + 16px gap
            : entered || reducedMotion
            ? "translate-x-0"
            : "sm:-translate-x-[296px]"
        )}
      >
        <Button href="/search" size="lg" className="w-full sm:w-auto">
          {ctaText}
        </Button>
      </div>
    </div>
  );
}
