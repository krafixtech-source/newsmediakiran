import { dbQuery, dbExecute } from "./connection";
import { triggerAutoSyncIfNeeded } from "../sync/newsmediakiran";

export interface Article {
  id: number;
  headline: string;
  slug: string;
  excerpt: string;
  content: string;
  featured_image: string;
  mobile_image: string;
  category_id: number;
  author_id: number;
  author_name: string;
  primary_category: string;
  location_name: string;
  reading_time: string;
  quick_take?: string;
  key_points?: string;
  status: string;
  is_featured: number | boolean;
  is_trending: number | boolean;
  is_breaking: number | boolean;
  is_premium: number | boolean;
  meta_title?: string;
  meta_description?: string;
  view_count: number;
  share_count: number;
  published_at: string;
  updated_at?: string;
}

export async function getArticles(options: {
  limit?: number;
  offset?: number;
  category?: string;
  location?: string;
  is_featured?: boolean;
  is_trending?: boolean;
  is_breaking?: boolean;
  search?: string;
  status?: string;
} = {}): Promise<Article[]> {
  const {
    limit = 20,
    offset = 0,
    category,
    location,
    is_featured,
    is_trending,
    is_breaking,
    search,
    status = "published",
  } = options;

  // Fire-and-forget background auto-sync without slowing down current request
  triggerAutoSyncIfNeeded().catch(() => {});

  let sql = "SELECT * FROM articles WHERE 1=1";
  const params: any[] = [];

  if (status) {
    sql += " AND status = ?";
    params.push(status);
  }

  if (category) {
    sql += " AND (primary_category LIKE ? OR category_id IN (SELECT id FROM categories WHERE slug = ? OR name LIKE ?))";
    params.push(`%${category}%`, category, `%${category}%`);
  }

  if (location) {
    sql += " AND location_name LIKE ?";
    params.push(`%${location}%`);
  }

  if (is_featured !== undefined) {
    sql += " AND is_featured = ?";
    params.push(is_featured ? 1 : 0);
  }

  if (is_trending !== undefined) {
    sql += " AND is_trending = ?";
    params.push(is_trending ? 1 : 0);
  }

  if (is_breaking !== undefined) {
    sql += " AND is_breaking = ?";
    params.push(is_breaking ? 1 : 0);
  }

  if (search) {
    sql += " AND (headline LIKE ? OR excerpt LIKE ? OR content LIKE ?)";
    params.push(`%${search}%`, `%${search}%`, `%${search}%`);
  }

  sql += " ORDER BY published_at DESC LIMIT ? OFFSET ?";
  params.push(limit, offset);

  return dbQuery<Article>(sql, params);
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const articles = await dbQuery<Article>("SELECT * FROM articles WHERE slug = ? LIMIT 1", [slug]);
  return articles[0] || null;
}

export async function getArticleById(id: number): Promise<Article | null> {
  const articles = await dbQuery<Article>("SELECT * FROM articles WHERE id = ? LIMIT 1", [id]);
  return articles[0] || null;
}

export async function getTopStories(limit: number = 5): Promise<Article[]> {
  return dbQuery<Article>(
    "SELECT * FROM articles WHERE status = 'published' ORDER BY is_featured DESC, view_count DESC, published_at DESC LIMIT ?",
    [limit]
  );
}

export async function getMostRead(limit: number = 5): Promise<Article[]> {
  return dbQuery<Article>(
    "SELECT * FROM articles WHERE status = 'published' ORDER BY view_count DESC LIMIT ?",
    [limit]
  );
}

export async function getBreakingNews(): Promise<any[]> {
  return dbQuery(
    "SELECT * FROM breaking_news WHERE is_active = 1 ORDER BY priority ASC, created_at DESC LIMIT 10"
  );
}

export async function getCategories(): Promise<any[]> {
  return dbQuery("SELECT * FROM categories ORDER BY sort_order ASC, name ASC");
}

export async function getAuthors(): Promise<any[]> {
  return dbQuery("SELECT * FROM authors ORDER BY name ASC");
}

export async function getHomepageSections(): Promise<any[]> {
  return dbQuery("SELECT * FROM homepage_sections WHERE is_enabled = 1 ORDER BY sort_order ASC");
}

export async function incrementViewCount(slug: string): Promise<void> {
  await dbExecute("UPDATE articles SET view_count = view_count + 1 WHERE slug = ?", [slug]);
}

