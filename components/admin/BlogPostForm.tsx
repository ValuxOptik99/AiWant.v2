"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import {
  Bold, Italic, List, ListOrdered, Link2, ImageIcon,
  Heading2, Heading3, Quote, Undo, Redo, Eye, EyeOff,
  Loader2, Upload, X,
} from "lucide-react";
import NextImage from "next/image";

// ─── Zod Schema ───────────────────────────────────────────────────────────────

const schema = z.object({
  title: z.string().min(5, "Minim 5 caractere"),
  slug: z.string().min(3, "Minim 3 caractere").regex(/^[a-z0-9-]+$/, "Doar litere mici, cifre și liniuțe"),
  excerpt: z.string().min(20, "Minim 20 caractere").max(300, "Maxim 300 caractere"),
  content: z.string().min(10, "Adaugă conținut"),
  description: z.string().min(50, "Minim 50 caractere").max(160, "Maxim 160 caractere"),
  category: z.string().min(1, "Selectează o categorie"),
  imageUrl: z.string().optional().nullable(),
  published: z.boolean(),
});

type FormValues = z.infer<typeof schema>;

const CATEGORIES = [
  "Studiu de Caz",
  "Automatizare",
  "AI & Tehnologie",
  "Dezvoltare Web",
  "Business Digital",
  "Ghid Practic",
];

// ─── Slug generator ───────────────────────────────────────────────────────────

