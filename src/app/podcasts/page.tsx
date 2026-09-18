"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Headphones, Play, Pause, ChevronRight, Mic, Volume2 } from "lucide-react";
import { SiteHeader } from "@/components/header/SiteHeader";
import { Footer } from "@/components/footer/Footer";

export default function PodcastsPage() {
  const [playingId, setPlayingId] = useState<number | null>(null);

  const episodes = [
    {
      id: 1,
      title: "भारत में सेमीकंडक्टर क्रांति: नई फैक्ट्रियां और वैश्विक आपूर्ति श्रृंखला",
      date: "17 सितम्बर 2026",
      duration: "21 मिनट",
      host: "संजना गुप्ता (संपादक)",
      desc: "सेमीकॉन इंडिया 2026 के बाद भारत में इलेक्ट्रॉनिक विनिर्माण और तकनीकी नौकरियों के अवसरों पर गहन चर्चा।",
    },
    {
      id: 2,
      title: "राजस्थान में जल संरक्षण व नहरी परियोजनाएं: क्या बदलेगी थार की तस्वीर?",
      date: "16 सितम्बर 2026",
      duration: "18 मिनट",
      host: "गोविंद पाठक (वरिष्ठ संवाददाता)",
      desc: "ईआरसीपी और पश्चिमी राजस्थान के किसानों के लिए पेयजल और सिंचाई योजनाओं का धरातलीय विश्लेषण।",
    },
    {
      id: 3,
      title: "शेयर बाज़ार में ऐतिहासिक तेजी: 82 हजार के पार सेंसेक्स, निवेशकों के लिए क्या हैं संकेत?",
      date: "15 सितम्बर 2026",
      duration: "24 मिनट",
      host: "वित्तीय डेस्क",
      desc: "बाज़ार के मौजूदा मूल्यांकन, एफआईआई निवेश और खुदरा निवेशकों के पोर्टफोलियो रणनीति पर वित्तीय सलाहकारों से बातचीत।",
    },
    {
      id: 4,
      title: "क्राइम फाइल: ऑनलाइन डिजिटल अरेस्ट फ्रॉड से कैसे बचें?",
      date: "14 सितम्बर 2026",
      duration: "16 मिनट",
      host: "क्राइम ब्यूरो",
      desc: "साइबर अपराधियों के नए पैंतरे और पुलिस व साइबर विशेषज्ञों द्वारा सुझाई गई सुरक्षा सावधानियां।",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#faf9f6]">
      <SiteHeader initialCity="जयपुर" />

      <main className="max-w-5xl mx-auto px-4 py-10 flex-1 w-full font-hindi">
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-gray-500 mb-6 font-medium">
          <Link href="/" className="hover:text-gray-900 transition-colors">होम</Link>
          <ChevronRight className="w-3 h-3 text-gray-400" />
          <span className="text-gray-900 font-bold">पॉडकास्ट (Audio Dispatch)</span>
        </nav>

        <div className="bg-[#1e232d] text-white p-8 rounded-xl mb-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 bg-amber-500 text-gray-950 rounded-xl flex items-center justify-center shrink-0 shadow-lg">
              <Headphones className="w-10 h-10" />
            </div>
            <div>
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block mb-1">
                News Media Kiran Audio Desk
              </span>
              <h1 className="font-editorial text-3xl font-black text-white">
                दैनिक संपादकीय पॉडकास्ट
              </h1>
              <p className="text-xs text-gray-300 mt-1">
                दिन की सबसे महत्वपूर्ण घटनाओं का ऑडियो विश्लेषण, कभी भी और कहीं भी सुनें।
              </p>
            </div>
          </div>
        </div>

        {/* Episode List */}
        <div className="space-y-4">
          {episodes.map((ep) => (
            <div
              key={ep.id}
              className={`bg-white border rounded-lg p-5 shadow-2xs transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                playingId === ep.id ? "border-[#b91c1c] ring-1 ring-[#b91c1c]" : "border-gray-200"
              }`}
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 text-xs text-gray-400 mb-1">
                  <span>{ep.date}</span>
                  <span>•</span>
                  <span>{ep.duration}</span>
                  <span>•</span>
                  <span className="text-gray-600 font-medium">{ep.host}</span>
                </div>
                <h3 className="font-editorial text-base sm:text-lg font-bold text-gray-900 leading-snug">
                  {ep.title}
                </h3>
                <p className="text-xs text-gray-600 mt-1.5 leading-relaxed">
                  {ep.desc}
                </p>
              </div>

              <div className="shrink-0">
                <button
                  onClick={() => setPlayingId(playingId === ep.id ? null : ep.id)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold transition-all shadow-xs cursor-pointer ${
                    playingId === ep.id
                      ? "bg-[#b91c1c] text-white"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-800"
                  }`}
                >
                  {playingId === ep.id ? (
                    <>
                      <Volume2 className="w-4 h-4 animate-pulse" />
                      <span>पॉज़ करें (Pause)</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 fill-current ml-0.5" />
                      <span>सुनें (Play Episode)</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
