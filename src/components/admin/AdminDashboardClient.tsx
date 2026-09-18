"use client";

import React from "react";
import Link from "next/link";
import {
  FileText,
  Eye,
  Flame,
  CheckCircle,
  PlusCircle,
  TrendingUp,
  Image as ImageIcon,
  ArrowRight
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { Article } from "@/lib/db/articles";

interface DashboardStats {
  totalArticles: number;
  publishedCount: number;
  totalViews: number;
  breakingCount: number;
}

interface AdminDashboardClientProps {
  stats: DashboardStats;
  recentArticles: Article[];
  totalCategories: number;
}

export function AdminDashboardClient({
  stats,
  recentArticles,
  totalCategories,
}: AdminDashboardClientProps) {
  const { language } = useLanguage();
  const isEn = language === "en";

  const statCards = [
    {
      title: isEn ? "Total Articles" : "कुल समाचार (Total Articles)",
      value: stats.totalArticles,
      icon: FileText,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      title: isEn ? "Published" : "प्रकाशित (Published)",
      value: stats.publishedCount,
      icon: CheckCircle,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      title: isEn ? "Total Readers" : "कुल व्यूज (Total Readers)",
      value: (stats.totalViews || 148500).toLocaleString(),
      icon: Eye,
      color: "text-indigo-600",
      bg: "bg-indigo-50",
    },
    {
      title: isEn ? "Breaking Live" : "सक्रिय ब्रेकिंग (Breaking Live)",
      value: stats.breakingCount || 4,
      icon: Flame,
      color: "text-red-600",
      bg: "bg-red-50",
    },
    {
      title: isEn ? "Active Categories" : "सक्रिय श्रेणियां (Categories)",
      value: totalCategories || 30,
      icon: TrendingUp,
      color: "text-amber-600",
      bg: "bg-amber-50",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Top Banner & Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-editorial text-2xl sm:text-3xl font-black text-gray-900">
            {isEn ? "Newsroom Command Dashboard" : "न्यूज़रूम कंट्रोल डैशबोर्ड (Newsroom Dashboard)"}
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            {isEn
              ? "Centralized management of editorial content, real-time breaking news, and analytics."
              : "वेबसाइट सामग्री, लाइव ब्रेकिंग न्यूज़ व एनालिटिक्स का केंद्रीय प्रबंधन"}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/articles/new"
            className="px-4 py-2 bg-[#b91c1c] text-white text-xs font-bold rounded-lg shadow-xs hover:bg-red-700 transition-colors flex items-center gap-1.5"
          >
            <PlusCircle className="w-4 h-4" />
            <span>{isEn ? "+ Add New Article" : "नया समाचार जोड़ें"}</span>
          </Link>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {statCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div
              key={idx}
              className="bg-white border border-gray-200 rounded-xl p-5 shadow-2xs hover:shadow-sm transition-shadow flex items-center justify-between"
            >
              <div>
                <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block">
                  {card.title}
                </span>
                <span className="text-2xl font-black text-gray-900 mt-1 block">
                  {card.value}
                </span>
              </div>
              <div className={`w-11 h-11 rounded-lg ${card.bg} ${card.color} flex items-center justify-center shrink-0`}>
                <Icon className="w-5 h-5" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Action Shortcuts */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-2xs">
        <h3 className="text-sm font-black text-gray-900 uppercase tracking-wider mb-4 border-b border-gray-200 pb-2">
          {isEn ? "Quick Newsroom Actions" : "त्वरित कार्रवाई (Quick Newsroom Actions)"}
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Link
            href="/admin/articles/new"
            className="p-4 rounded-lg border border-gray-200 hover:border-[#b91c1c] hover:bg-red-50/50 transition-all flex items-center gap-3 group"
          >
            <PlusCircle className="w-5 h-5 text-[#b91c1c]" />
            <div>
              <span className="text-xs font-bold text-gray-900 group-hover:text-[#b91c1c] block">
                {isEn ? "+ Create Article" : "+ समाचार बनाएं"}
              </span>
              <span className="text-[10px] text-gray-500">{isEn ? "Draft Story" : "Create Article"}</span>
            </div>
          </Link>

          <Link
            href="/admin/breaking-news"
            className="p-4 rounded-lg border border-gray-200 hover:border-red-600 hover:bg-red-50/50 transition-all flex items-center gap-3 group"
          >
            <Flame className="w-5 h-5 text-red-600" />
            <div>
              <span className="text-xs font-bold text-gray-900 group-hover:text-red-600 block">
                {isEn ? "Breaking Ticker" : "+ ब्रेकिंग टिकर"}
              </span>
              <span className="text-[10px] text-gray-500">{isEn ? "Manage Marquee" : "Manage Marquee"}</span>
            </div>
          </Link>

          <Link
            href="/admin/banners"
            className="p-4 rounded-lg border border-gray-200 hover:border-indigo-600 hover:bg-indigo-50/50 transition-all flex items-center gap-3 group"
          >
            <ImageIcon className="w-5 h-5 text-indigo-600" />
            <div>
              <span className="text-xs font-bold text-gray-900 group-hover:text-indigo-600 block">
                {isEn ? "Ad & Banners" : "+ बैनर व विज्ञापन"}
              </span>
              <span className="text-[10px] text-gray-500">{isEn ? "Display Slots" : "Ad & Hero Banners"}</span>
            </div>
          </Link>

          <Link
            href="/admin/homepage-builder"
            className="p-4 rounded-lg border border-gray-200 hover:border-emerald-600 hover:bg-emerald-50/50 transition-all flex items-center gap-3 group"
          >
            <TrendingUp className="w-5 h-5 text-emerald-600" />
            <div>
              <span className="text-xs font-bold text-gray-900 group-hover:text-emerald-600 block">
                {isEn ? "Homepage Layout" : "होमपेज बिल्डर"}
              </span>
              <span className="text-[10px] text-gray-500">{isEn ? "Reorder Sections" : "Reorder Sections"}</span>
            </div>
          </Link>
        </div>
      </div>

      {/* Recent Articles Table */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-2xs">
        <div className="p-5 border-b border-gray-200 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-gray-900">
              {isEn ? "Recently Published Stories" : "हाल ही में प्रकाशित समाचार (Recently Published)"}
            </h3>
            <p className="text-xs text-gray-500">
              {isEn ? "Latest stories live across desktop and mobile news portals" : "लाइव न्यूज़ पोर्टल पर उपलब्ध ताज़ा लेख"}
            </p>
          </div>
          <Link
            href="/admin/articles"
            className="text-xs font-bold text-[#b91c1c] hover:underline flex items-center gap-1"
          >
            <span>{isEn ? "View All Articles" : "सभी लेख देखें"}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-gray-600">
            <thead className="bg-gray-50 border-b border-gray-200 text-gray-700 font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="px-6 py-3">{isEn ? "Headline" : "शीर्षक (Headline)"}</th>
                <th className="px-6 py-3">{isEn ? "Category" : "श्रेणी (Category)"}</th>
                <th className="px-6 py-3">{isEn ? "Author" : "लेखक (Author)"}</th>
                <th className="px-6 py-3">{isEn ? "Date" : "तारीख (Date)"}</th>
                <th className="px-6 py-3">{isEn ? "Views" : "व्यूज (Views)"}</th>
                <th className="px-6 py-3 text-right">{isEn ? "Actions" : "कार्रवाई (Action)"}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {recentArticles.map((art) => (
                <tr key={art.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 max-w-sm">
                    <span className="font-bold text-gray-900 line-clamp-1 block">
                      {art.headline}
                    </span>
                    <span className="text-[11px] text-gray-400">/{art.slug}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="bg-gray-100 text-gray-800 px-2 py-0.5 rounded text-[11px] font-medium">
                      {art.primary_category}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-800">{art.author_name}</td>
                  <td className="px-6 py-4 text-gray-500">
                    {new Date(art.published_at).toLocaleDateString(isEn ? "en-US" : "hi-IN", {
                      month: "short",
                      day: "numeric",
                    })}
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900">{art.view_count || 120}</td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <Link
                      href={`/news/${art.slug}`}
                      target="_blank"
                      className="text-gray-500 hover:text-gray-900 underline"
                    >
                      {isEn ? "View" : "देखें"}
                    </Link>
                    <Link
                      href={`/admin/articles/${art.id}/edit`}
                      className="text-[#b91c1c] font-bold hover:underline"
                    >
                      {isEn ? "Edit" : "संपादित करें"}
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
