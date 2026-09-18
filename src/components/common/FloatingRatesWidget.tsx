"use client";

import React, { useState, useEffect } from "react";
import { Coins, DollarSign, ArrowUpRight, ArrowDownRight, ChevronRight, X } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { MarketRatesModal } from "@/components/market/MarketRatesModal";

export function FloatingRatesWidget() {
  const { language } = useLanguage();
  const isEn = language === "en";

  const [marketData, setMarketData] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTab, setModalTab] = useState<"gold" | "forex">("gold");
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    fetch("/api/market")
      .then((res) => res.json())
      .then((json) => {
        if (json.success) setMarketData(json.data);
      })
      .catch((err) => console.warn("Floating rates fetch error:", err));
  }, []);

  const gold = marketData?.goldRates;
  const currencies = marketData?.currencies || [];
  const usd = currencies.find((c: any) => c.code === "USD");
  const aed = currencies.find((c: any) => c.code === "AED");

  const openModalWithTab = (tab: "gold" | "forex") => {
    setModalTab(tab);
    setIsModalOpen(true);
    setIsHovered(false);
  };

  return (
    <>
      <aside
        aria-label="Gold Rates and Currency Quick Access"
        className="fixed bottom-6 left-6 z-50"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Hovering Flyout Quick Rates Card (appears above button on hover) */}
        <div
          className={`absolute bottom-full left-0 mb-3 w-72 sm:w-80 bg-white/95 backdrop-blur-md border border-amber-300/80 rounded-xl shadow-2xl overflow-hidden transition-all duration-300 origin-bottom-left ${
            isHovered
              ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
              : "opacity-0 scale-95 translate-y-2 pointer-events-none"
          }`}
        >
          {/* Card Header */}
          <div className="px-3.5 py-2.5 bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-600 text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                <Coins className="w-3.5 h-3.5 text-white" />
              </div>
              <div>
                <span className="text-[11px] font-bold tracking-wide uppercase block">
                  {isEn ? "Live Market Rates" : "दैनिक बाज़ार भाव"}
                </span>
              </div>
            </div>
            <span className="flex items-center gap-1 text-[10px] font-bold bg-white/20 px-2 py-0.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse"></span>
              {isEn ? "LIVE" : "लाइव"}
            </span>
          </div>

          {/* Card Body - Commodities & Forex Snapshot */}
          <div className="p-3 space-y-2.5 text-xs divide-y divide-gray-100">
            {/* Gold Section */}
            <div className="pt-1">
              <div className="flex items-center justify-between text-[10px] font-bold text-amber-800 uppercase tracking-wider mb-1">
                <span>{isEn ? "Gold & Silver (Sarafa)" : "सोना व चांदी भाव"}</span>
                <span className="text-gray-400">Jaipur / Delhi</span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div
                  onClick={() => openModalWithTab("gold")}
                  className="bg-amber-50/60 hover:bg-amber-100/70 border border-amber-200/80 p-2 rounded-md cursor-pointer transition-colors"
                >
                  <div className="text-[10px] text-gray-500 font-semibold">{isEn ? "Gold 24K (10g)" : "24K सोना (10g)"}</div>
                  <div className="font-editorial text-sm font-black text-gray-900 mt-0.5">
                    {gold?.purity24k?.per10g || "₹76,450"}
                  </div>
                  <div className="text-[10px] font-bold text-emerald-700 flex items-center mt-0.5">
                    <ArrowUpRight className="w-3 h-3" />
                    <span>{gold?.purity24k?.change || "+₹280"}</span>
                  </div>
                </div>

                <div
                  onClick={() => openModalWithTab("gold")}
                  className="bg-amber-50/30 hover:bg-amber-100/70 border border-gray-200 p-2 rounded-md cursor-pointer transition-colors"
                >
                  <div className="text-[10px] text-gray-500 font-semibold">{isEn ? "Gold 22K (10g)" : "22K जेवराती"}</div>
                  <div className="font-editorial text-sm font-black text-gray-900 mt-0.5">
                    {gold?.purity22k?.per10g || "₹70,080"}
                  </div>
                  <div className="text-[10px] font-bold text-emerald-700 flex items-center mt-0.5">
                    <ArrowUpRight className="w-3 h-3" />
                    <span>{gold?.purity22k?.change || "+₹250"}</span>
                  </div>
                </div>
              </div>

              <div className="mt-1.5 flex items-center justify-between text-[11px] px-1 text-gray-600">
                <span>{isEn ? "Silver 1kg:" : "चांदी 1 किग्रा:"}</span>
                <span className="font-bold text-gray-900 font-editorial">{gold?.silver?.per1kg || "₹89,200"}</span>
                <span className="text-[10px] font-bold text-red-600">{gold?.silver?.change || "-₹150"}</span>
              </div>
            </div>

            {/* Currency Section */}
            <div className="pt-2">
              <div className="flex items-center justify-between text-[10px] font-bold text-blue-800 uppercase tracking-wider mb-1">
                <span>{isEn ? "Foreign Exchange (vs INR)" : "मुद्रा विनिमय (INR)"}</span>
                <span className="text-gray-400">Interbank</span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div
                  onClick={() => openModalWithTab("forex")}
                  className="bg-blue-50/50 hover:bg-blue-100/70 border border-blue-200/80 p-2 rounded-md cursor-pointer transition-colors"
                >
                  <div className="text-[10px] text-gray-500 font-semibold flex items-center gap-1">
                    <span>🇺🇸</span>
                    <span>USD ($)</span>
                  </div>
                  <div className="font-editorial text-sm font-black text-gray-900 mt-0.5">
                    ₹{usd?.inrRate || "83.92"}
                  </div>
                  <div className="text-[10px] font-bold text-emerald-700 flex items-center mt-0.5">
                    <ArrowUpRight className="w-3 h-3" />
                    <span>+0.04</span>
                  </div>
                </div>

                <div
                  onClick={() => openModalWithTab("forex")}
                  className="bg-blue-50/30 hover:bg-blue-100/70 border border-gray-200 p-2 rounded-md cursor-pointer transition-colors"
                >
                  <div className="text-[10px] text-gray-500 font-semibold flex items-center gap-1">
                    <span>🇦🇪</span>
                    <span>AED (د.إ)</span>
                  </div>
                  <div className="font-editorial text-sm font-black text-gray-900 mt-0.5">
                    ₹{aed?.inrRate || "22.85"}
                  </div>
                  <div className="text-[10px] font-bold text-emerald-700 flex items-center mt-0.5">
                    <ArrowUpRight className="w-3 h-3" />
                    <span>+0.01</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card Footer Button */}
            <div className="pt-2">
              <button
                onClick={() => openModalWithTab("gold")}
                className="w-full py-1.5 px-3 bg-gray-900 hover:bg-black text-white rounded-md text-[11px] font-bold flex items-center justify-center gap-1 transition-colors cursor-pointer shadow-xs"
              >
                <span>{isEn ? "Full Rates & Currency Converter" : "सभी शहरों के भाव व कनवर्टर"}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Floating Trigger Button on Left Bottom */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="group relative flex items-center gap-2 px-3 py-2.5 sm:px-4 sm:py-3 bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-600 hover:from-amber-600 hover:to-amber-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer border border-amber-300/60"
          aria-label="Gold Rates and Currency Converter"
          title={isEn ? "Live Gold Rates & Currency Exchange" : "सोना-चांदी व मुद्रा विनिमय भाव"}
        >
          {/* Subtle Live Pulse Indicator */}
          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-white"></span>
          </span>

          {/* Dual Icons: Gold Coin + Currency */}
          <div className="flex items-center -space-x-1.5">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/20 flex items-center justify-center text-white shrink-0 shadow-inner">
              <Coins className="w-4 h-4 text-white" />
            </div>
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black/20 flex items-center justify-center text-white shrink-0 shadow-inner">
              <DollarSign className="w-4 h-4 text-white" />
            </div>
          </div>

          {/* Text Labels (responsive) */}
          <div className="text-left leading-tight hidden xs:block sm:block">
            <div className="text-[10px] font-bold uppercase tracking-wider text-amber-100 flex items-center gap-1">
              <span>{isEn ? "Gold • Forex" : "सोना • मुद्रा"}</span>
              <span className="w-1 h-1 rounded-full bg-white/60"></span>
              <span className="text-emerald-200">LIVE</span>
            </div>
            <div className="text-xs sm:text-sm font-black font-editorial text-white">
              {gold?.purity24k?.per10g || "₹76,450"} • ${usd?.inrRate || "83.92"}
            </div>
          </div>
        </button>
      </aside>

      {/* Full Modal Opened on Click */}
      <MarketRatesModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialTab={modalTab}
      />
    </>
  );
}
