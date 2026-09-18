"use client";

import React from "react";
import { WhatsAppIcon } from "@/components/common/SocialIcons";
import { useLanguage } from "@/context/LanguageContext";

export function FloatingWhatsApp() {
  const { language } = useLanguage();
  const isEn = language === "en";

  return (
    <aside aria-label="WhatsApp Quick Connect" className="fixed bottom-6 right-6 z-50 group">
      <a
        href="https://whatsapp.com/channel/newsmediakiran"
        target="_blank"
        rel="noopener noreferrer"
        className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#25D366] hover:bg-[#1faa4f] text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 relative"
        aria-label="Join News Media Kiran on WhatsApp"
        title={isEn ? "Join News Media Kiran on WhatsApp" : "व्हाट्सएप चैनल से जुड़ें"}
      >
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-30 pointer-events-none"></span>
        <WhatsAppIcon className="w-7 h-7 sm:w-8 sm:h-8 text-white relative z-10" />

        {/* Hover Tooltip */}
        <span className="pointer-events-none absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-gray-900 text-white text-xs font-semibold rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-md">
          {isEn ? "Join WhatsApp Channel" : "व्हाट्सएप पर ताज़ा खबरें पाएं"}
        </span>
      </a>
    </aside>
  );
}
