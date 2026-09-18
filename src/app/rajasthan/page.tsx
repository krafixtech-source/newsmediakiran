import React from "react";
import Link from "next/link";
import Image from "next/image";
import { MapPin, ChevronRight, Clock, Building } from "lucide-react";
import { getArticles } from "@/lib/db/articles";
import { SiteHeader } from "@/components/header/SiteHeader";
import { Footer } from "@/components/footer/Footer";

export const dynamic = "force-dynamic";

export default async function RajasthanHubPage() {
  const articles = await getArticles({ limit: 30 });
  const cities = [
    { name: "जयपुर (Jaipur)", slug: "jaipur", desc: "राजधानी के प्रमुख प्रशासनिक, विकास व राजनीतिक समाचार" },
    { name: "जोधपुर (Jodhpur)", slug: "jodhpur", desc: "मारवाड़ अंचल, न्यायपालिका व सांस्कृतिक हलचल" },
    { name: "उदयपुर (Udaipur)", slug: "udaipur", desc: "मेवाड़, पर्यटन, झीलों की नगरी व जनजातीय विकास" },
    { name: "कोटा (Kota)", slug: "kota", desc: "शिक्षा नगरी, कोचिंग हब, चंबल विकास व युवा समाचार" },
    { name: "अजमेर (Ajmer)", slug: "ajmer", desc: "शिक्षा बोर्ड, दरगाह शरीफ, पुष्कर तीर्थ व मध्य राजस्थान" },
    { name: "बीकानेर (Bikaner)", slug: "bikaner", desc: "सीमांत क्षेत्र, थार उत्सव, सौर ऊर्जा व उद्योग" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#faf9f6]">
      <SiteHeader initialCity="जयपुर" />

      <main className="max-w-7xl mx-auto px-4 py-8 flex-1 w-full">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-gray-500 mb-6 font-medium">
          <Link href="/" className="hover:text-gray-900 transition-colors">होम</Link>
          <ChevronRight className="w-3 h-3 text-gray-400" />
          <span className="text-gray-900 font-bold">राजस्थान विशेष (Rajasthan Bureau)</span>
        </nav>

        {/* State Banner */}
        <div className="bg-gradient-to-r from-amber-900 to-amber-950 text-white rounded-lg p-6 sm:p-8 mb-8 shadow-sm">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-300 block mb-2">
            प्रांतीय महाकवरेज • Regional State Bureau
          </span>
          <h1 className="font-editorial text-3xl sm:text-5xl font-black text-white">
            राजस्थान समाचार (Rajasthan News Hub)
          </h1>
          <p className="text-xs sm:text-sm text-amber-100 max-w-2xl mt-2 leading-relaxed">
            जयपुर, मारवाड़, मेवाड़, हाड़ौती, शेखावाटी और वागड़ क्षेत्र की प्रत्येक बड़ी घटना, प्रशासनिक फैसले, राजनीति और जनसरोकार की खबरें।
          </p>
        </div>

        {/* City Hub Cards */}
        <div className="mb-10">
          <h2 className="font-editorial text-xl font-black text-gray-900 mb-4 border-b border-gray-300 pb-2">
            प्रमुख शहर संस्करण (Major City Editions)
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {cities.map((city) => (
              <Link
                key={city.slug}
                href={`/rajasthan/${city.slug}`}
                className="bg-white border border-gray-200 hover:border-amber-700 p-4 rounded-md shadow-2xs hover:shadow-md transition-all group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-amber-800" />
                    <h3 className="font-editorial text-base font-bold text-gray-900 group-hover:text-amber-800">
                      {city.name}
                    </h3>
                  </div>
                  <span className="text-xs font-bold text-amber-800 group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-2 line-clamp-2">
                  {city.desc}
                </p>
              </Link>
            ))}
          </div>
        </div>

        {/* Rajasthan Articles Feed */}
        <div>
          <h2 className="font-editorial text-xl font-black text-gray-900 mb-4 border-b border-gray-300 pb-2">
            राजस्थान की ताज़ा खबरें (Latest Rajasthan Stories)
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.slice(0, 12).map((art) => (
              <article
                key={art.id}
                className="group bg-white border border-gray-200 rounded-md overflow-hidden shadow-2xs hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <Link href={`/news/${art.slug}`}>
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
                      {art.location_name || "Rajasthan"}
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
                  <span>{art.author_name || "Bureau"}</span>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{art.reading_time}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
