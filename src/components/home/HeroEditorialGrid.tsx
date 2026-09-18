"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Clock, ArrowRight, Flame } from "lucide-react";
import { Article } from "@/lib/db/articles";
import { useLanguage } from "@/context/LanguageContext";

interface HeroEditorialGridProps {
  featuredArticle: Article;
  topStories: Article[];
}

export function HeroEditorialGrid({ featuredArticle, topStories }: HeroEditorialGridProps) {
  const { t } = useLanguage();
  if (!featuredArticle) return null;

  const leftCard1 = topStories[0];
  const leftCard2 = topStories[1];
  const rightCard1 = topStories[2];
  const rightBullets = topStories.slice(3, 7);

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-6 bg-white border-b border-gray-200">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LEFT COLUMN (Cols 1-3): 2 Stacked Story Cards with Images (Reference 2 Left) */}
        <div className="lg:col-span-3 flex flex-col space-y-6">
          {leftCard1 && (
            <article className="group flex flex-col">
              <Link href={`/news/${leftCard1.slug}`} className="block relative aspect-[16/10] overflow-hidden rounded-sm bg-gray-100 mb-2.5">
                <Image
                  src={leftCard1.featured_image}
                  alt={leftCard1.headline}
                  fill
                  sizes="(max-width: 1024px) 100vw, 25vw"
                  className="object-cover group-hover:scale-103 transition-transform duration-300"
                />
              </Link>
              <Link href={`/news/${leftCard1.slug}`}>
                <h3 className="font-editorial text-base sm:text-lg font-bold text-gray-900 group-hover:text-[#b91c1c] leading-snug mb-1.5 transition-colors">
                  {leftCard1.headline}
                </h3>
              </Link>
              <div className="flex items-center gap-2 text-[11px] text-gray-500 font-semibold uppercase">
                <span className="text-[#b91c1c]">{leftCard1.primary_category || "India News"}</span>
                <span>•</span>
                <span>{leftCard1.reading_time || "4m ago"}</span>
              </div>
            </article>
          )}

          {leftCard2 && (
            <article className="group flex flex-col pt-5 border-t border-gray-200">
              <Link href={`/news/${leftCard2.slug}`} className="block relative aspect-[16/10] overflow-hidden rounded-sm bg-gray-100 mb-2.5">
                <Image
                  src={leftCard2.featured_image}
                  alt={leftCard2.headline}
                  fill
                  sizes="(max-width: 1024px) 100vw, 25vw"
                  className="object-cover group-hover:scale-103 transition-transform duration-300"
                />
              </Link>
              <Link href={`/news/${leftCard2.slug}`}>
                <h3 className="font-editorial text-base sm:text-lg font-bold text-gray-900 group-hover:text-[#b91c1c] leading-snug mb-1.5 transition-colors">
                  {leftCard2.headline}
                </h3>
              </Link>
              <div className="flex items-center gap-2 text-[11px] text-gray-500 font-semibold uppercase">
                <span className="text-[#b91c1c]">{leftCard2.primary_category || "National"}</span>
                <span>•</span>
                <span>{leftCard2.reading_time || "12m ago"}</span>
              </div>
            </article>
          )}
        </div>

        {/* CENTER COLUMN (Cols 4-8): Big Focal Hero Lead Story (Reference 2 Center) */}
        <div className="lg:col-span-6 group border-y lg:border-y-0 lg:border-x border-gray-200 py-6 lg:py-0 lg:px-6">
          <Link href={`/news/${featuredArticle.slug}`} className="block">
            <div className="relative w-full aspect-[16/10] overflow-hidden rounded-sm bg-gray-900 shadow-xs mb-4">
              <Image
                src={featuredArticle.featured_image}
                alt={featuredArticle.headline}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover group-hover:scale-102 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3 bg-[#b91c1c] text-white text-[11px] font-bold px-2.5 py-0.5 uppercase tracking-wider rounded-xs flex items-center gap-1 shadow-sm">
                <Flame className="w-3 h-3 fill-white" />
                <span>Lead Story</span>
              </div>
            </div>

            <h1 className="font-editorial text-2xl sm:text-3xl lg:text-[28px] font-black text-gray-900 leading-tight group-hover:text-[#b91c1c] transition-colors mb-2.5">
              {featuredArticle.headline}
            </h1>

            <p className="text-xs sm:text-sm text-gray-600 line-clamp-3 leading-relaxed mb-3 italic">
              &ldquo;{featuredArticle.excerpt || featuredArticle.headline}&rdquo;
            </p>

            <div className="flex items-center gap-2 text-xs text-gray-500 font-semibold uppercase">
              <span className="text-[#b91c1c]">{featuredArticle.primary_category || "India News"}</span>
              <span>•</span>
              <span className="text-gray-400">{featuredArticle.reading_time || "5 min read"}</span>
              <span>•</span>
              <span className="text-gray-600 font-medium capitalize">{featuredArticle.author_name}</span>
            </div>
          </Link>
        </div>

        {/* RIGHT COLUMN (Cols 9-12): Top Photo Card + Live Feed Headlines (Reference 2 Right) */}
        <div className="lg:col-span-3 flex flex-col space-y-4">
          {rightCard1 && (
            <article className="group flex flex-col pb-4 border-b border-gray-200">
              <Link href={`/news/${rightCard1.slug}`} className="block relative aspect-[16/10] overflow-hidden rounded-sm bg-gray-100 mb-2.5">
                <Image
                  src={rightCard1.featured_image}
                  alt={rightCard1.headline}
                  fill
                  sizes="(max-width: 1024px) 100vw, 25vw"
                  className="object-cover group-hover:scale-103 transition-transform duration-300"
                />
              </Link>
              <Link href={`/news/${rightCard1.slug}`}>
                <h3 className="font-editorial text-base sm:text-lg font-bold text-gray-900 group-hover:text-[#b91c1c] leading-snug mb-1.5 transition-colors">
                  {rightCard1.headline}
                </h3>
              </Link>
              <div className="flex items-center gap-2 text-[11px] text-gray-500 font-semibold uppercase">
                <span className="text-[#b91c1c]">{rightCard1.primary_category || "World News"}</span>
                <span>•</span>
                <span>{rightCard1.reading_time || "16m ago"}</span>
              </div>
            </article>
          )}

          {/* Hairline Divided Fast Headlines Feed */}
          <div className="flex flex-col space-y-3 pt-1">
            {rightBullets.map((bullet, idx) => (
              <div key={bullet.id} className="pt-2.5 border-t border-gray-100 first:border-t-0">
                <Link href={`/news/${bullet.slug}`} className="group block">
                  <div className="flex items-start gap-1.5">
                    {idx === 0 && (
                      <span className="bg-[#b91c1c] text-white text-[9px] font-black px-1.5 py-0.5 rounded-xs uppercase shrink-0 mt-0.5">
                        LIVE
                      </span>
                    )}
                    <h4 className="font-editorial text-xs sm:text-sm font-semibold text-gray-800 group-hover:text-[#b91c1c] leading-snug line-clamp-2 transition-colors">
                      {bullet.headline}
                    </h4>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
