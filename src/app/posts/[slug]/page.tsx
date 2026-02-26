import { notFound } from "next/navigation";
import type { TypedObject } from "@portabletext/types";
import { PortableText } from "@portabletext/react";
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
  const slugs = await sanityFetch<{ slug: string }[]>({
    query: POST_SLUGS_QUERY,
  });
  return slugs.filter((s) => s.slug).map((s) => ({ slug: s.slug }));
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

  if (!post) {
    notFound();
  }

  const volNo = post.publishedAt ? getVolNo(post.publishedAt) : null;

  const eyecatchUrl =
    post.mainImage && urlFor(post.mainImage)
      ? urlFor(post.mainImage)!.width(1200).height(630).url()
      : getEyecatchFallback(post.slug.current);

  return (
    <article>
      <div className="relative w-full aspect-[16/9] -mx-6 mb-12 overflow-hidden urban-card">
        <Image
          src={eyecatchUrl}
          alt={post.title}
          fill
          className="object-cover"
          sizes="(max-width: 1152px) 100vw, 1152px"
          priority
        />
      </div>

      <div className="mb-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-urban-muted text-sm hover:text-urban-accent transition-colors"
        >
          <span className="inline-block hover:-translate-x-1 transition-transform">
            ←
          </span>
          All Articles
        </Link>
      </div>

      <header className="mb-14">
        <div className="flex items-center gap-4 mb-6">
          {post.publishedAt && (
            <time className="text-sm text-urban-muted tracking-wider">
              {new Date(post.publishedAt).toLocaleDateString("ja-JP", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          )}
          {volNo && (
            <span className="text-xs border border-urban-border px-3 py-1 text-urban-muted">
              Vol.{volNo.vol} No.{volNo.no}
            </span>
          )}
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-urban-text tracking-tight">
          {post.title}
        </h1>

        <div className="mt-10 flex items-center gap-4">
          <div className="flex-1 h-px bg-urban-border" />
          <span className="text-urban-accent text-sm">◆</span>
          <div className="flex-1 h-px bg-urban-border" />
        </div>
      </header>

      <div
        className="prose prose-lg prose-invert max-w-none prose-headings:text-urban-text prose-p:text-urban-muted prose-a:text-urban-accent prose-blockquote:border-urban-accent prose-blockquote:border-l-2 prose-blockquote:text-urban-muted prose-strong:text-urban-text prose-li:text-urban-muted"
        style={{ letterSpacing: "0.04em", lineHeight: 2 }}
      >
        <PortableText value={(post.body ?? []) as TypedObject[]} />
      </div>

      <footer className="mt-12 pt-8 border-t border-urban-border">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-urban-muted text-sm hover:text-urban-accent transition-colors"
          >
            <span className="inline-block hover:-translate-x-1 transition-transform">
              ←
            </span>
            All Articles
          </Link>
          <a
            href="#"
            className="text-sm text-urban-muted hover:text-urban-accent transition-colors"
          >
            Back to Top ↑
          </a>
        </div>
      </footer>
    </article>
  );
}
