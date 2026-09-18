"use client";

import React from "react";
import Link from "next/link";
import { HelpCircle, ArrowRight, CheckCircle2 } from "lucide-react";
import { Article } from "@/lib/db/articles";
import { useLanguage } from "@/context/LanguageContext";

interface ExplainedSectionProps {
  articles: Article[];
}

export function ExplainedSection({ articles }: ExplainedSectionProps) {
  const { language } = useLanguage();
  if (!articles || articles.length === 0) return null;

  const isEn = language === "en";
  const lead = articles[0];

  const questions = isEn
    ? [
        { label: "What Happened?", text: "Full sequence of events, official announcements, and core decisions." },
        { label: "Why It Happened?", text: "Policy background, legal implications, and geopolitical factors." },
        { label: "Why It Matters?", text: "Direct impact on citizens, markets, businesses, and governance." },
        { label: "What Happens Next?", text: "Upcoming legislative steps, trials, and roadmap ahead." },
      ]
    : [
        { label: "क्या हुआ? (What Happened?)", text: "घटनाक्रम, आधिकारिक घोषणा और मुख्य बिंदु।" },
        { label: "क्यों हुआ? (Why It Happened?)", text: "नीतिगत पृष्ठभूमि, विवाद या तकनीकी कारण।" },
        { label: "इसका क्या प्रभाव होगा? (Why It Matters?)", text: "आम नागरिक, उद्योग और राज्य पर असर।" },
        { label: "आगे क्या होगा? (What Next?)", text: "आने वाले कानूनी व प्रशासनिक कदम।" },
      ];

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-8 bg-white border-b border-gray-200">
      <div className="flex items-center justify-between pb-3 mb-6 border-b border-gray-200">
        <div className="flex items-center gap-2.5">
          <HelpCircle className="w-5 h-5 text-[#b91c1c]" />
          <div>
            <h2 className="font-editorial text-2xl font-black text-gray-900 uppercase tracking-tight">
              {isEn ? "Explained • In-Depth Analysis" : "एक्सप्लेंड (Explained • इन-डेप्थ विश्लेषण)"}
            </h2>
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-sm p-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Lead Explainer Headline (Col 5) */}
          <div className="lg:col-span-5">
            <span className="bg-[#b91c1c] text-white text-[10px] font-bold px-2.5 py-1 uppercase tracking-wider rounded-xs">
              {isEn ? "Special Explainer" : "एक्सप्लेंड स्पेशल"}
            </span>
            <h3 className="font-editorial text-2xl sm:text-3xl font-black text-gray-900 mt-3 leading-snug">
              <Link href={`/news/${lead.slug}`} className="hover:text-[#b91c1c] transition-colors">
                {lead.headline}
              </Link>
            </h3>
            <p className="mt-3 text-xs sm:text-sm text-gray-600 leading-relaxed">
              {lead.excerpt}
            </p>
            <Link
              href={`/news/${lead.slug}`}
              className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-[#b91c1c] hover:underline"
            >
              <span>{isEn ? "Read Full Explainer Story" : "पूरा एक्सप्लेंड लेख पढ़ें"}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* 4 Question Breakdown Cards (Col 7) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {questions.map((q, idx) => (
              <div key={idx} className="bg-gray-50/70 border border-gray-200 p-4 rounded-xs">
                <div className="flex items-center gap-2 text-xs font-bold text-gray-900 mb-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#b91c1c]" />
                  <span>{q.label}</span>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {q.text}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
