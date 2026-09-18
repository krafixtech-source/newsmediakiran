"use client";

import React, { useState } from "react";
import Link from "next/link";
import { HelpCircle, ChevronRight, Check, X, Award, RotateCcw } from "lucide-react";
import { SiteHeader } from "@/components/header/SiteHeader";
import { Footer } from "@/components/footer/Footer";

export default function QuizPage() {
  const questions = [
    {
      id: 1,
      question: "हाल ही में प्रधानमंत्री नरेंद्र मोदी ने किस शहर में सेमीकॉन इंडिया 2026 का भव्य उद्घाटन किया?",
      options: ["मुंबई", "नई दिल्ली (यशोभूमि)", "बेंगलुरु", "हैदराबाद"],
      correct: 1,
      explanation: "पीएम मोदी ने नई दिल्ली के यशोभूमि में सेमीकॉन इंडिया 2026 का उद्घाटन किया और 2 नई चिप यूनिट्स की घोषणा की।",
    },
    {
      id: 2,
      question: "टाटा स्टील ने जमशेदपुर प्लांट में आपातकालीन चिकित्सा के लिए कौन सी नई पहल शुरू की है?",
      options: ["एयर एम्बुलेंस सेवा", "10 मिनट ग्रीन कॉरिडोर", "टेलीमेडिसिन वैन", "रोबोटिक सर्जरी"],
      correct: 1,
      explanation: "टाटा स्टील ने हादसे के 10 मिनट के भीतर इलाज सुनिश्चित करने के लिए प्लांट से टीएमएच तक स्पेशल ग्रीन कॉरिडोर बनाया है।",
    },
    {
      id: 3,
      question: "पश्चिम बंगाल सरकार ने राज्य में कितने नए हवाई अड्डों के निर्माण हेतु एमओयू की घोषणा की है?",
      options: ["2 नए एयरपोर्ट", "4 नए एयरपोर्ट", "6 नए एयरपोर्ट", "8 नए एयरपोर्ट"],
      correct: 1,
      explanation: "पश्चिम बंगाल में क्षेत्रीय कनेक्टिविटी बढ़ाने के लिए चार नए हवाई अड्डे बनाए जा रहे हैं।",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isCompleted, setIsCompleted] = useState(false);

  const handleSelect = (optionIdx: number) => {
    setSelectedAnswers({ ...selectedAnswers, [currentIndex]: optionIdx });
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const score = Object.entries(selectedAnswers).reduce((acc, [qIdx, ansIdx]) => {
    return acc + (questions[Number(qIdx)].correct === ansIdx ? 1 : 0);
  }, 0);

  return (
    <div className="flex flex-col min-h-screen bg-[#faf9f6]">
      <SiteHeader initialCity="जयपुर" />

      <main className="max-w-3xl mx-auto px-4 py-12 flex-1 w-full font-hindi">
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-gray-500 mb-6 font-medium">
          <Link href="/" className="hover:text-gray-900 transition-colors">होम</Link>
          <ChevronRight className="w-3 h-3 text-gray-400" />
          <span className="text-gray-900 font-bold">दैनिक समाचार क्विज़</span>
        </nav>

        <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
          {!isCompleted ? (
            <div>
              <div className="flex items-center justify-between border-b border-gray-200 pb-4 mb-6">
                <div className="flex items-center gap-2">
                  <HelpCircle className="w-6 h-6 text-[#b91c1c]" />
                  <h1 className="font-editorial text-2xl font-black text-gray-900">
                    आज का दैनिक न्यूज़ क्विज़
                  </h1>
                </div>
                <span className="text-xs font-bold text-gray-500">
                  प्रश्न {currentIndex + 1} / {questions.length}
                </span>
              </div>

              <h2 className="text-lg font-bold text-gray-900 mb-6 leading-relaxed">
                {questions[currentIndex].question}
              </h2>

              <div className="space-y-3 mb-8">
                {questions[currentIndex].options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelect(idx)}
                    className={`w-full text-left p-4 rounded-lg border text-sm font-medium transition-all cursor-pointer ${
                      selectedAnswers[currentIndex] === idx
                        ? "border-[#b91c1c] bg-red-50 text-[#b91c1c] font-bold shadow-2xs"
                        : "border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-800"
                    }`}
                  >
                    <span className="inline-block w-6 font-bold text-gray-400">
                      {String.fromCharCode(65 + idx)}.
                    </span>
                    {opt}
                  </button>
                ))}
              </div>

              <button
                onClick={handleNext}
                disabled={selectedAnswers[currentIndex] === undefined}
                className="w-full py-3 bg-[#b91c1c] disabled:opacity-40 text-white font-bold text-sm rounded-lg shadow-xs hover:bg-red-700 transition-colors cursor-pointer"
              >
                {currentIndex < questions.length - 1 ? "अगला प्रश्न →" : "क्विज़ समाप्त करें"}
              </button>
            </div>
          ) : (
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-amber-100 text-amber-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-9 h-9" />
              </div>
              <h2 className="font-editorial text-3xl font-black text-gray-900">
                क्विज़ परिणाम: {score} / {questions.length}
              </h2>
              <p className="text-sm text-gray-600 mt-2">
                {score === questions.length
                  ? "अद्भुत! आप देश-दुनिया की खबरों से पूरी तरह अपडेट हैं।"
                  : "अच्छा प्रयास! दैनिक समाचार पढ़कर आप और बेहतर प्रदर्शन कर सकते हैं।"}
              </p>

              <div className="mt-8 text-left space-y-4 border-t border-gray-200 pt-6">
                <h3 className="font-bold text-gray-900 text-base">उत्तर व व्याख्या:</h3>
                {questions.map((q, idx) => (
                  <div key={q.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200 text-xs">
                    <p className="font-bold text-gray-900 mb-1">{idx + 1}. {q.question}</p>
                    <p className="text-emerald-700 font-semibold">सही उत्तर: {q.options[q.correct]}</p>
                    <p className="text-gray-600 mt-1">{q.explanation}</p>
                  </div>
                ))}
              </div>

              <button
                onClick={() => {
                  setSelectedAnswers({});
                  setCurrentIndex(0);
                  setIsCompleted(false);
                }}
                className="mt-8 inline-flex items-center gap-2 px-6 py-2.5 bg-gray-900 text-white text-xs font-bold rounded-lg hover:bg-black transition-colors cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>पुनः क्विज़ खेलें</span>
              </button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