function toSlug(str: string): string {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

// ─── Tiptap Toolbar ───────────────────────────────────────────────────────────

function ToolbarButton({
  onClick,
  active,
  disabled,
  title,
  children,
}: {
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onMouseDown={(e) => { e.preventDefault(); onClick(); }}
      disabled={disabled}
      title={title}
      className="w-8 h-8 rounded-lg flex items-center justify-center text-xs transition-all"
      style={{
        background: active ? "rgba(212,168,67,0.15)" : "transparent",
        color: active ? "#D4A843" : "rgba(255,255,255,0.6)",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.4 : 1,
      }}
    >
      {children}
    </button>
  );
}

// ─── Main Form ────────────────────────────────────────────────────────────────

interface BlogPostFormProps {
  initialData?: Partial<FormValues> & { id?: string };
  mode: "create" | "edit";
}

export default function BlogPostForm({ initialData, mode }: BlogPostFormProps) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [serverError, setServerError] = useState("");
  const [imageUploading, setImageUploading] = useState(false);
  const [preview, setPreview] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const slugAutoRef = useRef(mode === "create");

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: initialData?.title ?? "",
      slug: initialData?.slug ?? "",
      excerpt: initialData?.excerpt ?? "",
      content: initialData?.content ?? "",
      description: initialData?.description ?? "",
      category: initialData?.category ?? "",
      imageUrl: initialData?.imageUrl ?? "",
      published: initialData?.published ?? false,
    },
  });

  // Auto-generate slug from title (only in create mode, until manually edited)
  const title = watch("title");
  useEffect(() => {
    if (slugAutoRef.current && mode === "create") {
      setValue("slug", toSlug(title), { shouldValidate: false });
    }
  }, [title, mode, setValue]);

  // ── Tiptap editor ──────────────────────────────────────────────────────────
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({ inline: false, allowBase64: false }),
      Link.configure({ openOnClick: false }),
      Placeholder.configure({ placeholder: "Scrie conținutul articolului..." }),
    ],
    content: initialData?.content ?? "",
    onUpdate: ({ editor }) => {
      setValue("content", editor.getHTML(), { shouldValidate: true });
    },
    editorProps: {
      attributes: {
        class: "tiptap-editor",
      },
    },
  });

  // ── Image upload ───────────────────────────────────────────────────────────
  const handleImageUpload = useCallback(async (file: File) => {
    setImageUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/admin/blog/upload-image", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setValue("imageUrl", data.url, { shouldValidate: true });
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Eroare upload imagine.");
    } finally {
      setImageUploading(false);
    }
  }, [setValue]);

  // ── Submit ─────────────────────────────────────────────────────────────────
  const onSubmit = async (values: FormValues) => {
    setSaving(true);
    setServerError("");
    try {
      const url = mode === "create"
        ? "/api/admin/blog"
        : `/api/admin/blog/${initialData?.id}`;
      const method = mode === "create" ? "POST" : "PATCH";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      router.push("/admin/blog");
      router.refresh();
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Eroare la salvare.");
    } finally {
      setSaving(false);
    }
  };

  const imageUrl = watch("imageUrl");
  const isPublished = watch("published");
  const excerptLength = watch("excerpt")?.length ?? 0;
  const descLength = watch("description")?.length ?? 0;

  // ── Shared field styles ────────────────────────────────────────────────────
  const fieldStyle = {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.1)",
    color: "white",
    outline: "none",
  };
  const fieldClass = "w-full px-4 py-3 rounded-xl text-sm transition-colors placeholder:opacity-30 focus:ring-1 focus:ring-[#D4A843]";
  const labelClass = "block text-xs font-semibold uppercase tracking-wider mb-2 text-[#8A9BB5]";
  const errorClass = "mt-1 text-xs text-red-400";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {serverError && (
        <div className="p-4 rounded-xl text-sm text-red-400" style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)" }}>
          {serverError}
        </div>
      )}

      {/* ── Row: Title + Slug ────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Titlu *</label>
          <input {...register("title")} placeholder="Titlul articolului" className={fieldClass} style={fieldStyle} />
          {errors.title && <p className={errorClass}>{errors.title.message}</p>}
        </div>
        <div>
          <label className={labelClass}>Slug *</label>
          <input
            {...register("slug")}
            placeholder="url-articol"
            className={fieldClass}
            style={fieldStyle}
            onChange={(e) => {
              slugAutoRef.current = false;
              setValue("slug", e.target.value, { shouldValidate: true });
            }}
          />
          {errors.slug && <p className={errorClass}>{errors.slug.message}</p>}
        </div>
      </div>

      {/* ── Row: Category + Published ────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
        <div>
          <label className={labelClass}>Categorie *</label>
          <select {...register("category")} className={fieldClass} style={{ ...fieldStyle, cursor: "pointer" }}>
            <option value="">Selectează categoria</option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          {errors.category && <p className={errorClass}>{errors.category.message}</p>}
        </div>
        <div>
          <label className={labelClass}>Stare</label>
          <button
            type="button"
            onClick={() => setValue("published", !isPublished, { shouldValidate: true })}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium transition-all"
            style={{
              background: isPublished ? "rgba(16,185,129,0.1)" : "rgba(255,255,255,0.04)",
              border: `1px solid ${isPublished ? "rgba(16,185,129,0.3)" : "rgba(255,255,255,0.1)"}`,
              color: isPublished ? "#10B981" : "rgba(255,255,255,0.5)",
            }}
          >
            {isPublished ? <Eye size={16} /> : <EyeOff size={16} />}
            {isPublished ? "Publicat" : "Draft"}
          </button>
        </div>
      </div>

      {/* ── Excerpt ──────────────────────────────────────────────────────── */}
      <div>
        <label className={labelClass}>
          Rezumat (preview card) *
          <span className="ml-2 normal-case font-normal" style={{ color: excerptLength > 280 ? "#EF4444" : "#8A9BB5" }}>
            {excerptLength}/300
          </span>
        </label>
        <textarea {...register("excerpt")} rows={3} placeholder="Scurt rezumat afișat pe card-urile din lista de blog..." className={fieldClass} style={fieldStyle} />
        {errors.excerpt && <p className={errorClass}>{errors.excerpt.message}</p>}
      </div>

      {/* ── SEO Description ───────────────────────────────────────────────── */}
      <div>
        <label className={labelClass}>
          Meta Description (SEO) *
          <span className="ml-2 normal-case font-normal" style={{ color: descLength > 155 ? "#EF4444" : "#8A9BB5" }}>
            {descLength}/160
          </span>
        </label>
        <textarea {...register("description")} rows={2} placeholder="Descriere pentru Google (50-160 caractere)..." className={fieldClass} style={fieldStyle} />
        {errors.description && <p className={errorClass}>{errors.description.message}</p>}
      </div>

      {/* ── Cover Image ───────────────────────────────────────────────────── */}
      <div>
        <label className={labelClass}>Imagine copertă</label>
        {imageUrl ? (
          <div className="relative rounded-xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.1)" }}>
            <div className="relative w-full" style={{ aspectRatio: "16/9" }}>
              <NextImage src={imageUrl} alt="Cover" fill className="object-cover" />
            </div>
            <button
              type="button"
              onClick={() => setValue("imageUrl", "", { shouldValidate: true })}
              className="absolute top-2 right-2 w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: "rgba(0,0,0,0.6)", color: "white" }}
            >
              <X size={14} />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={imageUploading}
            className="w-full flex flex-col items-center justify-center gap-3 py-10 rounded-xl transition-all text-sm"
            style={{
              border: "2px dashed rgba(255,255,255,0.1)",
              color: "rgba(255,255,255,0.4)",
              background: "rgba(255,255,255,0.02)",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(212,168,67,0.4)"; e.currentTarget.style.color = "#D4A843"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = "rgba(255,255,255,0.4)"; }}
          >
            {imageUploading ? <Loader2 size={20} className="animate-spin" /> : <Upload size={20} />}
            {imageUploading ? "Se încarcă..." : "Încarcă imaginea copertă (max 5MB)"}
            <span className="text-xs opacity-60">JPG, PNG, WebP</span>
          </button>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleImageUpload(file);
          }}
        />
      </div>

      {/* ── Rich Text Editor ──────────────────────────────────────────────── */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className={labelClass} style={{ marginBottom: 0 }}>Conținut *</label>
          <button
            type="button"
            onClick={() => setPreview(!preview)}
            className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg transition-all"
            style={{
              background: preview ? "rgba(212,168,67,0.1)" : "rgba(255,255,255,0.04)",
              color: preview ? "#D4A843" : "rgba(255,255,255,0.5)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            {preview ? <EyeOff size={12} /> : <Eye size={12} />}
            {preview ? "Editare" : "Preview HTML"}
          </button>
        </div>

        {preview ? (
          <div
            className="rounded-xl p-5 min-h-[300px] prose-blog text-sm leading-relaxed overflow-auto"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.8)" }}
            dangerouslySetInnerHTML={{ __html: getValues("content") }}
          />
        ) : (
          <div
            className="rounded-xl overflow-hidden"
            style={{ border: errors.content ? "1px solid rgba(239,68,68,0.5)" : "1px solid rgba(255,255,255,0.1)" }}
          >
            {/* Toolbar */}
            {editor && (
              <div
                className="flex flex-wrap items-center gap-0.5 px-3 py-2 border-b"
                style={{ background: "rgba(0,0,0,0.25)", borderColor: "rgba(255,255,255,0.08)" }}
              >
                <ToolbarButton title="Bold" onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive("bold")}>
                  <Bold size={14} />
                </ToolbarButton>
                <ToolbarButton title="Italic" onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive("italic")}>
                  <Italic size={14} />
                </ToolbarButton>
                <div className="w-px h-5 mx-1" style={{ background: "rgba(255,255,255,0.1)" }} />
                <ToolbarButton title="Heading 2" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive("heading", { level: 2 })}>
                  <Heading2 size={14} />
                </ToolbarButton>
                <ToolbarButton title="Heading 3" onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} active={editor.isActive("heading", { level: 3 })}>
                  <Heading3 size={14} />
                </ToolbarButton>
                <div className="w-px h-5 mx-1" style={{ background: "rgba(255,255,255,0.1)" }} />
                <ToolbarButton title="Bullet list" onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive("bulletList")}>
                  <List size={14} />
                </ToolbarButton>
                <ToolbarButton title="Ordered list" onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive("orderedList")}>
                  <ListOrdered size={14} />
                </ToolbarButton>
                <ToolbarButton title="Blockquote" onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive("blockquote")}>
                  <Quote size={14} />
                </ToolbarButton>
                <div className="w-px h-5 mx-1" style={{ background: "rgba(255,255,255,0.1)" }} />
                <ToolbarButton
                  title="Link"
                  onClick={() => {
                    const url = window.prompt("URL:");
                    if (url) editor.chain().focus().setLink({ href: url }).run();
                  }}
                  active={editor.isActive("link")}
                >
                  <Link2 size={14} />
                </ToolbarButton>
                <ToolbarButton
                  title="Imagine"
                  onClick={() => {
                    const url = window.prompt("URL imagine:");
                    if (url) editor.chain().focus().setImage({ src: url }).run();
                  }}
                >
                  <ImageIcon size={14} />
                </ToolbarButton>
                <div className="w-px h-5 mx-1 ml-auto" style={{ background: "rgba(255,255,255,0.1)" }} />
                <ToolbarButton title="Undo" onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()}>
                  <Undo size={14} />
                </ToolbarButton>
                <ToolbarButton title="Redo" onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()}>
                  <Redo size={14} />
                </ToolbarButton>
              </div>
            )}

            {/* Editor area */}
            <EditorContent
              editor={editor}
              className="tiptap-content"
              style={{ background: "rgba(255,255,255,0.03)" }}
            />
          </div>
        )}
        {errors.content && <p className={errorClass}>{errors.content.message}</p>}
      </div>

      {/* ── Actions ───────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between pt-2 border-t" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
        <button
          type="button"
          onClick={() => router.back()}
          className="px-5 py-2.5 rounded-xl text-sm font-medium transition-all"
          style={{ color: "rgba(255,255,255,0.5)", border: "1px solid rgba(255,255,255,0.1)" }}
        >
          Anulează
        </button>
        <button
          type="submit"
          disabled={saving}
          className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all hover:opacity-90 disabled:opacity-60"
          style={{ background: "#D4A843", color: "#0E1D33" }}
        >
          {saving && <Loader2 size={15} className="animate-spin" />}
          {saving ? "Se salvează..." : mode === "create" ? "Publică articolul" : "Salvează modificările"}
        </button>
      </div>

      {/* ── Tiptap prose styles injected inline ───────────────────────────── */}
      <style>{`
        .tiptap-content .ProseMirror {
          min-height: 300px;
          padding: 1.25rem;
          outline: none;
          color: rgba(255,255,255,0.85);
          font-size: 0.9rem;
          line-height: 1.7;
        }
        .tiptap-content .ProseMirror p.is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          float: left;
          color: rgba(255,255,255,0.2);
          pointer-events: none;
          height: 0;
        }
        .tiptap-content .ProseMirror h2 { font-size: 1.35rem; font-weight: 700; margin: 1.5rem 0 0.75rem; color: white; }
        .tiptap-content .ProseMirror h3 { font-size: 1.1rem; font-weight: 700; margin: 1.25rem 0 0.5rem; color: white; }
        .tiptap-content .ProseMirror ul, .tiptap-content .ProseMirror ol { padding-left: 1.5rem; margin: 0.75rem 0; }
        .tiptap-content .ProseMirror li { margin: 0.25rem 0; }
        .tiptap-content .ProseMirror blockquote { border-left: 3px solid #D4A843; padding-left: 1rem; margin: 1rem 0; color: rgba(255,255,255,0.6); font-style: italic; }
        .tiptap-content .ProseMirror a { color: #D4A843; text-decoration: underline; }
        .tiptap-content .ProseMirror img { max-width: 100%; border-radius: 0.75rem; margin: 1rem 0; }
        .tiptap-content .ProseMirror strong { color: white; font-weight: 700; }
        .tiptap-content .ProseMirror code { background: rgba(212,168,67,0.1); color: #D4A843; padding: 0.15em 0.4em; border-radius: 0.25em; font-size: 0.85em; }
        .tiptap-content .ProseMirror pre { background: rgba(0,0,0,0.4); border-radius: 0.75rem; padding: 1rem; overflow-x: auto; }
        .tiptap-content .ProseMirror pre code { background: none; color: rgba(255,255,255,0.85); padding: 0; }
        .prose-blog h2 { font-size: 1.35rem; font-weight: 700; margin: 1.5rem 0 0.75rem; color: white; }
        .prose-blog h3 { font-size: 1.1rem; font-weight: 700; margin: 1.25rem 0 0.5rem; color: white; }
        .prose-blog ul, .prose-blog ol { padding-left: 1.5rem; margin: 0.75rem 0; }
        .prose-blog blockquote { border-left: 3px solid #D4A843; padding-left: 1rem; color: rgba(255,255,255,0.6); font-style: italic; }
        .prose-blog a { color: #D4A843; text-decoration: underline; }
        .prose-blog strong { color: white; font-weight: 700; }
        .prose-blog img { max-width: 100%; border-radius: 0.75rem; margin: 1rem 0; }
      `}</style>
    </form>
  );
}
