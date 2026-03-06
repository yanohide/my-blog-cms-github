import { notFound } from "next/navigation";
import type { TypedObject } from "@portabletext/types";
import { PortableText } from "@portabletext/react";

// 常にサーバーで最新データを取得（静的生成による404を防ぐ）
export const dynamic = "force-dynamic";
import { portableTextComponents } from "@/components/PortableTextComponents";
import Link from "next/link";
import Image from "next/image";
import { sanityFetch, urlFor } from "@/sanity/lib/client";
import { POST_QUERY, POST_SLUGS_QUERY } from "@/sanity/lib/queries";
import { getEyecatchFallback } from "@/sanity/lib/eyecatch-fallbacks";

type Post = {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  body: unknown[];
  mainImage?: { asset?: { _ref?: string } } | null;
};

function getVolNo(dateString: string) {
  const d = new Date(dateString);
  return { vol: d.getFullYear() - 2025, no: d.getMonth() + 1 };
}

export async function generateStaticParams() {
  try {
    const slugs = await sanityFetch<{ slug: string }[]>({
      query: POST_SLUGS_QUERY,
    });
    return slugs.filter((s) => s.slug).map((s) => ({ slug: s.slug }));
  } catch {
    return [];
  }
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await sanityFetch<Post | null>({
    query: POST_QUERY,
    params: { slug },
  });

  if (!post || !post.slug?.current) {
    notFound();
  }

  const volNo = post.publishedAt ? getVolNo(post.publishedAt) : null;
  const bodyContent = Array.isArray(post.body) ? post.body : [];

  const eyecatchUrl =
    post.mainImage && urlFor(post.mainImage)
      ? urlFor(post.mainImage)!.width(1200).height(630).url()
      : getEyecatchFallback(post.slug.current);

  return (
    <article>
      <div className="relative w-full aspect-[16/9] mb-14 overflow-hidden urban-card">
        <Image
          src={eyecatchUrl}
          alt={post.title}
          fill
          className="object-cover"
          sizes="(max-width: 900px) 100vw, 900px"
          priority
        />
      </div>

      <div className="mb-12">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-urban-muted text-[13px] hover:text-urban-accent transition-colors duration-200 tracking-[0.05em]"
        >
          <span className="inline-block hover:-translate-x-0.5 transition-transform duration-200">
            ←
          </span>
          All Articles
        </Link>
      </div>

      <header className="mb-16">
        <div className="flex items-center gap-5 mb-8">
          {post.publishedAt && (
            <time className="text-[13px] text-urban-muted tracking-[0.15em]">
              {new Date(post.publishedAt).toLocaleDateString("ja-JP", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          )}
          {volNo && (
            <span className="text-[11px] border border-urban-border px-3 py-1.5 text-urban-muted tracking-[0.1em]">
              Vol.{volNo.vol} No.{volNo.no}
            </span>
          )}
        </div>

        <h1
          className="text-4xl md:text-5xl lg:text-[3.25rem] font-semibold leading-[1.2] text-urban-text tracking-[0.02em]"
          style={{ fontFamily: "var(--font-serif-jp)" }}
        >
          {post.title}
        </h1>

        <div className="mt-12 flex items-center gap-4">
          <div className="flex-1 h-px bg-urban-border" />
          <span className="text-urban-accent/80 text-xs">◆</span>
          <div className="flex-1 h-px bg-urban-border" />
        </div>
      </header>

      <div
        className="prose prose-lg prose-invert max-w-none drop-cap prose-headings:text-urban-text prose-p:text-urban-muted prose-a:text-urban-accent prose-blockquote:border-urban-accent prose-blockquote:border-l-2 prose-blockquote:text-urban-muted prose-strong:text-urban-text prose-li:text-urban-muted"
        style={{ letterSpacing: "0.04em", lineHeight: 2.1 }}
      >
        <PortableText
          value={bodyContent as TypedObject[]}
          components={portableTextComponents}
        />
      </div>

      <footer className="mt-16 pt-10 border-t border-urban-border">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-urban-muted text-[13px] hover:text-urban-accent transition-colors duration-200 tracking-[0.05em]"
          >
            <span className="inline-block hover:-translate-x-0.5 transition-transform duration-200">
              ←
            </span>
            All Articles
          </Link>
          <a
            href="#"
            className="text-[13px] text-urban-muted hover:text-urban-accent transition-colors duration-200 tracking-[0.05em]"
          >
            Back to Top ↑
          </a>
        </div>
      </footer>
    </article>
  );
}
