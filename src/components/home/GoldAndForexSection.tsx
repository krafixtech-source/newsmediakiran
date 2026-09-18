"use client";

import React, { useState, useEffect } from "react";
import {
  Coins,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  ArrowRight,
  Calculator,
  RefreshCw,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { MarketRatesModal } from "@/components/market/MarketRatesModal";

export function GoldAndForexSection() {
  const { language } = useLanguage();
  const isEn = language === "en";

  const [marketData, setMarketData] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTab, setModalTab] = useState<"gold" | "forex" | "indices">("gold");

  useEffect(() => {
    fetch("/api/market")
      .then((res) => res.json())
      .then((json) => {
        if (json.success) setMarketData(json.data);
      })
      .catch((err) => console.error("Market rates error:", err));
  }, []);

  const gold = marketData?.goldRates;
  const currencies = marketData?.currencies || [];

  const handleOpenModal = (tab: "gold" | "forex") => {
    setModalTab(tab);
    setIsModalOpen(true);
  };

  return (
    <>
      <section className="w-full max-w-7xl mx-auto px-4 py-6">
        <div className="bg-gradient-to-r from-amber-50/50 via-white to-blue-50/40 border border-gray-200 rounded-xl p-4 sm:p-6 shadow-2xs">
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="flex items-center -space-x-2">
                <div className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-400 flex items-center justify-center text-amber-700 shadow-2xs z-10">
                  <Coins className="w-4 h-4" />
                </div>
                <div className="w-8 h-8 rounded-full bg-blue-500/20 border border-blue-400 flex items-center justify-center text-blue-700 shadow-2xs">
                  <DollarSign className="w-4 h-4" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider">
                    {isEn ? "Live Financial Markets" : "दैनिक वित्तीय बाज़ार"}
                  </span>
                  <span className="inline-flex items-center px-1.5 py-0.2 rounded-full text-[9px] font-bold bg-emerald-100 text-emerald-800">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1 animate-pulse"></span>
                    {isEn ? "UPDATED" : "लाइव"}
                  </span>
                </div>
                <h2 className="font-editorial text-xl sm:text-2xl font-black text-gray-900 leading-tight">
                  {isEn ? "Today's Gold, Silver & Currency Rates" : "आज के सोने, चांदी व विदेशी मुद्रा भाव"}
                </h2>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => handleOpenModal("gold")}
                className="px-3 py-1.5 bg-white hover:bg-amber-50 text-amber-900 border border-amber-300 rounded-md text-xs font-bold transition-all shadow-2xs flex items-center gap-1.5 cursor-pointer"
              >
                <Coins className="w-3.5 h-3.5 text-amber-600" />
                <span>{isEn ? "City Gold Rates" : "शहरवार सोने के भाव"}</span>
              </button>
              <button
                onClick={() => handleOpenModal("forex")}
                className="px-3 py-1.5 bg-white hover:bg-blue-50 text-blue-900 border border-blue-300 rounded-md text-xs font-bold transition-all shadow-2xs flex items-center gap-1.5 cursor-pointer"
              >
                <Calculator className="w-3.5 h-3.5 text-blue-600" />
                <span>{isEn ? "Currency Converter" : "मुद्रा कनवर्टर"}</span>
              </button>
            </div>
          </div>

          {/* Commodity & Currency Ticker Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {/* 1. 24K Gold */}
            <div
              onClick={() => handleOpenModal("gold")}
              className="bg-white border border-amber-200/80 hover:border-amber-400 p-3 rounded-lg shadow-2xs cursor-pointer transition-all hover:-translate-y-0.5"
            >
              <div className="flex items-center justify-between text-[10px] font-bold text-amber-900 uppercase">
                <span>{isEn ? "Gold (24K/10g)" : "24K सोना (10g)"}</span>
                <span className="text-[9px] bg-amber-100 text-amber-800 px-1 rounded font-bold">99.9%</span>
              </div>
              <div className="text-lg font-black font-editorial text-gray-900 mt-1">
                {gold?.purity24k?.per10g || "₹76,450"}
              </div>
              <div className="mt-1 flex items-center text-[10px] font-bold text-emerald-700">
                <ArrowUpRight className="w-3 h-3 mr-0.5" />
                <span>{gold?.purity24k?.change || "+₹280"}</span>
              </div>
            </div>

            {/* 2. 22K Gold */}
            <div
              onClick={() => handleOpenModal("gold")}
              className="bg-white border border-gray-200 hover:border-amber-300 p-3 rounded-lg shadow-2xs cursor-pointer transition-all hover:-translate-y-0.5"
            >
              <div className="flex items-center justify-between text-[10px] font-bold text-gray-700 uppercase">
                <span>{isEn ? "Gold (22K/10g)" : "22K जेवराती (10g)"}</span>
                <span className="text-[9px] bg-gray-100 text-gray-700 px-1 rounded font-bold">91.6%</span>
              </div>
              <div className="text-lg font-black font-editorial text-gray-900 mt-1">
                {gold?.purity22k?.per10g || "₹70,080"}
              </div>
              <div className="mt-1 flex items-center text-[10px] font-bold text-emerald-700">
                <ArrowUpRight className="w-3 h-3 mr-0.5" />
                <span>{gold?.purity22k?.change || "+₹250"}</span>
              </div>
            </div>

            {/* 3. Silver 1kg */}
            <div
              onClick={() => handleOpenModal("gold")}
              className="bg-white border border-gray-200 hover:border-slate-400 p-3 rounded-lg shadow-2xs cursor-pointer transition-all hover:-translate-y-0.5"
            >
              <div className="flex items-center justify-between text-[10px] font-bold text-slate-700 uppercase">
                <span>{isEn ? "Silver (1kg)" : "चांदी (1 किग्रा)"}</span>
                <span className="text-[9px] bg-slate-100 text-slate-700 px-1 rounded font-bold">Fine</span>
              </div>
              <div className="text-lg font-black font-editorial text-gray-900 mt-1">
                {gold?.silver?.per1kg || "₹89,200"}
              </div>
              <div className="mt-1 flex items-center text-[10px] font-bold text-red-600">
                <ArrowDownRight className="w-3 h-3 mr-0.5" />
                <span>{gold?.silver?.change || "-₹150"}</span>
              </div>
            </div>

            {/* 4. USD/INR */}
            <div
              onClick={() => handleOpenModal("forex")}
              className="bg-white border border-blue-200/80 hover:border-blue-400 p-3 rounded-lg shadow-2xs cursor-pointer transition-all hover:-translate-y-0.5"
            >
              <div className="flex items-center justify-between text-[10px] font-bold text-blue-900 uppercase">
                <span>USD / INR (🇺🇸)</span>
                <span className="text-[9px] bg-blue-100 text-blue-800 px-1 rounded font-bold">$1</span>
              </div>
              <div className="text-lg font-black font-editorial text-gray-900 mt-1">
                ₹{currencies.find((c: any) => c.code === "USD")?.inrRate || "83.92"}
              </div>
              <div className="mt-1 flex items-center text-[10px] font-bold text-emerald-700">
                <ArrowUpRight className="w-3 h-3 mr-0.5" />
                <span>+0.04</span>
              </div>
            </div>

            {/* 5. EUR/INR */}
            <div
              onClick={() => handleOpenModal("forex")}
              className="bg-white border border-gray-200 hover:border-blue-300 p-3 rounded-lg shadow-2xs cursor-pointer transition-all hover:-translate-y-0.5"
            >
              <div className="flex items-center justify-between text-[10px] font-bold text-gray-700 uppercase">
                <span>EUR / INR (🇪🇺)</span>
                <span className="text-[9px] bg-gray-100 text-gray-700 px-1 rounded font-bold">€1</span>
              </div>
              <div className="text-lg font-black font-editorial text-gray-900 mt-1">
                ₹{currencies.find((c: any) => c.code === "EUR")?.inrRate || "92.45"}
              </div>
              <div className="mt-1 flex items-center text-[10px] font-bold text-red-600">
                <ArrowDownRight className="w-3 h-3 mr-0.5" />
                <span>-0.08</span>
              </div>
            </div>

            {/* 6. AED/INR (Gulf Dirham) */}
            <div
              onClick={() => handleOpenModal("forex")}
              className="bg-white border border-gray-200 hover:border-blue-300 p-3 rounded-lg shadow-2xs cursor-pointer transition-all hover:-translate-y-0.5"
            >
              <div className="flex items-center justify-between text-[10px] font-bold text-gray-700 uppercase">
                <span>AED / INR (🇦🇪)</span>
                <span className="text-[9px] bg-gray-100 text-gray-700 px-1 rounded font-bold">1 د.إ</span>
              </div>
              <div className="text-lg font-black font-editorial text-gray-900 mt-1">
                ₹{currencies.find((c: any) => c.code === "AED")?.inrRate || "22.85"}
              </div>
              <div className="mt-1 flex items-center text-[10px] font-bold text-emerald-700">
                <ArrowUpRight className="w-3 h-3 mr-0.5" />
                <span>+0.01</span>
              </div>
            </div>
          </div>

          {/* Quick Footer Ticker / Trigger */}
          <div className="mt-3 pt-2.5 border-t border-gray-200/80 flex flex-wrap items-center justify-between text-xs text-gray-500 gap-2">
            <div className="flex items-center gap-2">
              <span className="text-amber-800 font-bold">
                {isEn ? "Jaipur Sarafa Rate:" : "जयपुर सराफा भाव:"}
              </span>
              <span className="font-semibold text-gray-800">
                24K: {gold?.cityRates?.[0]?.gold24k || "₹76,450"} • 22K: {gold?.cityRates?.[0]?.gold22k || "₹70,080"}
              </span>
            </div>
            <button
              onClick={() => handleOpenModal("gold")}
              className="text-[#b91c1c] hover:underline font-bold flex items-center gap-1 cursor-pointer"
            >
              <span>{isEn ? "View All City Rates & Currency Calculator" : "सभी शहरों के भाव व कनवर्टर देखें"}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      <MarketRatesModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialTab={modalTab}
      />
    </>
  );
}
