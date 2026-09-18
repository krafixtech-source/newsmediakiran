"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Search, User, Newspaper, Mail, ChevronDown, Sun } from "lucide-react";

interface TopUtilityBarProps {
  onOpenSearch: () => void;
  onOpenNewsletter: () => void;
  selectedCity: string;
  onSelectCity: (city: string) => void;
}

export function TopUtilityBar({
  onOpenSearch,
  onOpenNewsletter,
  selectedCity,
  onSelectCity,
}: TopUtilityBarProps) {
  const [currentDateStr, setCurrentDateStr] = useState("");
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);

  const cities = ["जयपुर", "जोधपुर", "उदयपुर", "कोटा", "अजमेर", "बीकानेर", "नई दिल्ली", "पटना", "रांची"];

  useEffect(() => {
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const hindiDate = new Intl.DateTimeFormat("hi-IN", options).format(now);
    setCurrentDateStr(hindiDate);
  }, []);

  return (
    <div className="w-full bg-[#111827] text-[#e5e7eb] text-xs py-1.5 px-4 border-b border-gray-800">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        {/* Left: Date & City Edition */}
        <div className="flex items-center gap-4">
          <span className="text-gray-300 font-medium">
            {currentDateStr || "गुरुवार, 17 सितम्बर 2026"}
          </span>

          <span className="hidden sm:inline-block text-gray-600">|</span>

          {/* City Edition Picker */}
          <div className="relative">
            <button
              onClick={() => setIsCityDropdownOpen(!isCityDropdownOpen)}
              className="flex items-center gap-1 text-gray-300 hover:text-white transition-colors cursor-pointer"
              aria-label="Select city edition"
            >
              <span className="text-gray-400">संस्करण:</span>
              <span className="font-semibold text-amber-400">{selectedCity}</span>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
            </button>

            {isCityDropdownOpen && (
              <div className="absolute top-full left-0 mt-1 bg-white text-gray-900 shadow-xl rounded-md border border-gray-200 py-1.5 z-50 min-w-[130px]">
                {cities.map((city) => (
                  <button
                    key={city}
                    onClick={() => {
                      onSelectCity(city);
                      setIsCityDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-xs hover:bg-gray-100 transition-colors ${
                      selectedCity === city ? "font-bold text-[#b91c1c] bg-red-50" : ""
                    }`}
                  >
                    {city}
                  </button>
                ))}
              </div>
            )}
          </div>

          <span className="hidden md:inline-block text-gray-600">|</span>

          {/* Quick Weather */}
          <div className="hidden md:flex items-center gap-1.5 text-gray-300">
            <Sun className="w-3.5 h-3.5 text-amber-400" />
            <span>{selectedCity} 32°C धूप</span>
          </div>
        </div>

        {/* Right: Quick Links */}
        <div className="flex items-center gap-4">
          <Link
            href="/epaper"
            className="flex items-center gap-1 text-gray-300 hover:text-amber-400 transition-colors"
          >
            <Newspaper className="w-3.5 h-3.5" />
            <span>ई-पेपर (E-Paper)</span>
          </Link>

          <span className="hidden sm:inline-block text-gray-600">|</span>

          <button
            onClick={onOpenNewsletter}
            className="hidden sm:flex items-center gap-1 text-gray-300 hover:text-amber-400 transition-colors cursor-pointer"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>न्यूज़लेटर</span>
          </button>

          <span className="text-gray-600">|</span>

          <button
            onClick={onOpenSearch}
            className="flex items-center gap-1 text-gray-300 hover:text-white transition-colors cursor-pointer"
            aria-label="Search"
          >
            <Search className="w-3.5 h-3.5" />
            <span>खोजें</span>
          </button>

          <span className="text-gray-600">|</span>

          <Link
            href="/admin/login"
            className="flex items-center gap-1 text-gray-300 hover:text-amber-400 transition-colors"
          >
            <User className="w-3.5 h-3.5" />
            <span>न्यूज़रूम लॉगिन</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
