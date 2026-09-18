"use client";

import React, { useState } from "react";
import { Sliders, ArrowUp, ArrowDown, Eye, EyeOff, Check, RotateCcw } from "lucide-react";

interface SectionConfig {
  id: string;
  title: string;
  isEnabled: boolean;
}

export default function HomepageBuilderPage() {
  const [sections, setSections] = useState<SectionConfig[]>([
    { id: "hero_editorial_grid", title: "1. हीरो एडिटोरियल ग्रिड (Hero Editorial Grid)", isEnabled: true },
    { id: "latest_news", title: "2. ताज़ा समाचार (Latest News Mixed Layout)", isEnabled: true },
    { id: "rajasthan_hub", title: "3. राजस्थान विशेष ब्यूरो (Rajasthan State Hub)", isEnabled: true },
    { id: "india_national", title: "4. देश व राष्ट्रीय हलचल (National India Section)", isEnabled: true },
    { id: "crime_investigation", title: "5. क्राइम व खोजी पत्रकारिता (Crime Investigative Desk)", isEnabled: true },
    { id: "business_market", title: "6. व्यापार व शेयर बाज़ार (Business & Markets)", isEnabled: true },
    { id: "sports_live", title: "7. खेल व लाइव स्कोरबोर्ड (Sports Arena)", isEnabled: true },
    { id: "entertainment_cinema", title: "8. मनोरंजन व सिनेमा (Entertainment & Cinema)", isEnabled: true },
    { id: "technology_ai", title: "9. तकनीक व AI (Tech & Artificial Intelligence)", isEnabled: true },
    { id: "explained_journalism", title: "10. एक्सप्लेंड पत्रकारिता (Explained Journalism)", isEnabled: true },
    { id: "multimedia_video", title: "11. वीडियो, शॉर्ट्स व पॉडकास्ट (Multimedia TV)", isEnabled: true },
    { id: "interactive_features", title: "12. कार्टून, दैनिक क्विज़ व पज़ल (Interactive Features)", isEnabled: true },
    { id: "opinion_most_read", title: "13. विचार, स्तंभकार व सर्वाधिक पढ़े गए (Opinion & Most Read)", isEnabled: true },
  ]);

  const [saved, setSaved] = useState(false);

  const toggleSection = (index: number) => {
    const updated = [...sections];
    updated[index].isEnabled = !updated[index].isEnabled;
    setSections(updated);
  };

  const moveUp = (index: number) => {
    if (index === 0) return;
    const updated = [...sections];
    const temp = updated[index - 1];
    updated[index - 1] = updated[index];
    updated[index] = temp;
    setSections(updated);
  };

  const moveDown = (index: number) => {
    if (index === sections.length - 1) return;
    const updated = [...sections];
    const temp = updated[index + 1];
    updated[index + 1] = updated[index];
    updated[index] = temp;
    setSections(updated);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between border-b border-gray-200 pb-4">
        <div>
          <h1 className="font-editorial text-2xl font-black text-gray-900 flex items-center gap-2">
            <Sliders className="w-6 h-6 text-emerald-700" />
            <span>होमपेज लेआउट बिल्डर (Homepage Section Builder)</span>
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            होमपेज पर प्रत्येक सेक्शन का क्रम बदलें अथवा चालू/बंद करें
          </p>
        </div>

        <button
          onClick={handleSave}
          className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
        >
          {saved ? <Check className="w-4 h-4" /> : null}
          <span>{saved ? "लेआउट सुरक्षित!" : "क्रम सहेजें (Save Order)"}</span>
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-2xs divide-y divide-gray-200">
        {sections.map((sec, idx) => (
          <div
            key={sec.id}
            className={`p-4 flex items-center justify-between transition-colors ${
              sec.isEnabled ? "bg-white hover:bg-gray-50" : "bg-gray-50 opacity-60"
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="text-gray-400 font-mono text-xs select-none">
                ☰
              </span>
              <span className="font-bold text-sm text-gray-900">{sec.title}</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => moveUp(idx)}
                disabled={idx === 0}
                className="p-1.5 rounded border border-gray-200 hover:bg-gray-100 disabled:opacity-30 cursor-pointer"
                title="ऊपर ले जाएं"
              >
                <ArrowUp className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => moveDown(idx)}
                disabled={idx === sections.length - 1}
                className="p-1.5 rounded border border-gray-200 hover:bg-gray-100 disabled:opacity-30 cursor-pointer"
                title="नीचे ले जाएं"
              >
                <ArrowDown className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => toggleSection(idx)}
                className={`px-3 py-1 text-xs font-bold rounded flex items-center gap-1.5 cursor-pointer transition-colors ${
                  sec.isEnabled
                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {sec.isEnabled ? (
                  <>
                    <Eye className="w-3 h-3" />
                    <span>ON</span>
                  </>
                ) : (
                  <>
                    <EyeOff className="w-3 h-3" />
                    <span>OFF</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