export async function getDashboardStats(): Promise<{
  totalArticles: number;
  publishedCount: number;
  draftCount: number;
  totalViews: number;
  breakingCount: number;
  categoriesCount: number;
  authorsCount: number;
}> {
  const [artCount] = await dbQuery<{ total: number }>("SELECT COUNT(*) as total FROM articles");
  const [pubCount] = await dbQuery<{ total: number }>("SELECT COUNT(*) as total FROM articles WHERE status = 'published'");
  const [draftCount] = await dbQuery<{ total: number }>("SELECT COUNT(*) as total FROM articles WHERE status = 'draft'");
  const [viewSum] = await dbQuery<{ total: number }>("SELECT SUM(view_count) as total FROM articles");
  const [breakCount] = await dbQuery<{ total: number }>("SELECT COUNT(*) as total FROM breaking_news WHERE is_active = 1");
  const [catCount] = await dbQuery<{ total: number }>("SELECT COUNT(*) as total FROM categories");
  const [authCount] = await dbQuery<{ total: number }>("SELECT COUNT(*) as total FROM authors");

  return {
    totalArticles: artCount?.total || 0,
    publishedCount: pubCount?.total || 0,
    draftCount: draftCount?.total || 0,
    totalViews: viewSum?.total || 0,
    breakingCount: breakCount?.total || 0,
    categoriesCount: catCount?.total || 0,
    authorsCount: authCount?.total || 0,
  };
}

export async function createArticle(data: {
  headline: string;
  slug: string;
  excerpt: string;
  content: string;
  featured_image: string;
  mobile_image?: string;
  category_id: number;
  author_id: number;
  location_name?: string;
  status?: string;
  is_featured?: boolean;
  is_trending?: boolean;
  is_breaking?: boolean;
  is_premium?: boolean;
  quick_take?: string;
  key_points?: string[];
  meta_title?: string;
  meta_description?: string;
}): Promise<number> {
  const readingTime = `${Math.max(1, Math.ceil(data.content.split(/\s+/).length / 180))} min read`;

  // Lookup author and category
  const [author] = await dbQuery("SELECT name FROM authors WHERE id = ? LIMIT 1", [data.author_id]);
  const [category] = await dbQuery("SELECT name FROM categories WHERE id = ? LIMIT 1", [data.category_id]);

  const authorName = author?.name || "News Media Kiran Bureau";
  const primaryCategory = category?.name || "National";

  const result = await dbExecute(
    `INSERT INTO articles (
      headline, slug, excerpt, content, featured_image, mobile_image,
      category_id, author_id, author_name, primary_category, location_name,
      reading_time, quick_take, key_points, status, is_featured, is_trending,
      is_breaking, is_premium, meta_title, meta_description, view_count, share_count, published_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0, 0, CURRENT_TIMESTAMP)`,
    [
      data.headline,
      data.slug,
      data.excerpt,
      data.content,
      data.featured_image,
      data.mobile_image || data.featured_image,
      data.category_id,
      data.author_id,
      authorName,
      primaryCategory,
      data.location_name || "New Delhi",
      readingTime,
      data.quick_take || "",
      JSON.stringify(data.key_points || []),
      data.status || "published",
      data.is_featured ? 1 : 0,
      data.is_trending ? 1 : 0,
      data.is_breaking ? 1 : 0,
      data.is_premium ? 1 : 0,
      data.meta_title || data.headline,
      data.meta_description || data.excerpt,
    ]
  );

  return result.insertId || 0;
}

export async function updateArticle(id: number, data: any): Promise<void> {
  let fields: string[] = [];
  let params: any[] = [];

  const allowedFields = [
    "headline", "slug", "excerpt", "content", "featured_image", "mobile_image",
    "category_id", "author_id", "location_name", "status", "is_featured",
    "is_trending", "is_breaking", "is_premium", "quick_take", "meta_title", "meta_description"
  ];

  for (const field of allowedFields) {
    if (data[field] !== undefined) {
      fields.push(`${field} = ?`);
      let val = data[field];
      if (typeof val === "boolean") val = val ? 1 : 0;
      params.push(val);
    }
  }

  if (data.key_points) {
    fields.push("key_points = ?");
    params.push(JSON.stringify(data.key_points));
  }

  if (fields.length === 0) return;

  params.push(id);
  await dbExecute(`UPDATE articles SET ${fields.join(", ")}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`, params);
}

export async function deleteArticle(id: number): Promise<void> {
  await dbExecute("DELETE FROM articles WHERE id = ?", [id]);
}
