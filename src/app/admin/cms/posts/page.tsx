import { getRequestContext } from "@cloudflare/next-on-pages";
import { getDb } from "@/lib/db";
import { blogPosts } from "@/lib/db/schema";
import { sql } from "drizzle-orm";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Pencil } from "lucide-react";

export const runtime = "edge";

export default async function PostsPage() {
  const { env } = getRequestContext();
  const db = getDb(env.DB);
  const posts = await db.select().from(blogPosts).orderBy(sql`created_at desc`).all();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Blog Posts</h1>
        <Link href="/admin/cms/posts/new" className="bg-blue-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2">
          <Plus size={16} /> New Post
        </Link>
      </div>
      <Card>
        <CardContent className="p-0">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-xs text-gray-500 uppercase">
              <tr>
                {["Title", "Status", "Published", "Actions"].map(h => (
                  <th key={h} className="px-6 py-3 text-left font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {posts.length === 0 ? (
                <tr><td colSpan={4} className="px-6 py-8 text-center text-gray-400">No posts yet. Create your first post!</td></tr>
              ) : posts.map(post => (
                <tr key={post.id} className="hover:bg-gray-50">
                  <td className="px-6 py-3 font-medium text-gray-900">{post.title}</td>
                  <td className="px-6 py-3">
                    <span className={`text-xs px-2 py-0.5 rounded ${post.status === "published" ? "bg-green-50 text-green-600" : "bg-yellow-50 text-yellow-600"}`}>
                      {post.status}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-gray-500">{post.publishedAt?.slice(0, 10) ?? "—"}</td>
                  <td className="px-6 py-3">
                    <Link href={`/admin/cms/posts/${post.id}/edit`} className="text-blue-600 hover:underline inline-flex items-center gap-1 text-xs">
                      <Pencil size={12} /> Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
