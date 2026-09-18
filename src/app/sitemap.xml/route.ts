import { NextResponse } from "next/server";
import { getArticles, getCategories } from "@/lib/db/articles";

export async function GET() {
  const [articles, categories] = await Promise.all([
    getArticles({ limit: 100 }),
    getCategories(),
  ]);

  const baseUrl = "https://newsmediakiran.com";

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}</loc>
    <changefreq>always</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/rajasthan</loc>
    <changefreq>hourly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${baseUrl}/videos</loc>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/podcasts</loc>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/puzzles</loc>
    <changefreq>daily</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>${baseUrl}/quiz</loc>
    <changefreq>daily</changefreq>
    <priority>0.7</priority>
  </url>`;

  for (const cat of categories) {
    xml += `
  <url>
    <loc>${baseUrl}/category/${cat.slug}</loc>
    <changefreq>hourly</changefreq>
    <priority>0.8</priority>
  </url>`;
  }

  for (const art of articles) {
    xml += `
  <url>
    <loc>${baseUrl}/news/${art.slug}</loc>
    <lastmod>${new Date(art.published_at).toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`;
  }

  xml += `
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}
