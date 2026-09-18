import path from "path";
import fs from "fs";

export interface DatabaseDriver {
  query<T = any>(sql: string, params?: any[]): Promise<T[]>;
  execute(sql: string, params?: any[]): Promise<{ insertId?: number; affectedRows: number }>;
}

let mysqlPool: any = null;
let sqliteDb: any = null;
let isInitialized = false;

export function isUsingMySQL(): boolean {
  return Boolean(process.env.MYSQL_HOST && process.env.MYSQL_DATABASE);
}

// In-memory fallback in case native bindings ever have platform quirks
class MemoryDatabaseDriver implements DatabaseDriver {
  private tables: Record<string, any[]> = {};

  async query<T = any>(sql: string, params: any[] = []): Promise<T[]> {
    // Return empty array if not initialized
    return [] as T[];
  }

  async execute(sql: string, params: any[] = []): Promise<{ insertId?: number; affectedRows: number }> {
    return { insertId: Date.now(), affectedRows: 1 };
  }
}

async function getDriver(): Promise<DatabaseDriver> {
  if (isUsingMySQL()) {
    if (!mysqlPool) {
      const mysql = await import("mysql2/promise");
      mysqlPool = mysql.createPool({
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
        port: Number(process.env.MYSQL_PORT) || 3306,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
        charset: "utf8mb4",
      });
    }

    return {
      async query<T = any>(sql: string, params: any[] = []): Promise<T[]> {
        const [rows] = await mysqlPool.query(sql, params);
        return rows as T[];
      },
      async execute(sql: string, params: any[] = []): Promise<{ insertId?: number; affectedRows: number }> {
        const [result] = await mysqlPool.execute(sql, params);
        return {
          insertId: (result as any).insertId,
          affectedRows: (result as any).affectedRows || 0,
        };
      },
    };
  }

  // SQLite persistent local driver
  if (!sqliteDb) {
    try {
      const Database = (await import("better-sqlite3")).default;
      const dataDir = path.join(process.cwd(), "data");
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }
      const dbPath = path.join(dataDir, "newsmediakiran.sqlite");
      sqliteDb = new Database(dbPath);
      sqliteDb.pragma("journal_mode = WAL");
    } catch (err) {
      console.warn("Could not load better-sqlite3, falling back to in-memory:", err);
      return new MemoryDatabaseDriver();
    }
  }

  return {
    async query<T = any>(sql: string, params: any[] = []): Promise<T[]> {
      // Normalize parameter placeholders: MySQL uses ?, better-sqlite3 uses ?
      // Normalize common functions if any
      const stmt = sqliteDb.prepare(sql);
      return stmt.all(...params) as T[];
    },
    async execute(sql: string, params: any[] = []): Promise<{ insertId?: number; affectedRows: number }> {
      const stmt = sqliteDb.prepare(sql);
      const info = stmt.run(...params);
      return {
        insertId: Number(info.lastInsertRowid),
        affectedRows: info.changes,
      };
    },
  };
}

export async function dbQuery<T = any>(sql: string, params: any[] = []): Promise<T[]> {
  await ensureInitialized();
  const driver = await getDriver();
  return driver.query<T>(sql, params);
}

export async function dbExecute(sql: string, params: any[] = []): Promise<{ insertId?: number; affectedRows: number }> {
  await ensureInitialized();
  const driver = await getDriver();
  return driver.execute(sql, params);
}

