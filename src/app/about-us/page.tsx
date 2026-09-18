import React from "react";
import Link from "next/link";
import { Shield, Award, Users, CheckCircle2, ChevronRight } from "lucide-react";
import { SiteHeader } from "@/components/header/SiteHeader";
import { Footer } from "@/components/footer/Footer";

export default function AboutUsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#faf9f6]">
      <SiteHeader initialCity="जयपुर" />

      <main className="max-w-4xl mx-auto px-4 py-12 flex-1 w-full">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-gray-500 mb-6 font-medium">
          <Link href="/" className="hover:text-gray-900 transition-colors">होम</Link>
          <ChevronRight className="w-3 h-3 text-gray-400" />
          <span className="text-gray-900 font-bold">हमारे बारे में (About Us)</span>
        </nav>

        <span className="text-xs font-bold text-[#b91c1c] uppercase tracking-widest block mb-1">
          संस्थान परिचय • About the Publication
        </span>
        <h1 className="font-editorial text-3xl sm:text-5xl font-black text-gray-900 mb-6">
          News Media Kiran: विश्वसनीयता, निर्भीकता व निष्पक्षता
        </h1>

        <div className="prose prose-lg text-gray-700 leading-relaxed font-hindi space-y-6">
          <p className="text-base sm:text-lg leading-relaxed text-gray-800 font-medium">
            <strong>News Media Kiran</strong> भारत का एक उभरता हुआ, प्रतिष्ठित और भरोसेमंद डिजिटल न्यूज़ मीडिया संस्थान है। हमारी स्थापना का मुख्य उद्देश्य जनसरोकार से जुड़ी खबरों को बिना किसी पक्षपात, राजनीतिक दबाव अथवा सनसनीखेज प्रस्तुति के सीधे पाठकों तक पहुंचाना है।
          </p>

          <div className="bg-white border-l-4 border-[#b91c1c] p-6 rounded-r-lg shadow-2xs my-6">
            <h3 className="font-editorial text-xl font-bold text-gray-900 mb-2">
              हमारा संपादकीय संकल्प (Editorial Commitment)
            </h3>
            <p className="text-sm text-gray-700 leading-relaxed">
              "हम सत्य, तथ्यों और ग्राउंड रिपोर्टिंग के प्रति जवाबदेह हैं। न्यूज़ मीडिया किरण लोकतंत्र के चौथे स्तंभ के रूप में संविधान, न्याय और नागरिकों के अधिकारों की रक्षा हेतु निरंतर कार्य करता है।"
            </p>
          </div>

          <h2 className="font-editorial text-2xl font-bold text-gray-900 pt-4">
            हमारे प्रमुख स्तंभ (Our Pillars)
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 not-prose my-6">
            <div className="bg-white border border-gray-200 p-5 rounded-lg shadow-2xs">
              <Shield className="w-8 h-8 text-[#b91c1c] mb-3" />
              <h4 className="font-bold text-base text-gray-900">निष्पक्ष पत्रकारिता</h4>
              <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                किसी भी राजनीतिक दल अथवा व्यावसायिक संगठन से स्वतंत्र, तथ्य-आधारित रिपोर्टिंग।
              </p>
            </div>

            <div className="bg-white border border-gray-200 p-5 rounded-lg shadow-2xs">
              <Award className="w-8 h-8 text-amber-700 mb-3" />
              <h4 className="font-bold text-base text-gray-900">सत्यापित तथ्य (Fact Check)</h4>
              <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                प्रत्येक खबर को प्रकाशित करने से पूर्व दोहरे स्रोतों द्वारा पुष्टि और जांच।
              </p>
            </div>

            <div className="bg-white border border-gray-200 p-5 rounded-lg shadow-2xs">
              <Users className="w-8 h-8 text-indigo-700 mb-3" />
              <h4 className="font-bold text-base text-gray-900">ग्राउंड रिपोर्टिंग</h4>
              <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                राजस्थान के दूर-दराज गांवों से लेकर राष्ट्रीय राजधानी तक जमीनी संवाददाताओं का नेटवर्क।
              </p>
            </div>
          </div>

          <h2 className="font-editorial text-2xl font-bold text-gray-900 pt-4">
            संपर्क एवं कार्यालय विवरण
          </h2>
          <p className="text-sm text-gray-700 leading-relaxed">
            संपादकीय सुझाव, प्रेस विज्ञप्ति अथवा सुधार हेतु हमसे संपर्क करें:<br />
            <strong>ईमेल:</strong> contact@newsmediakiran.com<br />
            <strong>हेल्पलाइन:</strong> 0123456789<br />
            <strong>वेबसाइट:</strong> https://newsmediakiran.com
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
