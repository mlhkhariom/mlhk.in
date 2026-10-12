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
} from "lucide-react";
import { useEffect } from "react";

interface Props {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
}

export default function RichEditor({ value, onChange, placeholder = "Start writing your content..." }: Props) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Link.configure({ openOnClick: false }),
      Placeholder.configure({ placeholder }),
    ],
    content: value,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  if (!editor) return null;

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

  function addLink() {
    const url = prompt("Enter hyperlink URL (e.g. https://...):");
    if (url) editor?.chain().focus().setLink({ href: url }).run();
  }

  function addImage() {
    const url = prompt("Enter image source URL:");
    if (url) editor?.chain().focus().setImage({ src: url }).run();
  }

  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-[#090a0d] transition-colors focus-within:border-[#ff9f1c]/50 focus-within:ring-1 focus-within:ring-[#ff9f1c]/30">
      {/* Editor Toolbar */}
      <div className="flex flex-wrap items-center gap-1 border-b border-white/10 bg-white/[0.03] p-2">
        {btn(editor.isActive("bold"), () => editor.chain().focus().toggleBold().run(), <Bold size={14} />, "Bold")}
        {btn(editor.isActive("italic"), () => editor.chain().focus().toggleItalic().run(), <Italic size={14} />, "Italic")}
        {btn(editor.isActive("code"), () => editor.chain().focus().toggleCode().run(), <Code size={14} />, "Inline Code")}

        <div className="mx-1 h-4 w-px bg-white/10" />

        {btn(editor.isActive("heading", { level: 2 }), () => editor.chain().focus().toggleHeading({ level: 2 }).run(), <Heading2 size={14} />, "Heading 2")}
        {btn(editor.isActive("heading", { level: 3 }), () => editor.chain().focus().toggleHeading({ level: 3 }).run(), <Heading3 size={14} />, "Heading 3")}

        <div className="mx-1 h-4 w-px bg-white/10" />

        {btn(editor.isActive("bulletList"), () => editor.chain().focus().toggleBulletList().run(), <List size={14} />, "Bullet List")}
        {btn(editor.isActive("orderedList"), () => editor.chain().focus().toggleOrderedList().run(), <ListOrdered size={14} />, "Ordered List")}
        {btn(editor.isActive("blockquote"), () => editor.chain().focus().toggleBlockquote().run(), <Quote size={14} />, "Quote")}

        <div className="mx-1 h-4 w-px bg-white/10" />

        {btn(editor.isActive("link"), addLink, <LinkIcon size={14} />, "Insert Link")}
        {btn(false, addImage, <ImageIcon size={14} />, "Insert Image")}

        <div className="mx-1 h-4 w-px bg-white/10" />

        {btn(false, () => editor.chain().focus().undo().run(), <Undo size={14} />, "Undo")}
        {btn(false, () => editor.chain().focus().redo().run(), <Redo size={14} />, "Redo")}
      </div>

      {/* Editor Content Area */}
      <EditorContent
        editor={editor}
        className="prose prose-invert prose-sm max-w-none p-4 min-h-[220px] text-zinc-100 placeholder-zinc-500 focus-within:outline-none [&_.ProseMirror]:min-h-[190px] [&_.ProseMirror]:outline-none"
      />
    </div>
  );
}
