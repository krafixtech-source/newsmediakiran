"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Gamepad2, ChevronRight, CheckCircle2, Trophy, Clock } from "lucide-react";
import { SiteHeader } from "@/components/header/SiteHeader";
import { Footer } from "@/components/footer/Footer";

export default function PuzzlesPage() {
  const puzzles = [
    {
      id: 1,
      title: "दैनिक सुडोकू #142 (Daily Sudoku)",
      type: "सुडोकू (Sudoku)",
      difficulty: "मध्यम (Medium)",
      time: "15 मिनट",
      description: "क्लासिक 9x9 सुडोकू ग्रिड। पंक्तियों, स्तंभों और 3x3 बॉक्स में 1 से 9 तक के अंक भरें।",
    },
    {
      id: 2,
      title: "दैनिक हिंदी शब्द पहेली (Hindi Crossword #89)",
      type: "क्रॉसवर्ड (Crossword)",
      difficulty: "सरल (Easy)",
      time: "10 मिनट",
      description: "दैनिक समाचार और सामान्य ज्ञान पर आधारित हिंदी क्रॉसवर्ड।",
    },
    {
      id: 3,
      title: "हिंदी वर्डल (5-Letter Word Challenge)",
      type: "वर्ड गेम (Word Game)",
      difficulty: "कठिन (Hard)",
      time: "5 मिनट",
      description: "6 प्रयासों में आज का 5-अक्षरी हिंदी गुप्त शब्द पहचानें।",
    },
    {
      id: 4,
      title: "माइंड मेज़ व बौद्धिक पहेली (Brain Teaser)",
      type: "तार्किक पहेली",
      difficulty: "मध्यम (Medium)",
      time: "12 मिनट",
      description: "तार्किक सोच और दिमाग की कसरत के लिए आज की विशेष पहेली।",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#faf9f6]">
      <SiteHeader initialCity="जयपुर" />

      <main className="max-w-6xl mx-auto px-4 py-10 flex-1 w-full font-hindi">
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-gray-500 mb-6 font-medium">
          <Link href="/" className="hover:text-gray-900 transition-colors">होम</Link>
          <ChevronRight className="w-3 h-3 text-gray-400" />
          <span className="text-gray-900 font-bold">दैनिक पहेलियां व सुडोकू</span>
        </nav>

        <div className="bg-gradient-to-r from-indigo-900 to-indigo-950 text-white p-8 rounded-lg mb-8 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <Gamepad2 className="w-8 h-8 text-amber-400" />
            <span className="text-xs font-bold uppercase tracking-widest text-amber-300">
              News Media Kiran बौद्धिक मंच
            </span>
          </div>
          <h1 className="font-editorial text-3xl sm:text-4xl font-black text-white">
            दैनिक पहेलियां, सुडोकू व दिमागी खेल (Daily Puzzles)
          </h1>
          <p className="text-xs sm:text-sm text-indigo-200 mt-2 max-w-xl">
            समाचार पढ़ने के साथ-साथ अपनी दिमागी कसरत करें। हर रोज नए सुडोकू और शब्द पहेलियों के साथ अपनी बौद्धिक क्षमता परखें।
          </p>
        </div>

        {/* Puzzles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {puzzles.map((p) => (
            <div
              key={p.id}
              className="bg-white border border-gray-200 rounded-lg p-6 shadow-2xs hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="bg-indigo-50 border border-indigo-200 text-indigo-800 text-[11px] font-bold px-2.5 py-0.5 rounded">
                    {p.type}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-gray-500">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{p.time}</span>
                  </div>
                </div>

                <h3 className="font-editorial text-xl font-bold text-gray-900 mb-2">
                  {p.title}
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed mb-4">
                  {p.description}
                </p>

                <div className="text-xs text-gray-500 mb-4">
                  कठिनाई स्तर: <span className="font-bold text-gray-800">{p.difficulty}</span>
                </div>
              </div>

              <button
                onClick={() => alert("पज़ल लोड हो रहा है... कृपया खेलें!")}
                className="w-full py-2.5 bg-indigo-700 hover:bg-indigo-800 text-white text-xs font-bold rounded shadow-xs transition-colors cursor-pointer"
              >
                अभी खेलें (Play Now) →
              </button>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
