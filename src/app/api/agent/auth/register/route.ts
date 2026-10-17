import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = (await req.json().catch(() => ({}))) as Record<string, any>;
    return NextResponse.json(
      {
        status: "success",
        message: "Agent registration received. Proceed to token exchange.",
        identity_type: body?.identity_type || "anonymous",
        assertion: "sample_service_assertion_token",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "invalid_request", message: "Failed to parse agent registration request" },
      { status: 400 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: "MLHK Infotech Agent Registration Endpoint. Submit registration via POST.",
    docs: "https://mlhk.in/auth.md",
  });
}