export async function ensureInitialized() {
  if (isInitialized) return;

  try {
    const driver = await getDriver();

    if (!isUsingMySQL()) {
      // Initialize SQLite schema
      const sqliteSchema = `
        CREATE TABLE IF NOT EXISTS roles (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT UNIQUE NOT NULL,
          description TEXT
        );

        CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          email TEXT UNIQUE NOT NULL,
          password_hash TEXT NOT NULL,
          role_id INTEGER DEFAULT 1,
          avatar TEXT,
          is_active INTEGER DEFAULT 1,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS authors (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          slug TEXT UNIQUE NOT NULL,
          email TEXT,
          bio TEXT,
          avatar TEXT,
          designation TEXT DEFAULT 'Senior News Correspondent'
        );

        CREATE TABLE IF NOT EXISTS categories (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          slug TEXT UNIQUE NOT NULL,
          description TEXT,
          color_code TEXT DEFAULT '#b91c1c',
          sort_order INTEGER DEFAULT 0,
          is_nav_visible INTEGER DEFAULT 1
        );

        CREATE TABLE IF NOT EXISTS articles (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          headline TEXT NOT NULL,
          slug TEXT UNIQUE NOT NULL,
          excerpt TEXT,
          content TEXT NOT NULL,
          featured_image TEXT,
          mobile_image TEXT,
          category_id INTEGER NOT NULL,
          author_id INTEGER NOT NULL,
          author_name TEXT,
          primary_category TEXT,
          location_name TEXT DEFAULT 'New Delhi',
          reading_time TEXT DEFAULT '3 min read',
          quick_take TEXT,
          key_points TEXT,
          status TEXT DEFAULT 'published',
          is_featured INTEGER DEFAULT 0,
          is_trending INTEGER DEFAULT 0,
          is_breaking INTEGER DEFAULT 0,
          is_premium INTEGER DEFAULT 0,
          meta_title TEXT,
          meta_description TEXT,
          view_count INTEGER DEFAULT 120,
          share_count INTEGER DEFAULT 10,
          published_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS breaking_news (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          headline TEXT NOT NULL,
          url TEXT,
          priority INTEGER DEFAULT 1,
          is_active INTEGER DEFAULT 1,
          start_time DATETIME DEFAULT CURRENT_TIMESTAMP,
          end_time DATETIME,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS marquee (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          text TEXT NOT NULL,
          link TEXT,
          priority INTEGER DEFAULT 1,
          is_active INTEGER DEFAULT 1,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS banners (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          desktop_image TEXT NOT NULL,
          mobile_image TEXT,
          title TEXT,
          description TEXT,
          cta_text TEXT,
          link TEXT NOT NULL,
          position TEXT DEFAULT 'top_banner',
          is_active INTEGER DEFAULT 1,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS homepage_sections (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          section_key TEXT UNIQUE NOT NULL,
          title TEXT NOT NULL,
          is_enabled INTEGER DEFAULT 1,
          sort_order INTEGER DEFAULT 0,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS newsletter_subscribers (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          email TEXT UNIQUE NOT NULL,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );
      `;

      // Split and run
      for (const statement of sqliteSchema.split(";")) {
        const trimmed = statement.trim();
        if (trimmed) {
          await driver.execute(trimmed);
        }
      }
    }

    // Seed database if empty
    await seedInitialData(driver);
    isInitialized = true;
  } catch (err) {
    console.error("Database initialization error:", err);
  }
}

