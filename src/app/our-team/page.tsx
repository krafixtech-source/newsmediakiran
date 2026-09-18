import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Mail, Award, CheckCircle } from "lucide-react";
import { getAuthors } from "@/lib/db/articles";
import { SiteHeader } from "@/components/header/SiteHeader";
import { Footer } from "@/components/footer/Footer";

export const dynamic = "force-dynamic";

export default async function OurTeamPage() {
  const authors = await getAuthors();

  return (
    <div className="flex flex-col min-h-screen bg-[#faf9f6]">
      <SiteHeader initialCity="जयपुर" />

      <main className="max-w-7xl mx-auto px-4 py-12 flex-1 w-full">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-gray-500 mb-6 font-medium">
          <Link href="/" className="hover:text-gray-900 transition-colors">होम</Link>
          <ChevronRight className="w-3 h-3 text-gray-400" />
          <span className="text-gray-900 font-bold">संपादकीय टीम (Our Team)</span>
        </nav>

        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold text-[#b91c1c] uppercase tracking-widest block mb-2">
            न्यूज़रूम स्तंभकार व संवाददाता
          </span>
          <h1 className="font-editorial text-3xl sm:text-5xl font-black text-gray-900">
            News Media Kiran संपादकीय टीम
          </h1>
          <p className="text-sm text-gray-600 mt-3 leading-relaxed">
            हमारे अनुभवी पत्रकार, विश्लेषक और ग्राउंड रिपोर्टर्स जो प्रतिदिन निष्पक्ष, सटीक और जनसरोकारी समाचार आप तक पहुंचाते हैं।
          </p>
        </div>

        {/* Authors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {authors.map((author) => (
            <div
              key={author.id}
              className="bg-white border border-gray-200 rounded-lg p-6 shadow-2xs hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden bg-gray-200 border-2 border-gray-100 shrink-0">
                    <Image
                      src={author.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"}
                      alt={author.name}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-editorial text-lg font-bold text-gray-900">
                      {author.name}
                    </h3>
                    <span className="text-xs font-medium text-[#b91c1c] block">
                      {author.designation || "वरिष्ठ संवाददाता"}
                    </span>
                    <span className="text-[11px] text-gray-400">
                      News Media Kiran Desk
                    </span>
                  </div>
                </div>

                <p className="text-xs text-gray-600 leading-relaxed line-clamp-3">
                  {author.bio ||
                    "News Media Kiran में वरिष्ठ पत्रकार के रूप में राष्ट्रीय, प्रांतीय एवं नीतिगत विश्लेषणों पर विशेष रिपोर्टिंग।"}
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                <span className="flex items-center gap-1 text-emerald-700 font-semibold text-[11px]">
                  <CheckCircle className="w-3.5 h-3.5" /> सत्यापित पत्रकार
                </span>
                <span className="text-gray-400">100+ ग्राउंड रिपोर्ट्स</span>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
