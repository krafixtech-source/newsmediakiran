import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Video, Play, ChevronRight, Clock } from "lucide-react";
import { getArticles } from "@/lib/db/articles";
import { SiteHeader } from "@/components/header/SiteHeader";
import { Footer } from "@/components/footer/Footer";

export const dynamic = "force-dynamic";

export default async function VideosPage() {
  const articles = await getArticles({ limit: 16 });

  return (
    <div className="flex flex-col min-h-screen bg-[#faf9f6]">
      <SiteHeader initialCity="जयपुर" />

      <main className="max-w-7xl mx-auto px-4 py-8 flex-1 w-full font-hindi">
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-gray-500 mb-6 font-medium">
          <Link href="/" className="hover:text-gray-900 transition-colors">होम</Link>
          <ChevronRight className="w-3 h-3 text-gray-400" />
          <span className="text-gray-900 font-bold">वीडियो बुलेटिन</span>
        </nav>

        <div className="flex items-center justify-between border-b-2 border-red-700 pb-3 mb-8">
          <div className="flex items-center gap-3">
            <Video className="w-7 h-7 text-[#b91c1c]" />
            <div>
              <h1 className="font-editorial text-3xl font-black text-gray-900 uppercase">
                News Media Kiran वीडियो डेस्क
              </h1>
              <p className="text-xs text-gray-500">
                ग्राउंड रिपोर्टिंग, विशेष साक्षात्कार, राजनीतिक बहस और डिजिटल बुलेटिन
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((vid) => (
            <article
              key={vid.id}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-2xs hover:shadow-md transition-all group"
            >
              <Link href={`/news/${vid.slug}`} className="block">
                <div className="relative aspect-[16/9] bg-gray-900 overflow-hidden">
                  <Image
                    src={vid.featured_image}
                    alt={vid.headline}
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-300 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                    <div className="w-12 h-12 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Play className="w-5 h-5 fill-white ml-0.5" />
                    </div>
                  </div>
                  <span className="absolute bottom-2 right-2 bg-black/80 text-white text-[11px] px-2 py-0.5 rounded font-mono">
                    04:20
                  </span>
                </div>

                <div className="p-4">
                  <span className="text-[10px] font-bold text-[#b91c1c] uppercase tracking-wider block mb-1">
                    {vid.primary_category}
                  </span>
                  <h3 className="font-editorial text-base font-bold text-gray-900 group-hover:text-[#b91c1c] leading-snug line-clamp-2 transition-colors">
                    {vid.headline}
                  </h3>
                  <div className="mt-3 flex items-center justify-between text-xs text-gray-400">
                    <span>{vid.author_name}</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {vid.reading_time}
                    </span>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
