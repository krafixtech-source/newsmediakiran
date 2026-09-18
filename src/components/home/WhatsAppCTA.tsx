"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import { WhatsAppIcon } from "@/components/common/SocialIcons";
import { useLanguage } from "@/context/LanguageContext";

export function WhatsAppCTA() {
  const { language } = useLanguage();
  const isEn = language === "en";

  return (
    <section className="w-full max-w-7xl mx-auto px-4 my-6">
      <div className="bg-[#f0fdf4] border border-[#bbf7d0] rounded-lg p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xs">
        <div className="flex items-center gap-4 text-center sm:text-left">
          <div className="w-13 h-13 rounded-full bg-[#25D366] text-white flex items-center justify-center shrink-0 shadow-md">
            <WhatsAppIcon className="w-7 h-7 text-white" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-widest block">
              {isEn ? "FASTEST REAL-TIME UPDATES" : "ताज़ा अपडेट्स सबसे पहले"}
            </span>
            <h3 className="font-editorial text-lg sm:text-xl font-black text-gray-900">
              {isEn
                ? "Join the Official News Media Kiran WhatsApp Channel"
                : "News Media Kiran के आधिकारिक व्हाट्सएप चैनल से जुड़ें"}
            </h3>
            <p className="text-xs text-gray-600 mt-0.5">
              {isEn
                ? "Get breaking news, ground reports, and verified updates delivered directly to your phone."
                : "ब्रेकिंग न्यूज़, सरकारी योजनाएं और विशेष विश्लेषण सीधे अपने मोबाइल पर पाएं।"}
            </p>
          </div>
        </div>

        <a
          href="https://whatsapp.com/channel/newsmediakiran"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-2.5 bg-[#25D366] hover:bg-[#1faa4f] text-white text-xs sm:text-sm font-bold rounded-full shadow-xs flex items-center gap-2 transition-transform hover:scale-105 shrink-0"
        >
          <WhatsAppIcon className="w-4 h-4 text-white" />
          <span>{isEn ? "Join Channel" : "अभी जुड़ें (Join Channel)"}</span>
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </section>
  );
}

