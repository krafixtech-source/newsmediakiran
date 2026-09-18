import React from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Clock, User, Calendar, MapPin, ChevronRight, MessageSquare, CheckCircle2, Bookmark } from "lucide-react";
import { getArticleBySlug, getArticles, getMostRead, incrementViewCount } from "@/lib/db/articles";
import { ReadingProgressBar } from "@/components/article/ReadingProgressBar";
import { StickyShareBar } from "@/components/article/StickyShareBar";
import { SiteHeader } from "@/components/header/SiteHeader";
import { Footer } from "@/components/footer/Footer";

export const dynamic = "force-dynamic";

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  // Increment view count asynchronously
  incrementViewCount(slug).catch(() => {});

  // Fetch companion articles
  const [relatedArticles, mostRead] = await Promise.all([
    getArticles({ category: article.primary_category, limit: 4 }),
    getMostRead(5),
  ]);

  const filteredRelated = relatedArticles.filter((a) => a.id !== article.id).slice(0, 3);

  let keyPointsList: string[] = [];
  try {
    if (article.key_points) {
      keyPointsList = typeof article.key_points === "string" ? JSON.parse(article.key_points) : article.key_points;
    }
  } catch (e) {
    keyPointsList = [];
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#faf9f6]">
      <ReadingProgressBar />

      {/* Header */}
      <SiteHeader initialCity="जयपुर" />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        
        {/* Breadcrumb Bar */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-gray-500 mb-6 font-medium">
          <Link href="/" className="hover:text-gray-900 transition-colors">होम</Link>
          <ChevronRight className="w-3 h-3 text-gray-400" />
          <Link href={`/category/${article.primary_category.toLowerCase()}`} className="hover:text-gray-900 transition-colors uppercase">
            {article.primary_category}
          </Link>
          <ChevronRight className="w-3 h-3 text-gray-400" />
          <span className="text-gray-800 line-clamp-1 max-w-sm">{article.headline}</span>
        </nav>

        {/* Article Header */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex items-center gap-2 mb-3">
            <span className="bg-[#b91c1c] text-white text-xs font-bold px-2.5 py-1 uppercase tracking-wider rounded-xs">
              {article.primary_category || "National"}
            </span>
            {article.location_name && (
              <span className="bg-gray-100 border border-gray-300 text-gray-700 text-xs font-medium px-2 py-0.5 rounded-xs flex items-center gap-1">
                <MapPin className="w-3 h-3 text-[#b91c1c]" />
                <span>{article.location_name}</span>
              </span>
            )}
            {article.is_breaking && (
              <span className="bg-red-100 text-[#b91c1c] border border-red-200 text-xs font-bold px-2 py-0.5 rounded-xs animate-pulse">
                ● ब्रेकिंग अपडेट
              </span>
            )}
          </div>

          <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 leading-[1.25] tracking-tight">
            {article.headline}
          </h1>

          {article.excerpt && (
            <p className="mt-4 text-base sm:text-lg text-gray-600 leading-relaxed font-normal">
              {article.excerpt}
            </p>
          )}

          {/* Author & Timestamp Bar */}
          <div className="mt-6 py-3.5 border-y border-gray-200 flex flex-wrap items-center justify-between gap-4 text-xs text-gray-500">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gray-200 overflow-hidden relative">
                <Image
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100"
                  alt={article.author_name || "Author"}
                  fill
                  sizes="36px"
                  className="object-cover"
                />
              </div>
              <div>
                <span className="font-bold text-gray-900 block text-sm">
                  {article.author_name || "News Media Kiran Bureau"}
                </span>
                <span className="text-[11px] text-gray-500">
                  वरिष्ठ समाचार डेस्क • New Delhi
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs font-medium">
              <div className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-gray-400" />
                <span>
                  {new Date(article.published_at).toLocaleDateString("hi-IN", {
                    weekday: "short",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-gray-400" />
                <span>{article.reading_time || "4 min read"}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content Layout with Sticky Share Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Sticky Share Sidebar (Col 1) */}
          <div className="hidden lg:block lg:col-span-1">
            <StickyShareBar title={article.headline} url={`https://newsmediakiran.com/news/${article.slug}`} />
          </div>

          {/* Middle: Article Body (Col 7 - max width 740px) */}
          <article className="lg:col-span-7 max-w-[740px] mx-auto w-full">
            
            {/* Featured Hero Image */}
            {article.featured_image && (
              <figure className="mb-6">
                <div className="relative aspect-[16/10] w-full rounded-md overflow-hidden bg-gray-900 shadow-sm">
                  <Image
                    src={article.featured_image}
                    alt={article.headline}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="mt-2 text-xs text-gray-500 italic text-center">
                  फोटो साभार: News Media Kiran नेटवर्क / ग्राउंड रिपोर्ट
                </figcaption>
              </figure>
            )}

            {/* Quick Take Callout Box */}
            <div className="bg-[#fcf8f2] border-l-4 border-amber-600 p-4 rounded-r-md mb-6 shadow-2xs">
              <span className="text-[11px] font-black uppercase tracking-wider text-amber-900 block mb-1">
                क्विक टेक (Quick Take)
              </span>
              <p className="text-xs sm:text-sm text-gray-800 leading-relaxed font-medium">
                {article.quick_take || article.excerpt}
              </p>
            </div>

            {/* Key Points Box */}
            {keyPointsList.length > 0 && (
              <div className="bg-white border border-gray-200 rounded-md p-5 mb-8 shadow-2xs">
                <h3 className="text-sm font-black text-gray-900 uppercase tracking-wide border-b border-gray-200 pb-2 mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#b91c1c]" />
                  <span>मुख्य बिंदु (Key Highlights)</span>
                </h3>
                <ul className="space-y-2 text-xs sm:text-sm text-gray-700 leading-relaxed">
                  {keyPointsList.map((pt, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-[#b91c1c] font-black text-sm leading-tight">•</span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Full Body Content with Rich Typography */}
            <div
              className="prose prose-lg max-w-none text-gray-800 font-hindi leading-[1.9] text-base sm:text-lg article-content"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

            {/* Mobile Bottom Share Indicator */}
            <div className="lg:hidden mt-8">
              <StickyShareBar title={article.headline} url={`https://newsmediakiran.com/news/${article.slug}`} />
            </div>

            {/* Article Footer & Author Card */}
            <div className="mt-10 p-6 bg-white border border-gray-200 rounded-lg shadow-2xs flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-gray-200 overflow-hidden relative shrink-0">
                <Image
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"
                  alt={article.author_name || "Author"}
                  fill
                  sizes="56px"
                  className="object-cover"
                />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-sm">{article.author_name}</h4>
                <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                  न्यूज़ मीडिया किरण की विशेष रिपोर्टिंग डेस्क। राष्ट्रीय राजनीति, प्रशासनिक नीतियां और खोजी रिपोर्टों पर केंद्रित।
                </p>
              </div>
            </div>

          </article>

          {/* Right: Sidebar with Most Read & Related (Col 4) */}
          <aside className="lg:col-span-4 space-y-8 lg:pl-4">
            
            {/* Related Stories */}
            {filteredRelated.length > 0 && (
              <div className="bg-white border border-gray-200 rounded-md p-4 shadow-2xs">
                <h3 className="font-editorial text-base font-black text-gray-900 border-b-2 border-[#b91c1c] pb-2 mb-4 uppercase">
                  संबंधित समाचार (Related)
                </h3>
                <div className="divide-y divide-gray-200">
                  {filteredRelated.map((rel) => (
                    <article key={rel.id} className="py-3 first:pt-0 last:pb-0 group">
                      <Link href={`/news/${rel.slug}`} className="block">
                        <span className="text-[10px] font-bold text-[#b91c1c] uppercase tracking-wider block mb-1">
                          {rel.primary_category}
                        </span>
                        <h4 className="font-editorial text-xs sm:text-sm font-bold text-gray-900 group-hover:text-[#b91c1c] leading-snug line-clamp-2 transition-colors">
                          {rel.headline}
                        </h4>
                        <span className="text-[10px] text-gray-400 mt-1 block">
                          {rel.reading_time}
                        </span>
                      </Link>
                    </article>
                  ))}
                </div>
              </div>
            )}

            {/* Most Read Ranking */}
            <div className="bg-[#fcfbfa] border border-gray-200 rounded-md p-4 shadow-2xs">
              <h3 className="font-editorial text-base font-black text-gray-900 border-b-2 border-gray-900 pb-2 mb-4 uppercase">
                सर्वाधिक पढ़े गए (Most Read)
              </h3>
              <div className="divide-y divide-gray-200">
                {mostRead.map((item, idx) => (
                  <article key={item.id} className="py-3 first:pt-0 last:pb-0 group">
                    <Link href={`/news/${item.slug}`} className="flex items-start gap-3">
                      <span className="font-editorial text-xl font-black text-gray-300 group-hover:text-[#b91c1c] transition-colors shrink-0">
                        0{idx + 1}
                      </span>
                      <div>
                        <h4 className="font-editorial text-xs font-bold text-gray-900 group-hover:text-[#b91c1c] leading-snug line-clamp-2 transition-colors">
                          {item.headline}
                        </h4>
                        <span className="text-[10px] text-gray-400 mt-0.5 block">
                          {item.reading_time}
                        </span>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            </div>

          </aside>

        </div>
      </main>

      <Footer />
    </div>
  );
}
