import Link from "next/link";
import Image from "next/image";
import { sanityFetch, urlFor } from "@/sanity/lib/client";
import { POSTS_QUERY } from "@/sanity/lib/queries";
import { getEyecatchFallback } from "@/sanity/lib/eyecatch-fallbacks";
import { AboutSection } from "@/components/AboutSection";

type Post = {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  mainImage?: { asset?: { _ref?: string } } | null;
};

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function Home() {
  let posts: Post[] = [];
  try {
    posts = await sanityFetch<Post[]>({ query: POSTS_QUERY });
  } catch {
    posts = [];
  }

  return (
    <div>
      <AboutSection />

      {posts.length > 0 && (
        <section id="article" className="mt-28">
          <p className="text-urban-muted text-[11px] tracking-[0.35em] uppercase mb-8">
            Article & Event
          </p>
          <ul className="list-none p-0 m-0">
            {posts.map((post, index) => {
              const eyecatchUrl =
                post.mainImage && urlFor(post.mainImage)
                  ? urlFor(post.mainImage)!.width(200).height(120).url()
                  : getEyecatchFallback(index);

              return (
                <li key={post._id}>
                  <Link
                    href={`/posts/${post.slug.current}`}
                    className="group flex items-start gap-8 py-8 border-b border-urban-border hover:bg-urban-surface/50 transition-colors duration-200"
                  >
                    <div className="relative w-28 h-[72px] shrink-0 overflow-hidden urban-card">
                      <Image
                        src={eyecatchUrl}
                        alt=""
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                        sizes="112px"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      {post.publishedAt && (
                        <time className="text-[11px] text-urban-muted tracking-[0.15em]">
                          {formatDate(post.publishedAt)}
                        </time>
                      )}
                      <h3
                        className="text-base font-medium mt-2 text-urban-text group-hover:text-urban-accent transition-colors duration-200"
                        style={{ fontFamily: "var(--font-serif-jp)" }}
                      >
                        {post.title}
                      </h3>
                    </div>
                    <span className="text-urban-accent opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-sm mt-1">
                      →
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      )}
    </div>
  );
}
