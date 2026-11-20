"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Heading2,
  Heading3,
  Link as LinkIcon,
  Image as ImageIcon,
  Undo,
  Redo,
  Code,
  Quote,
  Check,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { BLOG_COVER_PRESETS, estimateReadingMinutes, stripHtmlToText } from "@/lib/blog-articles";

interface Props {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
}

export default function RichEditor({ value, onChange, placeholder = "Start writing your content..." }: Props) {
  const [popover, setPopover] = useState<"link" | "image" | null>(null);
  const [urlDraft, setUrlDraft] = useState("");

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Image,
      Link.configure({ openOnClick: false }),
      Placeholder.configure({ placeholder }),
    ],
    content: value || "",
    onUpdate: ({ editor: ed }) => onChange(ed.getHTML()),
  });

  useEffect(() => {
    const safeVal = value || "";
    if (editor && safeVal !== editor.getHTML()) {
      editor.commands.setContent(safeVal);
    }
  }, [value, editor]);

  if (!editor) {
    return (
      <div className="min-h-[260px] rounded-xl border border-white/10 bg-[#090a0d] p-4 text-xs text-zinc-500">
        Loading editor...
      </div>
    );
  }

  const wordCount = stripHtmlToText(value).split(/\s+/).filter(Boolean).length;
  const readingMin = estimateReadingMinutes(value);

  const btn = (active: boolean, onClick: () => void, icon: React.ReactNode, title: string) => (
    <button
      type="button"
      title={title}
      onClick={onClick}
      className={`rounded-lg p-1.5 transition-all ${
        active
          ? "border border-[#ff9f1c]/40 bg-[#ff9f1c]/15 text-[#ffb84d]"
          : "text-zinc-400 hover:bg-white/10 hover:text-white"
      }`}
    >
      {icon}
    </button>
  );

  function applyPopover(e: React.FormEvent) {
    e.preventDefault();
    const clean = urlDraft.trim();
    if (!clean || !editor) {
      setPopover(null);
      return;
    }
    if (!/^(https?:\/\/|\/|mailto:|tel:)/i.test(clean)) {
      return;
    }
    if (popover === "link") {
      editor.chain().focus().setLink({ href: clean }).run();
    } else if (popover === "image") {
      editor.chain().focus().setImage({ src: clean }).run();
    }
    setUrlDraft("");
    setPopover(null);
  }

  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-[#090a0d] transition-colors focus-within:border-[#ff9f1c]/50 focus-within:ring-1 focus-within:ring-[#ff9f1c]/30">
      {/* Editor Toolbar */}
      <div className="flex flex-wrap items-center gap-1 border-b border-white/10 bg-white/[0.03] p-2">
        {btn(editor.isActive("bold"), () => editor.chain().focus().toggleBold().run(), <Bold size={14} />, "Bold")}
        {btn(editor.isActive("italic"), () => editor.chain().focus().toggleItalic().run(), <Italic size={14} />, "Italic")}
        {btn(editor.isActive("code"), () => editor.chain().focus().toggleCode().run(), <Code size={14} />, "Inline Code")}

        <div className="mx-1 h-4 w-px bg-white/10" />

        {btn(editor.isActive("heading", { level: 2 }), () => editor.chain().focus().toggleHeading({ level: 2 }).run(), <Heading2 size={14} />, "Heading 2 (SEO Section)")}
        {btn(editor.isActive("heading", { level: 3 }), () => editor.chain().focus().toggleHeading({ level: 3 }).run(), <Heading3 size={14} />, "Heading 3")}

        <div className="mx-1 h-4 w-px bg-white/10" />

        {btn(editor.isActive("bulletList"), () => editor.chain().focus().toggleBulletList().run(), <List size={14} />, "Bullet List")}
        {btn(editor.isActive("orderedList"), () => editor.chain().focus().toggleOrderedList().run(), <ListOrdered size={14} />, "Ordered List")}
        {btn(editor.isActive("blockquote"), () => editor.chain().focus().toggleBlockquote().run(), <Quote size={14} />, "Quote")}

        <div className="mx-1 h-4 w-px bg-white/10" />

        {btn(
          popover === "link" || editor.isActive("link"),
          () => {
            setPopover(popover === "link" ? null : "link");
            setUrlDraft(editor.getAttributes("link").href || "https://");
          },
          <LinkIcon size={14} />,
          "Insert Link",
        )}
        {btn(
          popover === "image",
          () => {
            setPopover(popover === "image" ? null : "image");
            setUrlDraft("/images/showcase/studio-hub.jpg");
          },
          <ImageIcon size={14} />,
          "Insert Image",
        )}

        <div className="mx-1 h-4 w-px bg-white/10" />

        {btn(false, () => editor.chain().focus().undo().run(), <Undo size={14} />, "Undo")}
        {btn(false, () => editor.chain().focus().redo().run(), <Redo size={14} />, "Redo")}
      </div>

      {/* Inline URL Popover (Replaces window.prompt for iframe/modern UX safety) */}
      {popover && (
        <form onSubmit={applyPopover} className="space-y-2 border-b border-white/10 bg-[#101218] p-3">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={urlDraft}
              onChange={(e) => setUrlDraft(e.target.value)}
              placeholder={popover === "link" ? "https://mlhk.in/services" : "/images/showcase/studio-hub.jpg"}
              className="flex-1 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1.5 font-mono text-xs text-white focus:border-[#ff9f1c] focus:outline-none"
            />
            <button
              type="submit"
              className="inline-flex items-center gap-1 rounded-lg bg-[#ff9f1c] px-3 py-1.5 text-xs font-semibold text-black hover:bg-[#ffb84d]"
            >
              <Check size={12} /> Insert
            </button>
            <button
              type="button"
              onClick={() => setPopover(null)}
              className="rounded-lg border border-white/10 p-1.5 text-zinc-400 hover:text-white"
            >
              <X size={12} />
            </button>
          </div>
          {popover === "image" && (
            <div className="flex flex-wrap gap-1.5">
              {BLOG_COVER_PRESETS.map((preset) => (
                <button
                  key={preset.src}
                  type="button"
                  onClick={() => {
                    editor.chain().focus().setImage({ src: preset.src, alt: preset.label }).run();
                    setPopover(null);
                  }}
                  className="rounded-md border border-white/10 bg-white/[0.03] px-2 py-1 text-[11px] text-zinc-300 hover:border-[#ff9f1c]/40 hover:text-[#ffb84d]"
                >
                  {preset.label}
                </button>
              ))}
            </div>
          )}
        </form>
      )}

      {/* Editor Content Area */}
      <EditorContent
        editor={editor}
        className="prose prose-invert prose-sm max-w-none min-h-[260px] p-4 text-zinc-100 placeholder-zinc-500 focus-within:outline-none [&_.ProseMirror]:min-h-[220px] [&_.ProseMirror]:outline-none"
      />

      {/* Live Word Count & SEO Reading Time Bar */}
      <div className="flex items-center justify-between border-t border-white/10 bg-white/[0.02] px-4 py-2 text-[11px] text-zinc-400">
        <span>Tip: Use Heading 2 (H2) sections to auto-generate Table of Contents on the live blog page.</span>
        <span className="font-mono tabular-nums text-zinc-300">
          {wordCount} words · {readingMin} min read
        </span>
      </div>
    </div>
  );
}