async function seedInitialData(driver: DatabaseDriver) {
  try {
    const existing = await driver.query<{ count: number }>("SELECT COUNT(*) as count FROM categories");
    const count = existing[0]?.count || 0;
    if (count > 0) {
      return; // Already seeded
    }

    console.log("🌱 Seeding database from harvested newsmediakiran_seed.json...");
    const seedPath = path.join(process.cwd(), "src", "data", "newsmediakiran_seed.json");
    if (!fs.existsSync(seedPath)) {
      console.warn("Seed file not found at", seedPath);
      return;
    }

    const seedData = JSON.parse(fs.readFileSync(seedPath, "utf-8"));

    // 1. Seed Roles
    const roles = [
      { id: 1, name: "Super Admin", description: "Full system access" },
      { id: 2, name: "Editor", description: "Edit and publish articles" },
      { id: 3, name: "Reporter", description: "Submit stories for review" },
      { id: 4, name: "SEO Manager", description: "SEO optimization" },
    ];
    for (const r of roles) {
      await driver.execute(
        "INSERT OR IGNORE INTO roles (id, name, description) VALUES (?, ?, ?)",
        [r.id, r.name, r.description]
      );
    }

    // 2. Seed Default Admin User
    await driver.execute(
      "INSERT OR IGNORE INTO users (id, name, email, password_hash, role_id) VALUES (?, ?, ?, ?, ?)",
      [1, "Chief Editor", "admin@newsmediakiran.com", "admin123", 1]
    );

    // 3. Seed Categories
    for (const cat of seedData.categories || []) {
      await driver.execute(
        "INSERT OR IGNORE INTO categories (id, name, slug, description, sort_order) VALUES (?, ?, ?, ?, ?)",
        [cat.id, cat.name, cat.slug, `Latest updates in ${cat.name}`, cat.id]
      );
    }

    // 4. Seed Authors
    for (const author of seedData.authors || []) {
      await driver.execute(
        "INSERT OR IGNORE INTO authors (id, name, slug, email, bio, avatar, designation) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [
          author.id,
          author.name,
          author.slug,
          `${author.slug}@newsmediakiran.com`,
          author.bio,
          author.avatar,
          "Senior Bureau Correspondent",
        ]
      );
    }

    // 5. Seed Articles
    for (const art of seedData.articles || []) {
      await driver.execute(
        `INSERT OR IGNORE INTO articles (
          id, headline, slug, excerpt, content, featured_image, mobile_image,
          category_id, author_id, author_name, primary_category, location_name,
          reading_time, quick_take, key_points, status, is_featured, is_trending,
          is_breaking, is_premium, meta_title, meta_description, view_count, share_count, published_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          art.id,
          art.headline,
          art.slug,
          art.excerpt,
          art.content,
          art.featured_image,
          art.mobile_image,
          art.category_id,
          art.author.id,
          art.author.name,
          art.primary_category,
          art.location,
          art.reading_time,
          art.quick_take,
          JSON.stringify(art.key_points),
          art.status,
          art.is_featured ? 1 : 0,
          art.is_trending ? 1 : 0,
          art.is_breaking ? 1 : 0,
          art.is_premium ? 1 : 0,
          art.meta_title,
          art.meta_description,
          art.view_count,
          art.share_count,
          art.published_at,
        ]
      );
    }

    // 6. Seed Breaking News items
    const breakingHeadlines = (seedData.articles || [])
      .filter((a: any) => a.is_breaking)
      .slice(0, 8);

    for (let i = 0; i < breakingHeadlines.length; i++) {
      const b = breakingHeadlines[i];
      await driver.execute(
        "INSERT INTO breaking_news (headline, url, priority, is_active) VALUES (?, ?, ?, ?)",
        [b.headline, `/news/${b.slug}`, i + 1, 1]
      );
    }

    // 7. Seed Homepage Sections Order
    const sections = [
      { key: "hero_editorial_grid", title: "Hero Editorial Grid", sort: 1 },
      { key: "latest_news", title: "Latest News & Feed", sort: 2 },
      { key: "top_stories", title: "Today's Top Stories", sort: 3 },
      { key: "india_national", title: "India / National Beat", sort: 4 },
      { key: "rajasthan_hub", title: "Rajasthan Regional Hub", sort: 5 },
      { key: "city_news", title: "City Edition", sort: 6 },
      { key: "politics_pulse", title: "Politics & State Affairs", sort: 7 },
      { key: "crime_investigation", title: "Crime & Investigative Desk", sort: 8 },
      { key: "business_market", title: "Business & Financial Markets", sort: 9 },
      { key: "sports_live", title: "Sports & Cricket Scoreboard", sort: 10 },
      { key: "entertainment_cinema", title: "Entertainment & Cinema", sort: 11 },
      { key: "technology_ai", title: "Technology & AI", sort: 12 },
      { key: "lifestyle_wellness", title: "Lifestyle & Culture", sort: 13 },
      { key: "explained_journalism", title: "Explained / In-Depth", sort: 14 },
      { key: "long_reads", title: "Long Reads & Special Features", sort: 15 },
      { key: "video_newsroom", title: "Videos & Newsroom TV", sort: 16 },
      { key: "shorts_vertical", title: "Shorts (9:16 Video)", sort: 17 },
      { key: "visual_stories", title: "Visual Web Stories", sort: 18 },
      { key: "podcasts_audio", title: "Podcasts & Audio Dispatch", sort: 19 },
      { key: "cartoons_satire", title: "Cartoon of the Day", sort: 20 },
      { key: "daily_puzzles", title: "Daily Puzzles & Sudoku", sort: 21 },
      { key: "daily_quiz", title: "Daily News Quiz", sort: 22 },
      { key: "most_read", title: "Most Read & Popular", sort: 23 },
    ];

    for (const sec of sections) {
      await driver.execute(
        "INSERT OR IGNORE INTO homepage_sections (section_key, title, sort_order, is_enabled) VALUES (?, ?, ?, 1)",
        [sec.key, sec.title, sec.sort]
      );
    }

    console.log("✅ Seed completed successfully with live News Media Kiran data!");
  } catch (err) {
    console.error("Error during initial data seed:", err);
  }
}
