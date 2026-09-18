import { NextRequest, NextResponse } from "next/server";
import { fetchLiveCityWeather } from "@/lib/weather";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const city = searchParams.get("city") || "jaipur";

  try {
    const weather = await fetchLiveCityWeather(city);
    return NextResponse.json({ success: true, weather });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Failed to fetch weather" },
      { status: 500 }
    );
  }
}
