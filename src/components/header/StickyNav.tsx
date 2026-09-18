"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, MoreHorizontal, Search, ChevronRight } from "lucide-react";

interface StickyNavProps {
  onToggleMegaMenu: () => void;
  onOpenSearch: () => void;
}

export function StickyNav({ onToggleMegaMenu, onOpenSearch }: StickyNavProps) {
  const [isSticky, setIsSticky] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 130) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "होम (Home)", href: "/" },
    { name: "ताज़ा खबरें", href: "/category/trending" },
    { name: "देश (India)", href: "/category/national" },
    { name: "राजस्थान", href: "/rajasthan" },
    { name: "राजनीति", href: "/category/politics" },
    { name: "क्राइम", href: "/category/crime" },
    { name: "व्यापार", href: "/category/business" },
    { name: "खेल", href: "/category/sports" },
    { name: "मनोरंजन", href: "/category/entertainment" },
    { name: "तकनीक", href: "/category/technology" },
    { name: "लाइफस्टाइल", href: "/category/lifestyle" },
    { name: "वीडियो", href: "/videos" },
  ];

  return (
    <nav
      className={`w-full z-40 transition-all duration-300 ${
        isSticky
          ? "fixed top-0 left-0 bg-white/95 backdrop-blur-md shadow-md border-b border-gray-200"
          : "relative bg-white border-b border-gray-200"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-12">
        {/* If sticky on desktop, show mini brand */}
        {isSticky && (
          <Link
            href="/"
            className="hidden lg:flex items-center gap-1.5 font-editorial text-lg font-black tracking-tight text-[#111827] uppercase mr-4 shrink-0 hover:text-[#b91c1c] transition-colors"
          >
            <span className="text-[#b91c1c]">●</span> News Media Kiran
          </Link>
        )}

        {/* Desktop Nav Items */}
        <div className="hidden lg:flex items-center gap-1 text-sm font-medium overflow-x-auto no-scrollbar">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`px-3 py-1.5 rounded text-xs tracking-wide whitespace-nowrap transition-colors ${
                  isActive
                    ? "text-[#b91c1c] font-bold bg-red-50"
                    : "text-gray-800 hover:text-[#b91c1c] hover:bg-gray-50"
                }`}
              >
                {item.name}
              </Link>
            );
          })}

          {/* More / Mega Menu Button */}
          <button
            onClick={onToggleMegaMenu}
            className="flex items-center gap-1 px-3 py-1.5 rounded text-xs font-semibold text-gray-700 hover:text-[#b91c1c] hover:bg-gray-100 transition-colors cursor-pointer whitespace-nowrap"
            aria-label="Open all categories"
          >
            <span>और श्रेणियां</span>
            <MoreHorizontal className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile Header Bar */}
        <div className="flex lg:hidden items-center justify-between w-full">
          <button
            onClick={onToggleMegaMenu}
            className="p-1.5 -ml-1 text-gray-700 hover:text-gray-900 cursor-pointer"
            aria-label="Toggle mobile menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <Link href="/" className="font-editorial text-lg font-black tracking-tight text-gray-900 uppercase">
            News Media Kiran
          </Link>

          <button
            onClick={onOpenSearch}
            className="p-1.5 -mr-1 text-gray-700 hover:text-gray-900 cursor-pointer"
            aria-label="Search"
          >
            <Search className="w-5 h-5" />
          </button>
        </div>

        {/* Right Search Button on Desktop */}
        <div className="hidden lg:flex items-center pl-4 border-l border-gray-200">
          <button
            onClick={onOpenSearch}
            className="p-1.5 rounded-full text-gray-600 hover:text-[#b91c1c] hover:bg-gray-100 transition-colors cursor-pointer"
            aria-label="Search articles"
          >
            <Search className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Mobile Horizontal Scroll Strip */}
      <div className="flex lg:hidden items-center gap-2 px-3 py-2 bg-gray-50 border-t border-gray-200 overflow-x-auto no-scrollbar text-xs font-medium text-gray-700">
        <Link href="/category/trending" className="shrink-0 px-2.5 py-1 bg-white border border-gray-200 rounded-full text-[#b91c1c] font-bold">
          ताज़ा
        </Link>
        <Link href="/category/national" className="shrink-0 px-2.5 py-1 bg-white border border-gray-200 rounded-full">
          देश
        </Link>
        <Link href="/rajasthan" className="shrink-0 px-2.5 py-1 bg-white border border-gray-200 rounded-full font-semibold text-amber-800">
          राजस्थान
        </Link>
        <Link href="/category/politics" className="shrink-0 px-2.5 py-1 bg-white border border-gray-200 rounded-full">
          राजनीति
        </Link>
        <Link href="/category/crime" className="shrink-0 px-2.5 py-1 bg-white border border-gray-200 rounded-full">
          क्राइम
        </Link>
        <Link href="/category/business" className="shrink-0 px-2.5 py-1 bg-white border border-gray-200 rounded-full">
          व्यापार
        </Link>
        <Link href="/category/sports" className="shrink-0 px-2.5 py-1 bg-white border border-gray-200 rounded-full">
          खेल
        </Link>
        <Link href="/videos" className="shrink-0 px-2.5 py-1 bg-white border border-gray-200 rounded-full text-blue-700 font-semibold">
          वीडियो
        </Link>
      </div>
    </nav>
  );
}
