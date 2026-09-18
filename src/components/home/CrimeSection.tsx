"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Shield, ArrowRight, Eye } from "lucide-react";
import { Article } from "@/lib/db/articles";
import { useLanguage } from "@/context/LanguageContext";

interface CrimeSectionProps {
  articles: Article[];
}

export function CrimeSection({ articles }: CrimeSectionProps) {
  const { language } = useLanguage();
  if (!articles || articles.length < 3) return null;

  const leadCrime = articles[0];
  const supportingCrime = articles.slice(1, 4);

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-8 bg-white border-b border-gray-200">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 mb-6 border-b border-gray-200">
        <div className="flex items-center gap-2.5">
          <Shield className="w-5 h-5 text-[#b91c1c]" />
          <div>
            <h2 className="font-editorial text-2xl font-black text-gray-900 uppercase tracking-tight">
              {language === "en" ? "Crime & Investigation Desk" : "क्राइम व अन्वेषण ब्यूरो"}
            </h2>
          </div>
        </div>
        <Link
          href="/category/crime"
          className="text-xs font-bold text-[#b91c1c] hover:text-black flex items-center gap-1 transition-colors"
        >
          <span>{language === "en" ? "View All Case Files" : "सभी क्राइम रिपोर्ट"}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Layout: Large Investigative Feature + 3 Clean Cards on Single Light Canvas */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Main Investigative Card (Col 6) */}
        <div className="lg:col-span-6 bg-white border border-gray-200 rounded-sm overflow-hidden group hover:border-[#b91c1c] transition-colors">
          <Link href={`/news/${leadCrime.slug}`} className="flex flex-col h-full">
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-gray-100">
              <Image
                src={leadCrime.featured_image}
                alt={leadCrime.headline}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover group-hover:scale-102 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3 bg-[#b91c1c] text-white text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider rounded-xs shadow-xs">
                {language === "en" ? "Special Investigation" : "विशेष पड़ताल"}
              </div>
            </div>
            <div className="p-5 flex flex-col justify-between flex-1">
              <div>
                <h3 className="font-editorial text-xl sm:text-2xl font-black text-gray-900 group-hover:text-[#b91c1c] leading-snug transition-colors">
                  {leadCrime.headline}
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-gray-600 line-clamp-3 leading-relaxed">
                  {leadCrime.excerpt}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                <span className="font-semibold text-gray-700">{leadCrime.author_name || "Special Crime Bureau"}</span>
                <div className="flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5 text-gray-400" />
                  <span>{leadCrime.view_count || 1400} views</span>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* 3 Supporting Stories (Col 6) */}
        <div className="lg:col-span-6 flex flex-col justify-between gap-4">
          {supportingCrime.map((story) => (
            <article
              key={story.id}
              className="bg-white border border-gray-200 rounded-sm p-4 group hover:border-gray-400 transition-colors"
            >
              <Link href={`/news/${story.slug}`} className="flex gap-4 items-start">
                <div className="relative w-28 h-20 shrink-0 rounded-xs overflow-hidden bg-gray-100">
                  <Image
                    src={story.featured_image}
                    alt={story.headline}
                    fill
                    sizes="112px"
                    className="object-cover group-hover:scale-103 transition-transform duration-300"
                  />
                </div>
                <div className="flex-1">
                  <span className="text-[10px] font-bold text-[#b91c1c] uppercase tracking-wider block mb-1">
                    {story.location_name || "Bureau"} • {language === "en" ? "Case File" : "केस फाइल"}
                  </span>
                  <h4 className="font-editorial text-sm sm:text-base font-bold text-gray-900 group-hover:text-[#b91c1c] leading-snug line-clamp-2 transition-colors">
                    {story.headline}
                  </h4>
                  <span className="text-[11px] text-gray-400 mt-1.5 block">
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
