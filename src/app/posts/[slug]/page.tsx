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
      {/* Eyecatch */}
      <div className="relative w-full aspect-[16/9] -mx-6 mb-12 rounded-lg overflow-hidden blob-shape">
        <Image
          src={eyecatchUrl}
          alt={post.title}
          fill
          className="object-cover"
          sizes="(max-width: 1152px) 100vw, 1152px"
          priority
        />
      </div>

      {/* Back link */}
      <div className="mb-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[#555] text-sm hover:text-wellbeing-text transition-colors"
        >
          <span className="inline-block hover:-translate-x-1 transition-transform">
            ←
          </span>
          All Articles
        </Link>
      </div>

      <header className="mb-14">
        {/* Date and Vol/No */}
        <div className="flex items-center gap-4 mb-6">
          {post.publishedAt && (
            <time className="text-sm text-[#555]">
              {new Date(post.publishedAt).toLocaleDateString("ja-JP", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          )}
          {volNo && (
            <span className="text-xs border border-[#999] px-3 py-1 text-[#555]">
              Vol.{volNo.vol} No.{volNo.no}
            </span>
          )}
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-wellbeing-text">
          {post.title}
        </h1>

        {/* Decorative line */}
        <div className="mt-10 flex items-center gap-4">
          <div className="flex-1 h-px bg-[#ccc]" />
          <span className="text-wellbeing-accent-blue text-sm">◆</span>
          <div className="flex-1 h-px bg-[#ccc]" />
        </div>
      </header>

      {/* Article body */}
      <div
        className="prose prose-lg max-w-none text-wellbeing-text prose-headings:text-wellbeing-text prose-a:text-wellbeing-accent-blue prose-blockquote:border-wellbeing-accent-green prose-blockquote:border-l-4"
        style={{ letterSpacing: "0.04em", lineHeight: 2 }}
      >
        <PortableText value={(post.body ?? []) as TypedObject[]} />
      </div>

      {/* Footer navigation */}
      <footer className="mt-12 pt-8 border-t border-[#ddd]">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[#555] text-sm hover:text-wellbeing-text transition-colors"
          >
            <span className="inline-block hover:-translate-x-1 transition-transform">
              ←
            </span>
            All Articles
          </Link>
          <a
            href="#"
            className="text-sm text-[#555] hover:text-wellbeing-accent-blue transition-colors"
          >
            Back to Top ↑
          </a>
        </div>
      </footer>
    </article>
  );
}
