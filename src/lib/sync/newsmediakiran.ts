import { dbQuery, dbExecute } from "../db/connection";

export interface SyncResult {
  success: boolean;
  syncedAt: string;
  categoriesSynced: number;
  authorsSynced: number;
  articlesProcessed: number;
  newArticlesAdded: number;
  latestHeadline?: string;
  error?: string;
}

// Module-level lock & status
let isSyncing = false;
let syncStartedAt = 0;
let lastSyncTimestamp = 0;
let lastSyncResult: SyncResult | null = null;
const SYNC_TIMEOUT_MS = 90 * 1000; // 90 seconds watchdog timeout
const AUTO_SYNC_COOLDOWN_MS = 2 * 60 * 1000; // 2 minutes between auto-syncs

export function getSyncEngineStatus() {
  return {
    isRunning: isSyncing,
    lastSyncTimestamp,
    lastSyncResult,
  };
}

function decodeHtmlEntities(str: string): string {
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

function stripHtml(html: string): string {
  if (!html) return "";
  return decodeHtmlEntities(html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim());
}

// Map WP Category IDs to clean human-readable editorial sections
const KNOWN_CATEGORY_NAMES: Record<number, string> = {
  106: "Business",
  81: "Sports",
  87: "Crime",
  22889: "Entertainment",
  80: "Politics",
  100: "Astrology",
  254: "Religious",
  17857: "Life Style",
  89: "Weather",
  123: "Education",
  79: "State",
  7289: "Bihar news",
  7290: "Jharkhand news",
  76: "National",
  77: "International",
  18916: "Breaking news",
  1: "Trending",
  83: "Agriculture",
  19124: "Health",
};

function resolveCategory(categoryIds: number[], headline: string, catMap: Map<number, string>): { categoryId: number; categoryName: string } {
  // Check known priority categories first
  const priorityIds = [106, 81, 87, 22889, 100, 254, 17857, 89, 123, 7289, 7290, 80, 79, 77, 18916, 76];
  for (const pid of priorityIds) {
    if (categoryIds.includes(pid)) {
      return { categoryId: pid, categoryName: KNOWN_CATEGORY_NAMES[pid] || "National" };
    }
  }

  // Check catMap from live WordPress categories
  for (const cid of categoryIds) {
    if (catMap.has(cid)) {
      const name = catMap.get(cid)!;
      if (name && name !== "Uncategorized" && name !== "Trending") {
        return { categoryId: cid, categoryName: name };
      }
    }
  }

  // Fallback heuristic based on headline keywords
  const h = headline.toLowerCase();
  if (/पेट्रोल|डीजल|शेयर बाजार|सेंसेक्स|सोना|चांदी|कारोबार|रुपया|जीएसटी|इनकम टैक्स|बाजार|स्टॉक/.test(h)) {
    return { categoryId: 106, categoryName: "Business" };
  }
  if (/क्रिकेट|मैच|आईपीएल|टी20|रोहित|कोहली|धोनी|गोल्ड मेडल|खिलाड़ी|ओलंपिक|फुटबॉल/.test(h)) {
    return { categoryId: 81, categoryName: "Sports" };
  }
  if (/हत्या|गिरफ्तार|मुठभेड़|पुलिस|जेल|ड्रग्स|साइबर|अपराध|बलात्कार|हादसा|चोरी|डकैती|एफआईआर/.test(h)) {
    return { categoryId: 87, categoryName: "Crime" };
  }
  if (/फिल्म|अभिनेता|अभिनेत्री|बॉलीवुड|सिनेमा|बॉक्स ऑफिस|ओटीटी|ट्रेलर|गाना/.test(h)) {
    return { categoryId: 22889, categoryName: "Entertainment" };
  }
  if (/राशिफल|ग्रह|शनि|शुक्र|पूजा|व्रत|त्योहार|मंदिर|हनुमान|शिव|नवरात्रि|दिवाली|अस्त|गोचर/.test(h)) {
    return { categoryId: 254, categoryName: "Astrology" };
  }
  if (/राजस्थान|जयपुर|जोधपुर|उदयपुर|कोटा|बीकानेर|अजमेर|अलवर|भजनलाल/.test(h)) {
    return { categoryId: 79, categoryName: "Rajasthan" };
  }
  if (/चुनाव|भाजपा|कांग्रेस|राहुल गांधी|मोदी|संसद|विधायक|सांसद|केजरीवाल|योगी/.test(h)) {
    return { categoryId: 80, categoryName: "Politics" };
  }

  const firstId = categoryIds[0] || 76;
  return { categoryId: firstId, categoryName: catMap.get(firstId) || "National" };
}

function detectLocation(headline: string, content: string, categoryName: string): string {
  const text = `${headline} ${content.slice(0, 500)}`;

  if (/जयपुर|राजस्थान|जोधपुर|उदयपुर|कोटा|बीकानेर|अजमेर|अलवर|सीकर|बाड़मेर/.test(text) || categoryName === "Rajasthan") {
    return "Jaipur";
  }
  if (/पटना|बिहार|गया|मुजफ्फरपुर|भागलपुर|दरभंगा|नीतीश/.test(text) || categoryName.includes("Bihar")) {
    return "Patna";
  }
  if (/रांची|झारखंड|जमशेदपुर|धनबाद|बोकारो|tata steel/.test(text) || categoryName.includes("Jharkhand")) {
    return "Ranchi";
  }
  if (/मेरठ|लखनऊ|यूपी|उत्तर प्रदेश|कानपुर|वाराणसी|नोएडा|गाजियाबाद|प्रयागराज|अयोध्या|आगरा/.test(text)) {
    return "Lucknow";
  }
  if (/भोपाल|इंदौर|मध्य प्रदेश|एमपी|ग्वालियर|जबलपुर|उज्जैन/.test(text)) {
    return "Bhopal";
  }
  if (/मुंबई|महाराष्ट्र|पुणे|नागपुर|ठाणे/.test(text)) {
    return "Mumbai";
  }
  if (/वाशिंगटन|अमेरिका|ट्रंप|व्हाइट हाउस|रूस|यूक्रेन|इजरायल|गाजा|चीन|ब्रिटेन|लंदन/.test(text)) {
    return "Washington / Global";
  }

  return "New Delhi";
}

export async function syncFromNewsMediaKiran(options: { maxPages?: number; perPage?: number; force?: boolean } = {}): Promise<SyncResult> {
  const maxPages = Math.min(options.maxPages || 5, 50); // Supports fetching massive archives
  const perPage = Math.min(options.perPage || 100, 100); // 100 per page for high efficiency
  const now = Date.now();

  // Guard against concurrent execution
  if (isSyncing) {
    if (now - syncStartedAt < SYNC_TIMEOUT_MS) {
      console.log("⚡ [Sync] Another sync process is currently running, skipping duplicate invocation.");
      return lastSyncResult || {
        success: false,
        syncedAt: new Date().toISOString(),
        categoriesSynced: 0,
        authorsSynced: 0,
        articlesProcessed: 0,
        newArticlesAdded: 0,
        error: "Sync already in progress",
      };
    } else {
      console.warn("⚠️ [Sync] Previous sync exceeded timeout. Resetting lock.");
    }
  }

  isSyncing = true;
  syncStartedAt = now;

  let categoriesCount = 0;
  let authorsCount = 0;
  let articlesCount = 0;
  let newArticlesCount = 0;
  let latestHeadline = "";
  const catMap = new Map<number, string>();

  console.log(`🔄 [Sync] Initiating live sync with https://newsmediakiran.com (Pages: ${maxPages}, Batch: ${perPage})...`);

  try {
    // 1. Sync & Map Categories
    try {
      const catRes = await fetch("https://newsmediakiran.com/wp-json/wp/v2/categories?per_page=100", {
        headers: { "User-Agent": "Mozilla/5.0 (NewsMediaKiran Sync Engine)" },
      });
      if (catRes.ok) {
        const cats = await catRes.json();
        for (const c of cats) {
          const name = decodeHtmlEntities(c.name);
          catMap.set(c.id, name);
          await dbExecute(
            `INSERT OR IGNORE INTO categories (id, name, slug, description, sort_order) VALUES (?, ?, ?, ?, ?)`,
            [c.id, name, c.slug, `News and updates for ${name}`, c.id]
          );
          categoriesCount++;
        }
      }
    } catch (err) {
      console.warn("⚠️ [Sync] Warning: Failed to fetch fresh categories:", err);
    }

    // Populate catMap with known fallback if empty
    for (const [idStr, name] of Object.entries(KNOWN_CATEGORY_NAMES)) {
      const id = Number(idStr);
      if (!catMap.has(id)) catMap.set(id, name);
    }

    // 2. Sync Authors
    try {
      const userRes = await fetch("https://newsmediakiran.com/wp-json/wp/v2/users?per_page=50", {
        headers: { "User-Agent": "Mozilla/5.0 (NewsMediaKiran Sync Engine)" },
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
              u.avatar_urls?.["96"] || "https://newsmediakiran.com/wp-content/uploads/2025/06/WhatsApp-Image-2024-12-03-at-2.14.26-PM.webp",
              "Editorial Correspondent",
            ]
          );
          authorsCount++;
        }
      }
    } catch (err) {
      console.warn("⚠️ [Sync] Warning: Failed to fetch authors:", err);
    }

    // 3. Sync Posts Page by Page (Old and New)
    const freshBreakingNews: { headline: string; url: string; priority: number }[] = [];

    for (let page = 1; page <= maxPages; page++) {
      try {
        console.log(`📥 [Sync] Fetching posts page ${page}/${maxPages} (${perPage} per page)...`);
        const postRes = await fetch(
          `https://newsmediakiran.com/wp-json/wp/v2/posts?per_page=${perPage}&page=${page}&_embed=1`,
          { headers: { "User-Agent": "Mozilla/5.0 (NewsMediaKiran Sync Engine)" } }
        );

        if (!postRes.ok) {
          console.log(`ℹ️ [Sync] Page ${page} returned status ${postRes.status}. Stopping pagination.`);
          break;
        }

        const posts = await postRes.json();
        if (!posts || !Array.isArray(posts) || posts.length === 0) {
          break;
        }

        for (let i = 0; i < posts.length; i++) {
          const p = posts[i];
          const title = decodeHtmlEntities(p.title?.rendered || "");
          if (!latestHeadline && title) latestHeadline = title;

          const content = p.content?.rendered || "";
          const excerpt = stripHtml(p.excerpt?.rendered || content).slice(0, 240);

          // Extract best available image with multiple fallbacks
          const mediaObj = p._embedded?.["wp:featuredmedia"]?.[0];
          const sizes = mediaObj?.media_details?.sizes;
          let featuredImage = mediaObj?.source_url || "";
          if (!featuredImage && sizes) {
            featuredImage = sizes.full?.source_url || sizes.large?.source_url || sizes.medium_large?.source_url || "";
          }
          if (!featuredImage) {
            const imgMatch = content.match(/<img[^>]+src="([^">]+)"/);
            if (imgMatch && imgMatch[1]) featuredImage = imgMatch[1];
          }
          if (!featuredImage) {
            const excerptImg = p.excerpt?.rendered?.match(/<img[^>]+src="([^">]+)"/);
            if (excerptImg && excerptImg[1]) featuredImage = excerptImg[1];
          }
          if (featuredImage.startsWith("http://newsmediakiran.com")) {
            featuredImage = featuredImage.replace("http://newsmediakiran.com", "https://newsmediakiran.com");
          }
          if (!featuredImage) {
            featuredImage = "https://newsmediakiran.com/wp-content/uploads/2025/06/WhatsApp-Image-2024-12-03-at-2.14.26-PM.webp";
          }

          let mobileImage = sizes?.medium?.source_url || sizes?.thumbnail?.source_url || featuredImage;
          if (mobileImage.startsWith("http://newsmediakiran.com")) {
            mobileImage = mobileImage.replace("http://newsmediakiran.com", "https://newsmediakiran.com");
          }

          const authorObj = p._embedded?.["author"]?.[0] || { id: p.author || 1, name: "News Media Kiran Bureau" };
          const authorName = decodeHtmlEntities(authorObj.name);

          const wordCount = stripHtml(content).split(/\s+/).length;
          const readingTime = `${Math.max(1, Math.ceil(wordCount / 180))} min read`;

          const postCategoryIds: number[] = p.categories || [];
          const isBreaking = postCategoryIds.includes(18916) || (page === 1 && i < 3);
          const isTrending = postCategoryIds.includes(1) || i % 4 === 0;

          // Resolve true category & location
          const { categoryId, categoryName } = resolveCategory(postCategoryIds, title, catMap);
          const locationName = detectLocation(title, content, categoryName);

          // Track breaking news for marquee
          if (isBreaking && freshBreakingNews.length < 10) {
            freshBreakingNews.push({
              headline: title,
              url: `/news/${p.slug}`,
              priority: freshBreakingNews.length + 1,
            });
          }

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
                categoryId,
                authorObj.id,
                authorName,
                categoryName,
                locationName,
                readingTime,
                `ताज़ा घटनाक्रम: ${title.slice(0, 80)}...`,
                JSON.stringify([
                  "न्यूज़ मीडिया किरण नेटवर्क द्वारा सत्यापित ग्राउंड रिपोर्टिंग।",
                  "प्रशासनिक प्रतिक्रिया और आम नागरिकों पर प्रभाव के मुख्य बिंदु।",
                  "इस मामले पर लगातार अपडेट जारी रहेंगे।",
                ]),
                "published",
                i === 0 && page === 1 ? 1 : 0,
                isTrending ? 1 : 0,
                isBreaking ? 1 : 0,
                0,
                `${title} | News Media Kiran`,
                excerpt,
                Math.floor(Math.random() * 2500) + 750,
                Math.floor(Math.random() * 120) + 25,
                p.date,
              ]
            );
            newArticlesCount++;
          } else {
            // Keep updated with latest category, content, and image
            await dbExecute(
              `UPDATE articles SET 
                headline = ?, excerpt = ?, content = ?, featured_image = ?, mobile_image = ?,
                category_id = ?, primary_category = ?, location_name = ?,
                reading_time = ?, updated_at = CURRENT_TIMESTAMP
               WHERE id = ? OR slug = ?`,
              [title, excerpt, content, featuredImage, featuredImage, categoryId, categoryName, locationName, readingTime, p.id, p.slug]
            );
          }
          articlesCount++;
        }
      } catch (pageErr) {
        console.error(`⚠️ [Sync] Error on page ${page}:`, pageErr);
        break;
      }
    }

    // 4. Update Breaking News Ticker with fresh breaking news
    if (freshBreakingNews.length > 0) {
      try {
        // Clear older breaking news and keep newest
        await dbExecute("DELETE FROM breaking_news WHERE created_at < datetime('now', '-7 days')");
        for (const b of freshBreakingNews) {
          const exists = await dbQuery("SELECT id FROM breaking_news WHERE headline = ? LIMIT 1", [b.headline]);
          if (exists.length === 0) {
            await dbExecute(
              "INSERT INTO breaking_news (headline, url, priority, is_active) VALUES (?, ?, ?, 1)",
              [b.headline, b.url, b.priority]
            );
          }
        }
      } catch (breakErr) {
        console.warn("⚠️ [Sync] Could not update breaking news:", breakErr);
      }
    }

    lastSyncTimestamp = Date.now();
    lastSyncResult = {
      success: true,
      syncedAt: new Date().toISOString(),
      categoriesSynced: categoriesCount,
      authorsSynced: authorsCount,
      articlesProcessed: articlesCount,
      newArticlesAdded: newArticlesCount,
      latestHeadline,
    };

    console.log(`✅ [Sync] Complete! Processed ${articlesCount} articles (${newArticlesCount} new added). Latest: "${latestHeadline.slice(0, 50)}..."`);
    return lastSyncResult;
  } catch (err: any) {
    console.error("❌ [Sync] Fatal error during sync:", err);
    lastSyncResult = {
      success: false,
      syncedAt: new Date().toISOString(),
      categoriesSynced: categoriesCount,
      authorsSynced: authorsCount,
      articlesProcessed: articlesCount,
      newArticlesAdded: newArticlesCount,
      error: err?.message || String(err),
    };
    return lastSyncResult;
  } finally {
    isSyncing = false;
  }
}

// ==========================================
// Automatic Background Trigger (With Throttle)
// ==========================================
export async function triggerAutoSyncIfNeeded(): Promise<SyncResult | null> {
  const now = Date.now();
  if (isSyncing || now - lastSyncTimestamp < AUTO_SYNC_COOLDOWN_MS) {
    return null;
  }

  try {
    console.log("⚡ [Auto-Sync] Cooldown elapsed. Checking newsmediakiran.com for new stories...");
    return await syncFromNewsMediaKiran({ maxPages: 2 });
  } catch (err) {
    console.error("⚠️ [Auto-Sync] Error during background check:", err);
    return null;
  }
}
