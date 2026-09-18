"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Image as ImageIcon, PlusCircle, Check } from "lucide-react";

export default function BannersManagerPage() {
  const [banners, setBanners] = useState([
    {
      id: 1,
      name: "मुख्य होमपेज टॉप विज्ञापन (Top Leaderboard)",
      position: "top_banner",
      link: "https://newsmediakiran.com/advertise",
      image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200",
      isActive: true,
    },
    {
      id: 2,
      name: "राजस्थान ब्यूरो विशेष स्पॉन्सर (Rajasthan Sponsor)",
      position: "between_sections",
      link: "https://newsmediakiran.com",
      image: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=800",
      isActive: true,
    },
  ]);

  const [name, setName] = useState("");
  const [position, setPosition] = useState("top_banner");
  const [link, setLink] = useState("");
  const [image, setImage] = useState("");

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !image) return;

    setBanners([
      ...banners,
      {
        id: Date.now(),
        name,
        position,
        link: link || "#",
        image,
        isActive: true,
      },
    ]);

    setName("");
    setLink("");
    setImage("");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="border-b border-gray-200 pb-4">
        <h1 className="font-editorial text-2xl font-black text-gray-900 flex items-center gap-2">
          <ImageIcon className="w-6 h-6 text-indigo-600" />
          <span>विज्ञापन व बैनर प्रबंधन (Banner & Ads Manager)</span>
        </h1>
        <p className="text-xs text-gray-500 mt-1">
          विभिन्न सेक्शनों के बीच प्रदर्शित होने वाले विज्ञापन और प्रायोजित बैनरों का प्रबंधन
        </p>
      </div>

      {/* Add Form */}
      <form onSubmit={handleAdd} className="bg-white border border-gray-200 rounded-xl p-6 shadow-2xs space-y-4">
        <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
          + नया बैनर / विज्ञापन जोड़ें
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">बैनर नाम (Banner Name) *</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="उदा. दिवाली विशेष प्रायोजक..."
              className="w-full px-3 py-2 border border-gray-300 rounded text-xs outline-none focus:border-indigo-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">स्थान (Placement Position)</label>
            <select
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded text-xs outline-none text-gray-800"
            >
              <option value="top_banner">शीर्ष बैनर (Top Leaderboard)</option>
              <option value="between_sections">सेक्शनों के मध्य (Between Sections)</option>
              <option value="sidebar">आर्टिकल साइडबार (Sidebar)</option>
              <option value="article_middle">आर्टिकल के बीच (Article Inline)</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">छवि URL (Image URL) *</label>
            <input
              type="text"
              required
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="https://..."
              className="w-full px-3 py-2 border border-gray-300 rounded text-xs outline-none focus:border-indigo-600 font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">लक्षित लिंक (Target Link)</label>
            <input
              type="text"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="https://client-site.com"
              className="w-full px-3 py-2 border border-gray-300 rounded text-xs outline-none focus:border-indigo-600 font-mono"
            />
          </div>
        </div>

        <button
          type="submit"
          className="px-5 py-2.5 bg-indigo-700 text-white text-xs font-bold uppercase tracking-wider rounded shadow-xs hover:bg-indigo-800 transition-colors cursor-pointer"
        >
          बैनर सक्रिय करें
        </button>
      </form>

      {/* Existing Banners */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-2xs">
        <div className="p-4 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
          <span className="text-xs font-bold text-gray-700 uppercase">
            सक्रिय बैनर स्लॉट ({banners.length})
          </span>
        </div>

        <div className="divide-y divide-gray-200">
          {banners.map((b) => (
            <div key={b.id} className="p-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="relative w-24 h-14 rounded overflow-hidden bg-gray-100 border border-gray-200 shrink-0">
                  <Image src={b.image} alt={b.name} fill sizes="96px" className="object-cover" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-gray-900">{b.name}</h4>
                  <span className="text-xs text-gray-500 font-mono">स्लॉट: {b.position}</span>
                </div>
              </div>

              <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold px-2.5 py-1 rounded">
                सक्रिय (Active)
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
