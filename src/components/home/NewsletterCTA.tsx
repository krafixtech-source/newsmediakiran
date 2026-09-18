"use client";

import React, { useState } from "react";
import { Mail, CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export function NewsletterCTA() {
  const { language } = useLanguage();
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const isEn = language === "en";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
    }
  };

  return (
    <section id="newsletter-section" className="w-full max-w-7xl mx-auto px-4 my-8">
      <div className="bg-gray-50 border border-gray-200 text-gray-900 py-10 px-6 rounded-sm text-center">
        <div className="w-11 h-11 bg-white border border-gray-200 rounded-full flex items-center justify-center mx-auto mb-3 shadow-xs">
          <Mail className="w-5 h-5 text-[#b91c1c]" />
        </div>

        <span className="text-xs font-bold uppercase tracking-widest text-[#b91c1c] block mb-1">
          {isEn ? "Morning Briefing Dispatch" : "दैनिक मॉर्निंग ब्रीफिंग"}
        </span>

        <h2 className="font-editorial text-2xl sm:text-3xl font-black tracking-tight text-gray-900 mb-2">
          {isEn ? "Start Your Day With The 10 Essential Stories" : "दिन की शुरुआत बड़ी खबरों के साथ"}
        </h2>

        <p className="text-xs sm:text-sm text-gray-600 max-w-xl mx-auto mb-5 leading-relaxed">
          {isEn
            ? "Verified reporting, political analysis, and regional updates delivered straight to your inbox every morning. No spam."
            : "देश, दुनिया और राजस्थान की सबसे विश्वसनीय 10 बड़ी खबरें हर सुबह सीधे आपके इनबॉक्स में। कोई स्पैम नहीं।"}
        </p>

        {!isSubscribed ? (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center justify-center gap-2 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder={isEn ? "Enter your email address..." : "अपना ईमेल दर्ज करें..."}
              className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded text-xs text-gray-900 placeholder-gray-400 outline-none focus:border-[#b91c1c] transition-colors"
            />
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-2.5 bg-[#111827] hover:bg-[#b91c1c] text-white font-bold text-xs rounded shadow-xs transition-colors shrink-0 cursor-pointer"
            >
              {isEn ? "Subscribe" : "सब्सक्राइब करें"}
            </button>
          </form>
        ) : (
          <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-300 text-emerald-800 px-5 py-2.5 rounded text-xs font-semibold">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{isEn ? "Thank you! You are subscribed to News Media Kiran Morning Brief." : "धन्यवाद! आप न्यूज़ मीडिया किरण मॉर्निंग ब्रीफ से जुड़ चुके हैं।"}</span>
          </div>
        )}
      </div>
    </section>
  );
}
