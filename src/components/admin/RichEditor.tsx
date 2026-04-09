"use client";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import { Bold, Italic, List, ListOrdered, Heading2, Heading3, Link as LinkIcon, Image as ImageIcon, Undo, Redo, Code, Quote } from "lucide-react";
import { useEffect } from "react";

interface Props {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
}

export default function RichEditor({ value, onChange, placeholder = "Start writing..." }: Props) {
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
    if (editor && value !== editor.getHTML()) editor.commands.setContent(value);
  }, [value]);

  if (!editor) return null;

  const btn = (active: boolean, onClick: () => void, icon: React.ReactNode, title: string) => (
    <button type="button" title={title} onClick={onClick}
      className={`p-1.5 rounded hover:bg-gray-200 transition-colors ${active ? "bg-gray-200 text-blue-600" : "text-gray-600"}`}>
      {icon}
    </button>
  );

  function addLink() {
    const url = prompt("Enter URL:");
    if (url) editor.chain().focus().setLink({ href: url }).run();
  }

  function addImage() {
    const url = prompt("Enter image URL:");
    if (url) editor.chain().focus().setImage({ src: url }).run();
  }

  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="flex flex-wrap gap-0.5 p-2 bg-gray-50 border-b">
        {btn(editor.isActive("bold"), () => editor.chain().focus().toggleBold().run(), <Bold size={15} />, "Bold")}
        {btn(editor.isActive("italic"), () => editor.chain().focus().toggleItalic().run(), <Italic size={15} />, "Italic")}
        {btn(editor.isActive("code"), () => editor.chain().focus().toggleCode().run(), <Code size={15} />, "Code")}
        <div className="w-px bg-gray-300 mx-1" />
        {btn(editor.isActive("heading", { level: 2 }), () => editor.chain().focus().toggleHeading({ level: 2 }).run(), <Heading2 size={15} />, "H2")}
        {btn(editor.isActive("heading", { level: 3 }), () => editor.chain().focus().toggleHeading({ level: 3 }).run(), <Heading3 size={15} />, "H3")}
        <div className="w-px bg-gray-300 mx-1" />
        {btn(editor.isActive("bulletList"), () => editor.chain().focus().toggleBulletList().run(), <List size={15} />, "Bullet List")}
        {btn(editor.isActive("orderedList"), () => editor.chain().focus().toggleOrderedList().run(), <ListOrdered size={15} />, "Ordered List")}
        {btn(editor.isActive("blockquote"), () => editor.chain().focus().toggleBlockquote().run(), <Quote size={15} />, "Quote")}
        <div className="w-px bg-gray-300 mx-1" />
        {btn(editor.isActive("link"), addLink, <LinkIcon size={15} />, "Add Link")}
        {btn(false, addImage, <ImageIcon size={15} />, "Add Image")}
        <div className="w-px bg-gray-300 mx-1" />
        {btn(false, () => editor.chain().focus().undo().run(), <Undo size={15} />, "Undo")}
        {btn(false, () => editor.chain().focus().redo().run(), <Redo size={15} />, "Redo")}
      </div>
      <EditorContent editor={editor}
        className="prose prose-sm max-w-none p-4 min-h-[200px] focus-within:outline-none [&_.ProseMirror]:outline-none [&_.ProseMirror]:min-h-[180px]" />
    </div>
  );
}
