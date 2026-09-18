import { NextRequest, NextResponse } from "next/server";
import { getBreakingNews } from "@/lib/db/articles";
import { dbExecute } from "@/lib/db/connection";

export async function GET() {
  try {
    const items = await getBreakingNews();
    return NextResponse.json({ success: true, count: items.length, items });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.headline) {
      return NextResponse.json({ success: false, error: "Headline is required" }, { status: 400 });
    }

    const result = await dbExecute(
      "INSERT INTO breaking_news (headline, url, priority, is_active) VALUES (?, ?, ?, ?)",
      [body.headline, body.url || "", body.priority || 1, body.is_active !== false ? 1 : 0]
    );

    return NextResponse.json({ success: true, id: result.insertId, message: "Breaking news added" }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
