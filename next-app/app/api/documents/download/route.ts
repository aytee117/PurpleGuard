import { NextRequest, NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";
import { verifyDownloadToken } from "@/lib/download-token";
import { GATED_DOCUMENTS } from "@/lib/gated-documents";

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");
  if (!token) {
    return NextResponse.json({ error: "Missing download token." }, { status: 400 });
  }

  const { valid, documentSlug } = verifyDownloadToken(token);
  if (!valid || !documentSlug) {
    return NextResponse.json(
      { error: "This download link is invalid or has expired. Please request the document again." },
      { status: 403 }
    );
  }

  const doc = GATED_DOCUMENTS[documentSlug];
  if (!doc) {
    return NextResponse.json({ error: "Unknown document." }, { status: 404 });
  }

  const filePath = path.join(process.cwd(), "private-documents", doc.filename);
  const fileBuffer = await readFile(filePath);

  return new NextResponse(new Uint8Array(fileBuffer), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${doc.filename}"`,
      "Cache-Control": "private, no-store",
    },
  });
}
