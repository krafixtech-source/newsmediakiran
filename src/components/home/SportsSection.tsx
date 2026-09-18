"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Trophy, ArrowRight } from "lucide-react";
import { Article } from "@/lib/db/articles";
import { useLanguage } from "@/context/LanguageContext";

interface SportsSectionProps {
  articles: Article[];
}

export function SportsSection({ articles }: SportsSectionProps) {
  const { language } = useLanguage();
  const isEn = language === "en";

  const sportsList = isEn
    ? ["Cricket", "Football", "Hockey", "Tennis", "Badminton"]
    : ["क्रिकेट", "फुटबॉल", "हॉकी", "टेनिस", "बैडमिंटन"];

  const [activeSport, setActiveSport] = useState(sportsList[0]);

  if (!articles || articles.length === 0) return null;

  const lead = articles[0];
  const sideArticles = articles.slice(1, 4);

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-8 bg-white border-b border-gray-200">
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-3 mb-6 border-b border-gray-200 gap-3">
        <div className="flex items-center gap-2.5">
          <Trophy className="w-5 h-5 text-blue-900" />
          <div>
            <h2 className="font-editorial text-2xl font-black text-gray-900 uppercase tracking-tight">
              {isEn ? "Sports Arena & Cricket Desk" : "खेल जगत (Sports Arena)"}
            </h2>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 text-xs font-semibold">
          {sportsList.map((s) => (
            <button
              key={s}
              onClick={() => setActiveSport(s)}
              className={`px-3 py-1 rounded-full transition-all cursor-pointer whitespace-nowrap ${
                activeSport === s
                  ? "bg-[#111827] text-white shadow-xs"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Live Scoreboard Strip - Clean Light Theme */}
      <div className="bg-blue-50/70 border border-blue-200 text-gray-900 p-4 rounded-sm mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <span className="bg-[#b91c1c] text-white text-[9px] font-black px-1.5 py-0.5 rounded-xs uppercase tracking-wider animate-pulse">
            ● LIVE
          </span>
          <span className="text-xs text-blue-950 font-bold">
            ICC ODI Series 2026 • 2nd Match, Ahmedabad
          </span>
        </div>

        <div className="flex items-center gap-8 text-center">
          <div className="text-right">
            <span className="text-[11px] font-bold text-gray-500 block">INDIA</span>
            <span className="text-base sm:text-lg font-black text-gray-900">284/4 (45.2)</span>
          </div>
          <span className="text-[10px] font-bold text-blue-900 bg-white border border-blue-200 px-2 py-0.5 rounded-xs">
            VS
          </span>
          <div className="text-left">
            <span className="text-[11px] font-bold text-gray-500 block">AUSTRALIA</span>
            <span className="text-xs font-semibold text-gray-500">Yet to bat</span>
          </div>
        </div>

        <div className="text-right text-xs text-blue-950 font-medium">
          Shubman Gill 112* (94) • KL Rahul 48* (38)
        </div>
      </div>

      {/* Sports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Large Feature */}
        <div className="md:col-span-7 group bg-white border border-gray-200 rounded-sm overflow-hidden hover:border-[#b91c1c] transition-colors">
          <Link href={`/news/${lead.slug}`}>
            <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
              <Image
                src={lead.featured_image}
                alt={lead.headline}
                fill
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover group-hover:scale-102 transition-transform duration-500"
              />
            </div>
            <div className="p-5">
              <span className="text-[10px] font-bold text-blue-900 uppercase tracking-wider block mb-1">
                {isEn ? "Match Report" : "खेल महासंग्राम"}
              </span>
              <h3 className="font-editorial text-xl sm:text-2xl font-black text-gray-900 group-hover:text-[#b91c1c] leading-snug transition-colors">
                {lead.headline}
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-gray-600 line-clamp-3 leading-relaxed">
                {lead.excerpt}
              </p>
            </div>
          </Link>
        </div>

        {/* Side Sports Cards */}
        <div className="md:col-span-5 flex flex-col justify-between gap-4">
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
                    {isEn ? "Sports Desk" : "खेल डेस्क"}
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
            href="/category/sports"
            className="w-full text-center py-2.5 bg-gray-50 hover:bg-gray-100 text-gray-900 border border-gray-200 rounded-sm text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
          >
            <span>{isEn ? "View All Sports News" : "सभी खेल समाचार देखें"}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
