"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { TrendingUp, ArrowUpRight, Coins, DollarSign, ArrowRight } from "lucide-react";
import { Article } from "@/lib/db/articles";
import { useLanguage } from "@/context/LanguageContext";
import { MarketRatesModal } from "@/components/market/MarketRatesModal";

interface BusinessSectionProps {
  articles: Article[];
}

export function BusinessSection({ articles }: BusinessSectionProps) {
  const { language } = useLanguage();
  const isEn = language === "en";

  const tabs = isEn
    ? ["Markets", "Economy", "Banking", "Startups", "Gold & Silver", "Jobs"]
    : ["मार्केट्स", "अर्थव्यवस्था", "बैंकिंग", "स्टार्टअप", "सोना-चांदी", "नौकरी"];

  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [marketData, setMarketData] = useState<any>(null);
  const [isRatesModalOpen, setIsRatesModalOpen] = useState(false);
  const [modalTab, setModalTab] = useState<"gold" | "forex" | "indices">("gold");

  const openRates = (tab: "gold" | "forex" | "indices") => {
    setModalTab(tab);
    setIsRatesModalOpen(true);
  };

  useEffect(() => {
    fetch("/api/market")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setMarketData(data.data);
      })
      .catch((err) => console.error(err));
  }, []);

  if (!articles || articles.length === 0) return null;

  const lead = articles[0];
  const sideArticles = articles.slice(1, 4);

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-8 bg-white border-b border-gray-200">
      {/* Header with Tabs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-3 mb-6 border-b border-gray-200 gap-3">
        <div className="flex items-center gap-2.5">
          <TrendingUp className="w-5 h-5 text-emerald-700" />
          <div>
            <h2 className="font-editorial text-2xl font-black text-gray-900 uppercase tracking-tight">
              {isEn ? "Business & Financial Markets" : "व्यापार व वित्तीय बाज़ार"}
            </h2>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar pb-1">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                if (tab === "Gold & Silver" || tab === "सोना-चांदी") {
                  openRates("gold");
                }
              }}
              className={`px-3 py-1 text-xs font-semibold rounded-full transition-all cursor-pointer whitespace-nowrap ${
                activeTab === tab
                  ? "bg-[#111827] text-white shadow-xs"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Financial Market Strip Widget */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-6">
        <div className="bg-gray-50 border border-gray-200 p-3 rounded-sm">
          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">BSE SENSEX</span>
          <div className="flex items-baseline justify-between mt-1">
            <span className="font-bold text-base text-gray-900">
              {marketData?.indices?.[0]?.value || "82,450.25"}
            </span>
            <span className="text-xs font-bold text-emerald-700 flex items-center">
              <ArrowUpRight className="w-3.5 h-3.5" /> +0.42%
            </span>
          </div>
        </div>

        <div className="bg-gray-50 border border-gray-200 p-3 rounded-sm">
          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">NSE NIFTY 50</span>
          <div className="flex items-baseline justify-between mt-1">
            <span className="font-bold text-base text-gray-900">
              {marketData?.indices?.[1]?.value || "25,210.80"}
            </span>
            <span className="text-xs font-bold text-emerald-700 flex items-center">
              <ArrowUpRight className="w-3.5 h-3.5" /> +0.38%
            </span>
          </div>
        </div>

        <div
          onClick={() => openRates("gold")}
          className="bg-gray-50 hover:bg-amber-50/50 border border-gray-200 hover:border-amber-300 p-3 rounded-sm cursor-pointer transition-all shadow-2xs group"
          title="Click to view full Gold rates & city table"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-gray-500 group-hover:text-amber-900 uppercase tracking-wider">GOLD (24K/10g)</span>
            <Coins className="w-3.5 h-3.5 text-amber-600" />
          </div>
          <div className="flex items-baseline justify-between mt-1">
            <span className="font-bold text-base text-gray-900">
              {marketData?.commodities?.[0]?.value || "₹76,450"}
            </span>
            <span className="text-xs font-bold text-emerald-700">+₹280</span>
          </div>
        </div>

        <div
          onClick={() => openRates("gold")}
          className="bg-gray-50 hover:bg-slate-100/70 border border-gray-200 hover:border-slate-400 p-3 rounded-sm cursor-pointer transition-all shadow-2xs group"
          title="Click to view full Silver rates"
        >
          <span className="text-[10px] font-bold text-gray-500 group-hover:text-slate-900 uppercase tracking-wider block">SILVER (1kg)</span>
          <div className="flex items-baseline justify-between mt-1">
            <span className="font-bold text-base text-gray-900">
              {marketData?.commodities?.[2]?.value || "₹89,200"}
            </span>
            <span className="text-xs font-bold text-red-600">-₹150</span>
          </div>
        </div>

        <div
          onClick={() => openRates("forex")}
          className="bg-gray-50 hover:bg-blue-50/50 border border-gray-200 hover:border-blue-300 p-3 rounded-sm col-span-2 sm:col-span-1 cursor-pointer transition-all shadow-2xs group"
          title="Click to view Live Currency Exchange & Converter"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-gray-500 group-hover:text-blue-900 uppercase tracking-wider">USD / INR</span>
            <DollarSign className="w-3.5 h-3.5 text-blue-600" />
          </div>
          <div className="flex items-baseline justify-between mt-1">
            <span className="font-bold text-base text-gray-900">
              {marketData?.forex?.[0]?.rate || "₹83.92"}
            </span>
            <span className="text-xs font-bold text-emerald-700">+0.04</span>
          </div>
        </div>
      </div>

      {/* Business Stories Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Business Story (Col 7) */}
        <div className="lg:col-span-7 group bg-white border border-gray-200 rounded-sm overflow-hidden hover:border-[#b91c1c] transition-colors">
          <Link href={`/news/${lead.slug}`}>
            <div className="relative aspect-[16/9] overflow-hidden bg-gray-100">
              <Image
                src={lead.featured_image}
                alt={lead.headline}
                fill
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover group-hover:scale-102 transition-transform duration-500"
              />
            </div>
            <div className="p-5">
              <span className="text-[10px] font-bold text-[#b91c1c] uppercase tracking-wider block mb-1">
                {isEn ? "Corporate & Economy" : "व्यापार जगत • कॉर्पोरेट"}
              </span>
              <h3 className="font-editorial text-xl sm:text-2xl font-black text-gray-900 group-hover:text-[#b91c1c] leading-snug transition-colors">
                {lead.headline}
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-gray-600 line-clamp-3 leading-relaxed">
                {lead.excerpt}
              </p>
              <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                <span className="font-semibold text-gray-700">{lead.author_name || "Financial Desk"}</span>
                <span>{lead.reading_time || "4 min read"}</span>
              </div>
            </div>
          </Link>
        </div>

        {/* 3 Secondary Business Stories (Col 5) */}
        <div className="lg:col-span-5 flex flex-col justify-between gap-4">
          {sideArticles.map((story) => (
            <article
              key={story.id}
              className="bg-white border border-gray-200 rounded-sm p-3.5 group hover:border-gray-400 transition-all"
            >
              <Link href={`/news/${story.slug}`} className="flex gap-3.5 items-start">
                <div className="relative w-24 h-20 shrink-0 rounded-xs overflow-hidden bg-gray-100">
                  <Image
                    src={story.featured_image}
                    alt={story.headline}
                    fill
                    sizes="96px"
                    className="object-cover group-hover:scale-103 transition-transform duration-300"
                  />
                </div>
                <div className="flex-1">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-0.5">
                    {isEn ? "Market Analysis" : "बाज़ार विश्लेषण"}
                  </span>
                  <h4 className="font-editorial text-xs sm:text-sm font-bold text-gray-900 group-hover:text-[#b91c1c] leading-snug line-clamp-2 transition-colors">
                    {story.headline}
                  </h4>
                  <span className="text-[10px] text-gray-400 mt-1 block">
                    {story.reading_time || "3 min read"}
                  </span>
                </div>
              </Link>
            </article>
          ))}

          <Link
            href="/category/business"
            className="w-full text-center py-2.5 bg-gray-50 hover:bg-gray-100 text-gray-900 border border-gray-200 rounded-sm text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
          >
            <span>{isEn ? "View All Business & Market News" : "सभी व्यापार समाचार देखें"}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      <MarketRatesModal
        isOpen={isRatesModalOpen}
        onClose={() => setIsRatesModalOpen(false)}
        initialTab={modalTab}
      />
    </section>
  );
}
