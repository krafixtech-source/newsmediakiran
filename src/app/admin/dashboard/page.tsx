import React from "react";
import { getArticles, getDashboardStats, getCategories } from "@/lib/db/articles";
import { AdminDashboardClient } from "@/components/admin/AdminDashboardClient";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const [stats, recentArticles, categories] = await Promise.all([
    getDashboardStats(),
    getArticles({ limit: 8 }),
    getCategories(),
  ]);

  return (
    <AdminDashboardClient
      stats={stats}
      recentArticles={recentArticles}
      totalCategories={categories.length}
    />
  );
}
