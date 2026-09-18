"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Play, Video, Smartphone, Headphones, ArrowRight, Mic, Volume2 } from "lucide-react";
import { Article } from "@/lib/db/articles";
import { useLanguage } from "@/context/LanguageContext";

interface MultimediaSectionProps {
  articles: Article[];
}

export function MultimediaSection({ articles }: MultimediaSectionProps) {
  const { language } = useLanguage();
  const [isPlayingPodcast, setIsPlayingPodcast] = useState(false);

  if (!articles || articles.length < 4) return null;

  const isEn = language === "en";
  const videoArticles = articles.slice(0, 4);
  const shortsArticles = articles.slice(4, 8);

  return (
    <section className="w-full bg-white text-gray-900 py-10 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* VIDEOS SECTION HEADER */}
        <div className="flex items-center justify-between pb-3 mb-6 border-b border-gray-200">
          <div className="flex items-center gap-2.5">
            <Video className="w-5 h-5 text-[#b91c1c]" />
            <div>
              <h2 className="font-editorial text-2xl font-black text-gray-900 uppercase tracking-tight">
                {isEn ? "Video Bulletins & Ground Reports" : "वीडियो बुलेटिन व ग्राउंड रिपोर्ट्स"}
              </h2>
            </div>
          </div>
          <Link
            href="/videos"
            className="text-xs font-bold text-[#b91c1c] hover:text-black flex items-center gap-1 transition-colors"
          >
            <span>{isEn ? "View All Videos" : "सभी वीडियो देखें"}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-10">
          {/* Main Large Video (Col 7) */}
          {videoArticles[0] && (
            <div className="md:col-span-7 group">
              <Link href={`/news/${videoArticles[0].slug}`} className="block">
                <div className="relative aspect-[16/9] rounded-sm overflow-hidden bg-gray-900 shadow-xs">
                  <Image
                    src={videoArticles[0].featured_image}
                    alt={videoArticles[0].headline}
                    fill
                    sizes="(max-width: 1024px) 100vw, 58vw"
                    className="object-cover group-hover:scale-102 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-black/25 flex items-center justify-center">
                    <div className="w-13 h-13 rounded-full bg-[#b91c1c] text-white flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                      <Play className="w-5 h-5 fill-white ml-0.5" />
                    </div>
                  </div>
                  <span className="absolute bottom-3 right-3 bg-black/80 text-white text-[11px] font-bold px-2 py-0.5 rounded-xs font-mono">
                    05:24
                  </span>
                </div>
                <h3 className="font-editorial text-lg sm:text-xl font-bold text-gray-900 group-hover:text-[#b91c1c] mt-3 leading-snug transition-colors">
                  {videoArticles[0].headline}
                </h3>
              </Link>
            </div>
          )}

          {/* 3 Secondary Videos (Col 5) */}
          <div className="md:col-span-5 flex flex-col justify-between gap-4">
            {videoArticles.slice(1, 4).map((vid) => (
              <article key={vid.id} className="group border-b border-gray-100 pb-3 last:border-b-0 last:pb-0">
                <Link href={`/news/${vid.slug}`} className="flex gap-3.5 items-start w-full">
                  <div className="relative w-32 aspect-[16/10] shrink-0 rounded-xs overflow-hidden bg-gray-900">
                    <Image
                      src={vid.featured_image}
                      alt={vid.headline}
                      fill
                      sizes="128px"
                      className="object-cover group-hover:scale-103 transition-transform duration-300 opacity-90"
                    />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                      <div className="w-7 h-7 rounded-full bg-[#b91c1c] text-white flex items-center justify-center">
                        <Play className="w-3.5 h-3.5 fill-white ml-0.5" />
                      </div>
                    </div>
                    <span className="absolute bottom-1 right-1 bg-black/80 text-[9px] text-white px-1 rounded font-mono">
                      03:15
                    </span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-editorial text-xs sm:text-sm font-bold text-gray-900 group-hover:text-[#b91c1c] leading-snug line-clamp-2 transition-colors">
                      {vid.headline}
                    </h4>
                    <span className="text-[10px] text-gray-400 mt-1 block uppercase font-medium">
                      News Media Kiran Studio
                    </span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>

        {/* SHORTS 9:16 VERTICAL CARDS */}
        <div id="shorts-section" className="border-t border-gray-200 pt-8 mb-10">
          <div className="flex items-center gap-2 mb-4">
            <Smartphone className="w-4 h-4 text-[#b91c1c]" />
            <h3 className="font-editorial text-base font-bold text-gray-900 uppercase tracking-wider">
              {isEn ? "Quick Shorts (9:16 Dispatches)" : "न्यूज़ शॉर्ट्स (Quick 9:16 Shorts)"}
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {shortsArticles.map((short) => (
              <Link
                key={short.id}
                href={`/news/${short.slug}`}
                className="group relative aspect-[9/16] rounded-md overflow-hidden bg-gray-900 shadow-xs flex flex-col justify-end p-3 hover:ring-2 hover:ring-[#b91c1c] transition-all"
              >
                <Image
                  src={short.featured_image}
                  alt={short.headline}
                  fill
                  sizes="(max-width: 640px) 50vw, 25vw"
                  className="object-cover opacity-80 group-hover:opacity-95 group-hover:scale-105 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent"></div>
                <div className="relative z-10">
                  <div className="w-7 h-7 rounded-full bg-[#b91c1c] text-white flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                    <Play className="w-3.5 h-3.5 fill-white ml-0.5" />
                  </div>
                  <h4 className="text-xs font-bold text-white line-clamp-2 leading-snug">
                    {short.headline}
                  </h4>
                  <span className="text-[10px] text-gray-300 font-mono mt-1 block">
                    0:45 min
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* PODCASTS AUDIO DISPATCH */}
        <div className="border-t border-gray-200 pt-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Headphones className="w-4 h-4 text-amber-600" />
              <h3 className="font-editorial text-base font-bold text-gray-900 uppercase tracking-wider">
                {isEn ? "Audio Dispatch & Daily Podcast" : "पॉडकास्ट (Audio Dispatch)"}
              </h3>
            </div>
            <Link href="/podcasts" className="text-xs text-[#b91c1c] font-semibold hover:underline">
              {isEn ? "All Episodes →" : "सभी एपिसोड →"}
            </Link>
          </div>

          <div className="bg-gray-50 border border-gray-200 p-5 rounded-md flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-sm bg-amber-500 text-gray-950 flex items-center justify-center shrink-0 shadow-xs">
                <Mic className="w-7 h-7" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider block">
                  {isEn ? "Daily Editorial Podcast • Episode #142" : "दैनिक संपादकीय पॉडकास्ट • Episode #142"}
                </span>
                <h4 className="font-editorial text-base sm:text-lg font-bold text-gray-900 mt-0.5">
                  {isEn ? "The Big Debate: Semiconductor Revolution and India's Economic Trajectory" : "आज की बड़ी बहस: सेमीकंडक्टर क्रांति और भारत की आर्थिक दिशा"}
                </h4>
                <p className="text-xs text-gray-500 mt-0.5">
                  {isEn ? "Editor-in-Chief Desk • Duration: 18 mins" : "होस्ट: प्रधान संपादक डेस्क • अवधि: 18 मिनट"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 shrink-0">
              <button
                onClick={() => setIsPlayingPodcast(!isPlayingPodcast)}
                className="flex items-center gap-2 bg-[#b91c1c] hover:bg-[#991b1b] text-white text-xs font-bold px-4 py-2 rounded-full shadow-xs transition-all cursor-pointer"
              >
                {isPlayingPodcast ? (
                  <>
                    <Volume2 className="w-4 h-4 animate-bounce" />
                    <span>{isEn ? "Pause" : "पॉज़ करें"}</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-white" />
                    <span>{isEn ? "Listen Now" : "अभी सुनें"}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
