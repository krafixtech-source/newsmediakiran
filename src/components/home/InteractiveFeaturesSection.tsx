"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Smile, Gamepad2, HelpCircle, Check, X, RotateCcw } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export function InteractiveFeaturesSection() {
  const { language } = useLanguage();
  const isHi = language === "hi";

  // Quiz state
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const quizQuestion = isHi
    ? {
        question: "हाल ही में प्रधानमंत्री नरेंद्र मोदी ने किस शहर में सेमीकॉन इंडिया 2026 का भव्य उद्घाटन किया?",
        options: ["मुंबई", "नई दिल्ली (यशोभूमि)", "बेंगलुरु", "हैदराबाद"],
        correctIndex: 1,
        explanation: "प्रधानमंत्री ने नई दिल्ली स्थित यशोभूमि कन्वेंशन सेंटर में सेमीकॉन इंडिया 2026 का उद्घाटन किया।",
      }
    : {
        question: "In which city did Prime Minister Narendra Modi inaugurate Semicon India 2026?",
        options: ["Mumbai", "New Delhi (Yashobhoomi)", "Bengaluru", "Hyderabad"],
        correctIndex: 1,
        explanation: "The Prime Minister inaugurated Semicon India 2026 at Yashobhoomi Convention Centre, New Delhi.",
      };

  const handleOptionSelect = (idx: number) => {
    if (!isSubmitted) {
      setSelectedOption(idx);
    }
  };

  const handleQuizSubmit = () => {
    if (selectedOption !== null) {
      setIsSubmitted(true);
    }
  };

  const handleResetQuiz = () => {
    setSelectedOption(null);
    setIsSubmitted(false);
  };

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-8 border-b border-gray-200 bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* CARTOON OF THE DAY (Col 4) */}
        <div id="cartoon-section" className="lg:col-span-4 bg-white border border-gray-200 rounded-md p-5 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 border-b border-gray-200 pb-2 mb-3">
              <Smile className="w-5 h-5 text-amber-600" />
              <h3 className="font-editorial text-lg font-black text-gray-900 uppercase">
                {isHi ? "आज का व्यंग्य चित्र" : "Cartoon of the Day"}
              </h3>
            </div>

            <div className="relative aspect-[4/3] rounded overflow-hidden bg-amber-50/50 border border-gray-100 mb-3">
              <Image
                src="https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=800&auto=format&fit=crop&q=80"
                alt="Editorial Cartoon of the Day"
                fill
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="object-cover"
              />
            </div>
            <h4 className="font-editorial text-base font-bold text-gray-900">
              {isHi ? '"मौसम का मिज़ाज और राजनीतिक पारा!"' : '"Weather swings and political heatwaves!"'}
            </h4>
            <p className="text-xs text-gray-500 mt-1">
              {isHi ? "कार्टूनिस्ट: शेखर वर्मा • 17 सितम्बर 2026" : "Cartoonist: Shekhar Verma • Sep 17, 2026"}
            </p>
          </div>

          <Link
            href="/cartoons"
            className="mt-4 text-xs font-bold text-[#b91c1c] hover:underline block text-right"
          >
            {isHi ? "पुराने कार्टून देखें (Archive) →" : "View Cartoon Archive →"}
          </Link>
        </div>

        {/* DAILY NEWS QUIZ (Col 4) */}
        <div className="lg:col-span-4 bg-[#fdfaf7] border border-amber-200/80 rounded-md p-5 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-amber-200 pb-2 mb-3">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-[#b91c1c]" />
                <h3 className="font-editorial text-lg font-black text-gray-900 uppercase">
                  {isHi ? "दैनिक समाचार क्विज़" : "Daily News Quiz"}
                </h3>
              </div>
              <span className="text-[10px] font-bold bg-amber-100 text-amber-900 px-2 py-0.5 rounded">
                {isHi ? "प्रश्न 1/1" : "Q 1/1"}
              </span>
            </div>

            <p className="text-sm font-bold text-gray-900 leading-snug mb-3">
              {quizQuestion.question}
            </p>

            <div className="space-y-2">
              {quizQuestion.options.map((opt, idx) => {
                let btnStyle = "bg-white border-gray-200 text-gray-800 hover:border-gray-400";
                if (selectedOption === idx) {
                  btnStyle = "bg-red-50 border-[#b91c1c] text-[#b91c1c] font-bold";
                }
                if (isSubmitted) {
                  if (idx === quizQuestion.correctIndex) {
                    btnStyle = "bg-emerald-50 border-emerald-600 text-emerald-800 font-bold";
                  } else if (selectedOption === idx) {
                    btnStyle = "bg-red-50 border-red-600 text-red-800";
                  }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleOptionSelect(idx)}
                    className={`w-full text-left p-2.5 rounded border text-xs flex items-center justify-between transition-all cursor-pointer ${btnStyle}`}
                  >
                    <span>{opt}</span>
                    {isSubmitted && idx === quizQuestion.correctIndex && (
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    )}
                    {isSubmitted && selectedOption === idx && idx !== quizQuestion.correctIndex && (
                      <X className="w-4 h-4 text-red-600 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {isSubmitted && (
              <div className="mt-3 p-2.5 bg-white border border-gray-200 rounded text-xs text-gray-700">
                <span className="font-bold text-emerald-700 block mb-0.5">
                  {selectedOption === quizQuestion.correctIndex 
                    ? (isHi ? "🎉 सही उत्तर!" : "🎉 Correct Answer!")
                    : (isHi ? "❌ गलत उत्तर!" : "❌ Incorrect Answer!")}
                </span>
                {quizQuestion.explanation}
              </div>
            )}
          </div>

          <div className="mt-4 pt-3 border-t border-amber-200/60 flex items-center justify-between">
            {!isSubmitted ? (
              <button
                onClick={handleQuizSubmit}
                disabled={selectedOption === null}
                className="w-full py-2 bg-[#b91c1c] disabled:opacity-50 text-white text-xs font-bold rounded shadow-xs hover:bg-red-700 transition-colors cursor-pointer"
              >
                {isHi ? "उत्तर सबमिट करें" : "Submit Answer"}
              </button>
            ) : (
              <button
                onClick={handleResetQuiz}
                className="w-full py-2 bg-gray-800 text-white text-xs font-bold rounded flex items-center justify-center gap-1.5 hover:bg-gray-900 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{isHi ? "पुनः प्रयास करें" : "Try Again"}</span>
              </button>
            )}
          </div>
        </div>

        {/* DAILY PUZZLES & SUDOKU (Col 4) */}
        <div className="lg:col-span-4 bg-white border border-gray-200 rounded-md p-5 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 border-b border-gray-200 pb-2 mb-3">
              <Gamepad2 className="w-5 h-5 text-indigo-700" />
              <h3 className="font-editorial text-lg font-black text-gray-900 uppercase">
                {isHi ? "डेली पज़ल्स व सुडोकू" : "Daily Puzzles & Sudoku"}
              </h3>
            </div>

            <div className="space-y-3">
              <div className="border border-gray-200 rounded-md p-3 flex items-center justify-between hover:bg-gray-50 transition-colors">
                <div>
                  <h4 className="text-sm font-bold text-gray-900">
                    {isHi ? "दैनिक सुडोकू (Sudoku #124)" : "Daily Sudoku #124"}
                  </h4>
                  <span className="text-[11px] text-gray-400">
                    {isHi ? "कठिनाई: मध्यम • 15 मिनट" : "Difficulty: Medium • 15 mins"}
                  </span>
                </div>
                <Link
                  href="/puzzles"
                  className="px-3 py-1.5 bg-indigo-700 hover:bg-indigo-800 text-white text-xs font-bold rounded shadow-xs transition-colors"
                >
                  {isHi ? "खेलें →" : "Play →"}
                </Link>
              </div>

              <div className="border border-gray-200 rounded-md p-3 flex items-center justify-between hover:bg-gray-50 transition-colors">
                <div>
                  <h4 className="text-sm font-bold text-gray-900">
                    {isHi ? "शब्द पहेली (Crossword)" : "Crossword #88"}
                  </h4>
                  <span className="text-[11px] text-gray-400">
                    {isHi ? "दैनिक हिंदी शब्दजाल" : "Daily Editorial Grid"}
                  </span>
                </div>
                <Link
                  href="/puzzles"
                  className="px-3 py-1.5 bg-indigo-700 hover:bg-indigo-800 text-white text-xs font-bold rounded shadow-xs transition-colors"
                >
                  {isHi ? "खेलें →" : "Play →"}
                </Link>
              </div>

              <div className="border border-gray-200 rounded-md p-3 flex items-center justify-between hover:bg-gray-50 transition-colors">
                <div>
                  <h4 className="text-sm font-bold text-gray-900">
                    {isHi ? "वर्डल हिंदी (Word Puzzle)" : "Wordle Daily"}
                  </h4>
                  <span className="text-[11px] text-gray-400">
                    {isHi ? "5 अक्षरों का सही शब्द पहचानें" : "Guess the 5-letter news word"}
                  </span>
                </div>
                <Link
                  href="/puzzles"
                  className="px-3 py-1.5 bg-indigo-700 hover:bg-indigo-800 text-white text-xs font-bold rounded shadow-xs transition-colors"
                >
                  {isHi ? "खेलें →" : "Play →"}
                </Link>
              </div>
            </div>
          </div>

          <Link
            href="/puzzles"
            className="mt-4 text-xs font-bold text-indigo-700 hover:underline block text-right"
          >
            {isHi ? "सभी पज़ल आर्काइव देखें →" : "View All Puzzles Archive →"}
          </Link>
        </div>

      </div>
    </section>
  );
}
