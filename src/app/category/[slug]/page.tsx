import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Clock, ArrowRight, Filter } from "lucide-react";
import { getArticles, getCategories } from "@/lib/db/articles";
import { SiteHeader } from "@/components/header/SiteHeader";
import { Footer } from "@/components/footer/Footer";

export const dynamic = "force-dynamic";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);

  // Fetch all categories to match
  const categories = await getCategories();
  const matchedCat = categories.find(
    (c) => c.slug === slug || c.slug === decodedSlug || c.name.toLowerCase() === decodedSlug.toLowerCase()
  );

  const categoryName = matchedCat?.name || decodedSlug.toUpperCase();

  // Fetch articles matching this category
  const articles = await getArticles({
    category: categoryName,
    limit: 24,
  });

  return (
    <div className="flex flex-col min-h-screen bg-[#faf9f6]">
      <SiteHeader initialCity="जयपुर" />

      <main className="max-w-7xl mx-auto px-4 py-8 flex-1 w-full">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-gray-500 mb-6 font-medium">
          <Link href="/" className="hover:text-gray-900 transition-colors">होम</Link>
          <ChevronRight className="w-3 h-3 text-gray-400" />
          <span className="text-gray-900 uppercase font-bold">{categoryName}</span>
        </nav>

        {/* Category Masthead & Filter Bar */}
        <div className="border-b-2 border-[#111827] pb-4 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-[#b91c1c] uppercase tracking-widest block mb-1">
              श्रेणी कवरेज • Category Desk
            </span>
            <h1 className="font-editorial text-3xl sm:text-4xl font-black text-gray-900 uppercase">
              {categoryName}
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 mt-1">
              {categoryName} से जुड़े सभी सत्यापित समाचार, संपादकीय विश्लेषण व ग्राउंड रिपोर्ट्स।
            </p>
          </div>

          {/* Filter Chips */}
          <div className="flex items-center gap-2 text-xs font-semibold text-gray-700">
            <Filter className="w-3.5 h-3.5 text-gray-500" />
            <span className="text-gray-400">क्रमबद्ध:</span>
            <button className="px-3 py-1 bg-white border border-gray-300 rounded shadow-2xs font-bold text-[#b91c1c]">
              नवीनतम (Latest)
            </button>
            <button className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded transition-colors">
              लोकप्रिय (Most Read)
            </button>
          </div>
        </div>

        {/* Article Grid */}
        {articles.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((art) => (
              <article
                key={art.id}
                className="group bg-white border border-gray-200 rounded-md overflow-hidden shadow-2xs hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <Link href={`/news/${art.slug}`}>
                  <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                    <Image
                      src={art.featured_image}
                      alt={art.headline}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4">
                    <span className="text-[10px] font-bold text-[#b91c1c] uppercase tracking-wider block mb-1">
                      {art.primary_category}
                    </span>
                    <h3 className="font-editorial text-base font-bold text-gray-900 group-hover:text-[#b91c1c] leading-snug line-clamp-2 transition-colors">
                      {art.headline}
                    </h3>
                    <p className="mt-2 text-xs text-gray-600 line-clamp-2 leading-relaxed">
                      {art.excerpt}
                    </p>
                  </div>
                </Link>

                <div className="px-4 pb-3.5 pt-2 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400 font-medium">
                  <span>{art.author_name || "Bureau"}</span>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{art.reading_time}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="py-16 text-center bg-white border border-gray-200 rounded-lg p-8">
            <h3 className="text-lg font-bold text-gray-700">
              इस श्रेणी में अभी कोई समाचार उपलब्ध नहीं है।
            </h3>
            <p className="text-xs text-gray-500 mt-2">
              कृपया अन्य श्रेणियों को देखें अथवा मुख्य पृष्ठ पर जाएं।
            </p>
            <Link
              href="/"
              className="mt-4 inline-flex items-center gap-2 bg-[#b91c1c] text-white text-xs font-bold px-4 py-2 rounded"
            >
              मुख्य पृष्ठ पर जाएं →
            </Link>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
