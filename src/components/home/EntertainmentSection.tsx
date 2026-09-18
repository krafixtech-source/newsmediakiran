"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Film, Star, ArrowRight } from "lucide-react";
import { Article } from "@/lib/db/articles";
import { useLanguage } from "@/context/LanguageContext";

interface EntertainmentSectionProps {
  articles: Article[];
}

export function EntertainmentSection({ articles }: EntertainmentSectionProps) {
  const { language } = useLanguage();
  if (!articles || articles.length === 0) return null;

  const isEn = language === "en";
  const lead = articles[0];
  const cinemaCards = articles.slice(1, 5);

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-8 bg-white border-b border-gray-200">
      <div className="flex items-center justify-between pb-3 mb-6 border-b border-gray-200">
        <div className="flex items-center gap-2.5">
          <Film className="w-5 h-5 text-purple-900" />
          <div>
            <h2 className="font-editorial text-2xl font-black text-gray-900 uppercase tracking-tight">
              {isEn ? "Cinema & Entertainment" : "मनोरंजन व सिनेमा (Cinema & Entertainment)"}
            </h2>
          </div>
        </div>
        <Link
          href="/category/entertainment"
          className="text-xs font-bold text-[#b91c1c] hover:text-black flex items-center gap-1 transition-colors"
        >
          <span>{isEn ? "View All Entertainment" : "सभी मनोरंजन समाचार देखें"}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Large Cinematic Lead (Col 6) */}
        <div className="md:col-span-6 group bg-white border border-gray-200 rounded-sm overflow-hidden hover:border-[#b91c1c] transition-colors">
          <Link href={`/news/${lead.slug}`}>
            <div className="relative aspect-[16/10] overflow-hidden bg-gray-900">
              <Image
                src={lead.featured_image}
                alt={lead.headline}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover group-hover:scale-102 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3 bg-purple-900 text-white text-[10px] font-bold px-2 py-0.5 rounded-xs shadow-xs flex items-center gap-1">
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                <span>{isEn ? "Spotlight Feature" : "सिनेमा विशेष"}</span>
              </div>
            </div>
            <div className="p-5">
              <span className="text-[10px] font-bold text-purple-900 uppercase tracking-wider block mb-1">
                Bollywood / OTT
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

        {/* 4 Square Grid Cards (Col 6) */}
        <div className="md:col-span-6 grid grid-cols-2 gap-4">
          {cinemaCards.map((story) => (
            <article
              key={story.id}
              className="bg-white border border-gray-200 rounded-sm overflow-hidden group hover:border-gray-400 transition-all flex flex-col"
            >
              <Link href={`/news/${story.slug}`} className="flex flex-col h-full">
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-gray-100">
                  <Image
                    src={story.featured_image}
                    alt={story.headline}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover group-hover:scale-103 transition-transform duration-300"
                  />
                </div>
                <div className="p-3 flex-1 flex flex-col justify-between">
                  <h4 className="font-editorial text-xs sm:text-sm font-bold text-gray-900 group-hover:text-[#b91c1c] leading-snug line-clamp-2 transition-colors">
                    {story.headline}
                  </h4>
                  <span className="text-[10px] text-gray-400 mt-2 block">
                    {story.reading_time || "2 min read"}
                  </span>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
