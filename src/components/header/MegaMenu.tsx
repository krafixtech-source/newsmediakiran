"use client";

import React from "react";
import Link from "next/link";
import { X, ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface MegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MegaMenu({ isOpen, onClose }: MegaMenuProps) {
  const { language } = useLanguage();
  if (!isOpen) return null;

  const isEn = language === "en";

  const sections = [
    {
      title: isEn ? "News & National" : "मुख्य समाचार (News)",
      color: "border-red-600",
      items: [
        { name: isEn ? "Latest News" : "ताज़ा खबरें", href: "/category/trending" },
        { name: isEn ? "National (India)" : "देश (National)", href: "/category/national" },
        { name: isEn ? "Politics" : "राजनीति", href: "/category/politics" },
        { name: isEn ? "Crime & Justice" : "क्राइम व कानून", href: "/category/crime" },
        { name: isEn ? "World Affairs" : "विदेश समाचार", href: "/category/international" },
        { name: isEn ? "Editorials" : "संपादकीय", href: "/category/editorial" },
      ],
    },
    {
      title: isEn ? "Rajasthan Bureau" : "राजस्थान व क्षेत्र (Regions)",
      color: "border-amber-600",
      items: [
        { name: isEn ? "Rajasthan Hub" : "राजस्थान विशेष", href: "/rajasthan" },
        { name: isEn ? "Jaipur News" : "जयपुर", href: "/rajasthan/jaipur" },
        { name: isEn ? "Jodhpur News" : "जोधपुर", href: "/rajasthan/jodhpur" },
        { name: isEn ? "Udaipur News" : "उदयपुर", href: "/rajasthan/udaipur" },
        { name: isEn ? "Kota News" : "कोटा", href: "/rajasthan/kota" },
        { name: isEn ? "Ajmer News" : "अजमेर", href: "/rajasthan/ajmer" },
        { name: isEn ? "Bikaner News" : "बीकानेर", href: "/rajasthan/bikaner" },
      ],
    },
    {
      title: isEn ? "Business & Markets" : "व्यापार व अर्थजगत (Business)",
      color: "border-emerald-600",
      items: [
        { name: isEn ? "Stock Markets" : "शेयर बाज़ार", href: "/category/business" },
        { name: isEn ? "Gold & Silver Rates" : "सोने-चांदी के भाव", href: "/category/business" },
        { name: isEn ? "Indian Economy" : "भारतीय अर्थव्यवस्था", href: "/category/business" },
        { name: isEn ? "Startups & Tech" : "स्टार्टअप्स", href: "/category/business" },
        { name: isEn ? "Jobs & Career" : "नौकरी व करियर", href: "/category/education" },
        { name: isEn ? "Agriculture & Mandi" : "कृषि व ग्रामीण", href: "/category/agriculture" },
      ],
    },
    {
      title: isEn ? "Sports & Cricket" : "खेल (Sports)",
      color: "border-blue-600",
      items: [
        { name: isEn ? "Cricket News" : "क्रिकेट", href: "/category/sports" },
        { name: isEn ? "Live Scores & Updates" : "लाइव स्कोर", href: "/category/sports" },
        { name: isEn ? "Football & ISL" : "फुटबॉल", href: "/category/sports" },
        { name: isEn ? "Badminton & Tennis" : "टेनिस व अन्य खेल", href: "/category/sports" },
      ],
    },
    {
      title: isEn ? "Entertainment & Cinema" : "मनोरंजन (Entertainment)",
      color: "border-purple-600",
      items: [
        { name: isEn ? "Bollywood" : "बॉलीवुड", href: "/category/entertainment" },
        { name: isEn ? "Hollywood & Global" : "हॉलीवुड", href: "/category/entertainment" },
        { name: isEn ? "OTT Releases & Reviews" : "ओटीटी व मूवी रिव्यू", href: "/category/entertainment" },
        { name: isEn ? "Television" : "टेलीविजन", href: "/category/entertainment" },
      ],
    },
    {
      title: isEn ? "Tech & AI" : "डिजिटल व तकनीक (Digital & Tech)",
      color: "border-cyan-600",
      items: [
        { name: isEn ? "Artificial Intelligence" : "आर्टिफिशियल इंटेलिजेंस (AI)", href: "/category/technology" },
        { name: isEn ? "Mobiles & Gadgets" : "गैजेट्स व मोबाइल", href: "/category/technology" },
        { name: isEn ? "Cybersecurity & Safety" : "साइबर सुरक्षा", href: "/category/technology" },
        { name: isEn ? "Auto & EV" : "ऑटोमोबाइल व ईवी", href: "/category/auto" },
      ],
    },
    {
      title: isEn ? "Multimedia" : "मल्टीमीडिया (Multimedia)",
      color: "border-rose-600",
      items: [
        { name: isEn ? "Video News" : "वीडियो बुलेटिन", href: "/videos" },
        { name: isEn ? "Podcasts & Audio" : "पॉडकास्ट ऑडियो", href: "/podcasts" },
        { name: isEn ? "Shorts (9:16)" : "न्यूज़ शॉर्ट्स", href: "/#shorts-section" },
        { name: isEn ? "Photo Galleries" : "फोटो गैलरी", href: "/#photo-gallery" },
      ],
    },
    {
      title: isEn ? "Interactives & Brain Games" : "विशेष व मनोरंजक (Special)",
      color: "border-orange-600",
      items: [
        { name: isEn ? "Daily News Quiz" : "दैनिक क्विज़", href: "/quiz" },
        { name: isEn ? "Sudoku & Puzzles" : "सुडोकू व पहेलियां", href: "/puzzles" },
        { name: isEn ? "Explained Stories" : "एक्सप्लेंड विश्लेषण", href: "/#explained-section" },
        { name: isEn ? "Astrology & Horoscope" : "धर्म व ज्योतिष", href: "/category/religious" },
      ],
    },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-center animate-fadeIn">
      <div className="relative w-full max-w-7xl max-h-[90vh] my-auto mx-4 bg-[#ffffff] text-gray-900 rounded-lg shadow-2xl border border-gray-200 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-white">
          <div className="flex items-center gap-3">
            <span className="bg-[#b91c1c] text-white px-2.5 py-1 text-xs font-bold uppercase tracking-wider rounded">
              {isEn ? "All Sections" : "संपूर्ण विषय सूची"}
            </span>
            <span className="font-editorial text-xl font-bold text-gray-900">
              News Media Kiran — {isEn ? "Browse All 30 Beats" : "सभी 30 कैटेगरी"}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-900 transition-colors cursor-pointer"
            aria-label="Close menu"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Categories Grid */}
        <div className="p-6 overflow-y-auto max-h-[75vh] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 bg-[#fbfbfb]">
          {sections.map((section, idx) => (
            <div key={idx} className="bg-white p-4 rounded-md border border-gray-200 shadow-2xs">
              <h3 className={`text-xs font-bold text-gray-900 pb-2 mb-3 border-b-2 uppercase tracking-wide ${section.color}`}>
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.items.map((item, itemIdx) => (
                  <li key={itemIdx}>
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className="text-xs text-gray-700 hover:text-[#b91c1c] hover:translate-x-0.5 font-medium transition-all flex items-center justify-between group"
                    >
                      <span>{item.name}</span>
                      <ArrowRight className="w-3 h-3 text-gray-300 group-hover:text-[#b91c1c] transition-colors" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
