// scripts/scrape_full_data.js
const fs = require('fs');
const path = require('path');

function decodeHtmlEntities(str) {
  if (!str) return '';
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

function stripHtml(html) {
  if (!html) return '';
  return decodeHtmlEntities(html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim());
}

async function fetchJson(url) {
  const res = await fetch(url, {
    headers: { 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)' }
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch ${url}: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

async function main() {
  console.log('🚀 Starting Data Collection from https://newsmediakiran.com ...');

  // 1. Fetch Categories
  console.log('Fetching categories...');
  let categories = [];
  try {
    let catPage = 1;
    while (true) {
      const cats = await fetchJson(`https://newsmediakiran.com/wp-json/wp/v2/categories?per_page=100&page=${catPage}`);
      if (!cats || !cats.length) break;
      categories.push(...cats);
      catPage++;
    }
  } catch (e) {
    console.log(`Finished categories: ${categories.length}`);
  }
  console.log(`✅ Loaded ${categories.length} categories.`);

  const catMap = new Map();
  categories.forEach(c => {
    catMap.set(c.id, {
      id: c.id,
      name: decodeHtmlEntities(c.name),
      slug: c.slug,
      count: c.count
    });
  });

  // 2. Fetch Users / Authors
  console.log('Fetching authors...');
  let users = [];
  try {
    users = await fetchJson(`https://newsmediakiran.com/wp-json/wp/v2/users?per_page=100`);
  } catch (e) {
    console.error('Error fetching users:', e.message);
  }
  console.log(`✅ Loaded ${users.length} authors.`);

  const authorMap = new Map();
  users.forEach(u => {
    authorMap.set(u.id, {
      id: u.id,
      name: decodeHtmlEntities(u.name),
      slug: u.slug,
      bio: u.description || `Senior Correspondent at News Media Kiran covering breaking news and in-depth analytical reports.`,
      avatar: u.avatar_urls?.['96'] || `https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80`
    });
  });

  // 3. Fetch Posts (Targeting 120-150 posts with _embed to get images & author details)
  console.log('Fetching 120+ posts with full embedded media...');
  let posts = [];
  let page = 1;
  const targetCount = 130;

  while (posts.length < targetCount) {
    console.log(`Fetching posts page ${page}...`);
    try {
      const batch = await fetchJson(`https://newsmediakiran.com/wp-json/wp/v2/posts?per_page=50&page=${page}&_embed=1`);
      if (!batch || !batch.length) break;
      posts.push(...batch);
      console.log(`  -> Page ${page} brought ${batch.length} posts (Total: ${posts.length})`);
      page++;
      if (batch.length < 50) break;
    } catch (e) {
      console.error(`Page ${page} failed or reached end:`, e.message);
      break;
    }
  }

  console.log(`✅ Total raw posts fetched: ${posts.length}`);

  // Process posts into clean structure
  const processedArticles = posts.map((p, index) => {
    const rawTitle = p.title?.rendered || '';
    const title = decodeHtmlEntities(rawTitle);
    const content = p.content?.rendered || '';
    const excerpt = stripHtml(p.excerpt?.rendered || content).slice(0, 240);
    const authorObj = p._embedded?.['author']?.[0] || authorMap.get(p.author) || {
      id: p.author || 1,
      name: 'News Media Kiran Bureau',
      slug: 'news-desk'
    };

    let featuredImage = p._embedded?.['wp:featuredmedia']?.[0]?.source_url || '';
    if (!featuredImage) {
      // Look inside content for first img
      const imgMatch = content.match(/<img[^>]+src="([^">]+)"/);
      if (imgMatch && imgMatch[1]) {
        featuredImage = imgMatch[1];
      }
    }
    if (!featuredImage) {
      featuredImage = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200&auto=format&fit=crop&q=80';
    }

    const assignedCats = (p.categories || []).map(cid => catMap.get(cid)?.name || '').filter(Boolean);
    const primaryCat = assignedCats[0] || 'National';

    // Reading time calculation
    const wordCount = stripHtml(content).split(/\s+/).length;
    const readingTime = Math.max(1, Math.ceil(wordCount / 180));

    // Flags
    const isTrending = (p.categories || []).includes(1) || index % 4 === 0;
    const isBreaking = (p.categories || []).includes(18916) || index < 4;
    const isFeatured = index === 0 || index === 4 || index === 8;

    return {
      id: p.id,
      slug: p.slug,
      headline: title,
      excerpt: excerpt,
      content: content,
      featured_image: featuredImage,
      mobile_image: featuredImage,
      author: {
        id: authorObj.id,
        name: decodeHtmlEntities(authorObj.name),
        slug: authorObj.slug || 'newsdesk',
        bio: authorObj.description || 'Editorial Team at News Media Kiran',
        avatar: authorObj.avatar_urls?.['96'] || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
      },
      categories: assignedCats,
      primary_category: primaryCat,
      category_id: p.categories?.[0] || 76,
      date: p.date,
      published_at: p.date,
      reading_time: `${readingTime} min read`,
      view_count: Math.floor(Math.random() * 4500) + 1200,
      share_count: Math.floor(Math.random() * 300) + 45,
      is_featured: isFeatured,
      is_trending: isTrending,
      is_breaking: isBreaking,
      is_premium: index % 7 === 0,
      status: 'published',
      location: primaryCat.includes('Rajasthan') ? 'Jaipur' : (primaryCat.includes('Bihar') ? 'Patna' : (primaryCat.includes('Jharkhand') ? 'Ranchi' : 'New Delhi')),
      meta_title: `${title} | News Media Kiran`,
      meta_description: excerpt,
      quick_take: `Key highlights and verified ground reports on: ${title.slice(0, 80)}...`,
      key_points: [
        `Verified updates reported directly by News Media Kiran ground network.`,
        `Official statements, contextual policy implications, and regional impact.`,
        `Ongoing developments monitored closely by the editorial desk.`
      ]
    };
  });

  const outputDir = path.join(__dirname, '..', 'src', 'data');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const resultData = {
    metadata: {
      site_name: 'News Media Kiran',
      tagline: 'Latest News | Top News | Breaking News',
      source: 'https://newsmediakiran.com',
      scraped_at: new Date().toISOString(),
      total_articles: processedArticles.length,
      total_categories: categories.length,
      total_authors: users.length
    },
    categories: Array.from(catMap.values()),
    authors: Array.from(authorMap.values()),
    articles: processedArticles
  };

  const outputPath = path.join(outputDir, 'newsmediakiran_seed.json');
  fs.writeFileSync(outputPath, JSON.stringify(resultData, null, 2), 'utf-8');
  console.log(`🎉 Successfully saved ${processedArticles.length} articles, ${categories.length} categories, and ${users.length} authors to:`);
  console.log(outputPath);
}

main().catch(err => {
  console.error('Fatal error during scrape:', err);
  process.exit(1);
});
