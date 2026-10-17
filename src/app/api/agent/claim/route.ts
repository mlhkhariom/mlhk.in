import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const claimId = searchParams.get("claim_id");

  return NextResponse.json({
    status: "ready",
    claim_id: claimId || "anonymous",
    message: "MLHK Infotech Agent Claim Ceremony Endpoint.",
    docs: "https://mlhk.in/auth.md",
  });
}

export async function POST(req: Request) {
  return NextResponse.json({
    status: "claimed",
    message: "Claim confirmed. You may now exchange identity assertion for credentials.",
  });
}

