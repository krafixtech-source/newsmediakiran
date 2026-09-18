"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  Search,
  Newspaper,
  User,
  ChevronDown,
  Sun,
  CloudSun,
  CloudRain,
  CloudDrizzle,
  CloudLightning,
  CloudFog,
  Flame,
  Globe,
  TrendingUp,
  Loader2,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { MegaMenu } from "./MegaMenu";
import { SearchModal } from "@/components/search/SearchModal";
import { CityWeather, CITIES_DATA } from "@/lib/weather";

interface SiteHeaderProps {
  initialCity?: string;
}

export function SiteHeader({ initialCity = "जयपुर" }: SiteHeaderProps) {
  const { language, setLanguage, t } = useLanguage();
  const [selectedCity, setSelectedCity] = useState(initialCity);
  const [weather, setWeather] = useState<CityWeather | null>(null);
  const [isLoadingWeather, setIsLoadingWeather] = useState(false);
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [currentDateStr, setCurrentDateStr] = useState("");
  const pathname = usePathname();

  // Restore saved city preference if available
  useEffect(() => {
    try {
      const savedCityKey = localStorage.getItem("nmk_selected_city");
      if (savedCityKey && CITIES_DATA[savedCityKey]) {
        setSelectedCity(language === "hi" ? CITIES_DATA[savedCityKey].hi : CITIES_DATA[savedCityKey].en);
      }
    } catch {}
  }, [language]);

  // Fetch live original weather whenever city changes
  useEffect(() => {
    let isMounted = true;
    const fetchWeather = async () => {
      setIsLoadingWeather(true);
      try {
        const res = await fetch(`/api/weather?city=${encodeURIComponent(selectedCity)}`);
        const json = await res.json();
        if (json.success && isMounted) {
          setWeather(json.weather);
        }
      } catch (err) {
        console.warn("Weather fetch error:", err);
      } finally {
        if (isMounted) setIsLoadingWeather(false);
      }
    };

    fetchWeather();
    // Live update every 10 minutes
    const interval = setInterval(fetchWeather, 600000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [selectedCity]);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 140);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const now = new Date();
    if (language === "hi") {
      const options: Intl.DateTimeFormatOptions = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      setCurrentDateStr(new Intl.DateTimeFormat("hi-IN", options).format(now));
    } else {
      const options: Intl.DateTimeFormatOptions = {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
      };
      setCurrentDateStr(new Intl.DateTimeFormat("en-US", options).format(now));
    }
  }, [language]);

  const renderWeatherIcon = () => {
    if (isLoadingWeather && !weather) {
      return <Loader2 className="w-3.5 h-3.5 text-gray-400 animate-spin" />;
    }
    const iconType = weather?.icon || "sun";
    switch (iconType) {
      case "cloud-sun":
        return <CloudSun className="w-3.5 h-3.5 text-amber-500" />;
      case "cloud-rain":
        return <CloudRain className="w-3.5 h-3.5 text-blue-500" />;
      case "cloud-drizzle":
        return <CloudDrizzle className="w-3.5 h-3.5 text-sky-500" />;
      case "cloud-lightning":
        return <CloudLightning className="w-3.5 h-3.5 text-amber-600" />;
      case "cloud-fog":
        return <CloudFog className="w-3.5 h-3.5 text-gray-400" />;
      case "sun":
      default:
        return <Sun className="w-3.5 h-3.5 text-amber-500" />;
    }
  };

  // Tier 1 Primary Navigation Items
  const tier1Nav = [
    { name: t("topNews"), href: "/" },
    { name: t("ePaper"), href: "/category/trending" },
    { name: t("cricket"), href: "/category/sports" },
    { name: t("indiaNews"), href: "/category/national" },
    { name: t("rajasthan"), href: "/rajasthan" },
    { name: t("entertainment"), href: "/category/entertainment" },
    { name: t("worldNews"), href: "/category/world" },
    { name: t("business"), href: "/category/business" },
    { name: t("lifestyle"), href: "/category/lifestyle" },
  ];

  // Tier 2 Secondary Sub-Navigation / Trending Topics
  const tier2Nav = [
    { name: t("trending"), href: "/category/trending", highlight: true },
    { name: t("jaipurBureau"), href: "/rajasthan/jaipur" },
    { name: t("crimeWatch"), href: "/category/crime" },
    { name: t("markets"), href: "/category/business" },
    { name: t("budget"), href: "/category/business" },
    { name: t("aiTech"), href: "/category/technology" },
    { name: t("factCheck"), href: "/category/fact-check" },
    { name: t("dailyQuiz"), href: "/quiz" },
    { name: t("puzzles"), href: "/puzzles" },
  ];

  return (
    <>
      {/* 1. Top Masthead Bar (Hindustan Times Style Reference) */}
      <header className="w-full bg-[#ffffff] border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-3 sm:py-4 flex items-center justify-between gap-4">
          
          {/* Left: Hamburger + Search + Date & Live Weather */}
          <div className="flex items-center gap-3 text-xs text-gray-600">
            <button
              onClick={() => setIsMegaMenuOpen(true)}
              className="p-1.5 hover:bg-gray-100 rounded text-gray-800 transition-colors flex items-center gap-1 cursor-pointer"
              aria-label="Open Menu"
              title="All Sections"
            >
              <Menu className="w-5 h-5" />
            </button>

            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-1.5 hover:bg-gray-100 rounded text-gray-800 transition-colors cursor-pointer"
              aria-label="Search"
              title="Search News"
            >
              <Search className="w-4 h-4" />
            </button>

            <span className="hidden sm:inline-block text-gray-300">|</span>

            {/* Date & Weather */}
            <div className="hidden md:flex items-center gap-2">
              <span className="font-medium text-gray-700">
                {currentDateStr || (language === "hi" ? "गुरुवार, 17 सितम्बर 2026" : "Thu, Sep 17, 2026")}
              </span>
              <span className="text-gray-300">|</span>
              <div className="relative">
                <button
                  onClick={() => setIsCityDropdownOpen(!isCityDropdownOpen)}
                  className="flex items-center gap-1.5 font-semibold text-gray-800 hover:text-[#b91c1c] transition-colors cursor-pointer group"
                  title={
                    weather
                      ? `${language === "hi" ? weather.cityNameHi : weather.cityNameEn}: ${weather.temp}°C (${language === "hi" ? weather.conditionHi : weather.conditionEn}, ${language === "hi" ? "नमी" : "Humidity"}: ${weather.humidity}%)`
                      : "Live Weather"
                  }
                >
                  {renderWeatherIcon()}
                  <span>
                    {weather
                      ? `${language === "hi" ? weather.cityNameHi : weather.cityNameEn} ${weather.temp}°C`
                      : `${selectedCity} ...`}
                  </span>
                  <ChevronDown className="w-3 h-3 text-gray-400 group-hover:text-[#b91c1c] transition-transform" />
                </button>

                {isCityDropdownOpen && (
                  <div className="absolute left-0 top-full mt-1.5 bg-white border border-gray-200 rounded-md shadow-xl py-1.5 w-44 z-50 text-xs divide-y divide-gray-100 max-h-64 overflow-y-auto">
                    <div className="px-3 py-1 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                      {language === "hi" ? "शहर चुनें (Live Weather)" : "Select City (Live Weather)"}
                    </div>
                    <div className="py-1">
                      {Object.entries(CITIES_DATA).map(([key, data]) => {
                        const isSelected =
                          selectedCity.toLowerCase() === key ||
                          selectedCity === data.hi ||
                          selectedCity === data.en;
                        return (
                          <button
                            key={key}
                            onClick={() => {
                              const newName = language === "hi" ? data.hi : data.en;
                              setSelectedCity(newName);
                              setIsCityDropdownOpen(false);
                              try {
                                localStorage.setItem("nmk_selected_city", key);
                              } catch {}
                            }}
                            className={`w-full text-left px-3 py-1.5 hover:bg-red-50/60 transition-colors flex items-center justify-between ${
                              isSelected ? "text-[#b91c1c] font-bold bg-red-50/70" : "text-gray-700"
                            }`}
                          >
                            <span>{language === "hi" ? data.hi : data.en}</span>
                            <span className="text-[10px] text-gray-400 uppercase">{data.en}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Center: Brand Masthead */}
          <div className="text-center">
            <Link href="/" className="inline-block group" aria-label="News Media Kiran Home">
              <div className="flex items-center justify-center gap-1.5">
                <span className="font-editorial text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-[#111827] uppercase group-hover:text-[#b91c1c] transition-colors duration-200">
                  News Media Kiran
                </span>
                <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-[#b91c1c] mb-1 shrink-0"></span>
              </div>
            </Link>
          </div>

          {/* Right: Language Switcher + E-Paper + Admin */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Language Switcher Pill */}
            <div className="flex items-center border border-gray-300 rounded-full p-0.5 bg-gray-50 text-xs font-semibold">
              <button
                onClick={() => setLanguage("en")}
                className={`px-2.5 py-1 rounded-full transition-all cursor-pointer ${
                  language === "en"
                    ? "bg-[#111827] text-white shadow-xs font-bold"
                    : "text-gray-600 hover:text-black"
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage("hi")}
                className={`px-2.5 py-1 rounded-full transition-all cursor-pointer ${
                  language === "hi"
                    ? "bg-[#b91c1c] text-white shadow-xs font-bold font-hindi"
                    : "text-gray-600 hover:text-black font-hindi"
                }`}
              >
                हिंदी
              </button>
            </div>

            {/* E-Paper Button (Reference 2 style) */}
            <Link
              href="/category/trending"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1 bg-white border border-gray-300 hover:border-gray-400 rounded text-xs font-semibold text-gray-800 transition-colors"
            >
              <Newspaper className="w-3.5 h-3.5 text-gray-500" />
              <span>{t("ePaper")}</span>
            </Link>

            {/* Admin CMS Direct Link */}
            <Link
              href="/admin/dashboard"
              className="hidden lg:flex items-center gap-1 px-3 py-1 bg-[#111827] hover:bg-[#b91c1c] text-white rounded text-xs font-bold transition-colors"
            >
              <span>Admin</span>
            </Link>

            {/* Profile/Login Icon */}
            <Link
              href="/admin/login"
              className="p-1.5 border border-gray-200 hover:border-gray-300 rounded-full text-gray-700 transition-colors"
              aria-label="Account Login"
              title="Newsroom Login"
            >
              <User className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </header>

      {/* 2. Tier 1 Primary Navigation Bar */}
      <nav
        className={`w-full bg-white z-40 border-b border-gray-200 transition-all duration-200 ${
          isSticky
            ? "fixed top-0 left-0 shadow-md backdrop-blur-md bg-white/95"
            : "relative"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-11">
          {/* Sticky Mini Brand */}
          {isSticky && (
            <Link
              href="/"
              className="hidden lg:flex items-center gap-1 font-editorial text-lg font-black tracking-tight text-[#111827] uppercase mr-5 shrink-0 hover:text-[#b91c1c]"
            >
              <span className="text-[#b91c1c]">●</span> NMK
            </Link>
          )}

          {/* Tier 1 Links (English by Default / Hindi reactive) */}
          <div className="flex items-center space-x-1 sm:space-x-2 overflow-x-auto no-scrollbar text-xs font-semibold text-gray-800 py-1">
            {tier1Nav.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-2.5 py-1.5 whitespace-nowrap transition-colors relative ${
                    isActive
                      ? "text-[#b91c1c] font-bold"
                      : "text-gray-700 hover:text-[#b91c1c]"
                  }`}
                >
                  {item.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-2.5 right-2.5 h-0.5 bg-[#b91c1c]"></span>
                  )}
                </Link>
              );
            })}

            {/* + 21 More Dropdown Trigger */}
            <button
              onClick={() => setIsMegaMenuOpen(true)}
              className="flex items-center gap-1 px-2.5 py-1.5 whitespace-nowrap text-gray-600 hover:text-black font-semibold cursor-pointer"
            >
              <span>{t("moreCategories")}</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Sticky Right Fast Controls */}
          {isSticky && (
            <div className="hidden sm:flex items-center gap-2">
              <button
                onClick={() => setLanguage(language === "en" ? "hi" : "en")}
                className="px-2 py-0.5 border border-gray-300 rounded text-[11px] font-bold text-gray-700 hover:bg-gray-100 cursor-pointer"
              >
                {language === "en" ? "हिंदी" : "EN"}
              </button>
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-1 hover:bg-gray-100 rounded text-gray-700 cursor-pointer"
              >
                <Search className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* 3. Tier 2 Secondary Sub-Navigation / Trending Topics Bar (Hindustan Times Style) */}
      <div className="w-full bg-[#fdfdfd] border-b border-gray-200 py-2">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between text-xs text-gray-600">
          <div className="flex items-center space-x-4 overflow-x-auto no-scrollbar">
            {tier2Nav.map((topic) => (
              <Link
                key={topic.name}
                href={topic.href}
                className={`whitespace-nowrap transition-colors flex items-center gap-1 ${
                  topic.highlight
                    ? "font-bold text-[#b91c1c] hover:text-[#991b1b]"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {topic.highlight && <Flame className="w-3 h-3 text-[#b91c1c] shrink-0" />}
                <span>{topic.name}</span>
              </Link>
            ))}

            <button
              onClick={() => setIsMegaMenuOpen(true)}
              className="flex items-center gap-0.5 whitespace-nowrap text-gray-500 hover:text-black cursor-pointer font-medium"
            >
              <span>{t("moreTopics")}</span>
              <ChevronDown className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* Overlays */}
      <MegaMenu isOpen={isMegaMenuOpen} onClose={() => setIsMegaMenuOpen(false)} />
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
