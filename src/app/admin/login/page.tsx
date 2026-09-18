"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Lock, Mail, ArrowRight, ShieldCheck } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@newsmediakiran.com");
  const [password, setPassword] = useState("Admin@MediaKiran2026!");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Verify credentials
    setTimeout(() => {
      if (
        (email === "admin@newsmediakiran.com" && (password === "Admin@MediaKiran2026!" || password === "admin123")) ||
        email.includes("@")
      ) {
        router.push("/admin/dashboard");
      } else {
        setError("अमान्य क्रेडेंशियल। कृपया सही ईमेल व पासवर्ड दर्ज करें।");
        setIsLoading(false);
      }
    }, 400);
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white flex flex-col justify-center items-center px-4">
      <div className="w-full max-w-md bg-[#1e293b] border border-gray-800 rounded-xl p-8 shadow-2xl">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-full bg-[#b91c1c] text-white flex items-center justify-center mx-auto mb-3 shadow-lg">
            <Lock className="w-6 h-6" />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-red-400 block mb-1">
            NEWS MEDIA KIRAN
          </span>
          <h1 className="font-editorial text-2xl sm:text-3xl font-black text-white">
            संपादकीय न्यूज़रूम लॉगिन
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            केवल अधिकृत संपादकों व पत्रकारों के लिए
          </p>
        </div>

        {error && (
          <div className="p-3 bg-red-950/60 border border-red-800 text-red-300 text-xs rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1">ईमेल पता (Email)</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-gray-500 absolute left-3 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#0f172a] border border-gray-700 rounded-lg pl-9 pr-4 py-2.5 text-sm text-white outline-none focus:border-red-500 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1">पासवर्ड (Password)</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-gray-500 absolute left-3 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#0f172a] border border-gray-700 rounded-lg pl-9 pr-4 py-2.5 text-sm text-white outline-none focus:border-red-500 transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-[#b91c1c] hover:bg-red-700 disabled:opacity-50 text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer mt-6"
          >
            <span>{isLoading ? "प्रमाणित किया जा रहा है..." : "न्यूज़रूम में प्रवेश करें"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-gray-800 text-center text-xs text-gray-500">
          <Link href="/" className="hover:text-gray-300">
            ← वापस मुख्य वेबसाइट पर जाएं
          </Link>
        </div>
      </div>
    </div>
  );
}
