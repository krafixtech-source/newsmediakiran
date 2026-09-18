"use client";

import React from "react";
import Link from "next/link";
import { FacebookIcon, YouTubeIcon, InstagramIcon, TwitterIcon } from "@/components/common/SocialIcons";
import { useLanguage } from "@/context/LanguageContext";

export function Footer() {
  const { language } = useLanguage();
  const isEn = language === "en";

  return (
    <footer className="w-full bg-[#fbfbfb] text-gray-700 border-t border-gray-300 pt-14 pb-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Top Masthead & Mission */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-gray-200 pb-8 mb-10 gap-6">
          <div>
            <Link href="/" className="inline-block">
              <span className="font-editorial text-3xl sm:text-4xl font-black text-gray-900 uppercase tracking-tight hover:text-[#b91c1c] transition-colors">
                News Media Kiran
              </span>
            </Link>
            <p className="text-xs text-gray-600 mt-2 max-w-xl leading-relaxed">
              {isEn
                ? "A premier digital newsroom dedicated to truth, courage, and independent journalism. Delivering verified, objective, and timely reporting from Rajasthan, India, and across the globe."
                : "विश्वसनीयता, निर्भीकता और निष्पक्ष पत्रकारिता का प्रमुख डिजिटल मंच। देश, दुनिया और राजस्थान के हर कोने से सटीक, निष्पक्ष और त्वरित समाचार।"}
            </p>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-3">
            <a
              href="https://facebook.com/newsmediakiran"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-white border border-gray-200 hover:bg-[#1877F2] hover:text-white text-gray-700 flex items-center justify-center transition-colors shadow-2xs"
              aria-label="Facebook"
            >
              <FacebookIcon className="w-4 h-4" />
            </a>
            <a
              href="https://youtube.com/@newsmediakiran"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-white border border-gray-200 hover:bg-[#FF0000] hover:text-white text-gray-700 flex items-center justify-center transition-colors shadow-2xs"
              aria-label="YouTube"
            >
              <YouTubeIcon className="w-4 h-4" />
            </a>
            <a
              href="https://instagram.com/newsmediakiran"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-white border border-gray-200 hover:bg-[#E4405F] hover:text-white text-gray-700 flex items-center justify-center transition-colors shadow-2xs"
              aria-label="Instagram"
            >
              <InstagramIcon className="w-4 h-4" />
            </a>
            <a
              href="https://twitter.com/newsmediakiran"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-white border border-gray-200 hover:bg-black hover:text-white text-gray-700 flex items-center justify-center transition-colors shadow-2xs"
              aria-label="X (Twitter)"
            >
              <TwitterIcon className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* 5 Column Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 mb-12 text-xs">
          
          {/* Col 1: News Beat */}
          <div>
            <h4 className="text-gray-900 font-bold uppercase tracking-wider mb-4 border-b border-gray-200 pb-2 text-[11px]">
              {isEn ? "News Coverage" : "समाचार (News)"}
            </h4>
            <ul className="space-y-2.5 text-gray-600">
              <li><Link href="/category/national" className="hover:text-black transition-colors">{isEn ? "India News" : "देश (National)"}</Link></li>
              <li><Link href="/rajasthan" className="hover:text-black transition-colors font-semibold text-[#b91c1c]">{isEn ? "Rajasthan Bureau" : "राजस्थान (Rajasthan)"}</Link></li>
              <li><Link href="/category/politics" className="hover:text-black transition-colors">{isEn ? "Politics & Governance" : "राजनीति (Politics)"}</Link></li>
              <li><Link href="/category/crime" className="hover:text-black transition-colors">{isEn ? "Crime & Investigation" : "क्राइम (Crime)"}</Link></li>
              <li><Link href="/category/business" className="hover:text-black transition-colors">{isEn ? "Economy & Markets" : "व्यापार (Business)"}</Link></li>
              <li><Link href="/category/international" className="hover:text-black transition-colors">{isEn ? "World Affairs" : "विदेश (World)"}</Link></li>
              <li><Link href="/category/trending" className="hover:text-black transition-colors">{isEn ? "Trending Updates" : "ताज़ा अपडेट्स (Latest)"}</Link></li>
            </ul>
          </div>

          {/* Col 2: Life & Entertainment */}
          <div>
            <h4 className="text-gray-900 font-bold uppercase tracking-wider mb-4 border-b border-gray-200 pb-2 text-[11px]">
              {isEn ? "Life & Leisure" : "मनोरंजन व जीवन"}
            </h4>
            <ul className="space-y-2.5 text-gray-600">
              <li><Link href="/category/entertainment" className="hover:text-black transition-colors">{isEn ? "Cinema & OTT" : "बॉलीवुड (Bollywood)"}</Link></li>
              <li><Link href="/category/sports" className="hover:text-black transition-colors">{isEn ? "Cricket & Sports" : "खेल (Sports & Cricket)"}</Link></li>
              <li><Link href="/category/technology" className="hover:text-black transition-colors">{isEn ? "AI & Tech Desk" : "तकनीक (Technology)"}</Link></li>
              <li><Link href="/category/lifestyle" className="hover:text-black transition-colors">{isEn ? "Health & Lifestyle" : "लाइफस्टाइल व सेहत"}</Link></li>
              <li><Link href="/category/religious" className="hover:text-black transition-colors">{isEn ? "Culture & Heritage" : "धर्म व ज्योतिष"}</Link></li>
              <li><Link href="/cartoons" className="hover:text-black transition-colors">{isEn ? "Editorial Cartoons" : "व्यंग्य चित्र"}</Link></li>
            </ul>
          </div>

          {/* Col 3: Multimedia & Specials */}
          <div>
            <h4 className="text-gray-900 font-bold uppercase tracking-wider mb-4 border-b border-gray-200 pb-2 text-[11px]">
              {isEn ? "Multimedia" : "मल्टीमीडिया व फीचर्स"}
            </h4>
            <ul className="space-y-2.5 text-gray-600">
              <li><Link href="/videos" className="hover:text-black transition-colors">{isEn ? "Video Ground Reports" : "वीडियो (Videos)"}</Link></li>
              <li><Link href="/podcasts" className="hover:text-black transition-colors">{isEn ? "Audio Podcasts" : "पॉडकास्ट (Podcasts)"}</Link></li>
              <li><Link href="/#shorts-section" className="hover:text-black transition-colors">{isEn ? "Shorts (9:16)" : "शॉर्ट्स (Shorts 9:16)"}</Link></li>
              <li><Link href="/puzzles" className="hover:text-black transition-colors">{isEn ? "Daily Sudoku & Crossword" : "डेली पज़ल्स व सुडोकू"}</Link></li>
              <li><Link href="/quiz" className="hover:text-black transition-colors">{isEn ? "Daily News Quiz" : "दैनिक क्विज़ (Daily Quiz)"}</Link></li>
              <li><Link href="/epaper" className="hover:text-black transition-colors">{isEn ? "Digital E-Paper" : "डिजिटल ई-पेपर"}</Link></li>
            </ul>
          </div>

          {/* Col 4: Institutional & Company */}
          <div>
            <h4 className="text-gray-900 font-bold uppercase tracking-wider mb-4 border-b border-gray-200 pb-2 text-[11px]">
              {isEn ? "Company" : "संस्थान (Company)"}
            </h4>
            <ul className="space-y-2.5 text-gray-600">
              <li><Link href="/about-us" className="hover:text-black transition-colors">{isEn ? "About Us" : "हमारे बारे में (About Us)"}</Link></li>
              <li><Link href="/our-team" className="hover:text-black transition-colors">{isEn ? "Editorial Team" : "संपादकीय टीम (Our Team)"}</Link></li>
              <li><Link href="/contact-info" className="hover:text-black transition-colors">{isEn ? "Contact Bureau" : "संपर्क करें (Contact)"}</Link></li>
              <li><Link href="/contact-info" className="hover:text-black transition-colors">{isEn ? "Advertise With Us" : "विज्ञापन दें (Advertise)"}</Link></li>
              <li><Link href="/admin/login" className="hover:text-amber-700 transition-colors font-medium">{isEn ? "Newsroom CMS Login" : "न्यूज़रूम CMS लॉगिन"}</Link></li>
            </ul>
          </div>

          {/* Col 5: Policies & Ethics */}
          <div>
            <h4 className="text-gray-900 font-bold uppercase tracking-wider mb-4 border-b border-gray-200 pb-2 text-[11px]">
              {isEn ? "Ethics & Policies" : "नीतियां व आचार संहिता"}
            </h4>
            <ul className="space-y-2.5 text-gray-600">
              <li><Link href="/editorial-policy" className="hover:text-black transition-colors">{isEn ? "Editorial Policy" : "संपादकीय नीति (Editorial)"}</Link></li>
              <li><Link href="/fact-check" className="hover:text-black transition-colors">{isEn ? "Fact Check Standards" : "तथ्य जांच (Fact Check)"}</Link></li>
              <li><Link href="/corrections" className="hover:text-black transition-colors">{isEn ? "Correction Policy" : "सुधार नीति (Corrections)"}</Link></li>
              <li><Link href="/privacy-policy" className="hover:text-black transition-colors">{isEn ? "Privacy Policy" : "गोपनीयता नीति (Privacy)"}</Link></li>
              <li><Link href="/disclaimer" className="hover:text-black transition-colors">{isEn ? "Terms & Disclaimer" : "अस्वीकरण (Disclaimer)"}</Link></li>
              <li><Link href="/sitemap.xml" className="hover:text-black transition-colors">{isEn ? "XML Sitemap" : "साइटमैप (Sitemap)"}</Link></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar with Copyright */}
        <div className="border-t border-gray-200 pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-gray-500 gap-4">
          <p>© 2026 News Media Kiran. {isEn ? "All Rights Reserved." : "सर्वाधिकार सुरक्षित। All Rights Reserved."}</p>
          <div className="flex items-center gap-4">
            <span>Powered by Next.js & Hostinger Database</span>
            <span>•</span>
            <span>{isEn ? "Certified Digital Journalism Standard" : "निर्मित: भारतीय डिजिटल पत्रकारिता मानक"}</span>
          </div>
        </div>

      </div>
    </footer>
  );
}

