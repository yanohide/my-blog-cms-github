/**
 * キルケゴール『死に至る病』について - ブログ記事をSanityに作成するスクリプト
 * 実行: npx tsx scripts/create-kierkegaard-post.ts
 */
import { createClient } from "next-sanity";
import { readFileSync } from "fs";
import { resolve } from "path";

// .env.local を読み込む
try {
  const envPath = resolve(process.cwd(), ".env.local");
  const env = readFileSync(envPath, "utf-8");
  for (const line of env.split("\n")) {
    const match = line.match(/^([^#=]+)=(.*)$/);
    if (match) {
      const key = match[1].trim();
      const value = match[2].trim().replace(/^["']|["']$/g, "");
      if (!process.env[key]) process.env[key] = value;
    }
  }
} catch {
  // .env.local がなくても環境変数で渡されていればOK
}

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "gr5bitvk";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const token = process.env.SANITY_API_TOKEN;

if (!token) {
  console.error("SANITY_API_TOKEN が設定されていません。.env.local を確認してください。");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-01-01",
  token,
  useCdn: false,
});

function createBlock(
  text: string,
  style: "normal" | "h1" | "h2" | "h3" = "normal",
  key: string
) {
  return {
    _type: "block" as const,
    _key: key,
    children: [{ _type: "span" as const, text }],
    markDefs: [],
    style,
  };
}

async function main() {
  const now = new Date().toISOString();
  const body = [
    createBlock("キルケゴール『死に至る病』について", "h1", "a1"),
    createBlock(
      "デンマークの哲学者セーレン・キルケゴールが1849年に著した『死に至る病』は、人間の本質的な「絶望」について考察した哲学の古典である。",
      "normal",
      "a2"
    ),
    createBlock("絶望とは何か", "h2", "a3"),
    createBlock(
      "キルケゴールのいう絶望は、単なる憂鬱や落ち込みではない。それは「自己」を正しく受け取れないこと、あるいは自己になりたいと望まないことから生じる。人間は、有限と無限、時間と永遠のあいだに引き裂かれた存在である。その緊張を抱えながら生きることで、私たちは絶望の可能性を常に抱えている。",
      "normal",
      "a4"
    ),
    createBlock("自己の弁証法", "h2", "a5"),
    createBlock(
      "キルケゴールは、自己を「関係の関係」として定義する。人間は自分自身と関係しているが、その関係そのものとも関係している。この二重の関係が、自己の核心をなす。絶望を克服するには、この自己を「透明」にし、それを設定した存在者——キルケゴールの文脈では神——と正しく関係する必要がある。",
      "normal",
      "a6"
    ),
    createBlock("いま読む意味", "h2", "a7"),
    createBlock(
      "テクノロジーが発達し、自己表現の手段が増えた時代だからこそ、キルケゴールの問いは新鮮に響く。私たちは何を表現しようとしているのか。その表現は、本当に「自己」を開いているのか。『死に至る病』は、表現とケアの根底にある、私たち自身の存在のあり方を問い直すきっかけを与えてくれる。",
      "normal",
      "a8"
    ),
  ];

  const doc = {
    _type: "post",
    title: "キルケゴール『死に至る病』について",
    slug: { _type: "slug", current: "kierkegaard-sickness-unto-death" },
    publishedAt: now,
    body,
  };

  const result = await client.create(doc);
  console.log("記事を作成しました:", result._id);
  console.log("ブログで確認: http://localhost:3000/posts/kierkegaard-sickness-unto-death");
  console.log("※ 下書きの場合は Sanity Studio (/studio) で Publish してください。");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
