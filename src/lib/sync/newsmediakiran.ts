import { dbQuery, dbExecute } from "../db/connection";

function decodeHtmlEntities(str: string) {
  if (!str) return "";
  return str
    .replace(/&#8216;/g, "‘")
    .replace(/&#8217;/g, "’")
    .replace(/&#8220;/g, "“")
    .replace(/&#8221;/g, "”")
    .replace(/&#8211;/g, "–")
    .replace(/&#8212;/g, "—")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#038;/g, "&")
    .replace(/&#39;/g, "'")
    .replace(/&hellip;/g, "…")
    .replace(/&nbsp;/g, " ");
}

function stripHtml(html: string) {
  if (!html) return "";
  return decodeHtmlEntities(html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim());
}

export async function syncFromNewsMediaKiran(options: { maxPages?: number } = {}) {
  const maxPages = options.maxPages || 3;
  let categoriesCount = 0;
  let authorsCount = 0;
  let articlesCount = 0;
  let newArticlesCount = 0;

  console.log("🔄 Initiating Live Sync with https://newsmediakiran.com ...");

  // 1. Sync Categories
  try {
    const catRes = await fetch("https://newsmediakiran.com/wp-json/wp/v2/categories?per_page=100", {
      headers: { "User-Agent": "NewsMediaKiran-SyncEngine/1.0" },
    });
    if (catRes.ok) {
      const cats = await catRes.json();
      for (const c of cats) {
        const name = decodeHtmlEntities(c.name);
        await dbExecute(
          `INSERT OR IGNORE INTO categories (id, name, slug, description, sort_order) VALUES (?, ?, ?, ?, ?)`,
          [c.id, name, c.slug, `News and updates for ${name}`, c.id]
        );
        categoriesCount++;
      }
    }
  } catch (err) {
    console.error("Failed to sync categories:", err);
  }

  // 2. Sync Authors
  try {
    const userRes = await fetch("https://newsmediakiran.com/wp-json/wp/v2/users?per_page=50", {
      headers: { "User-Agent": "NewsMediaKiran-SyncEngine/1.0" },
    });
    if (userRes.ok) {
      const users = await userRes.json();
      for (const u of users) {
        const name = decodeHtmlEntities(u.name);
        await dbExecute(
          `INSERT OR IGNORE INTO authors (id, name, slug, email, bio, avatar, designation) VALUES (?, ?, ?, ?, ?, ?, ?)`,
          [
            u.id,
            name,
            u.slug,
            `${u.slug}@newsmediakiran.com`,
            u.description || "Senior News Correspondent",
            u.avatar_urls?.["96"] || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
            "Editorial Correspondent",
          ]
        );
        authorsCount++;
      }
    }
  } catch (err) {
    console.error("Failed to sync authors:", err);
  }

  // 3. Sync Posts
  try {
    for (let page = 1; page <= maxPages; page++) {
      const postRes = await fetch(
        `https://newsmediakiran.com/wp-json/wp/v2/posts?per_page=30&page=${page}&_embed=1`,
        { headers: { "User-Agent": "NewsMediaKiran-SyncEngine/1.0" } }
      );
      if (!postRes.ok) break;
      const posts = await postRes.json();
      if (!posts || !posts.length) break;

      for (let i = 0; i < posts.length; i++) {
        const p = posts[i];
        const title = decodeHtmlEntities(p.title?.rendered || "");
        const content = p.content?.rendered || "";
        const excerpt = stripHtml(p.excerpt?.rendered || content).slice(0, 240);

        let featuredImage = p._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "";
        if (!featuredImage) {
          const imgMatch = content.match(/<img[^>]+src="([^">]+)"/);
          if (imgMatch && imgMatch[1]) featuredImage = imgMatch[1];
        }
        if (!featuredImage) {
          featuredImage = "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200&auto=format&fit=crop&q=80";
        }

        const authorObj = p._embedded?.["author"]?.[0] || { id: p.author || 1, name: "News Media Kiran Bureau" };
        const authorName = decodeHtmlEntities(authorObj.name);

        const wordCount = stripHtml(content).split(/\s+/).length;
        const readingTime = `${Math.max(1, Math.ceil(wordCount / 180))} min read`;

        const isBreaking = (p.categories || []).includes(18916) || i === 0;
        const isTrending = (p.categories || []).includes(1) || i % 3 === 0;

        // Check if article exists
        const existing = await dbQuery("SELECT id FROM articles WHERE slug = ? OR id = ? LIMIT 1", [p.slug, p.id]);
        if (existing.length === 0) {
          await dbExecute(
            `INSERT OR IGNORE INTO articles (
              id, headline, slug, excerpt, content, featured_image, mobile_image,
              category_id, author_id, author_name, primary_category, location_name,
              reading_time, quick_take, key_points, status, is_featured, is_trending,
              is_breaking, is_premium, meta_title, meta_description, view_count, share_count, published_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
              p.id,
              title,
              p.slug,
              excerpt,
              content,
              featuredImage,
              featuredImage,
              p.categories?.[0] || 76,
              authorObj.id,
              authorName,
              "National",
              "New Delhi",
              readingTime,
              `Key updates regarding ${title.slice(0, 70)}...`,
              JSON.stringify([
                "Verified ground reporting by News Media Kiran network.",
                "Policy implications and citizen impact details.",
                "Follow-up reports will be published as situation develops.",
              ]),
              "published",
              i === 0 ? 1 : 0,
              isTrending ? 1 : 0,
              isBreaking ? 1 : 0,
              0,
              `${title} | News Media Kiran`,
              excerpt,
              Math.floor(Math.random() * 2000) + 500,
              Math.floor(Math.random() * 100) + 20,
              p.date,
            ]
          );
          newArticlesCount++;
        } else {
          // Keep content & media in sync if updated on newsmediakiran.com
          await dbExecute(
            `UPDATE articles SET 
              headline = ?, excerpt = ?, content = ?, featured_image = ?, mobile_image = ?,
              reading_time = ?, updated_at = CURRENT_TIMESTAMP
             WHERE id = ? OR slug = ?`,
            [title, excerpt, content, featuredImage, featuredImage, readingTime, p.id, p.slug]
          );
        }
        articlesCount++;
      }
    }
  } catch (err) {
    console.error("Failed to sync posts:", err);
  }

  return {
    success: true,
    syncedAt: new Date().toISOString(),
    categoriesSynced: categoriesCount,
    authorsSynced: authorsCount,
    articlesProcessed: articlesCount,
    newArticlesAdded: newArticlesCount,
  };
}

// ==========================================
// Automatic Background Sync Engine
// ==========================================
let isAutoSyncRunning = false;
let lastAutoSyncAt = 0;
const AUTO_SYNC_COOLDOWN_MS = 2 * 60 * 1000; // 2 minutes minimum interval

export async function triggerAutoSyncIfNeeded(): Promise<void> {
  const now = Date.now();
  if (isAutoSyncRunning || now - lastAutoSyncAt < AUTO_SYNC_COOLDOWN_MS) {
    return;
  }

  isAutoSyncRunning = true;
  lastAutoSyncAt = now;

  // Run in background without blocking caller
  (async () => {
    try {
      console.log("⚡ [Auto-Sync] Checking newsmediakiran.com for new/updated stories...");
      const res = await syncFromNewsMediaKiran({ maxPages: 1 });
      if (res.newArticlesAdded > 0) {
        console.log(`✅ [Auto-Sync] Fetched ${res.newArticlesAdded} brand new articles.`);
      } else {
        console.log("⚡ [Auto-Sync] Up to date (checked latest stories).");
      }
    } catch (err) {
      console.error("⚠️ [Auto-Sync] Error during background check:", err);
    } finally {
      isAutoSyncRunning = false;
    }
  })();
}

// Background scheduler for Node.js server lifecycle
if (typeof window === "undefined") {
  const globalAny = globalThis as any;
  if (!globalAny.__newsMediaKiranAutoSyncTimer) {
    // Run an initial sync 5 seconds after startup
    setTimeout(() => {
      triggerAutoSyncIfNeeded().catch(() => {});
    }, 5000);

    // Then check periodically every 2.5 minutes
    globalAny.__newsMediaKiranAutoSyncTimer = setInterval(() => {
      triggerAutoSyncIfNeeded().catch(() => {});
    }, 2.5 * 60 * 1000);
  }
}

