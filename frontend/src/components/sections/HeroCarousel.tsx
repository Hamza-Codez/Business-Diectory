"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const IMAGES = [
  { src: "/assets/hero.png", alt: "Tokyo architecture at dusk" },
  { src: "/assets/hero2.jpg", alt: "Japanese landscape" },
  { src: "/assets/hero3.jpg", alt: "Japan street view" },
  { src: "/assets/hero4.jpg", alt: "Traditional Japan" },
  { src: "/assets/hero5.webp", alt: "Modern Japanese city" },
];

export default function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % IMAGES.length);
    }, 4000); // 4s interval gives time to enjoy the 2s transition

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden bg-white -z-10">
      {IMAGES.map((img, index) => {
        const isActive = index === currentIndex;
        return (
          <Image
            key={img.src}
            src={img.src}
            alt={img.alt}
            fill
            priority={index === 0}
            sizes="100vw"
            className={cn(
              "object-cover transition-all duration-[2000ms] ease-in-out", // 2 seconds transition round up
              isActive
                ? "opacity-100 translate-y-0 scale-100"
                : "opacity-0 translate-y-12 scale-105 pointer-events-none" // fade up and scale down slightly
            )}
          />
        );
      })}
      <div className="absolute inset-0 bg-ink/40 transition-opacity duration-[2000ms]" aria-hidden="true" />
    </div>
  );
}
