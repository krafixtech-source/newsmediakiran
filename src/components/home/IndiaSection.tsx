"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Flag } from "lucide-react";
import { Article } from "@/lib/db/articles";
import { useLanguage } from "@/context/LanguageContext";

interface IndiaSectionProps {
  articles: Article[];
}

export function IndiaSection({ articles }: IndiaSectionProps) {
  const { language } = useLanguage();
  if (!articles || articles.length === 0) return null;

  const isEn = language === "en";
  const lead = articles[0];
  const sideList = articles.slice(1, 5);

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-8 bg-white border-b border-gray-200">
      <div className="flex items-center justify-between pb-3 mb-6 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <Flag className="w-5 h-5 text-[#b91c1c]" />
          <h2 className="font-editorial text-2xl font-black text-gray-900 uppercase tracking-tight">
            {isEn ? "India & National Affairs" : "देश (National Affairs)"}
          </h2>
        </div>
        <Link
          href="/category/national"
          className="text-xs font-bold text-[#b91c1c] hover:text-black flex items-center gap-1 transition-colors"
        >
          <span>{isEn ? "View All India News" : "सभी देश समाचार देखें"}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Large Feature (Col 7) */}
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
                {isEn ? "National Focus" : "राष्ट्रीय महाकवरेज"}
              </span>
              <h3 className="font-editorial text-xl sm:text-2xl font-extrabold text-gray-900 group-hover:text-[#b91c1c] leading-snug transition-colors">
                {lead.headline}
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-gray-600 line-clamp-2 leading-relaxed">
                {lead.excerpt}
              </p>
              <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                <span className="font-semibold text-gray-700">{lead.author_name || "Bureau"}</span>
                <span>{lead.reading_time || "3 min read"}</span>
              </div>
            </div>
          </Link>
        </div>

        {/* 4 Side Headline Cards (Col 5) */}
        <div className="lg:col-span-5 flex flex-col justify-between gap-3">
          {sideList.map((story) => (
            <article
              key={story.id}
              className="bg-white border border-gray-200 rounded-sm p-3 group hover:border-gray-400 transition-colors"
            >
              <Link href={`/news/${story.slug}`} className="flex gap-3.5 items-center">
                <div className="relative w-20 h-16 shrink-0 rounded-xs overflow-hidden bg-gray-100">
                  <Image
                    src={story.featured_image}
                    alt={story.headline}
                    fill
                    sizes="80px"
                    className="object-cover group-hover:scale-103 transition-transform duration-300"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="font-editorial text-xs sm:text-sm font-bold text-gray-900 group-hover:text-[#b91c1c] leading-snug line-clamp-2 transition-colors">
                    {story.headline}
                  </h4>
                  <span className="text-[10px] text-gray-400 mt-1 block">
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
