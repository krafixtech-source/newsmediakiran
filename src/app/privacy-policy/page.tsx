import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { SiteHeader } from "@/components/header/SiteHeader";
import { Footer } from "@/components/footer/Footer";

export default function PrivacyPolicyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#faf9f6]">
      <SiteHeader initialCity="जयपुर" />

      <main className="max-w-4xl mx-auto px-4 py-12 flex-1 w-full font-hindi">
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-gray-500 mb-6 font-medium">
          <Link href="/" className="hover:text-gray-900 transition-colors">होम</Link>
          <ChevronRight className="w-3 h-3 text-gray-400" />
          <span className="text-gray-900 font-bold">गोपनीयता नीति (Privacy Policy)</span>
        </nav>

        <h1 className="font-editorial text-3xl sm:text-4xl font-black text-gray-900 mb-6">
          गोपनीयता नीति (Privacy Policy) - News Media Kiran
        </h1>

        <div className="bg-white border border-gray-200 p-8 rounded-lg shadow-2xs space-y-4 text-sm text-gray-700 leading-relaxed">
          <p>
            News Media Kiran (https://newsmediakiran.com) पर आपके व्यक्तिगत डेटा और गोपनीयता की रक्षा करना हमारी सर्वोच्च प्राथमिकताओं में से एक है। यह नीति बताती है कि जब आप हमारी वेबसाइट और सेवाओं का उपयोग करते हैं, तो हम किस प्रकार की जानकारी एकत्र करते हैं और उसका कैसे उपयोग करते हैं।
          </p>

          <h3 className="font-bold text-gray-900 text-base pt-2">1. सूचना एकत्रण (Information Collection)</h3>
          <p>
            जब आप हमारे न्यूज़लेटर की सदस्यता लेते हैं, टिप्पणी करते हैं अथवा संपर्क फ़ॉर्म भरते हैं, तो हम आपका नाम और ईमेल पता एकत्र कर सकते हैं। इसके अलावा, वेबसाइट के बेहतर अनुभव हेतु कुकीज़ और एनालिटिक्स डेटा का उपयोग किया जाता है।
          </p>

          <h3 className="font-bold text-gray-900 text-base pt-2">2. डेटा सुरक्षा (Data Protection)</h3>
          <p>
            हम आपके व्यक्तिगत डेटा को कभी भी किसी तीसरे पक्ष को बेचते या किराए पर नहीं देते हैं। एकत्र की गई सभी जानकारी उद्योग-मानक एन्क्रिप्शन और सुरक्षा प्रोटोकॉल के अंतर्गत सुरक्षित रखी जाती है।
          </p>

          <h3 className="font-bold text-gray-900 text-base pt-2">3. कुकीज़ का उपयोग (Cookies Usage)</h3>
          <p>
            हमारी वेबसाइट उपयोगकर्ता अनुभव को अनुकूलित करने के लिए कुकीज़ का उपयोग करती है। आप अपने ब्राउज़र सेटिंग्स में जाकर किसी भी समय कुकीज़ को अक्षम कर सकते हैं।
          </p>

          <h3 className="font-bold text-gray-900 text-base pt-2">4. संपर्क</h3>
          <p>
            गोपनीयता नीति से संबंधित किसी भी प्रश्न के लिए contact@newsmediakiran.com पर लिखें।
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
