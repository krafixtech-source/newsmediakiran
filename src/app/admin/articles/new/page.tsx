"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowLeft, Save, Upload, Sparkles, Check, Flame } from "lucide-react";

export default function NewArticlePage() {
  const router = useRouter();
  const [categories, setCategories] = useState<any[]>([]);
  const [authors, setAuthors] = useState<any[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  // Form State
  const [headline, setHeadline] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [featuredImage, setFeaturedImage] = useState(
    "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200"
  );
  const [categoryId, setCategoryId] = useState("76");
  const [authorId, setAuthorId] = useState("1");
  const [locationName, setLocationName] = useState("जयपुर");
  const [status, setStatus] = useState("published");

  // Flags
  const [isFeatured, setIsFeatured] = useState(false);
  const [isTrending, setIsTrending] = useState(false);
  const [isBreaking, setIsBreaking] = useState(false);
  const [isPremium, setIsPremium] = useState(false);

  // Quick Take & Key Points
  const [quickTake, setQuickTake] = useState("");
  const [keyPoints, setKeyPoints] = useState<string[]>([
    "सत्यापित सूत्रों व ग्राउंड रिपोर्टिंग पर आधारित रिपोर्ट।",
    "प्रशासनिक और नीतिगत फैसलों का जनता पर सीधा असर।",
  ]);

  // SEO
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");

  useEffect(() => {
    // Auto-generate slug from headline
    if (headline) {
      const generated = headline
        .toLowerCase()
        .replace(/[^a-zA-Z0-9\u0900-\u097F\s-]/g, "")
        .replace(/\s+/g, "-")
        .slice(0, 80);
      setSlug(generated);
      if (!metaTitle) setMetaTitle(headline);
    }
  }, [headline]);

  const handleAddKeyPoint = () => {
    setKeyPoints([...keyPoints, ""]);
  };

  const handleKeyPointChange = (idx: number, val: string) => {
    const updated = [...keyPoints];
    updated[idx] = val;
    setKeyPoints(updated);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", "news");

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setFeaturedImage(data.url);
      } else {
        alert("Upload failed: " + data.error);
      }
    } catch (err: any) {
      alert("Error: " + err.message);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!headline || !slug || !content) {
      alert("कृपया शीर्षक, स्लग और समाचार सामग्री दर्ज करें।");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/articles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          headline,
          slug,
          excerpt,
          content,
          featured_image: featuredImage,
          category_id: Number(categoryId),
          author_id: Number(authorId),
          location_name: locationName,
          status,
          is_featured: isFeatured,
          is_trending: isTrending,
          is_breaking: isBreaking,
          is_premium: isPremium,
          quick_take: quickTake || excerpt,
          key_points: keyPoints.filter((k) => k.trim().length > 0),
          meta_title: metaTitle,
          meta_description: metaDescription || excerpt,
        }),
      });

      const data = await res.json();
      if (data.success) {
        router.push("/admin/articles");
      } else {
        alert("त्रुटि: " + data.error);
      }
    } catch (err: any) {
      alert("एरर: " + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-5xl mx-auto space-y-8 pb-16">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-200 pb-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => router.back()}
            className="p-1.5 rounded-full hover:bg-gray-200 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          <div>
            <h1 className="font-editorial text-2xl font-black text-gray-900">
              नया समाचार प्रकाशित करें (New Story)
            </h1>
            <p className="text-xs text-gray-500">
              News Media Kiran संपादकीय प्रणाली
            </p>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-2.5 bg-[#b91c1c] hover:bg-red-700 disabled:opacity-50 text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow-sm transition-colors flex items-center gap-2 cursor-pointer"
        >
          <Save className="w-4 h-4" />
          <span>{isSubmitting ? "सहेजा जा रहा है..." : "प्रकाशित करें (Publish Story)"}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Main Form (Col 8) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Headline */}
          <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-2xs">
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
              समाचार शीर्षक (Headline) *
            </label>
            <input
              type="text"
              required
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              placeholder="बड़ा और आकर्षक समाचार शीर्षक लिखें..."
              className="w-full px-4 py-3 text-lg font-bold border border-gray-300 rounded-md outline-none focus:border-[#b91c1c] text-gray-900"
            />

            <div className="mt-3 flex items-center gap-2 text-xs text-gray-500">
              <span className="font-semibold text-gray-700">URL Slug:</span>
              <input
                type="text"
                required
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="flex-1 bg-gray-50 border border-gray-200 px-2 py-1 rounded text-xs font-mono text-gray-700 outline-none"
              />
            </div>
          </div>

          {/* Short Excerpt */}
          <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-2xs">
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
              संक्षिप्त सारांश (Excerpt / Lead Summary)
            </label>
            <textarea
              rows={3}
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="1-2 वाक्यों में खबर का सार..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:border-[#b91c1c] text-gray-800"
            ></textarea>
          </div>

          {/* Content Body */}
          <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-2xs">
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
                पूर्ण समाचार सामग्री (Article Content HTML / Rich Text) *
              </label>
            </div>
            <textarea
              rows={14}
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="<p>समाचार का विस्तृत विवरण यहां लिखें...</p>"
              className="w-full px-4 py-3 border border-gray-300 rounded-md text-sm font-hindi leading-relaxed outline-none focus:border-[#b91c1c] text-gray-800"
            ></textarea>
          </div>

          {/* Quick Take & Key Points */}
          <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-2xs space-y-4">
            <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider border-b border-gray-200 pb-2">
              विशेष संपादकीय बॉक्स (Quick Take & Key Points)
            </h3>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">क्विक टेक (Quick Take Box)</label>
              <input
                type="text"
                value={quickTake}
                onChange={(e) => setQuickTake(e.target.value)}
                placeholder="उदा. 10 मिनट के भीतर इलाज हेतु विशेष व्यवस्था..."
                className="w-full px-3 py-2 border border-gray-300 rounded text-xs outline-none focus:border-[#b91c1c]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">मुख्य बिंदु (Key Highlights)</label>
              {keyPoints.map((pt, idx) => (
                <div key={idx} className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-bold text-[#b91c1c]">•</span>
                  <input
                    type="text"
                    value={pt}
                    onChange={(e) => handleKeyPointChange(idx, e.target.value)}
                    placeholder={`Highlight point ${idx + 1}`}
                    className="flex-1 px-3 py-1.5 border border-gray-300 rounded text-xs outline-none focus:border-[#b91c1c]"
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddKeyPoint}
                className="text-xs font-bold text-[#b91c1c] hover:underline cursor-pointer"
              >
                + और बिंदु जोड़ें
              </button>
            </div>
          </div>

          {/* SEO Fields */}
          <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-2xs space-y-4">
            <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider border-b border-gray-200 pb-2">
              सर्च इंजन ऑप्टिमाइजेशन (SEO Meta Details)
            </h3>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">SEO Title</label>
              <input
                type="text"
                value={metaTitle}
                onChange={(e) => setMetaTitle(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded text-xs outline-none focus:border-[#b91c1c]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Meta Description</label>
              <textarea
                rows={2}
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded text-xs outline-none focus:border-[#b91c1c]"
              ></textarea>
            </div>
          </div>
        </div>

        {/* Right Controls Sidebar (Col 4) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Featured Image Box */}
          <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-2xs">
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
              प्रमुख चित्र (Featured Image) *
            </label>

            <div className="relative aspect-[16/10] w-full rounded border border-gray-200 overflow-hidden bg-gray-100 mb-3">
              <Image
                src={featuredImage}
                alt="Featured preview"
                fill
                sizes="300px"
                className="object-cover"
              />
            </div>

            <div className="space-y-2">
              <input
                type="text"
                value={featuredImage}
                onChange={(e) => setFeaturedImage(e.target.value)}
                placeholder="Image URL..."
                className="w-full px-2 py-1.5 border border-gray-300 rounded text-xs outline-none font-mono"
              />

              <label className="block w-full py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded text-xs font-bold text-center cursor-pointer transition-colors border border-gray-300">
                <span>{isUploading ? "अपलोड हो रहा है..." : "कंप्यूटर से अपलोड करें (Upload)"}</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUploading}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Category & Location */}
          <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-2xs space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                प्राथमिक श्रेणी (Category)
              </label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded text-xs outline-none font-semibold text-gray-800"
              >
                <option value="76">देश (National)</option>
                <option value="79">राजस्थान (Rajasthan / State)</option>
                <option value="80">राजनीति (Politics)</option>
                <option value="87">क्राइम (Crime)</option>
                <option value="106">व्यापार (Business)</option>
                <option value="81">खेल (Sports)</option>
                <option value="22889">मनोरंजन (Entertainment)</option>
                <option value="123">शिक्षा (Education)</option>
                <option value="17857">लाइफस्टाइल (Lifestyle)</option>
                <option value="7289">बिहार न्यूज़ (Bihar)</option>
                <option value="7290">झारखंड न्यूज़ (Jharkhand)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                स्थान (Location)
              </label>
              <input
                type="text"
                value={locationName}
                onChange={(e) => setLocationName(e.target.value)}
                placeholder="उदा. जयपुर, नई दिल्ली"
                className="w-full px-3 py-2 border border-gray-300 rounded text-xs outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                संवाददाता (Author)
              </label>
              <select
                value={authorId}
                onChange={(e) => setAuthorId(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded text-xs outline-none text-gray-800"
              >
                <option value="37">Sanjna Gupta (संजना गुप्ता)</option>
                <option value="50">Netsha Singh (नेतशा सिंह)</option>
                <option value="14">Govind Pathak (गोविंद पाठक)</option>
                <option value="39">Krishan Mohan Shukla</option>
                <option value="11">News Media Kiran Bureau</option>
              </select>
            </div>
          </div>

          {/* Editorial Flags */}
          <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-2xs space-y-3">
            <span className="block text-xs font-bold text-gray-700 uppercase tracking-wider border-b border-gray-200 pb-1.5">
              संपादकीय फ्लैग (Flags)
            </span>

            <label className="flex items-center gap-2 text-xs font-semibold text-gray-800 cursor-pointer">
              <input
                type="checkbox"
                checked={isBreaking}
                onChange={(e) => setIsBreaking(e.target.checked)}
                className="rounded text-red-600 w-4 h-4"
              />
              <span className="flex items-center gap-1 text-red-600">
                <Flame className="w-3.5 h-3.5" /> ब्रेकिंग न्यूज़ (Breaking Ticker)
              </span>
            </label>

            <label className="flex items-center gap-2 text-xs font-semibold text-gray-800 cursor-pointer">
              <input
                type="checkbox"
                checked={isFeatured}
                onChange={(e) => setIsFeatured(e.target.checked)}
                className="rounded text-amber-600 w-4 h-4"
              />
              <span>होमपेज लीड स्टोरी (Hero Featured)</span>
            </label>

            <label className="flex items-center gap-2 text-xs font-semibold text-gray-800 cursor-pointer">
              <input
                type="checkbox"
                checked={isTrending}
                onChange={(e) => setIsTrending(e.target.checked)}
                className="rounded text-indigo-600 w-4 h-4"
              />
              <span>ट्रेंडिंग समाचार (Trending)</span>
            </label>
          </div>

        </div>

      </div>
    </form>
  );
}
