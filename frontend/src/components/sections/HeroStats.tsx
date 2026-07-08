"use client";

import { useEffect, useState } from "react";
import { MESSAGES, type Lang } from "@/constants/messages";

function useCounter(end: number, duration: number = 2000) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp: number | null = null;
    let animationFrameId: number;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      // easeOutExpo for smooth deceleration
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(easeProgress * end));
      
      if (progress < 1) {
        animationFrameId = window.requestAnimationFrame(step);
      }
    };
    
    animationFrameId = window.requestAnimationFrame(step);
    
    return () => {
      if (animationFrameId) {
        window.cancelAnimationFrame(animationFrameId);
      }
    };
  }, [end, duration]);

  return count;
}

function StatItem({ 
  value, 
  suffix, 
  label, 
  delay = 0,
  isLive = false
}: { 
  value: number | string; 
  suffix?: string; 
  label: string;
  delay?: number;
  isLive?: boolean;
}) {
  const [start, setStart] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setStart(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  const count = useCounter(start && typeof value === 'number' ? value : 0, 2500);

  return (
    <div className="group relative flex flex-col space-y-2 p-6 bg-primary/70 backdrop-blur-sm border border-white/5 overflow-hidden transition-colors hover:bg-black/10">
      <div className="text-xl md:text-2xl font-mono text-white flex items-center tracking-tight">
        {isLive && (
          <span className="relative flex h-2 w-2 mr-3 mt-0.5">
            <span className="animate-ping absolute inline-flex h-full w-full bg-primary/70"></span>
            <span className="relative inline-flex h-2 w-2 bg-primary"></span>
          </span>
        )}
        {typeof value === 'number' ? count.toLocaleString() : value}
        {suffix && <span className="text-primary ml-0.5">{suffix}</span>}
      </div>
      <div className="text-xs md:text-sm text-white/70 font-sans tracking-wide leading-relaxed">
        {label}
      </div>
      
      {/* Animated bottom line */}
      <div className="absolute bottom-0 left-0 h-[2px] w-full bg-primary origin-left scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100" />
    </div>
  );
}

export default function HeroStats({ lang = "en" }: { lang?: Lang }) {
  const s = MESSAGES[lang].heroStats;
  return (
    <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
      <StatItem
        value={20000}
        suffix="+"
        label={s.places}
        delay={100}
      />
      <StatItem
        value={s.live}
        label={s.liveLabel}
        delay={300}
        isLive={true}
      />
      <StatItem
        value={15000}
        suffix="+"
        label={s.users}
        delay={500}
      />
      <StatItem
        value={47}
        label={s.prefectures}
        delay={700}
      />
    </div>
  );
}
