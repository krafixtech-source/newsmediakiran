import { NextRequest, NextResponse } from "next/server";
import { syncFromNewsMediaKiran, getSyncEngineStatus, triggerAutoSyncIfNeeded } from "@/lib/sync/newsmediakiran";
import { dbQuery } from "@/lib/db/connection";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const force = searchParams.get("force") === "true";
    const statusOnly = searchParams.get("status") === "true";
    const maxPagesParam = searchParams.get("maxPages");
    const maxPages = maxPagesParam ? Math.min(Number(maxPagesParam) || 2, 20) : 2;

    const engineStatus = getSyncEngineStatus();

    // If client only wants status without triggering a fetch
    if (statusOnly) {
      const [artRow] = await dbQuery<{ count: number }>("SELECT COUNT(*) as count FROM articles");
      const [latest] = await dbQuery<{ headline: string; published_at: string }>(
        "SELECT headline, published_at FROM articles ORDER BY published_at DESC LIMIT 1"
      );

      return NextResponse.json({
        success: true,
        status: engineStatus,
        totalArticles: artRow?.count || 0,
        latestArticle: latest || null,
      });
    }

    let result;
    if (force) {
      result = await syncFromNewsMediaKiran({ maxPages, force: true });
    } else {
      // Cooldown-guarded auto-sync
      result = await triggerAutoSyncIfNeeded();
      if (!result) {
        result = engineStatus.lastSyncResult || {
          success: true,
          syncedAt: new Date(engineStatus.lastSyncTimestamp || Date.now()).toISOString(),
          categoriesSynced: 0,
          authorsSynced: 0,
          articlesProcessed: 0,
          newArticlesAdded: 0,
          message: "Up to date. Cooldown active.",
        };
      }
    }

    const [artRow] = await dbQuery<{ count: number }>("SELECT COUNT(*) as count FROM articles");

    return NextResponse.json({
      success: true,
      message: "Sync with newsmediakiran.com evaluated successfully.",
      result,
      totalArticles: artRow?.count || 0,
    });
  } catch (err: any) {
    console.error("Auto-sync error:", err);
    return NextResponse.json(
      { success: false, error: err.message || "Failed to auto-sync" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const maxPages = Math.min(Number(body.maxPages) || 4, 20);

    const result = await syncFromNewsMediaKiran({ maxPages, force: true });
    const [artRow] = await dbQuery<{ count: number }>("SELECT COUNT(*) as count FROM articles");

    return NextResponse.json({
      success: true,
      message: `Manual sync completed. Processed ${result.articlesProcessed} stories (${result.newArticlesAdded} new).`,
      result,
      totalArticles: artRow?.count || 0,
    });
  } catch (err: any) {
    console.error("Manual sync error:", err);
    return NextResponse.json(
      { success: false, error: err.message || "Failed to sync" },
      { status: 500 }
    );
  }
}
