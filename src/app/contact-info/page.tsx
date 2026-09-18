import React from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, ChevronRight, MessageCircle } from "lucide-react";
import { SiteHeader } from "@/components/header/SiteHeader";
import { Footer } from "@/components/footer/Footer";

export default function ContactInfoPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#faf9f6]">
      <SiteHeader initialCity="जयपुर" />

      <main className="max-w-4xl mx-auto px-4 py-12 flex-1 w-full">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-gray-500 mb-6 font-medium">
          <Link href="/" className="hover:text-gray-900 transition-colors">होम</Link>
          <ChevronRight className="w-3 h-3 text-gray-400" />
          <span className="text-gray-900 font-bold">संपर्क करें (Contact Info)</span>
        </nav>

        <span className="text-xs font-bold text-[#b91c1c] uppercase tracking-widest block mb-1">
          न्यूज़रूम संपर्क सूत्र • Get In Touch
        </span>
        <h1 className="font-editorial text-3xl sm:text-5xl font-black text-gray-900 mb-6">
          News Media Kiran से संपर्क करें
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
          <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-2xs">
            <Mail className="w-8 h-8 text-[#b91c1c] mb-3" />
            <h3 className="font-bold text-gray-900 text-base">संपादकीय ईमेल (Editorial Email)</h3>
            <p className="text-xs text-gray-500 mt-1">समाचार, लेख व प्रेस विज्ञप्ति हेतु:</p>
            <a href="mailto:contact@newsmediakiran.com" className="font-bold text-[#b91c1c] text-sm mt-2 block hover:underline">
              contact@newsmediakiran.com
            </a>
          </div>

          <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-2xs">
            <Phone className="w-8 h-8 text-emerald-600 mb-3" />
            <h3 className="font-bold text-gray-900 text-base">हेल्पलाइन व विज्ञापन (Phone Helpline)</h3>
            <p className="text-xs text-gray-500 mt-1">सोमवार से शनिवार (सुबह 9 से शाम 7):</p>
            <span className="font-bold text-gray-900 text-sm mt-2 block">
              0123456789
            </span>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white border border-gray-200 p-8 rounded-lg shadow-2xs">
          <h3 className="font-editorial text-xl font-bold text-gray-900 mb-4">
            संदेश अथवा समाचार टिप भेजें (Send a Message / News Tip)
          </h3>
          <form className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">आपका नाम (Full Name)</label>
                <input
                  type="text"
                  required
                  placeholder="उदा. राहुल शर्मा"
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm outline-none focus:border-[#b91c1c]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">ईमेल पता (Email)</label>
                <input
                  type="email"
                  required
                  placeholder="rahul@example.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm outline-none focus:border-[#b91c1c]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">विषय (Subject)</label>
              <input
                type="text"
                required
                placeholder="समाचार टिप / सुधार / विज्ञापन पूछताछ"
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm outline-none focus:border-[#b91c1c]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">संदेश विवरण (Message Details)</label>
              <textarea
                rows={5}
                required
                placeholder="कृपया विस्तार से लिखें..."
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm outline-none focus:border-[#b91c1c]"
              ></textarea>
            </div>

            <button
              type="submit"
              className="px-6 py-2.5 bg-[#b91c1c] text-white text-xs font-bold uppercase tracking-wider rounded shadow-xs hover:bg-red-700 transition-colors cursor-pointer"
            >
              संदेश भेजें
            </button>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
