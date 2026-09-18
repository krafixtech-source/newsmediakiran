import React from "react";
import Link from "next/link";
import { Shield, PlusCircle, CheckCircle } from "lucide-react";
import { getCategories } from "@/lib/db/articles";

export const dynamic = "force-dynamic";

export default async function AdminCategoriesPage() {
  const categories = await getCategories();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-gray-200 pb-4">
        <div>
          <h1 className="font-editorial text-2xl font-black text-gray-900 flex items-center gap-2">
            <Shield className="w-6 h-6 text-[#b91c1c]" />
            <span>श्रेणी प्रबंधन (Category Manager)</span>
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            कुल {categories.length} सक्रिय समाचार श्रेणियां (Synchronized from newsmediakiran.com)
          </p>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-gray-600">
            <thead className="bg-gray-50 border-b border-gray-200 text-gray-700 font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="px-6 py-3">आईडी (ID)</th>
                <th className="px-6 py-3">श्रेणी नाम (Category Name)</th>
                <th className="px-6 py-3">स्लग (Slug)</th>
                <th className="px-6 py-3">विवरण (Description)</th>
                <th className="px-6 py-3">स्थिति (Status)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {categories.map((cat) => (
                <tr key={cat.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-3.5 font-mono text-gray-400">{cat.id}</td>
                  <td className="px-6 py-3.5 font-bold text-gray-900 text-sm">
                    {cat.name}
                  </td>
                  <td className="px-6 py-3.5 font-mono text-gray-500 text-[11px]">{cat.slug}</td>
                  <td className="px-6 py-3.5 text-gray-600">{cat.description}</td>
                  <td className="px-6 py-3.5">
                    <span className="bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded text-[10px] flex items-center gap-1 w-fit">
                      <CheckCircle className="w-3 h-3" /> सक्रिय
                    </span>
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
