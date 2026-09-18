"use client";

import React, { useState, useEffect } from "react";
import { Flame, PlusCircle, Trash2, CheckCircle } from "lucide-react";

export default function BreakingNewsManagerPage() {
  const [items, setItems] = useState<any[]>([]);
  const [headline, setHeadline] = useState("");
  const [url, setUrl] = useState("");
  const [priority, setPriority] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const res = await fetch("/api/breaking");
    const data = await res.json();
    if (data.success) {
      setItems(data.items || []);
    }
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!headline) return;

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/breaking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ headline, url, priority }),
      });
      const data = await res.json();
      if (data.success) {
        setHeadline("");
        setUrl("");
        fetchItems();
      }
    } catch (err: any) {
      alert("Error: " + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="border-b border-gray-200 pb-4">
        <h1 className="font-editorial text-2xl font-black text-gray-900 flex items-center gap-2">
          <Flame className="w-6 h-6 text-red-600" />
          <span>ब्रेकिंग न्यूज़ व टिकर प्रबंधन (Breaking News Manager)</span>
        </h1>
        <p className="text-xs text-gray-500 mt-1">
          होमपेज और सभी पेजों के शीर्ष पर चलने वाले रेड अलर्ट टिकर का रीयल-टाइम नियंत्रण
        </p>
      </div>

      {/* Add Form */}
      <form onSubmit={handleAdd} className="bg-white border border-gray-200 rounded-xl p-6 shadow-2xs space-y-4">
        <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
          + नया ब्रेकिंग अलर्ट जोड़ें
        </h3>

        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">
            ब्रेकिंग न्यूज़ हेडलाइन *
          </label>
          <input
            type="text"
            required
            value={headline}
            onChange={(e) => setHeadline(e.target.value)}
            placeholder="उदा. बड़ी खबर: कैबिनेट का बड़ा फैसला, नई राहत योजना को मंजूरी..."
            className="w-full px-3 py-2 border border-gray-300 rounded text-sm outline-none focus:border-red-600"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              आर्टिकल लिंक (Optional URL)
            </label>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="/news/article-slug"
              className="w-full px-3 py-2 border border-gray-300 rounded text-xs outline-none focus:border-red-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              प्राथमिकता क्रम (Priority)
            </label>
            <input
              type="number"
              value={priority}
              onChange={(e) => setPriority(Number(e.target.value))}
              min={1}
              className="w-full px-3 py-2 border border-gray-300 rounded text-xs outline-none focus:border-red-600"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="px-5 py-2.5 bg-[#b91c1c] text-white text-xs font-bold uppercase tracking-wider rounded shadow-xs hover:bg-red-700 transition-colors cursor-pointer"
        >
          {isSubmitting ? "सहेजा जा रहा है..." : "टिकर में लाइव करें (Add to Ticker)"}
        </button>
      </form>

      {/* Active List */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-2xs">
        <div className="p-4 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
          <span className="text-xs font-bold text-gray-700 uppercase">
            वर्तमान में सक्रिय ब्रेकिंग टिकर ({items.length})
          </span>
        </div>

        <div className="divide-y divide-gray-200">
          {items.map((item) => (
            <div key={item.id} className="p-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping"></span>
                <div>
                  <span className="font-bold text-gray-900 text-sm block">
                    {item.headline}
                  </span>
                  {item.url && (
                    <span className="text-[11px] text-gray-400">{item.url}</span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <span className="bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded text-[11px]">
                  सक्रिय (Active)
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
