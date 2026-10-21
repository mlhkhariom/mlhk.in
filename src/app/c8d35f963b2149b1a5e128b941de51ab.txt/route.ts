export const dynamic = "force-static";
export const revalidate = 86400; // 24 hours

const KEY = "c8d35f963b2149b1a5e128b941de51ab";

export async function GET() {
  return new Response(KEY, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}

