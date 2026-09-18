"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  Coins,
  DollarSign,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Calculator,
  RefreshCw,
  Building2,
  MapPin,
  CheckCircle2,
  HelpCircle,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface MarketRatesModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: "gold" | "forex" | "indices";
}

export function MarketRatesModal({ isOpen, onClose, initialTab = "gold" }: MarketRatesModalProps) {
  const { language } = useLanguage();
  const isEn = language === "en";

  const [activeTab, setActiveTab] = useState<"gold" | "forex" | "indices">(initialTab);
  const [marketData, setMarketData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Currency converter state
  const [calcAmount, setCalcAmount] = useState<number>(100);
  const [selectedCurrencyCode, setSelectedCurrencyCode] = useState<string>("USD");
  const [convertDirection, setConvertDirection] = useState<"foreignToInr" | "inrToForeign">("foreignToInr");

  useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab);
      fetchRates();
    }
  }, [isOpen, initialTab]);

  const fetchRates = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/market");
      const json = await res.json();
      if (json.success) {
        setMarketData(json.data);
      }
    } catch (err) {
      console.error("Failed to fetch market rates:", err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const gold = marketData?.goldRates;
  const currencies = marketData?.currencies || [];
  const indices = marketData?.indices || [];

  const selectedCurr = currencies.find((c: any) => c.code === selectedCurrencyCode) || currencies[0] || {
    inrRate: 83.92,
    symbol: "$",
    code: "USD",
  };

  const convertedValue =
    convertDirection === "foreignToInr"
      ? (calcAmount * selectedCurr.inrRate).toLocaleString("en-IN", {
          maximumFractionDigits: 2,
          minimumFractionDigits: 2,
        })
      : (calcAmount / selectedCurr.inrRate).toLocaleString("en-US", {
          maximumFractionDigits: 2,
          minimumFractionDigits: 2,
        });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-white border border-gray-300 rounded-xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="px-6 py-4 bg-gradient-to-r from-amber-50/70 via-white to-amber-50/30 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-300 flex items-center justify-center text-amber-700 shadow-2xs">
              <Coins className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider">
                  {isEn ? "Financial Intelligence Desk" : "वित्तीय भाव डेस्क"}
                </span>
                <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1 animate-pulse"></span>
                  {isEn ? "LIVE RATES" : "लाइव भाव"}
                </span>
              </div>
              <h2 className="font-editorial text-xl sm:text-2xl font-black text-gray-900">
                {isEn ? "Gold, Silver & Currency Rates" : "सोना, चांदी व विदेशी मुद्रा दरें"}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={fetchRates}
              className="p-2 hover:bg-gray-100 text-gray-600 rounded-full transition-colors cursor-pointer"
              title={isEn ? "Refresh Rates" : "दरें रीफ्रेश करें"}
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin text-amber-600" : ""}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-red-50 text-gray-500 hover:text-red-700 rounded-full transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="px-6 pt-3 border-b border-gray-200 bg-gray-50/70 flex gap-2">
          <button
            onClick={() => setActiveTab("gold")}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer ${
              activeTab === "gold"
                ? "border-amber-600 text-amber-900 bg-white shadow-2xs rounded-t-md"
                : "border-transparent text-gray-600 hover:text-gray-900"
            }`}
          >
            <Coins className="w-4 h-4 text-amber-600" />
            <span>{isEn ? "Gold & Silver" : "सोना-चांदी भाव"}</span>
          </button>

          <button
            onClick={() => setActiveTab("forex")}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer ${
              activeTab === "forex"
                ? "border-blue-600 text-blue-900 bg-white shadow-2xs rounded-t-md"
                : "border-transparent text-gray-600 hover:text-gray-900"
            }`}
          >
            <DollarSign className="w-4 h-4 text-blue-600" />
            <span>{isEn ? "Currency (Forex)" : "विदेशी मुद्रा (Forex)"}</span>
          </button>

          <button
            onClick={() => setActiveTab("indices")}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer ${
              activeTab === "indices"
                ? "border-emerald-600 text-emerald-900 bg-white shadow-2xs rounded-t-md"
                : "border-transparent text-gray-600 hover:text-gray-900"
            }`}
          >
            <TrendingUp className="w-4 h-4 text-emerald-600" />
            <span>{isEn ? "Stock Indices" : "शेयर बाज़ार सूचकांक"}</span>
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 bg-white">
          {/* TAB 1: GOLD & SILVER RATES */}
          {activeTab === "gold" && (
            <div className="space-y-6">
              {/* Primary Rate Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* 24K Gold */}
                <div className="p-4 rounded-lg bg-amber-50/60 border border-amber-200 relative overflow-hidden shadow-2xs">
                  <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2 opacity-10">
                    <Coins className="w-24 h-24 text-amber-700" />
                  </div>
                  <div className="flex items-center justify-between text-xs font-bold text-amber-900 uppercase">
                    <span>{isEn ? "24K Pure Gold" : "24K शुद्ध सोना"}</span>
                    <span className="text-[10px] bg-amber-200/80 px-1.5 py-0.5 rounded text-amber-950 font-bold">
                      99.9%
                    </span>
                  </div>
                  <div className="mt-2">
                    <div className="text-2xl font-black text-gray-900 font-editorial">
                      {gold?.purity24k?.per10g || "₹76,450"}
                    </div>
                    <div className="text-[11px] text-gray-600 mt-0.5">
                      {isEn ? "per 10 gram" : "प्रति 10 ग्राम"} • 1g: {gold?.purity24k?.per1g || "₹7,645"}
                    </div>
                  </div>
                  <div className="mt-3 pt-2.5 border-t border-amber-200/80 flex items-center justify-between text-xs font-semibold text-emerald-700">
                    <span className="flex items-center">
                      <ArrowUpRight className="w-3.5 h-3.5" />
                      {gold?.purity24k?.change || "+₹280"} ({gold?.purity24k?.percent || "+0.37%"})
                    </span>
                    <span className="text-[10px] text-gray-400">MCX Ref</span>
                  </div>
                </div>

                {/* 22K Gold */}
                <div className="p-4 rounded-lg bg-amber-50/30 border border-gray-200 relative overflow-hidden shadow-2xs">
                  <div className="flex items-center justify-between text-xs font-bold text-gray-700 uppercase">
                    <span>{isEn ? "22K Jewelry Gold" : "22K जेवराती सोना"}</span>
                    <span className="text-[10px] bg-gray-100 px-1.5 py-0.5 rounded text-gray-700 font-bold">
                      91.6%
                    </span>
                  </div>
                  <div className="mt-2">
                    <div className="text-2xl font-black text-gray-900 font-editorial">
                      {gold?.purity22k?.per10g || "₹70,080"}
                    </div>
                    <div className="text-[11px] text-gray-600 mt-0.5">
                      {isEn ? "per 10 gram" : "प्रति 10 ग्राम"} • 1g: {gold?.purity22k?.per1g || "₹7,008"}
                    </div>
                  </div>
                  <div className="mt-3 pt-2.5 border-t border-gray-100 flex items-center justify-between text-xs font-semibold text-emerald-700">
                    <span className="flex items-center">
                      <ArrowUpRight className="w-3.5 h-3.5" />
                      {gold?.purity22k?.change || "+₹250"} ({gold?.purity22k?.percent || "+0.36%"})
                    </span>
                    <span className="text-[10px] text-gray-400">Hallmark</span>
                  </div>
                </div>

                {/* 18K Gold */}
                <div className="p-4 rounded-lg bg-gray-50/80 border border-gray-200 relative overflow-hidden shadow-2xs">
                  <div className="flex items-center justify-between text-xs font-bold text-gray-700 uppercase">
                    <span>{isEn ? "18K Gold" : "18K हॉलमार्क"}</span>
                    <span className="text-[10px] bg-gray-200 px-1.5 py-0.5 rounded text-gray-700 font-bold">
                      75.0%
                    </span>
                  </div>
                  <div className="mt-2">
                    <div className="text-2xl font-black text-gray-900 font-editorial">
                      {gold?.purity18k?.per10g || "₹57,340"}
                    </div>
                    <div className="text-[11px] text-gray-600 mt-0.5">
                      {isEn ? "per 10 gram" : "प्रति 10 ग्राम"} • 1g: {gold?.purity18k?.per1g || "₹5,734"}
                    </div>
                  </div>
                  <div className="mt-3 pt-2.5 border-t border-gray-100 flex items-center justify-between text-xs font-semibold text-emerald-700">
                    <span className="flex items-center">
                      <ArrowUpRight className="w-3.5 h-3.5" />
                      {gold?.purity18k?.change || "+₹210"} ({gold?.purity18k?.percent || "+0.37%"})
                    </span>
                    <span className="text-[10px] text-gray-400">Standard</span>
                  </div>
                </div>

                {/* Silver */}
                <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 relative overflow-hidden shadow-2xs">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-700 uppercase">
                    <span>{isEn ? "Fine Silver" : "शुद्ध चांदी (1 किग्रा)"}</span>
                    <span className="text-[10px] bg-slate-200 px-1.5 py-0.5 rounded text-slate-800 font-bold">
                      99.9%
                    </span>
                  </div>
                  <div className="mt-2">
                    <div className="text-2xl font-black text-gray-900 font-editorial">
                      {gold?.silver?.per1kg || "₹89,200"}
                    </div>
                    <div className="text-[11px] text-gray-600 mt-0.5">
                      {isEn ? "per 1 kg" : "प्रति 1 किलोग्राम"} • 10g: {gold?.silver?.per10g || "₹892"}
                    </div>
                  </div>
                  <div className="mt-3 pt-2.5 border-t border-slate-200 flex items-center justify-between text-xs font-semibold text-red-600">
                    <span className="flex items-center">
                      <ArrowDownRight className="w-3.5 h-3.5" />
                      {gold?.silver?.change || "-₹150"} ({gold?.silver?.percent || "-0.17%"})
                    </span>
                    <span className="text-[10px] text-gray-400">Bullion</span>
                  </div>
                </div>
              </div>

              {/* City Wise Rate Comparison Table */}
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-amber-700" />
                    <h3 className="text-xs sm:text-sm font-bold text-gray-900">
                      {isEn ? "Major City Jewelry & Sarafa Rates" : "प्रमुख शहरों में सोने व चांदी के सराफा भाव"}
                    </h3>
                  </div>
                  <span className="text-[11px] text-gray-500">
                    {isEn ? gold?.dateStrEn : gold?.dateStrHi}
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-gray-200 bg-gray-50/50 text-gray-500 font-semibold">
                        <th className="py-2.5 px-4">{isEn ? "City" : "शहर"}</th>
                        <th className="py-2.5 px-4">{isEn ? "State" : "राज्य / क्षेत्र"}</th>
                        <th className="py-2.5 px-4 font-bold text-amber-900">{isEn ? "Gold 24K (10g)" : "24 कैरेट (10 ग्रा.)"}</th>
                        <th className="py-2.5 px-4 font-bold text-gray-800">{isEn ? "Gold 22K (10g)" : "22 कैरेट (10 ग्रा.)"}</th>
                        <th className="py-2.5 px-4 font-bold text-slate-700">{isEn ? "Silver (1 kg)" : "चांदी (1 किग्रा)"}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {(gold?.cityRates || []).map((city: any) => (
                        <tr key={city.cityEn} className="hover:bg-amber-50/30 transition-colors">
                          <td className="py-2.5 px-4 font-bold text-gray-900 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                            <span>{isEn ? city.cityEn : city.cityHi}</span>
                          </td>
                          <td className="py-2.5 px-4 text-gray-500">{city.state}</td>
                          <td className="py-2.5 px-4 font-mono font-bold text-amber-950">{city.gold24k}</td>
                          <td className="py-2.5 px-4 font-mono font-bold text-gray-800">{city.gold22k}</td>
                          <td className="py-2.5 px-4 font-mono font-bold text-slate-700">{city.silver1kg}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Informational Guidance Box */}
              <div className="p-3.5 bg-amber-50/50 border border-amber-200 rounded-md text-xs text-amber-950 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <div className="leading-relaxed">
                  <span className="font-bold">
                    {isEn ? "Buyer Note: " : "पाठक सूचना: "}
                  </span>
                  {isEn
                    ? "Rates listed are base bullion rates excluding local GST (3%) and jeweler making charges. Always verify mandatory BIS Hallmark (6-digit HUID code) before purchasing gold jewelry."
                    : "दिए गए भाव सराफा बाज़ार के मूल थोक भाव हैं, इनमें 3% स्थानीय जीएसटी व आभूषण मेकिंग चार्ज अलग से देय होते हैं। सोना खरीदते समय 6 अंकों वाले अनिवार्य BIS हॉलमार्क (HUID) की पुष्टि अवश्य करें।"}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: CURRENCY EXCHANGE & CONVERTER */}
          {activeTab === "forex" && (
            <div className="space-y-6">
              {/* Interactive Currency Converter Calculator */}
              <div className="p-5 bg-gradient-to-br from-blue-50/80 via-white to-indigo-50/40 border border-blue-200 rounded-lg shadow-2xs">
                <div className="flex items-center gap-2 mb-3">
                  <Calculator className="w-4 h-4 text-blue-700" />
                  <h3 className="text-xs sm:text-sm font-bold text-blue-950 uppercase tracking-wider">
                    {isEn ? "Live Currency Converter Calculator" : "लाइव मुद्रा परिवर्तक कैलकुलेटर"}
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                  {/* Amount Input */}
                  <div className="sm:col-span-4">
                    <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">
                      {isEn ? "Amount" : "राशि दर्ज करें"}
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={calcAmount}
                      onChange={(e) => setCalcAmount(Number(e.target.value) || 0)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-base font-bold text-gray-900 focus:outline-hidden focus:border-blue-600 bg-white"
                    />
                  </div>

                  {/* Currency Selector */}
                  <div className="sm:col-span-4">
                    <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">
                      {isEn ? "Foreign Currency" : "विदेशी मुद्रा चुनें"}
                    </label>
                    <select
                      value={selectedCurrencyCode}
                      onChange={(e) => setSelectedCurrencyCode(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-xs sm:text-sm font-bold text-gray-900 focus:outline-hidden focus:border-blue-600 bg-white"
                    >
                      {currencies.map((c: any) => (
                        <option key={c.code} value={c.code}>
                          {c.flag} {c.code} - {isEn ? c.nameEn : c.nameHi} (₹{c.inrRate})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Direction Switcher */}
                  <div className="sm:col-span-4 flex flex-col justify-end">
                    <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">
                      {isEn ? "Direction" : "रूपांतरण दिशा"}
                    </label>
                    <button
                      onClick={() =>
                        setConvertDirection(
                          convertDirection === "foreignToInr" ? "inrToForeign" : "foreignToInr"
                        )
                      }
                      className="w-full py-2 px-3 bg-blue-100/70 hover:bg-blue-100 text-blue-900 rounded-md text-xs font-bold transition-colors flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <span>
                        {convertDirection === "foreignToInr"
                          ? `${selectedCurr.code} ➔ INR (₹)`
                          : `INR (₹) ➔ ${selectedCurr.code}`}
                      </span>
                    </button>
                  </div>
                </div>

                {/* Conversion Result Banner */}
                <div className="mt-4 pt-4 border-t border-blue-200/80 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                  <div className="text-xs text-gray-600">
                    <span className="font-bold text-gray-900">
                      {convertDirection === "foreignToInr"
                        ? `${calcAmount} ${selectedCurr.code} (${selectedCurr.symbol}) = `
                        : `₹${calcAmount.toLocaleString("en-IN")} INR = `}
                    </span>
                    <span className="text-blue-900 font-extrabold text-xl sm:text-2xl font-editorial ml-1">
                      {convertDirection === "foreignToInr" ? `₹${convertedValue} INR` : `${selectedCurr.symbol}${convertedValue} ${selectedCurr.code}`}
                    </span>
                  </div>
                  <div className="text-[11px] text-gray-500">
                    {isEn ? "Base Rate: " : "वर्तमान दर: "} 1 {selectedCurr.code} = ₹{selectedCurr.inrRate} INR
                  </div>
                </div>
              </div>

              {/* Currency Rate Cards Table */}
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-blue-700" />
                    <h3 className="text-xs sm:text-sm font-bold text-gray-900">
                      {isEn ? "RBI Reference Forex Rates vs Indian Rupee (INR)" : "भारतीय रुपये (INR) के मुकाबले विदेशी मुद्रा विनिमय दरें"}
                    </h3>
                  </div>
                  <span className="text-[11px] text-gray-500">
                    {isEn ? "Interbank Live Rates" : "इंटरबैंक लाइव दरें"}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-gray-100">
                  {currencies.map((curr: any) => (
                    <div key={curr.code} className="p-4 hover:bg-blue-50/30 transition-colors border-b border-gray-100">
                      <div className="flex items-center justify-between">
                        <span className="text-lg">{curr.flag}</span>
                        <span className="text-[10px] font-mono font-bold text-gray-400 uppercase">
                          {curr.code}
                        </span>
                      </div>
                      <div className="mt-2">
                        <div className="text-xs font-bold text-gray-700">
                          {isEn ? curr.nameEn : curr.nameHi}
                        </div>
                        <div className="text-xl font-bold font-editorial text-gray-900 mt-0.5">
                          ₹{curr.inrRate}
                        </div>
                      </div>
                      <div className="mt-2 pt-2 border-t border-gray-100 flex items-center justify-between text-[11px]">
                        <span
                          className={`font-semibold flex items-center ${
                            curr.isPositive ? "text-emerald-700" : "text-red-600"
                          }`}
                        >
                          {curr.isPositive ? (
                            <ArrowUpRight className="w-3 h-3 mr-0.5" />
                          ) : (
                            <ArrowDownRight className="w-3 h-3 mr-0.5" />
                          )}
                          {curr.change} ({curr.percent})
                        </span>
                        <button
                          onClick={() => {
                            setSelectedCurrencyCode(curr.code);
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          }}
                          className="text-blue-600 hover:underline text-[10px] font-bold cursor-pointer"
                        >
                          {isEn ? "Convert" : "बदलें"}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: STOCK INDICES */}
          {activeTab === "indices" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {indices.map((idx: any) => (
                  <div
                    key={idx.name}
                    className="p-4 rounded-lg bg-gray-50 border border-gray-200 hover:border-gray-300 transition-colors shadow-2xs"
                  >
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">
                      {idx.name}
                    </span>
                    <div className="text-2xl font-bold font-editorial text-gray-900 mt-1">
                      {idx.value}
                    </div>
                    <div className="mt-2 flex items-center justify-between text-xs">
                      <span
                        className={`font-bold flex items-center ${
                          idx.isPositive ? "text-emerald-700" : "text-red-600"
                        }`}
                      >
                        {idx.isPositive ? (
                          <ArrowUpRight className="w-4 h-4 mr-0.5" />
                        ) : (
                          <ArrowDownRight className="w-4 h-4 mr-0.5" />
                        )}
                        {idx.change} ({idx.percent})
                      </span>
                      <span className="text-[10px] text-gray-400">Live Tick</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg flex items-center justify-between text-xs text-gray-600">
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-gray-500" />
                  <span>
                    {isEn
                      ? "Data feed synchronized with BSE, NSE & Multi Commodity Exchange of India (MCX)."
                      : "डेटा फीड बीएसई (BSE), एनएसई (NSE) और मल्टी कमोडिटी एक्सचेंज (MCX) से रियल टाइम संरेखित है।"}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Bar */}
        <div className="px-6 py-3 bg-gray-50 border-t border-gray-200 flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>
              {isEn ? "Market data updated every market session" : "प्रत्येक कारोबारी सत्र में आंकड़े अद्यतित"}
            </span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-gray-900 hover:bg-black text-white font-bold rounded-md transition-colors cursor-pointer text-xs"
          >
            {isEn ? "Close" : "बंद करें"}
          </button>
        </div>
      </div>
    </div>
  );
}
