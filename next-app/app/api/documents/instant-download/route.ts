import { NextRequest, NextResponse } from "next/server";
import { createDownloadToken } from "@/lib/download-token";
import { GATED_DOCUMENTS } from "@/lib/gated-documents";

export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get("slug");
  const doc = slug ? GATED_DOCUMENTS[slug] : undefined;
  if (!doc) {
    return NextResponse.json({ error: "Unknown document." }, { status: 404 });
  }

  const token = createDownloadToken(slug!);
  return NextResponse.redirect(new URL(`/api/documents/download?token=${token}`, req.url));
}
