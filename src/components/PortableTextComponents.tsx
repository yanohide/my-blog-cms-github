"use client";

import Image from "next/image";
import type { PortableTextComponents } from "@portabletext/react";
import { urlFor } from "@/sanity/lib/client";

function extractYouTubeId(url: string): string | null {
  if (!url) return null;
  const patterns = [
    /(?:youtube\.com\/watch\?v=)([^&\s]+)/,
    /(?:youtu\.be\/)([^?\s]+)/,
    /(?:youtube\.com\/embed\/)([^?\s]+)/,
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}

export const portableTextComponents: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null;
      const imageUrl = urlFor(value)?.width(1200).url();
      if (!imageUrl) return null;
      return (
        <figure className="my-10">
          <div className="relative w-full aspect-video overflow-hidden urban-card">
            <Image
              src={imageUrl}
              alt={value.alt || ""}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 720px"
            />
          </div>
          {value.caption && (
            <figcaption className="mt-3 text-center text-[13px] text-urban-muted tracking-[0.02em]">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
    youtube: ({ value }) => {
      const url = value?.url;
      const videoId = url ? extractYouTubeId(url) : null;
      if (!videoId) return null;
      return (
        <figure className="my-10">
          <div className="relative w-full aspect-video overflow-hidden urban-card">
            <iframe
              src={`https://www.youtube.com/embed/${videoId}`}
              title="YouTube video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 h-full w-full"
            />
          </div>
        </figure>
      );
    },
    fukidashi: ({ value }) => {
      const characterName = value?.characterName ?? "";
      const dialogue = value?.dialogue ?? "";
      return (
        <div className="my-8 flex flex-col items-start gap-3">
          <div className="relative max-w-[88%] rounded border-l-[3px] border-urban-accent bg-urban-surface/80 px-5 py-4">
            <p className="text-urban-text text-[15px] leading-[1.8] tracking-[0.01em]">
              {dialogue}
            </p>
          </div>
          {characterName && (
            <span className="text-[13px] font-medium text-urban-accent tracking-[0.05em]">
              {characterName}
            </span>
          )}
        </div>
      );
    },
    divider: () => (
      <hr className="my-10 border-0 border-t border-urban-border/80" />
    ),
    captionBox: ({ value }) => {
      const content = value?.content ?? "";
      if (!content) return null;
      return (
        <div className="my-8 rounded border border-urban-border/80 bg-urban-surface/50 px-6 py-5">
          <p className="text-urban-muted text-[14px] leading-[1.85] whitespace-pre-wrap tracking-[0.02em]">
            {content}
          </p>
        </div>
      );
    },
    quoteBox: ({ value }) => {
      const content = value?.content ?? "";
      const source = value?.source ?? "";
      if (!content) return null;
      return (
        <blockquote className="my-8 rounded border-l-[3px] border-urban-accent bg-urban-accent/[0.08] px-6 py-5 not-italic">
          <p className="text-urban-text text-[15px] leading-[1.85] whitespace-pre-wrap tracking-[0.02em]">
            {content}
          </p>
          {source && (
            <cite className="mt-3 block text-[13px] text-urban-muted tracking-[0.05em]">
              — {source}
            </cite>
          )}
        </blockquote>
      );
    },
  },
  block: {
    hr: () => (
      <hr className="my-10 border-0 border-t border-urban-border/80" />
    ),
  },
};
