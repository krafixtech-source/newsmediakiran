import { NextRequest, NextResponse } from "next/server";
import { syncFromNewsMediaKiran } from "@/lib/sync/newsmediakiran";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const maxPages = body.maxPages || 3;

    const result = await syncFromNewsMediaKiran({ maxPages });
    return NextResponse.json({
      success: true,
      message: "Sync with newsmediakiran.com completed successfully!",
      result,
    });
  } catch (err: any) {
    console.error("Sync error:", err);
    return NextResponse.json(
      { success: false, error: err.message || "Failed to sync" },
      { status: 500 }
    );
  }
}
