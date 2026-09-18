import { NextRequest, NextResponse } from "next/server";
import { getArticles, createArticle } from "@/lib/db/articles";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const limit = parseInt(searchParams.get("limit") || "20", 10);
    const offset = parseInt(searchParams.get("offset") || "0", 10);
    const category = searchParams.get("category") || undefined;
    const location = searchParams.get("location") || undefined;
    const search = searchParams.get("search") || undefined;
    const status = searchParams.get("status") || "published";
    const is_featured = searchParams.get("is_featured") ? searchParams.get("is_featured") === "true" : undefined;
    const is_trending = searchParams.get("is_trending") ? searchParams.get("is_trending") === "true" : undefined;
    const is_breaking = searchParams.get("is_breaking") ? searchParams.get("is_breaking") === "true" : undefined;

    const articles = await getArticles({
      limit,
      offset,
      category,
      location,
      search,
      status,
      is_featured,
      is_trending,
      is_breaking,
    });

    return NextResponse.json({ success: true, count: articles.length, articles });
  } catch (err: any) {
    console.error("API /api/articles error:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.headline || !body.slug || !body.content) {
      return NextResponse.json(
        { success: false, error: "Headline, slug, and content are required" },
        { status: 400 }
      );
    }

    const insertId = await createArticle({
      headline: body.headline,
      slug: body.slug,
      excerpt: body.excerpt || body.content.slice(0, 200),
      content: body.content,
      featured_image: body.featured_image || "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200",
      mobile_image: body.mobile_image,
      category_id: Number(body.category_id) || 76,
      author_id: Number(body.author_id) || 1,
      location_name: body.location_name || "New Delhi",
      status: body.status || "published",
      is_featured: Boolean(body.is_featured),
      is_trending: Boolean(body.is_trending),
      is_breaking: Boolean(body.is_breaking),
      is_premium: Boolean(body.is_premium),
      quick_take: body.quick_take,
      key_points: body.key_points,
      meta_title: body.meta_title,
      meta_description: body.meta_description,
    });

    return NextResponse.json({ success: true, insertId, message: "Article created successfully" }, { status: 201 });
  } catch (err: any) {
    console.error("POST /api/articles error:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
