"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { Zap, ChevronLeft, ChevronRight, Radio } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface BreakingItem {
  id: number;
  headline: string;
  url?: string;
  tag?: string;
}

interface BreakingTickerProps {
  items: BreakingItem[];
}

export function BreakingTicker({ items }: BreakingTickerProps) {
  const { language } = useLanguage();
  const isEn = language === "en";
  const [isPaused, setIsPaused] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Fallback high-impact breaking items if none provided
  const displayItems =
    items && items.length > 0
      ? items
      : [
          {
            id: 1,
            headline: "Tata Steel की नई पहल: हादसे के 10 मिनट में मिलेगा इलाज, जमशेदपुर में स्पेशल ग्रीन कॉरिडोर",
            url: "/news/tata-steel-new-initiative-10-minute-treatment-green-corridor-plant-to-tmh",
            tag: isEn ? "FAST TRACK" : "ताज़ा पहल",
          },
          {
            id: 2,
            headline: "पीएम मोदी ने सेमीकॉन इंडिया 2026 का उद्घाटन किया, दो नई सेमीकंडक्टर चिप यूनिट का ऐलान",
            url: "/news/piem-modi-ne-semik-n-indiya-2026-ka-udghatn-kiya-splaee-chen-riph-rm-aur-do-nee-chip-yunit-ka-ailan",
            tag: isEn ? "NATIONAL" : "बड़ी खबर",
          },
          {
            id: 3,
            headline: "NTA Exam Calendar 2026-27 जारी: JEE Main, UGC NET समेत 14 परीक्षाओं की आधिकारिक तिथियां घोषित",
            url: "/news/nta-exam-calendar-2026-27-jari-disnbr-se-march-tk-jee-main-ugc-net-smet-14-prikshaon-ki-tarikhen-aaeen-samne",
            tag: isEn ? "EDUCATION" : "शिक्षा",
          },
          {
            id: 4,
            headline: "West Bengal New Airports: पश्चिम बंगाल में बनेंगे 4 नए आधुनिक हवाईअड्डे, जल्द होगा एमओयू",
            url: "/news/west-bengal-new-airports-pshchim-bngal-men-bnenge-char-ne-eyrport-23-sitnbr-ko-hoga-emoyu-janen-kin-jilon-ko-milega-phayda",
            tag: isEn ? "INFRA" : "विकास",
          },
        ];

  const handleStepPrev = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -250, behavior: "smooth" });
    }
  };

  const handleStepNext = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 250, behavior: "smooth" });
    }
  };

  return (
    <div
      className="w-full bg-white border-y border-gray-200 text-gray-900 overflow-hidden relative shadow-2xs select-none"
      role="region"
      aria-label="Breaking News Marquee"
    >
      <div className="max-w-7xl mx-auto flex items-center h-11 sm:h-12 px-3 sm:px-4 gap-2 sm:gap-3">
        
        {/* Left Badge: High-impact Red Pill with Pulsing Beacon & Zap Icon */}
        <div className="flex items-center gap-1.5 sm:gap-2 bg-gradient-to-r from-[#b91c1c] to-[#dc2626] text-white px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full font-black text-xs uppercase tracking-wider shrink-0 z-20 shadow-xs">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-200 opacity-90"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
          </span>
          <Zap className="w-3.5 h-3.5 fill-amber-300 text-amber-300 shrink-0" />
          <span className="font-black text-[11px] sm:text-xs tracking-wider">
            {isEn ? "BREAKING" : "ब्रेकिंग"}
          </span>
        </div>

        {/* Marquee Content Wrapper with Left & Right Gradient Fade Masks */}
        <div
          ref={scrollContainerRef}
          className="flex-1 overflow-hidden relative h-full flex items-center"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Left subtle fade */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-6 sm:w-10 bg-gradient-to-r from-white via-white/80 to-transparent z-10" />

          {/* Right subtle fade */}
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 sm:w-14 bg-gradient-to-l from-white via-white/80 to-transparent z-10" />

          {/* Ticker stream */}
          <div
            className={`flex items-center whitespace-nowrap text-xs sm:text-[13px] font-medium tracking-normal ${
              isPaused ? "" : "animate-ticker"
            }`}
            style={{ animationPlayState: isPaused ? "paused" : "running" }}
          >
            {/* Duplicated list for seamless infinite loop */}
            {[...displayItems, ...displayItems, ...displayItems].map((item, idx) => (
              <div key={`${item.id}-${idx}`} className="inline-flex items-center mx-3 sm:mx-4 group">
                <Link
                  href={item.url || "#"}
                  className="inline-flex items-center gap-2 text-gray-800 hover:text-[#b91c1c] transition-colors py-1 px-2 rounded-md hover:bg-red-50/50"
                >
                  {/* Category / Alert Pill */}
                  <span className="px-1.5 py-0.5 text-[9px] sm:text-[10px] font-bold uppercase rounded-sm bg-red-100/70 text-[#b91c1c] border border-red-200/50 shrink-0">
                    {item.tag || (isEn ? "LIVE" : "ताज़ा")}
                  </span>

                  {/* Headline text */}
                  <span className="font-semibold text-gray-900 group-hover:text-[#b91c1c] transition-colors">
                    {item.headline}
                  </span>
                </Link>

                {/* Styled diamond separator */}
                <span className="inline-flex items-center mx-3 sm:mx-4 text-red-300 select-none">
                  ◆
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Controls: Live Count Pill + Step Arrows */}
        <div className="flex items-center gap-1 sm:gap-2 shrink-0 z-20 pl-1 border-l border-gray-200">
          {/* Live indicator badge */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[10px] font-bold">
            <Radio className="w-3 h-3 text-emerald-600 animate-pulse" />
            <span>{isEn ? `${displayItems.length} LIVE` : `${displayItems.length} लाइव`}</span>
          </div>

          {/* Previous Step (when manual reading) */}
          <button
            onClick={handleStepPrev}
            className="p-1 rounded-full text-gray-500 hover:text-black hover:bg-gray-100 transition-colors cursor-pointer hidden sm:flex items-center justify-center"
            aria-label="Previous headline"
            title="Previous headline"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Next Step */}
          <button
            onClick={handleStepNext}
            className="p-1 rounded-full text-gray-500 hover:text-black hover:bg-gray-100 transition-colors cursor-pointer hidden sm:flex items-center justify-center"
            aria-label="Next headline"
            title="Next headline"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}

