"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Cpu, Smartphone, ArrowRight } from "lucide-react";
import { Article } from "@/lib/db/articles";
import { useLanguage } from "@/context/LanguageContext";

interface TechnologySectionProps {
  articles: Article[];
}

export function TechnologySection({ articles }: TechnologySectionProps) {
  const { language } = useLanguage();
  if (!articles || articles.length === 0) return null;

  const isEn = language === "en";
  const lead = articles[0];
  const gridStories = articles.slice(1, 4);

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-8 bg-white border-b border-gray-200">
      <div className="flex items-center justify-between pb-3 mb-6 border-b border-gray-200">
        <div className="flex items-center gap-2.5">
          <Cpu className="w-5 h-5 text-cyan-800" />
          <div>
            <h2 className="font-editorial text-2xl font-black text-gray-900 uppercase tracking-tight">
              {isEn ? "Technology & Artificial Intelligence" : "तकनीक व आर्टिफिशियल इंटेलिजेंस (Tech & AI)"}
            </h2>
          </div>
        </div>
        <Link
          href="/category/technology"
          className="text-xs font-bold text-[#b91c1c] hover:text-black flex items-center gap-1 transition-colors"
        >
          <span>{isEn ? "View All Tech Stories" : "सभी टेक खबरें देखें"}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Large Tech Feature (Col 6) */}
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
              <div className="absolute top-3 left-3 bg-[#111827] text-white text-[10px] font-bold px-2 py-0.5 rounded-xs shadow-xs flex items-center gap-1">
                <Smartphone className="w-3 h-3 text-cyan-400" />
                <span>{isEn ? "AI & Tech Focus" : "AI व टेक फोकस"}</span>
              </div>
            </div>
            <div className="p-5">
              <span className="text-[10px] font-bold text-cyan-800 uppercase tracking-wider block mb-1">
                {isEn ? "Tech Review & Analysis" : "टेक रिव्यू व विश्लेषण"}
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

        {/* 3 Horizontal Tech Cards (Col 6) */}
        <div className="md:col-span-6 flex flex-col justify-between gap-4">
          {gridStories.map((story) => (
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
                  <span className="text-[10px] font-bold text-cyan-800 uppercase tracking-wider block mb-0.5">
                    Gadgets & Innovation
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
        </div>
      </div>
    </section>
  );
}
