"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import type { Business } from "@/types";
import BusinessOffsetCard from "@/components/cards/BusinessOffsetCard";

// Fisher-Yates shuffle algorithm
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function FeaturedListingsGrid({ pool }: { pool: Business[] }) {
  // Initial state strictly matches server HTML (first 6) to avoid hydration mismatch
  const [deal, setDeal] = useState<Business[]>(() => pool.slice(0, 6));
  const [isVisible, setIsVisible] = useState(true);

  // Queue state starts null so it doesn't process on the server
  const queueRef = useRef<Business[] | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mountedRef = useRef(true);

  // Pause flags managed by refs so they don't reset the interval
  const isHovered = useRef(false);
  const isFocused = useRef(false);
  const isHidden = useRef(false);
  const isIntersecting = useRef(true);

  const advanceDeal = useCallback(() => {
    // If reduced motion is preferred, we don't auto-advance.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    
    // If there's an active pause condition, silently skip this tick
    if (
      isHovered.current ||
      isFocused.current ||
      isHidden.current ||
      !isIntersecting.current
    ) {
      return;
    }

    setIsVisible(false);

    // Swap data while invisible (400ms CSS transition)
    setTimeout(() => {
      if (!mountedRef.current) return;

      let q = queueRef.current;
      
      // If queue isn't initialized, shuffle the pool to start
      if (!q) {
        q = shuffleArray(pool);
      }
      
      // If the queue is running low, append another shuffled pool
      if (q.length < 6) {
        q = [...q, ...shuffleArray(pool)];
      }

      // Take the next 6
      const nextDeal = q.slice(0, 6);
      
      // Save the rest of the queue
      queueRef.current = q.slice(6);
      
      setDeal(nextDeal);
      setIsVisible(true);
    }, 400);
  }, [pool]);

  useEffect(() => {
    mountedRef.current = true;

    // If pool is degraded (under 6), just render what we have. No shuffling or rotation.
    if (pool.length < 6) {
      setDeal(pool);
      return;
    }

    // If reduced motion, we shuffle once initially on client and stick with it
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDeal(shuffleArray(pool).slice(0, 6));
      return;
    }

    // Initialize the queue and immediately deal the first shuffled set (overwriting the deterministic server deal)
    const initialQueue = shuffleArray(pool);
    setDeal(initialQueue.slice(0, 6));
    queueRef.current = initialQueue.slice(6);

    // Set up document visibility
    const handleVisibilityChange = () => {
      isHidden.current = document.hidden;
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Set up intersection observer
    const observer = new IntersectionObserver(
      (entries) => {
        isIntersecting.current = entries[0].isIntersecting;
      },
      { threshold: 0.3 }
    );
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    const intervalId = setInterval(advanceDeal, 3000);

    return () => {
      mountedRef.current = false;
      clearInterval(intervalId);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      observer.disconnect();
    };
  }, [pool, advanceDeal]);

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => { isHovered.current = true; }}
      onMouseLeave={() => { isHovered.current = false; }}
      onFocusCapture={() => { isFocused.current = true; }}
      onBlurCapture={() => { isFocused.current = false; }}
      aria-live="off"
      className={`mt-12 grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-2 lg:grid-cols-3 transition-opacity duration-[400ms] ease-in-out ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      {deal.map((business, index) => (
        <BusinessOffsetCard key={`${business.id}-${index}`} business={business} />
      ))}
    </div>
  );
}
