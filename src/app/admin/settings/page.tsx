"use client";

import React, { useState } from "react";
import { Settings, Database, Server, Check, AlertCircle } from "lucide-react";

export default function AdminSettingsPage() {
  const [saved, setSaved] = useState(false);

  // Hostinger MySQL Config State
  const [host, setHost] = useState("");
  const [user, setUser] = useState("");
  const [database, setDatabase] = useState("");
  const [port, setPort] = useState("3306");

  // Site Meta
  const [siteName, setSiteName] = useState("NEWS MEDIA KIRAN");
  const [siteTagline, setSiteTagline] = useState("विश्वसनीयता • निर्भीकता • निष्पक्षता | Latest News, Top News, Breaking News");
  const [contactEmail, setContactEmail] = useState("contact@newsmediakiran.com");
  const [whatsappUrl, setWhatsappUrl] = useState("https://whatsapp.com/channel/newsmediakiran");

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="border-b border-gray-200 pb-4">
        <h1 className="font-editorial text-2xl font-black text-gray-900 flex items-center gap-2">
          <Settings className="w-6 h-6 text-gray-700" />
          <span>सिस्टम सेटिंग्स व डेटाबेस (System & Hostinger Database)</span>
        </h1>
        <p className="text-xs text-gray-500 mt-1">
          वेबसाइट का मुख्य विन्यास और Hostinger MySQL कनेक्शन क्रेडेंशियल्स
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        {/* Hostinger MySQL Connection Box */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-gray-200 pb-3">
            <div className="flex items-center gap-2 text-indigo-700">
              <Database className="w-5 h-5" />
              <h3 className="text-sm font-black uppercase tracking-wider text-gray-900">
                Hostinger MySQL डेटाबेस विन्यास (Production DB)
              </h3>
            </div>
            <span className="text-[11px] font-bold bg-indigo-50 text-indigo-800 px-2.5 py-0.5 rounded border border-indigo-200">
              Dual Driver Ready
            </span>
          </div>

          <p className="text-xs text-gray-500 leading-relaxed">
            जब आप Hostinger hPanel में MySQL डेटाबेस बनाएं, तो क्रेडेंशियल्स नीचे दर्ज करें अथवा अपनी <code>.env.local</code> फाइल में <code>MYSQL_HOST</code>, <code>MYSQL_USER</code>, <code>MYSQL_PASSWORD</code>, <code>MYSQL_DATABASE</code> सेट करें। यदि यह रिक्त है, तो सिस्टम स्वतः स्थानीय एम्बेडेड ड्राइवर पर कार्य करता है।
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                MySQL Host (होस्टिंगर सर्वर)
              </label>
              <input
                type="text"
                value={host}
                onChange={(e) => setHost(e.target.value)}
                placeholder="उदा. localhost अथवा 185.xxx.xxx.xxx"
                className="w-full px-3 py-2 border border-gray-300 rounded text-xs outline-none focus:border-indigo-600 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Database Name (डेटाबेस नाम)
              </label>
              <input
                type="text"
                value={database}
                onChange={(e) => setDatabase(e.target.value)}
                placeholder="u123456_newsmediakiran"
                className="w-full px-3 py-2 border border-gray-300 rounded text-xs outline-none focus:border-indigo-600 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Database User (उपयोगकर्ता)
              </label>
              <input
                type="text"
                value={user}
                onChange={(e) => setUser(e.target.value)}
                placeholder="u123456_kiranadmin"
                className="w-full px-3 py-2 border border-gray-300 rounded text-xs outline-none focus:border-indigo-600 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Port (पोर्ट)
              </label>
              <input
                type="text"
                value={port}
                onChange={(e) => setPort(e.target.value)}
                placeholder="3306"
                className="w-full px-3 py-2 border border-gray-300 rounded text-xs outline-none focus:border-indigo-600 font-mono"
              />
            </div>
          </div>

          <div className="pt-2">
            <a
              href="/lib/db/schema.sql"
              target="_blank"
              download
              className="text-xs font-bold text-indigo-700 hover:underline"
            >
              📥 Hostinger phpMyAdmin के लिए schema.sql डाउनलोड करें
            </a>
          </div>
        </div>

        {/* General Site Meta */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-2xs space-y-4">
          <h3 className="text-sm font-black uppercase tracking-wider text-gray-900 border-b border-gray-200 pb-3">
            वेबसाइट प्राथमिक विन्यास (General Settings)
          </h3>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              वेबसाइट का नाम (Site Name)
            </label>
            <input
              type="text"
              value={siteName}
              onChange={(e) => setSiteName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded text-xs outline-none focus:border-[#b91c1c] font-bold"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              संपादकीय टैगलाइन (Motto / Tagline)
            </label>
            <input
              type="text"
              value={siteTagline}
              onChange={(e) => setSiteTagline(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded text-xs outline-none focus:border-[#b91c1c]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                संपादकीय ईमेल (Contact Email)
              </label>
              <input
                type="email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded text-xs outline-none focus:border-[#b91c1c]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                व्हाट्सएप चैनल लिंक (WhatsApp Community)
              </label>
              <input
                type="text"
                value={whatsappUrl}
                onChange={(e) => setWhatsappUrl(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded text-xs outline-none focus:border-[#b91c1c]"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="px-6 py-2.5 bg-[#b91c1c] hover:bg-red-700 text-white text-xs font-bold uppercase tracking-wider rounded-lg shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
        >
          {saved ? <Check className="w-4 h-4" /> : null}
          <span>{saved ? "सफलतापूर्वक सहेजा गया!" : "सेटिंग्स सुरक्षित करें (Save Settings)"}</span>
        </button>
      </form>
    </div>
  );
}
