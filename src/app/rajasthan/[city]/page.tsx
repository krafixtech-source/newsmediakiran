import React from "react";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Sun, Clock, ChevronRight } from "lucide-react";
import { getArticles } from "@/lib/db/articles";
import { SiteHeader } from "@/components/header/SiteHeader";
import { Footer } from "@/components/footer/Footer";

import { fetchLiveCityWeather } from "@/lib/weather";

export const dynamic = "force-dynamic";

interface CityPageProps {
  params: Promise<{ city: string }>;
}

export default async function CityPage({ params }: CityPageProps) {
  const { city } = await params;
  const liveWeather = await fetchLiveCityWeather(city);
  const articles = await getArticles({ limit: 15 });

  return (
    <div className="flex flex-col min-h-screen bg-[#faf9f6]">
      <SiteHeader initialCity={liveWeather.cityNameHi} />

      <main className="max-w-7xl mx-auto px-4 py-8 flex-1 w-full">
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-gray-500 mb-6 font-medium">
          <Link href="/" className="hover:text-gray-900 transition-colors">होम</Link>
          <ChevronRight className="w-3 h-3 text-gray-400" />
          <Link href="/rajasthan" className="hover:text-gray-900 transition-colors">राजस्थान</Link>
          <ChevronRight className="w-3 h-3 text-gray-400" />
          <span className="text-gray-900 font-bold">{liveWeather.cityNameHi} संस्करण</span>
        </nav>

        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-2xs">
          <div>
            <div className="flex items-center gap-2 text-amber-800 text-xs font-bold uppercase tracking-wider mb-1">
              <MapPin className="w-4 h-4" />
              <span>शहर संस्करण • {liveWeather.cityNameEn} City Desk</span>
            </div>
            <h1 className="font-editorial text-3xl sm:text-4xl font-black text-gray-900">
              {liveWeather.cityNameHi} न्यूज़ (Latest {liveWeather.cityNameEn} News)
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 mt-1">
              नगर निगम, प्रशासन, अपराध, ट्रैफिक, शिक्षा और स्थानीय विकास की सभी बड़ी खबरें।
            </p>
          </div>

          <div className="bg-amber-50/70 border border-amber-200 rounded-md p-4 flex items-center gap-4 shrink-0 shadow-2xs">
            <Sun className="w-8 h-8 text-amber-500 animate-spin-slow" />
            <div>
              <div className="flex items-baseline gap-2">
                <span className="font-editorial text-2xl font-black text-gray-900">{liveWeather.temp}°C</span>
                <span className="text-xs font-bold text-amber-900">{liveWeather.cityNameHi}</span>
              </div>
              <span className="text-xs text-gray-600">
                {liveWeather.conditionHi} ({liveWeather.conditionEn}) • आर्द्रता: {liveWeather.humidity}%
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((art) => (
            <article
              key={art.id}
              className="group bg-white border border-gray-200 rounded-md overflow-hidden shadow-2xs hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <Link href={"/news/" + art.slug}>
                <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                  <Image
                    src={art.featured_image}
                    alt={art.headline}
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4">
                  <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider block mb-1">
                    {liveWeather.cityNameHi} विशेष
                  </span>
                  <h3 className="font-editorial text-base font-bold text-gray-900 group-hover:text-amber-800 leading-snug line-clamp-2 transition-colors">
                    {art.headline}
                  </h3>
                  <p className="mt-2 text-xs text-gray-600 line-clamp-2 leading-relaxed">
                    {art.excerpt}
                  </p>
                </div>
              </Link>

              <div className="px-4 pb-3.5 pt-2 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400 font-medium">
                <span>{art.author_name || "City Reporter"}</span>
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{art.reading_time}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
