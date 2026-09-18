import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { SiteHeader } from "@/components/header/SiteHeader";
import { Footer } from "@/components/footer/Footer";

export default function DisclaimerPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#faf9f6]">
      <SiteHeader initialCity="जयपुर" />

      <main className="max-w-4xl mx-auto px-4 py-12 flex-1 w-full font-hindi">
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-gray-500 mb-6 font-medium">
          <Link href="/" className="hover:text-gray-900 transition-colors">होम</Link>
          <ChevronRight className="w-3 h-3 text-gray-400" />
          <span className="text-gray-900 font-bold">अस्वीकरण (Disclaimer)</span>
        </nav>

        <h1 className="font-editorial text-3xl sm:text-4xl font-black text-gray-900 mb-6">
          अस्वीकरण (Disclaimer) - News Media Kiran
        </h1>

        <div className="bg-white border border-gray-200 p-8 rounded-lg shadow-2xs space-y-4 text-sm text-gray-700 leading-relaxed">
          <p>
            वेबसाइट <strong>newsmediakiran.com</strong> पर प्रकाशित सभी सामग्री केवल सामान्य जानकारी और समाचार प्रसारण के उद्देश्य से 'जैसी है वैसी' (As Is) स्थिति में प्रकाशित की जाती है।
          </p>

          <h3 className="font-bold text-gray-900 text-base pt-2">1. सटीकता एवं दायित्व</h3>
          <p>
            News Media Kiran जानकारी की पूर्णता, विश्वसनीयता और सटीकता के बारे में कोई व्यक्त या निहित वारंटी नहीं देता है। इस वेबसाइट पर मिली जानकारी के आधार पर पाठक द्वारा की जाने वाली किसी भी कार्रवाई का जोखिम पूरी तरह पाठक का होगा।
          </p>

          <h3 className="font-bold text-gray-900 text-base pt-2">2. बाहरी लिंक्स (External Links)</h3>
          <p>
            हमारी वेबसाइट में बाहरी वेब पेजों के हाइपरलिंक्स शामिल हो सकते हैं। हम इन बाहरी साइटों की सामग्री और उनकी प्रकृति पर कोई नियंत्रण नहीं रखते हैं।
          </p>

          <h3 className="font-bold text-gray-900 text-base pt-2">3. सहमति</h3>
          <p>
            हमारी वेबसाइट का उपयोग करके, आप हमारे अस्वीकरण से सहमति व्यक्त करते हैं और इसकी शर्तों से बंधे होने की पुष्टि करते हैं।
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
