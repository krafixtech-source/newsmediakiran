"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MapPin } from "lucide-react";
import { Article } from "@/lib/db/articles";
import { useLanguage } from "@/context/LanguageContext";

interface RajasthanSectionProps {
  articles: Article[];
}

export function RajasthanSection({ articles }: RajasthanSectionProps) {
  const { language } = useLanguage();
  const [activeCity, setActiveCity] = useState("जयपुर");

  const isEn = language === "en";

  const cities = [
    { name: isEn ? "Jaipur" : "जयपुर", slug: "jaipur" },
    { name: isEn ? "Jodhpur" : "जोधपुर", slug: "jodhpur" },
    { name: isEn ? "Udaipur" : "उदयपुर", slug: "udaipur" },
    { name: isEn ? "Kota" : "कोटा", slug: "kota" },
    { name: isEn ? "Ajmer" : "अजमेर", slug: "ajmer" },
    { name: isEn ? "Bikaner" : "बीकानेर", slug: "bikaner" },
  ];

  if (!articles || articles.length === 0) return null;

  const mainStory = articles[0];
  const sideStories = articles.slice(1, 5);

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-8 bg-white border-b border-gray-200">
      {/* Header with City Tabs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-3 mb-6 border-b border-gray-200 gap-4">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-6 bg-[#b91c1c] rounded-2xs"></div>
          <div>
            <h2 className="font-editorial text-2xl font-black text-gray-900 uppercase tracking-tight">
              {isEn ? "Rajasthan Regional Bureau" : "राजस्थान विशेष (Rajasthan Bureau)"}
            </h2>
          </div>
        </div>

        {/* City Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
          {cities.map((city) => (
            <button
              key={city.slug}
              onClick={() => setActiveCity(city.name)}
              className={`px-3 py-1 text-xs font-semibold rounded-full transition-all cursor-pointer whitespace-nowrap ${
                activeCity === city.name
                  ? "bg-[#111827] text-white shadow-xs"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {city.name}
            </button>
          ))}
        </div>
      </div>

      {/* Grid: 1 Big Regional Feature + 4 City Stories */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Main Regional Story (Col 7) */}
        <div className="lg:col-span-7 group">
          <Link href={`/news/${mainStory.slug}`} className="block border border-gray-200 rounded-sm overflow-hidden bg-white hover:border-[#b91c1c] transition-colors">
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-gray-100">
              <Image
                src={mainStory.featured_image}
                alt={mainStory.headline}
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover group-hover:scale-102 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3 bg-[#b91c1c] text-white text-[10px] font-bold px-2.5 py-0.5 uppercase tracking-wider rounded-xs flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                <span>{activeCity} Desk</span>
              </div>
            </div>
            <div className="p-5">
              <h3 className="font-editorial text-xl sm:text-2xl font-bold text-gray-900 group-hover:text-[#b91c1c] leading-snug mb-2 transition-colors">
                {mainStory.headline}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 line-clamp-3 leading-relaxed mb-4">
                {mainStory.excerpt}
              </p>
              <div className="flex items-center justify-between text-xs text-gray-400 pt-3 border-t border-gray-100 font-medium">
                <span className="text-gray-700 font-semibold">{mainStory.author_name || "Bureau Correspondent"}</span>
                <span>{mainStory.reading_time || "4 min read"}</span>
              </div>
            </div>
          </Link>
        </div>

        {/* Right: 4 Side City Stories (Col 5) */}
        <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
          {sideStories.map((story, idx) => (
            <article
              key={story.id}
              className="group bg-white border border-gray-200 rounded-sm p-3.5 hover:border-gray-400 transition-all"
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
                  <span className="text-[10px] font-bold text-[#b91c1c] uppercase tracking-wider block mb-0.5">
                    {cities[idx % cities.length].name}
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

          {/* Explore all Rajasthan Link */}
          <Link
            href="/rajasthan"
            className="w-full text-center py-2.5 bg-gray-50 hover:bg-gray-100 text-gray-900 border border-gray-200 rounded-sm text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
          >
            <span>{isEn ? "View All Rajasthan Bureau Coverage" : "राजस्थान की सभी खबरें देखें"}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>
    </section>
  );
}
