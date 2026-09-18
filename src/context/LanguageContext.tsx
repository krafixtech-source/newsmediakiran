"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type Language = "en" | "hi";

interface Translations {
  // Navigation Tier 1
  topNews: string;
  ePaper: string;
  indiaNews: string;
  rajasthan: string;
  worldNews: string;
  business: string;
  cricket: string;
  entertainment: string;
  technology: string;
  lifestyle: string;
  moreCategories: string;

  // Navigation Tier 2
  trending: string;
  jaipurBureau: string;
  crimeWatch: string;
  markets: string;
  budget: string;
  aiTech: string;
  factCheck: string;
  dailyQuiz: string;
  puzzles: string;
  moreTopics: string;

  // Common UI
  searchPlaceholder: string;
  readTime: string;
  updated: string;
  share: string;
  bookmark: string;
  copyLink: string;
  copied: string;
  latestNews: string;
  topStories: string;
  opinion: string;
  mostRead: string;
  multimedia: string;
  videos: string;
  subscribe: string;
  newsletterTitle: string;
  newsletterDesc: string;
  weatherCity: string;
}

const translations: Record<Language, Translations> = {
  en: {
    topNews: "Top News",
    ePaper: "E-Paper",
    indiaNews: "India News",
    rajasthan: "Rajasthan",
    worldNews: "World News",
    business: "Business",
    cricket: "Cricket",
    entertainment: "Entertainment",
    technology: "Technology",
    lifestyle: "Lifestyle",
    moreCategories: "+ 21 More",

    trending: "Trending",
    jaipurBureau: "Jaipur Bureau",
    crimeWatch: "Crime Watch",
    markets: "Stock Markets",
    budget: "Budget 2026",
    aiTech: "AI & Tech",
    factCheck: "Fact Check",
    dailyQuiz: "Daily Quiz",
    puzzles: "Puzzles",
    moreTopics: "+ 3 More",

    searchPlaceholder: "Search latest news, topics, stories...",
    readTime: "min read",
    updated: "Updated",
    share: "Share",
    bookmark: "Save",
    copyLink: "Copy Link",
    copied: "Copied!",
    latestNews: "Latest News",
    topStories: "Top Stories",
    opinion: "Opinion & Editorials",
    mostRead: "Most Read",
    multimedia: "Videos & Audio",
    videos: "Videos",
    subscribe: "Subscribe",
    newsletterTitle: "Get Morning Briefing in Your Inbox",
    newsletterDesc: "Join 150,000+ readers who start their day with News Media Kiran.",
    weatherCity: "New Delhi 34°C",
  },
  hi: {
    topNews: "प्रमुख समाचार",
    ePaper: "ई-पेपर",
    indiaNews: "देश",
    rajasthan: "राजस्थान",
    worldNews: "विदेश",
    business: "व्यापार",
    cricket: "क्रिकेट",
    entertainment: "मनोरंजन",
    technology: "तकनीक",
    lifestyle: "लाइफस्टाइल",
    moreCategories: "+ 21 अन्य",

    trending: "ताज़ा ट्रेंडिंग",
    jaipurBureau: "जयपुर ब्यूरो",
    crimeWatch: "क्राइम फाइल्स",
    markets: "शेयर बाज़ार",
    budget: "बजट 2026",
    aiTech: "एआई व टेक",
    factCheck: "फैक्ट चेक",
    dailyQuiz: "दैनिक क्विज",
    puzzles: "पहेलियां",
    moreTopics: "+ 3 अन्य",

    searchPlaceholder: "समाचार, विषय, घटना खोजें...",
    readTime: "मिनट पढ़ें",
    updated: "अपडेटेड",
    share: "शेयर करें",
    bookmark: "सेव करें",
    copyLink: "लिंक कॉपी",
    copied: "कॉपी हुआ!",
    latestNews: "ताज़ा खबरें (Latest News)",
    topStories: "बड़ी खबरें (Top Stories)",
    opinion: "विचार एवं संपादकीय",
    mostRead: "सर्वाधिक पढ़ी गई",
    multimedia: "वीडियो व ऑडियो",
    videos: "वीडियो",
    subscribe: "सब्सक्राइब",
    newsletterTitle: "सुबह की मुख्य खबरें सीधे अपने इनबॉक्स में पाएं",
    newsletterDesc: "1,50,000+ पाठकों के साथ जुड़ें जो दिन की शुरुआत न्यूज़ मीडिया किरण से करते हैं।",
    weatherCity: "नई दिल्ली 34°C",
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: keyof Translations) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  toggleLanguage: () => {},
  t: (key) => translations.en[key] || "",
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("nmk_lang") as Language;
      if (saved === "en" || saved === "hi") {
        setLanguageState(saved);
      }
    } catch {
      // Ignore if localStorage unavailable
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem("nmk_lang", lang);
    } catch {}
  };

  const toggleLanguage = () => {
    const next = language === "en" ? "hi" : "en";
    setLanguage(next);
  };

  const t = (key: keyof Translations) => {
    return translations[language]?.[key] || translations.en[key] || "";
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
