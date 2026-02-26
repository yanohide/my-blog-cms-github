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
  const posts = await sanityFetch<Post[]>({ query: POSTS_QUERY });

  return (
    <div>
      <AboutSection />

      {posts.length > 0 && (
        <section id="article" className="mt-24">
          <p className="text-urban-muted text-xs tracking-[0.3em] uppercase mb-6">
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
                    className="group flex items-start gap-6 py-6 border-b border-urban-border hover:bg-urban-surface transition-colors"
                  >
                    <div className="relative w-24 h-16 shrink-0 overflow-hidden urban-card">
                      <Image
                        src={eyecatchUrl}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="96px"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      {post.publishedAt && (
                        <time className="text-xs text-urban-muted tracking-wider">
                          {formatDate(post.publishedAt)}
                        </time>
                      )}
                      <h3 className="text-base font-semibold mt-1.5 text-urban-text group-hover:text-urban-accent transition-colors">
                        {post.title}
                      </h3>
                    </div>
                    <span className="text-urban-accent opacity-0 group-hover:opacity-100 transition-opacity text-sm">
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
