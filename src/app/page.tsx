import React from "react";
import { getArticles, getTopStories, getMostRead, getBreakingNews } from "@/lib/db/articles";
import { ClientHomepageShell } from "@/components/home/ClientHomepageShell";

// Force dynamic so admin edits and live sync reflect immediately on refresh
export const dynamic = "force-dynamic";

export default async function HomePage() {
  // Fetch from database layer
  const [allArticles, topStories, mostRead, breakingItems] = await Promise.all([
    getArticles({ limit: 40 }),
    getTopStories(6),
    getMostRead(5),
    getBreakingNews(),
  ]);

  const featuredArticle = allArticles.find((a) => a.is_featured) || allArticles[0];
  const rajasthanArticles = allArticles.filter((a) =>
    a.location_name?.includes("Jaipur") ||
    a.location_name?.includes("Rajasthan") ||
    a.primary_category?.includes("Rajasthan") ||
    a.primary_category?.includes("Jharkhand") ||
    a.primary_category?.includes("Bihar")
  );
  const nationalArticles = allArticles.filter((a) => a.primary_category?.includes("National") || a.category_id === 76);
  const crimeArticles = allArticles.filter((a) => a.primary_category?.toLowerCase().includes("crime") || a.category_id === 87);
  const businessArticles = allArticles.filter((a) => a.primary_category?.toLowerCase().includes("business") || a.category_id === 106);
  const sportsArticles = allArticles.filter((a) => a.primary_category?.toLowerCase().includes("sports") || a.category_id === 81);
  const entertainmentArticles = allArticles.filter((a) => a.primary_category?.toLowerCase().includes("entertainment") || a.category_id === 22889);
  const techArticles = allArticles.filter((a) => a.primary_category?.toLowerCase().includes("tech") || a.category_id === 123);

  // Fallbacks ensuring rich content in every section
  const effectiveRajasthan = rajasthanArticles.length >= 4 ? rajasthanArticles : allArticles.slice(2, 8);
  const effectiveNational = nationalArticles.length >= 4 ? nationalArticles : allArticles.slice(4, 10);
  const effectiveCrime = crimeArticles.length >= 4 ? crimeArticles : allArticles.slice(6, 12);
  const effectiveBusiness = businessArticles.length >= 4 ? businessArticles : allArticles.slice(8, 14);
  const effectiveSports = sportsArticles.length >= 4 ? sportsArticles : allArticles.slice(10, 16);
  const effectiveEntertainment = entertainmentArticles.length >= 4 ? entertainmentArticles : allArticles.slice(12, 18);
  const effectiveTech = techArticles.length >= 4 ? techArticles : allArticles.slice(14, 20);

  return (
    <ClientHomepageShell
      featuredArticle={featuredArticle}
      topStories={topStories}
      latestArticles={allArticles.slice(0, 10)}
      rajasthanArticles={effectiveRajasthan}
      nationalArticles={effectiveNational}
      crimeArticles={effectiveCrime}
      businessArticles={effectiveBusiness}
      sportsArticles={effectiveSports}
      entertainmentArticles={effectiveEntertainment}
      techArticles={effectiveTech}
      mostReadArticles={mostRead}
      breakingItems={breakingItems}
    />
  );
}
