"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Bookmark, MoreHorizontal, Check, ArrowRight } from "lucide-react";
import { Article } from "@/lib/db/articles";
import { useLanguage } from "@/context/LanguageContext";

interface LatestNewsSectionProps {
  articles: Article[];
}

export function LatestNewsSection({ articles }: LatestNewsSectionProps) {
  const { t } = useLanguage();
  const [bookmarkedIds, setBookmarkedIds] = useState<Record<number, boolean>>({});
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  if (!articles || articles.length < 6) return null;

  const toggleBookmark = (id: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const next = !bookmarkedIds[id];
    setBookmarkedIds((prev) => ({ ...prev, [id]: next }));
    setToastMessage(next ? "Story saved to bookmarks" : "Story removed from bookmarks");
    setTimeout(() => setToastMessage(null), 2500);
  };

  // Group into 3 columns matching Reference 1
  const col1 = [articles[0], articles[3], articles[6]].filter(Boolean);
  const col2 = [articles[1], articles[4], articles[7]].filter(Boolean);
  const col3 = [articles[2], articles[5], articles[8] || articles[0]].filter(Boolean);

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-10 bg-white">
      {/* Toast feedback */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#111827] text-white text-xs font-semibold px-4 py-2.5 rounded-lg shadow-xl flex items-center gap-2 animate-fade-in">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Section Title (Reference 1 style: clean, confident "Latest News") */}
      <div className="flex items-center justify-between pb-3 mb-8 border-b border-gray-200">
        <h2 className="font-editorial text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
          {t("latestNews")}
        </h2>
        <Link
          href="/category/trending"
          className="text-xs font-bold text-[#b91c1c] hover:text-black transition-colors flex items-center gap-1"
        >
          <span>View All</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* 3-Column Asymmetric Newspaper Grid (Reference 1) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        
        {/* COLUMN 1: Image Card + Image Card + Text-only Card */}
        <div className="flex flex-col space-y-8">
          {col1[0] && (
            <article className="group flex flex-col">
              <Link href={`/news/${col1[0].slug}`} className="block overflow-hidden bg-gray-100 rounded-sm mb-3">
                <div className="relative aspect-[16/10] w-full">
                  <Image
                    src={col1[0].featured_image}
                    alt={col1[0].headline}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-102 transition-transform duration-300"
                  />
                </div>
              </Link>
              <Link href={`/news/${col1[0].slug}`}>
                <h3 className="font-editorial text-lg sm:text-xl font-bold text-gray-900 group-hover:text-[#b91c1c] leading-snug mb-2 transition-colors">
                  {col1[0].headline}
                </h3>
              </Link>
              <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed mb-3">
                {col1[0].excerpt || col1[0].headline}
              </p>
              <div className="flex items-center justify-between text-xs text-gray-400 mt-auto pt-2">
                <span className="font-medium text-gray-500">
                  {col1[0].reading_time || "4 min read"}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => toggleBookmark(col1[0].id, e)}
                    className="p-1 hover:text-gray-900 transition-colors cursor-pointer"
                    aria-label="Save story"
                  >
                    <Bookmark
                      className={`w-4 h-4 ${
                        bookmarkedIds[col1[0].id] ? "fill-[#b91c1c] text-[#b91c1c]" : "text-gray-400"
                      }`}
                    />
                  </button>
                  <button className="p-1 hover:text-gray-900 transition-colors" aria-label="More options">
                    <MoreHorizontal className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
              </div>
            </article>
          )}

          {col1[1] && (
            <article className="group flex flex-col pt-6 border-t border-gray-200">
              <Link href={`/news/${col1[1].slug}`} className="block overflow-hidden bg-gray-100 rounded-sm mb-3">
                <div className="relative aspect-[16/10] w-full">
                  <Image
                    src={col1[1].featured_image}
                    alt={col1[1].headline}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-102 transition-transform duration-300"
                  />
                </div>
              </Link>
              <Link href={`/news/${col1[1].slug}`}>
                <h3 className="font-editorial text-lg sm:text-xl font-bold text-gray-900 group-hover:text-[#b91c1c] leading-snug mb-2 transition-colors">
                  {col1[1].headline}
                </h3>
              </Link>
              <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed mb-3">
                {col1[1].excerpt || col1[1].headline}
              </p>
              <div className="flex items-center justify-between text-xs text-gray-400 mt-auto pt-2">
                <span className="font-medium text-gray-500">
                  {col1[1].reading_time || "8 min read"}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => toggleBookmark(col1[1].id, e)}
                    className="p-1 hover:text-gray-900 transition-colors cursor-pointer"
                    aria-label="Save story"
                  >
                    <Bookmark
                      className={`w-4 h-4 ${
                        bookmarkedIds[col1[1].id] ? "fill-[#b91c1c] text-[#b91c1c]" : "text-gray-400"
                      }`}
                    />
                  </button>
                  <button className="p-1 hover:text-gray-900 transition-colors" aria-label="More options">
                    <MoreHorizontal className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
              </div>
            </article>
          )}

          {col1[2] && (
            <article className="group flex flex-col pt-6 border-t border-gray-200">
              <Link href={`/news/${col1[2].slug}`}>
                <h4 className="font-editorial text-base font-bold text-gray-900 group-hover:text-[#b91c1c] leading-snug transition-colors">
                  {col1[2].headline}
                </h4>
              </Link>
            </article>
          )}
        </div>

        {/* COLUMN 2: Big Landscape Lead + Text Cards with Hairline Separators (Reference 1 center) */}
        <div className="flex flex-col space-y-6">
          {col2[0] && (
            <article className="group flex flex-col">
              <Link href={`/news/${col2[0].slug}`} className="block overflow-hidden bg-gray-100 rounded-sm mb-3">
                <div className="relative aspect-[16/10] w-full">
                  <Image
                    src={col2[0].featured_image}
                    alt={col2[0].headline}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-102 transition-transform duration-300"
                  />
                </div>
              </Link>
              <Link href={`/news/${col2[0].slug}`}>
                <h3 className="font-editorial text-xl sm:text-2xl font-black text-gray-900 group-hover:text-[#b91c1c] leading-tight mb-2.5 transition-colors">
                  {col2[0].headline}
                </h3>
              </Link>
              <p className="text-xs sm:text-sm text-gray-600 line-clamp-3 leading-relaxed mb-3">
                {col2[0].excerpt || col2[0].headline}
              </p>
              <div className="flex items-center justify-between text-xs text-gray-400 pt-2 border-t border-gray-100">
                <span className="font-medium text-gray-500">
                  {col2[0].reading_time || "8 min read"}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => toggleBookmark(col2[0].id, e)}
                    className="p-1 hover:text-gray-900 transition-colors cursor-pointer"
                    aria-label="Save story"
                  >
                    <Bookmark
                      className={`w-4 h-4 ${
                        bookmarkedIds[col2[0].id] ? "fill-[#b91c1c] text-[#b91c1c]" : "text-gray-400"
                      }`}
                    />
                  </button>
                  <button className="p-1 hover:text-gray-900 transition-colors" aria-label="More options">
                    <MoreHorizontal className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
              </div>
            </article>
          )}

          {col2[1] && (
            <article className="group flex flex-col pt-5 border-t border-gray-200">
              <Link href={`/news/${col2[1].slug}`}>
                <h3 className="font-editorial text-lg sm:text-xl font-bold text-gray-900 group-hover:text-[#b91c1c] leading-snug mb-2 transition-colors">
                  {col2[1].headline}
                </h3>
              </Link>
              <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed mb-3">
                {col2[1].excerpt || col2[1].headline}
              </p>
              <div className="flex items-center justify-between text-xs text-gray-400 pt-2">
                <span className="font-medium text-gray-500">
                  {col2[1].reading_time || "5 min read"}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => toggleBookmark(col2[1].id, e)}
                    className="p-1 hover:text-gray-900 transition-colors cursor-pointer"
                    aria-label="Save story"
                  >
                    <Bookmark
                      className={`w-4 h-4 ${
                        bookmarkedIds[col2[1].id] ? "fill-[#b91c1c] text-[#b91c1c]" : "text-gray-400"
                      }`}
                    />
                  </button>
                  <button className="p-1 hover:text-gray-900 transition-colors" aria-label="More options">
                    <MoreHorizontal className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
              </div>
            </article>
          )}

          {col2[2] && (
            <article className="group flex flex-col pt-5 border-t border-gray-200">
              <Link href={`/news/${col2[2].slug}`}>
                <h3 className="font-editorial text-lg sm:text-xl font-bold text-gray-900 group-hover:text-[#b91c1c] leading-snug mb-2 transition-colors">
                  {col2[2].headline}
                </h3>
              </Link>
              <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed mb-3">
                {col2[2].excerpt || col2[2].headline}
              </p>
              <div className="flex items-center justify-between text-xs text-gray-400 pt-2">
                <span className="font-medium text-gray-500">
                  {col2[2].reading_time || "3 min read"}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => toggleBookmark(col2[2].id, e)}
                    className="p-1 hover:text-gray-900 transition-colors cursor-pointer"
                    aria-label="Save story"
                  >
                    <Bookmark
                      className={`w-4 h-4 ${
                        bookmarkedIds[col2[2].id] ? "fill-[#b91c1c] text-[#b91c1c]" : "text-gray-400"
                      }`}
                    />
                  </button>
                  <button className="p-1 hover:text-gray-900 transition-colors" aria-label="More options">
                    <MoreHorizontal className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
              </div>
            </article>
          )}
        </div>

        {/* COLUMN 3: Image Card + Image Card + Text Card */}
        <div className="flex flex-col space-y-8">
          {col3[0] && (
            <article className="group flex flex-col">
              <Link href={`/news/${col3[0].slug}`} className="block overflow-hidden bg-gray-100 rounded-sm mb-3">
                <div className="relative aspect-[16/10] w-full">
                  <Image
                    src={col3[0].featured_image}
                    alt={col3[0].headline}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-102 transition-transform duration-300"
                  />
                </div>
              </Link>
              <Link href={`/news/${col3[0].slug}`}>
                <h3 className="font-editorial text-lg sm:text-xl font-bold text-gray-900 group-hover:text-[#b91c1c] leading-snug mb-2 transition-colors">
                  {col3[0].headline}
                </h3>
              </Link>
              <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed mb-3">
                {col3[0].excerpt || col3[0].headline}
              </p>
              <div className="flex items-center justify-between text-xs text-gray-400 mt-auto pt-2">
                <span className="font-medium text-gray-500">
                  {col3[0].reading_time || "4 min read"}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => toggleBookmark(col3[0].id, e)}
                    className="p-1 hover:text-gray-900 transition-colors cursor-pointer"
                    aria-label="Save story"
                  >
                    <Bookmark
                      className={`w-4 h-4 ${
                        bookmarkedIds[col3[0].id] ? "fill-[#b91c1c] text-[#b91c1c]" : "text-gray-400"
                      }`}
                    />
                  </button>
                  <button className="p-1 hover:text-gray-900 transition-colors" aria-label="More options">
                    <MoreHorizontal className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
              </div>
            </article>
          )}

          {col3[1] && (
            <article className="group flex flex-col pt-6 border-t border-gray-200">
              <Link href={`/news/${col3[1].slug}`} className="block overflow-hidden bg-gray-100 rounded-sm mb-3">
                <div className="relative aspect-[16/10] w-full">
                  <Image
                    src={col3[1].featured_image}
                    alt={col3[1].headline}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-102 transition-transform duration-300"
                  />
                </div>
              </Link>
              <Link href={`/news/${col3[1].slug}`}>
                <h3 className="font-editorial text-lg sm:text-xl font-bold text-gray-900 group-hover:text-[#b91c1c] leading-snug mb-2 transition-colors">
                  {col3[1].headline}
                </h3>
              </Link>
              <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed mb-3">
                {col3[1].excerpt || col3[1].headline}
              </p>
              <div className="flex items-center justify-between text-xs text-gray-400 mt-auto pt-2">
                <span className="font-medium text-gray-500">
                  {col3[1].reading_time || "6 min read"}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => toggleBookmark(col3[1].id, e)}
                    className="p-1 hover:text-gray-900 transition-colors cursor-pointer"
                    aria-label="Save story"
                  >
                    <Bookmark
                      className={`w-4 h-4 ${
                        bookmarkedIds[col3[1].id] ? "fill-[#b91c1c] text-[#b91c1c]" : "text-gray-400"
                      }`}
                    />
                  </button>
                  <button className="p-1 hover:text-gray-900 transition-colors" aria-label="More options">
                    <MoreHorizontal className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
              </div>
            </article>
          )}

          {col3[2] && (
            <article className="group flex flex-col pt-6 border-t border-gray-200">
              <Link href={`/news/${col3[2].slug}`}>
                <h4 className="font-editorial text-base font-bold text-gray-900 group-hover:text-[#b91c1c] leading-snug transition-colors">
                  {col3[2].headline}
                </h4>
              </Link>
            </article>
          )}
        </div>

      </div>
    </section>
  );
}
