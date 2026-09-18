"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Feather, TrendingUp } from "lucide-react";
import { Article } from "@/lib/db/articles";
import { useLanguage } from "@/context/LanguageContext";

interface OpinionAndMostReadSectionProps {
  opinionArticles: Article[];
  mostReadArticles: Article[];
}

export function OpinionAndMostReadSection({
  opinionArticles,
  mostReadArticles,
}: OpinionAndMostReadSectionProps) {
  const { language } = useLanguage();
  const isEn = language === "en";

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-8 bg-white border-b border-gray-200">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* OPINION & EDITORIAL COLUMNS (Col 7) */}
        <div className="lg:col-span-7">
          <div className="flex items-center gap-2 border-b border-gray-200 pb-3 mb-6">
            <Feather className="w-5 h-5 text-[#b91c1c]" />
            <h2 className="font-editorial text-2xl font-black text-gray-900 uppercase tracking-tight">
              {isEn ? "Opinion & Editorial Columns" : "विचार व संपादकीय (Opinion & Analysis)"}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {opinionArticles.slice(0, 4).map((art) => (
              <article
                key={art.id}
                className="bg-white border border-gray-200 rounded-sm p-5 flex flex-col justify-between hover:border-[#b91c1c] transition-colors"
              >
                <div>
                  {/* Author Profile */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-100 border border-gray-200 shrink-0">
                      <Image
                        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"
                        alt={art.author_name || "Author"}
                        fill
                        sizes="40px"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-gray-900">{art.author_name}</h4>
                      <span className="text-[10px] text-gray-500 block">
                        {isEn ? "Senior Columnist" : "वरिष्ठ स्तंभकार"}
                      </span>
                    </div>
                  </div>

                  <h3 className="font-editorial text-base font-bold text-gray-900 hover:text-[#b91c1c] leading-snug line-clamp-2">
                    <Link href={`/news/${art.slug}`}>{art.headline}</Link>
                  </h3>
                  <p className="mt-2 text-xs text-gray-600 line-clamp-2 leading-relaxed">
                    {art.excerpt}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-100 text-[11px] text-gray-400">
                  {art.reading_time || "4 min read"}
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* MOST READ RANKING 01-05 (Col 5) */}
        <div className="lg:col-span-5 lg:pl-6 lg:border-l lg:border-gray-200">
          <div className="flex items-center gap-2 border-b border-gray-200 pb-3 mb-6">
            <TrendingUp className="w-5 h-5 text-[#b91c1c]" />
            <h2 className="font-editorial text-2xl font-black text-gray-900 uppercase tracking-tight">
              {isEn ? "Most Read Stories" : "सर्वाधिक पढ़े गए (Most Read)"}
            </h2>
          </div>

          <div className="divide-y divide-gray-100">
            {mostReadArticles.slice(0, 5).map((story, idx) => (
              <article key={story.id} className="py-3.5 first:pt-0 last:pb-0 group">
                <Link href={`/news/${story.slug}`} className="flex items-start gap-4">
                  <span className="font-editorial text-3xl font-black text-gray-300 group-hover:text-[#b91c1c] transition-colors shrink-0 select-none">
                    0{idx + 1}
                  </span>
                  <div>
                    <span className="text-[10px] font-bold text-[#b91c1c] uppercase tracking-wider block mb-1">
                      {story.primary_category || "News"}
                    </span>
                    <h4 className="font-editorial text-sm font-bold text-gray-900 group-hover:text-[#b91c1c] leading-snug line-clamp-2 transition-colors">
                      {story.headline}
                    </h4>
                    <span className="text-[10px] text-gray-400 mt-1 block">
                      {story.view_count || 1250} {isEn ? "reads" : "पाठकों द्वारा पढ़ा गया"}
                    </span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
