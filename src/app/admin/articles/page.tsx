import React from "react";
import Link from "next/link";
import { PlusCircle, Search, Trash2, Edit, ExternalLink } from "lucide-react";
import { getArticles } from "@/lib/db/articles";

export const dynamic = "force-dynamic";

export default async function ArticlesListPage() {
  const articles = await getArticles({ limit: 50 });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-4">
        <div>
          <h1 className="font-editorial text-2xl font-black text-gray-900">
            सभी समाचार लेख (Article Management)
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            कुल {articles.length} लेख लोड किए गए
          </p>
        </div>

        <Link
          href="/admin/articles/new"
          className="px-4 py-2 bg-[#b91c1c] text-white text-xs font-bold rounded-lg shadow-xs hover:bg-red-700 transition-colors flex items-center gap-1.5"
        >
          <PlusCircle className="w-4 h-4" />
          <span>+ नया समाचार जोड़ें</span>
        </Link>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-gray-600">
            <thead className="bg-gray-50 border-b border-gray-200 text-gray-700 font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="px-6 py-3">शीर्षक (Headline)</th>
                <th className="px-6 py-3">श्रेणी</th>
                <th className="px-6 py-3">संवाददाता</th>
                <th className="px-6 py-3">स्थिति (Status)</th>
                <th className="px-6 py-3">तारीख</th>
                <th className="px-6 py-3 text-right">कार्रवाई</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {articles.map((art) => (
                <tr key={art.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 max-w-md">
                    <span className="font-bold text-gray-900 line-clamp-1 block">
                      {art.headline}
                    </span>
                    <span className="text-[11px] text-gray-400">/{art.slug}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="bg-gray-100 text-gray-800 px-2 py-0.5 rounded text-[11px] font-medium">
                      {art.primary_category}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-800">{art.author_name}</td>
                  <td className="px-6 py-4">
                    <span className="bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded text-[10px]">
                      {art.status || "published"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    {new Date(art.published_at).toLocaleDateString("hi-IN", {
                      month: "short",
                      day: "numeric",
                    })}
                  </td>
                  <td className="px-6 py-4 text-right space-x-3">
                    <Link
                      href={`/news/${art.slug}`}
                      target="_blank"
                      className="text-gray-500 hover:text-gray-900 inline-flex items-center gap-1"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
