import { getCloudflareContext } from "@opennextjs/cloudflare";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ key: string[] }> }
) {
  const { key } = await params;
  if (!key || key.length === 0) {
    return new NextResponse("Bad Request", { status: 400 });
  }

  const objectKey = key.join("/");

  try {
    const { env } = getCloudflareContext();
    const r2 = (env as unknown as { R2?: R2Bucket }).R2;
    if (!r2) {
      return new NextResponse("Storage not configured", { status: 503 });
    }

    const object = await r2.get(objectKey);
    if (!object) {
      return new NextResponse("Not Found", { status: 404 });
    }

    const headers = new Headers();
    object.writeHttpMetadata(headers as unknown as Headers);
    headers.set("ETag", object.httpEtag);
    headers.set("Cache-Control", "public, max-age=31536000, immutable");

    return new NextResponse(object.body as unknown as BodyInit, {
      headers,
    });
  } catch {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

