"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Search, X, Clock, ArrowRight } from "lucide-react";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const quickSearches = ["जयपुर", "राजस्थान", "राजनीति", "क्राइम", "क्रिकेट", "Tata Steel", "PM Modi"];

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/articles?search=${encodeURIComponent(query)}&limit=6`);
        if (res.ok) {
          const data = await res.json();
          setResults(data.articles || []);
        }
      } catch (err) {
        console.error("Search error:", err);
      } finally {
        setIsLoading(false);
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-start justify-center pt-16 px-4 animate-fadeIn">
      <div className="bg-white w-full max-w-2xl rounded-xl shadow-2xl border border-gray-200 overflow-hidden">
        {/* Search Bar Input */}
        <div className="flex items-center px-4 py-3.5 border-b border-gray-200">
          <Search className="w-5 h-5 text-gray-400 mr-3 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search News Media Kiran (समाचार खोजें)..."
            className="w-full text-base sm:text-lg outline-none text-gray-900 placeholder-gray-400 font-medium"
            autoFocus
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="text-xs text-gray-400 hover:text-gray-600 mr-2"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
            aria-label="Close search"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Search Chips */}
        <div className="px-4 py-3 bg-gray-50 border-b border-gray-100 flex items-center gap-2 overflow-x-auto text-xs">
          <span className="text-gray-500 font-semibold shrink-0">लोकप्रिय खोजें:</span>
          {quickSearches.map((term) => (
            <button
              key={term}
              onClick={() => setQuery(term)}
              className="px-2.5 py-1 bg-white border border-gray-200 rounded-full text-gray-700 hover:border-[#b91c1c] hover:text-[#b91c1c] transition-colors shrink-0 cursor-pointer"
            >
              {term}
            </button>
          ))}
        </div>

        {/* Results Area */}
        <div className="max-h-[60vh] overflow-y-auto p-4 divide-y divide-gray-100">
          {isLoading ? (
            <div className="py-8 text-center text-sm text-gray-500">
              समाचार खोजे जा रहे हैं...
            </div>
          ) : results.length > 0 ? (
            results.map((art) => (
              <Link
                key={art.id}
                href={`/news/${art.slug}`}
                onClick={onClose}
                className="py-3 flex items-start justify-between group hover:bg-gray-50 px-2 rounded-md transition-colors"
              >
                <div className="pr-4">
                  <span className="text-[10px] font-bold text-[#b91c1c] uppercase tracking-wider block mb-1">
                    {art.primary_category || "National"}
                  </span>
                  <h4 className="text-sm font-semibold text-gray-900 group-hover:text-[#b91c1c] line-clamp-2">
                    {art.headline}
                  </h4>
                  <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                    <Clock className="w-3 h-3" />
                    <span>{art.reading_time || "3 min read"}</span>
                    <span>•</span>
                    <span>{art.author_name || "Bureau"}</span>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-[#b91c1c] group-hover:translate-x-1 transition-all shrink-0 mt-2" />
              </Link>
            ))
          ) : query ? (
            <div className="py-8 text-center text-sm text-gray-500">
              "{query}" से संबंधित कोई समाचार नहीं मिला। कृपया अन्य शब्द आज़माएं।
            </div>
          ) : (
            <div className="py-6 text-center text-xs text-gray-400">
              नवीनतम समाचार, लेख व विश्लेषण खोजने के लिए ऊपर टाइप करें।
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
