import React from "react";
import Link from "next/link";
import { MessageCircle, TrendingUp } from "lucide-react";

interface BrandHeaderProps {
  selectedCity: string;
}

export function BrandHeader({ selectedCity }: BrandHeaderProps) {
  return (
    <header className="w-full bg-[#faf9f6] border-b border-gray-200 py-4 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Left: Regional Edition & Trust Tag */}
        <div className="hidden lg:flex flex-col text-left text-xs text-gray-500 space-y-1">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-600"></span>
            <span className="font-semibold text-gray-800 uppercase tracking-wider">डिजिटल न्यूज़रूम</span>
          </div>
          <p className="text-gray-600 text-[11px]">
            राजस्थान, भारत एवं वैश्विक निष्पक्ष पत्रकारिता
          </p>
          <div className="flex items-center gap-2 pt-0.5">
            <span className="bg-gray-100 border border-gray-300 text-gray-700 px-2 py-0.5 rounded text-[10px] font-medium">
              संस्करण: {selectedCity}
            </span>
            <span className="text-[10px] text-gray-400">RNI: 2026/NMK/DIGITAL</span>
          </div>
        </div>

        {/* Center: Major Masthead */}
        <div className="text-center flex flex-col items-center">
          <Link href="/" className="group inline-block" aria-label="News Media Kiran Homepage">
            <h1 className="font-editorial text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-[#111827] uppercase group-hover:text-[#b91c1c] transition-colors duration-200">
              News Media Kiran
            </h1>
          </Link>
          <div className="flex items-center justify-center gap-3 mt-1.5 text-xs sm:text-sm text-gray-600 font-medium font-hindi">
            <span className="text-[#b91c1c] font-bold">●</span>
            <span>विश्वसनीयता</span>
            <span className="text-gray-300">•</span>
            <span>निर्भीकता</span>
            <span className="text-gray-300">•</span>
            <span>निष्पक्षता</span>
          </div>
        </div>

        {/* Right: WhatsApp Community & Quick Market */}
        <div className="hidden md:flex flex-col items-end gap-2 text-right">
          <a
            href="https://whatsapp.com/channel/newsmediakiran"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm transition-all hover:scale-105"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>व्हाट्सएप चैनल से जुड़ें</span>
          </a>

          <div className="flex items-center gap-3 text-xs bg-gray-50 border border-gray-200 px-2.5 py-1 rounded">
            <div className="flex items-center gap-1 text-emerald-700 font-medium">
              <TrendingUp className="w-3 h-3" />
              <span>SENSEX: 82,450 (+0.42%)</span>
            </div>
            <span className="text-gray-300">|</span>
            <div className="text-emerald-700 font-medium">
              <span>NIFTY: 25,210 (+0.38%)</span>
            </div>
          </div>
        </div>

      </div>
    </header>
  );
}
