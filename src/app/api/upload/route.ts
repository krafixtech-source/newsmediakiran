import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const folder = (formData.get("folder") as string) || "news";

    if (!file) {
      return NextResponse.json({ success: false, error: "No file provided" }, { status: 400 });
    }

    // Allowed folder validation
    const allowedFolders = ["news", "banners", "authors", "videos", "podcasts", "cartoons", "gallery"];
    const safeFolder = allowedFolders.includes(folder) ? folder : "news";

    // Allowed mime type validation
    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/avif", "image/gif"];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { success: false, error: "Invalid file type. Only JPEG, PNG, WebP, AVIF, and GIF allowed." },
        { status: 400 }
      );
    }

    // Size limit 10MB
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ success: false, error: "File exceeds 10MB limit." }, { status: 400 });
    }

    const uploadDir = path.join(process.cwd(), "public", "uploads", safeFolder);
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Safe sanitized unique filename
    const ext = path.extname(file.name) || ".webp";
    const baseName = path
      .basename(file.name, ext)
      .replace(/[^a-zA-Z0-9-_]/g, "-")
      .toLowerCase();
    const timestamp = Date.now();
    const safeFilename = `${baseName}-${timestamp}${ext}`;
    const destinationPath = path.join(uploadDir, safeFilename);

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    fs.writeFileSync(destinationPath, buffer);

    const publicUrl = `/uploads/${safeFolder}/${safeFilename}`;

    return NextResponse.json({
      success: true,
      url: publicUrl,
      filename: safeFilename,
      size: file.size,
      folder: safeFolder,
    });
  } catch (err: any) {
    console.error("Upload error:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
