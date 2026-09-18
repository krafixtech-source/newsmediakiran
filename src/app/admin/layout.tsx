"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  PlusCircle,
  Flame,
  Image as ImageIcon,
  Sliders,
  Settings,
  Radio,
  LogOut,
  ExternalLink,
  Shield,
  Menu,
  X,
  Globe,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { language, setLanguage } = useLanguage();
  const isEn = language === "en";

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // If on login page, don't show admin chrome
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const navLinks = [
    { name: isEn ? "Dashboard" : "डैशबोर्ड (Dashboard)", href: "/admin/dashboard", icon: LayoutDashboard },
    { name: isEn ? "All Articles" : "सभी लेख (Articles)", href: "/admin/articles", icon: FileText },
    { name: isEn ? "+ Add New Article" : "नया लेख जोड़ें (+ Add News)", href: "/admin/articles/new", icon: PlusCircle },
    { name: isEn ? "Breaking News Ticker" : "ब्रेकिंग न्यूज़ (Breaking)", href: "/admin/breaking-news", icon: Flame },
    { name: isEn ? "Banners & Ad Slots" : "विज्ञापन व बैनर (Banners)", href: "/admin/banners", icon: ImageIcon },
    { name: isEn ? "Homepage Layout Builder" : "होमपेज बिल्डर (Layout)", href: "/admin/homepage-builder", icon: Sliders },
    { name: isEn ? "Categories (30)" : "श्रेणियां (Categories)", href: "/admin/categories", icon: Shield },
    { name: isEn ? "Settings & DB Connection" : "सेटिंग्स व Hostinger DB", href: "/admin/settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row text-gray-900 font-sans antialiased">
      {/* Mobile Top Nav */}
      <div className="md:hidden bg-[#0f172a] text-white p-4 flex items-center justify-between border-b border-gray-800">
        <Link href="/admin/dashboard" className="font-editorial text-lg font-black tracking-wider uppercase">
          Newsroom CMS
        </Link>
        <div className="flex items-center gap-2">
          {/* Mobile Language Switcher */}
          <button
            onClick={() => setLanguage(isEn ? "hi" : "en")}
            className="px-2.5 py-1 rounded bg-gray-800 hover:bg-gray-700 text-xs font-bold text-amber-300 flex items-center gap-1 border border-gray-700"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>{isEn ? "हिंदी" : "EN"}</span>
          </button>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-1 rounded text-gray-300 hover:text-white"
          >
            {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed md:sticky top-0 left-0 z-40 h-screen w-64 bg-[#0f172a] text-gray-300 flex flex-col justify-between transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div>
          {/* Logo Header */}
          <div className="p-5 border-b border-gray-800">
            <Link href="/" className="group block">
              <span className="text-[10px] font-bold text-red-400 uppercase tracking-widest block">
                NEWS MEDIA KIRAN
              </span>
              <h2 className="font-editorial text-xl font-black text-white group-hover:text-red-400 transition-colors">
                Newsroom CMS
              </h2>
            </Link>
            <div className="mt-2 flex items-center gap-2 text-[11px] text-gray-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>{isEn ? "Super Admin • Chief Desk" : "सुपर एडमिन • मुख्य डेस्क"}</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1">
            {navLinks.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-xs font-semibold transition-colors ${
                    isActive
                      ? "bg-[#b91c1c] text-white shadow-xs"
                      : "text-gray-300 hover:bg-gray-800/80 hover:text-white"
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer with Live Auto-Sync indicator and Site link */}
        <div className="p-4 border-t border-gray-800 space-y-3">
          {/* Automatic Live Sync Status */}
          <div className="flex items-center gap-2.5 px-3 py-2 bg-emerald-950/40 border border-emerald-800/60 rounded-md text-[11px] font-semibold text-emerald-400">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <div className="flex flex-col min-w-0">
              <span className="truncate">{isEn ? "Live Auto-Sync Active" : "स्वचालित सिंक सक्रिय"}</span>
              <span className="text-[9px] text-gray-400 truncate">newsmediakiran.com 24/7</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-gray-400 pt-1">
            <Link href="/" target="_blank" className="flex items-center gap-1 hover:text-white">
              <span>{isEn ? "Live Portal" : "लाइव साइट"}</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
            <Link href="/admin/login" className="flex items-center gap-1 hover:text-red-400">
              <LogOut className="w-3 h-3" />
              <span>{isEn ? "Sign Out" : "लॉगआउट"}</span>
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content Viewport */}
      <div className="flex-1 flex flex-col min-h-screen">
        <header className="bg-white border-b border-gray-200 h-14 px-6 flex items-center justify-between shadow-2xs">
          <div className="text-xs text-gray-500 font-medium">
            {isEn
              ? "News Media Kiran CMS • Edition v3.2 Production"
              : "न्यूज़ मीडिया किरण CMS • संस्करण v3.2 Production"}
          </div>

          <div className="flex items-center gap-3">
            {/* Language Switcher Pill Button */}
            <button
              onClick={() => setLanguage(isEn ? "hi" : "en")}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gray-300 bg-gray-50 hover:bg-gray-100 text-gray-700 text-xs font-bold transition-all shadow-2xs cursor-pointer"
              title={isEn ? "हिंदी में बदलें (Switch to Hindi)" : "Switch to English"}
            >
              <Globe className="w-3.5 h-3.5 text-gray-500" />
              <span className={isEn ? "text-gray-900 font-black" : "text-gray-400"}>EN</span>
              <span className="text-gray-300">|</span>
              <span className={!isEn ? "text-[#b91c1c] font-black" : "text-gray-400"}>हिंदी</span>
            </button>

            {/* Add New Story Action Button */}
            <Link
              href="/admin/articles/new"
              className="px-3.5 py-1.5 bg-[#b91c1c] text-white text-xs font-bold rounded shadow-xs hover:bg-red-700 transition-colors flex items-center gap-1.5"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>{isEn ? "+ New Article" : "+ नया समाचार (New Story)"}</span>
            </Link>
          </div>
        </header>

        <main className="p-6 flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}

