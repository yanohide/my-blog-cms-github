# Next.js + Sanity ブログサイト 設計仕様書

> **対象読者**: Cursor AI / Claude Code
> **目的**: この仕様書に基づいて、同等のブログサイトを新規プロジェクトとして構築・Vercelへデプロイする

---

## 1. プロジェクト概要

| 項目 | 値 |
|------|-----|
| サイト名 | The Literary Review |
| コンセプト | エディトリアル・マガジンスタイルの日本語ブログ |
| フレームワーク | Next.js 16 (App Router) |
| CMS | Sanity v5 (Embedded Studio) |
| スタイリング | Tailwind CSS v4 + カスタムCSS |
| ホスティング | Vercel |
| 言語 | TypeScript (strict mode) |
| キャッシュ戦略 | ISR (revalidate: 60秒) |

---

## 2. ディレクトリ構成

```
project-root/
├── src/
│   ├── app/
│   │   ├── layout.tsx              # ルートレイアウト (header/footer)
│   │   ├── page.tsx                # トップページ (記事一覧)
│   │   ├── globals.css             # グローバルCSS (テーマ定義)
│   │   ├── favicon.ico
│   │   ├── posts/
│   │   │   └── [slug]/
│   │   │       └── page.tsx        # 記事詳細ページ (動的ルート)
│   │   └── studio/
│   │       └── [[...tool]]/
│   │           └── page.tsx        # Sanity Studio (クライアントコンポーネント)
│   └── sanity/
│       ├── lib/
│       │   ├── client.ts           # Sanity クライアント設定
│       │   └── queries.ts          # GROQ クエリ定義
│       └── schemas/
│           ├── index.ts            # スキーマエクスポート
│           └── post.ts             # Post ドキュメントスキーマ
├── blog/                           # マークダウン記事 (バックアップ用)
├── docs/                           # 運用ドキュメント
├── package.json
├── tsconfig.json
├── next.config.ts
├── sanity.config.ts                # Sanity 設定 ('use client')
├── sanity.cli.ts                   # Sanity CLI 設定
├── postcss.config.mjs
├── eslint.config.mjs
├── vercel.json
└── .env.local                      # 環境変数 (git管理外)
```

---

## 3. 依存パッケージ

### dependencies

```json
{
  "@portabletext/react": "^6.0.2",
  "@tailwindcss/typography": "^0.5.19",
  "next": "16.1.6",
  "next-sanity": "^12.1.0",
  "react": "19.2.3",
  "react-dom": "19.2.3",
  "sanity": "^5.8.1"
}
```

### devDependencies

```json
{
  "@tailwindcss/postcss": "^4",
  "@types/node": "^20",
  "@types/react": "^19",
  "@types/react-dom": "^19",
  "eslint": "^9",
  "eslint-config-next": "16.1.6",
  "tailwindcss": "^4",
  "typescript": "^5"
}
```

### セットアップコマンド

```bash
npx create-next-app@latest project-name --typescript --tailwind --eslint --app --src-dir
npm install next-sanity sanity @portabletext/react @tailwindcss/typography
```

---

## 4. 環境変数

### .env.local

```
NEXT_PUBLIC_SANITY_PROJECT_ID=<Sanity Project ID>
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=<Sanity Viewer Token>
```

- `NEXT_PUBLIC_` 接頭辞: クライアントサイドで参照可能
- `SANITY_API_TOKEN`: サーバーサイドのみ (将来のプレビュー機能用に発行しておく)

### Vercel 環境変数

上記3つを Vercel > Settings > Environment Variables に同一値で設定する。

---

## 5. 設定ファイル

### next.config.ts

```typescript
import type { NextConfig } from "next";
const nextConfig: NextConfig = {};
export default nextConfig;
```

### sanity.config.ts

```typescript
'use client'

import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import schemas from '@/sanity/schemas'

const config = defineConfig({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  basePath: '/studio',
  plugins: [structureTool()],
  schema: { types: schemas },
})

export default config
```

**重要**: `'use client'` ディレクティブ必須。Sanity の defineConfig はブラウザ API に依存する。

### sanity.cli.ts

```typescript
import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: '<Project ID>',
    dataset: 'production',
  },
})
```

### postcss.config.mjs

```javascript
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
export default config;
```

### vercel.json

```json
{ "framework": "nextjs" }
```

### tsconfig.json (パスエイリアス)

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

---

## 6. Sanity スキーマ定義

### src/sanity/schemas/post.ts

```typescript
import { defineField, defineType } from "sanity";

export default defineType({
  name: "post",
  title: "Post",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [{ type: "block" }],
    }),
  ],
});
```

### src/sanity/schemas/index.ts

```typescript
import post from "./post";
export default [post];
```

---

## 7. Sanity クライアント層

### src/sanity/lib/client.ts

```typescript
import { createClient, type QueryParams } from "next-sanity";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2024-01-01",
  useCdn: true,
});

export async function sanityFetch<T>({
  query,
  params = {},
  revalidate = 60,
}: {
  query: string;
  params?: QueryParams;
  revalidate?: number | false;
}) {
  return client.fetch<T>(query, params, {
    next: { revalidate },
  });
}
```

**設計意図**:
- `useCdn: true` — 読み取りパフォーマンス優先
- `revalidate: 60` — ISR で60秒ごとにバックグラウンド再生成
- ジェネリクス `<T>` で型安全なフェッチ

### src/sanity/lib/queries.ts

```typescript
import { defineQuery } from "next-sanity";

export const POSTS_QUERY = defineQuery(
  `*[_type == "post"] | order(publishedAt desc) { _id, title, slug, publishedAt }`
);

export const POST_QUERY = defineQuery(
  `*[_type == "post" && slug.current == $slug][0]`
);

export const POST_SLUGS_QUERY = defineQuery(
  `*[_type == "post"] { "slug": slug.current }`
);
```

---

## 8. ルーティング設計

| パス | ファイル | レンダリング | 説明 |
|------|---------|------------|------|
| `/` | `src/app/page.tsx` | Server Component (async) | 記事一覧 |
| `/posts/[slug]` | `src/app/posts/[slug]/page.tsx` | Server Component (async) + ISR | 記事詳細 |
| `/studio` | `src/app/studio/[[...tool]]/page.tsx` | Client Component | Sanity CMS管理画面 |

### 静的パス生成

```typescript
// posts/[slug]/page.tsx
export async function generateStaticParams() {
  const slugs = await sanityFetch<{ slug: string }[]>({
    query: POST_SLUGS_QUERY,
  });
  return slugs.map((s) => ({ slug: s.slug }));
}
```

---

## 9. コンポーネント設計

### 9.1 ルートレイアウト (layout.tsx)

**責務**: ページ共通のヘッダー・フッター、フォント読み込み、メタデータ

**フォント構成**:

| 変数名 | フォント | 用途 |
|--------|---------|------|
| `--font-noto-serif-jp` | Noto Serif JP (400, 700, 900) | 記事見出し・本文 |
| `--font-noto-sans-jp` | Noto Sans JP (400, 500) | UIテキスト・デフォルト |
| `--font-cormorant` | Cormorant Garamond (400, 600, 700) | マストヘッド・装飾 |

**ヘッダー構成**:
```
[animated top rule] ← expandWidth アニメーション
[Est. 2026] [思考と言葉の交差点] [東京] ← badge row
[The Literary Review] ← masthead-title (Cormorant Garamond)
[Essays · Criticism · Stories]
[thick gradient rule + thin rule] ← masthead-rule
```

**フッター構成**:
```
[double divider]
[The Literary Review]
[◆ diamond ornament]
[© 2026 copyright]
```

**レイアウト**:
- `max-w-4xl` で中央配置
- `px-6` で左右パディング
- `<html lang="ja">` 日本語指定

### 9.2 トップページ (page.tsx)

**データフロー**:
```
sanityFetch(POSTS_QUERY) → Post[] → [featured, ...rest] に分割
```

**型定義**:
```typescript
type Post = {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
};
```

**レイアウト構成**:
1. **Featured Panel** — 最新記事を navy 背景のフルワイドパネルで表示
2. **Article List** — 残りの記事を番号付き (01, 02, ...) リストで表示

**ヘルパー関数**:
```typescript
function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("ja-JP", {
    year: "numeric", month: "long", day: "numeric",
  });
}

function getVolNo(dateString: string) {
  const d = new Date(dateString);
  return { vol: d.getFullYear() - 2025, no: d.getMonth() + 1 };
}
```

### 9.3 記事詳細ページ (posts/[slug]/page.tsx)

**データフロー**:
```
params.slug → sanityFetch(POST_QUERY, {slug}) → Post | null → notFound() or render
```

**型定義**:
```typescript
type Post = {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  body: any[];  // Portable Text blocks
};
```

**レイアウト構成**:
```
[← All Articles] ← back-link
[日付] [Vol.X No.Y] ← issue-badge
[記事タイトル] ← font-black text-4xl〜7xl
[─── ◆ ───] ← diamond装飾ライン
[本文] ← PortableText + drop-cap + prose
[■ end mark]
[double divider]
[← All Articles] [Back to Top ↑]
```

**PortableText**:
- `@portabletext/react` の `<PortableText>` コンポーネントを使用
- `drop-cap` クラスで先頭文字を装飾 (Cormorant Garamond, burgundy)
- `prose prose-lg prose-stone` で Typography プラグインを適用

### 9.4 Sanity Studio ページ

```typescript
'use client'
import { NextStudio } from 'next-sanity/studio'
import config from '../../../../sanity.config'

export default function StudioPage() {
  return <NextStudio config={config} />
}
```

**重要**: `'use client'` 必須。catch-all route `[[...tool]]` で Studio 内のすべてのサブルートを処理。

---

## 10. デザインシステム

### 10.1 カラーパレット

```css
--color-cream: #F5F0E8        /* 背景 */
--color-ink: #1C1917           /* 本文テキスト */
--color-espresso: #44403C      /* 濃いアクセント */
--color-walnut: #78716C        /* セカンダリテキスト */
--color-sand: #D6D3D1          /* 区切り線・装飾 */
--color-parchment: #E7E5E4     /* ホバー背景 */
--color-burgundy: #991B1B      /* リンク・強調 */
--color-gold: #A16207          /* メタデータ・バッジ */
--color-navy: #1E3A5F          /* Featured パネル背景 */
--color-ivory: #FEFCE8         /* Featured パネルテキスト */
```

### 10.2 フォント設定

```css
--font-serif-jp: 'Noto Serif JP', 'Yu Mincho', serif;
--font-sans-jp: 'Noto Sans JP', 'Hiragino Sans', sans-serif;
--font-display: 'Cormorant Garamond', 'Georgia', serif;
```

### 10.3 アニメーション定義

| クラス名 | 効果 | 用途 |
|---------|------|------|
| `.animate-reveal` | fadeSlideUp 0.8s | メインコンテンツ表示 |
| `.animate-reveal-delay-1〜5` | fadeSlideUp + 0.1s〜0.5s delay | スタガードアニメーション |
| `.animate-expand-width` | expandWidth 0.8s | ヘッダーの横線 |

### 10.4 インタラクティブ効果

| クラス名 | 効果 | 用途 |
|---------|------|------|
| `.hover-underline-grow` | 下線が左から右に伸びる | Featured の Read Article |
| `.hover-bg-slide` | 背景がスライドイン | 記事リストのホバー |
| `.hover-lift` | 上に浮く + shadow | カード型要素 |

### 10.5 コンポーネントクラス

| クラス名 | 説明 |
|---------|------|
| `.masthead-title` | サイトタイトル (Cormorant Garamond) |
| `.masthead-rule` | グラデーション太線 |
| `.featured-panel` | navy背景 + radial-gradient オーバーレイ |
| `.divider-double` | 3px double sand |
| `.drop-cap` | 先頭文字装飾 (4.5em, burgundy) |
| `.issue-badge` | 小さな枠付きバッジ |
| `.back-link` | ← 戻る リンク (矢印アニメーション付き) |

### 10.6 特殊効果

**Paper grain texture**: body::before に SVG fractalNoise テクスチャを固定配置 (opacity: 0.03)

**Selection**: burgundy 背景 + ivory テキスト

**Custom scrollbar**: WebKit — cream track, sand thumb

---

## 11. データフロー全体図

```
┌──────────────┐    GROQ     ┌──────────────┐    ISR (60s)    ┌──────────────┐
│              │   queries   │              │   revalidate   │              │
│  Sanity CMS  │ ◄────────── │   Next.js    │ ──────────────▶ │   Vercel     │
│  (Headless)  │   ────────▶ │  (App Router)│                │   (CDN)      │
│              │  JSON data  │              │  Static HTML   │              │
└──────────────┘             └──────────────┘                └──────────────┘
       ▲                            │
       │ /studio                    │ PortableText
       │ (embedded)                 ▼
┌──────────────┐             ┌──────────────┐
│ Sanity Studio│             │  ブラウザ      │
│ (管理画面)    │             │  (読者)       │
└──────────────┘             └──────────────┘
```

---

## 12. ビルド・デプロイ手順

### ローカル開発

```bash
npm run dev          # http://localhost:3000 で開発サーバー起動
npm run build        # プロダクションビルド (エラーチェック)
npm run start        # プロダクションモードで起動
npm run lint         # ESLint 実行
```

### Vercel デプロイ

1. GitHub リポジトリを Vercel にインポート
2. Framework Preset: **Next.js** (自動検出)
3. Environment Variables に `.env.local` の3変数を設定
4. Deploy → 自動ビルド・公開
5. 以後 `git push` のたびに自動デプロイ

### Sanity CORS 設定

Sanity Manage > Settings > API > CORS origins に以下を追加:
- `http://localhost:3000` (Allow credentials: ON)
- `https://<project>.vercel.app` (Allow credentials: ON)

---

## 13. マークダウン記事フォーマット

`blog/` ディレクトリに保存するバックアップ用マークダウンの形式:

```markdown
---
title: "記事タイトル"
slug: article-slug
publishedAt: 2026-01-01
---

本文をここに書く。

## 見出し

段落テキスト。**太字** や *斜体* が使える。

> 引用ブロック
```

**Front Matter ルール**:
- `title`: ダブルクォーテーションで囲む (日本語OK)
- `slug`: 半角英数字 + ハイフンのみ。ファイル名と一致させる
- `publishedAt`: YYYY-MM-DD 形式

---

## 14. 新規構築チェックリスト

```
□ create-next-app で雛形作成 (--typescript --tailwind --eslint --app --src-dir)
□ npm install next-sanity sanity @portabletext/react @tailwindcss/typography
□ Sanity プロジェクト作成 (sanity.io/manage)
□ .env.local に環境変数設定
□ sanity.config.ts 作成 ('use client' 忘れずに)
□ sanity.cli.ts 作成
□ src/sanity/schemas/post.ts スキーマ定義
□ src/sanity/schemas/index.ts エクスポート
□ src/sanity/lib/client.ts クライアント設定
□ src/sanity/lib/queries.ts GROQ クエリ定義
□ src/app/studio/[[...tool]]/page.tsx Studio ページ作成
□ postcss.config.mjs に @tailwindcss/postcss 設定
□ src/app/globals.css にテーマ定義 (@theme ブロック)
□ src/app/layout.tsx フォント読み込み + ヘッダー/フッター
□ src/app/page.tsx トップページ (Featured + Article List)
□ src/app/posts/[slug]/page.tsx 記事詳細ページ
□ vercel.json 作成
□ npm run build でエラーなし確認
□ Sanity CORS origins 設定
□ Vercel にデプロイ + 環境変数設定
□ Sanity Studio から記事投稿テスト
□ サイト表示確認
```

---

## 15. 拡張のためのメモ

### スキーマ拡張例

カテゴリ、著者、アイキャッチ画像を追加する場合:

```typescript
// schemas/post.ts に追加
defineField({
  name: "author",
  title: "Author",
  type: "reference",
  to: [{ type: "author" }],
}),
defineField({
  name: "mainImage",
  title: "Main Image",
  type: "image",
  options: { hotspot: true },
}),
defineField({
  name: "categories",
  title: "Categories",
  type: "array",
  of: [{ type: "reference", to: { type: "category" } }],
}),
```

### パフォーマンス最適化

- `next/image` による画像最適化
- `generateMetadata()` による動的OGP
- Sanity の CDN (`useCdn: true`) は読み取り専用で高速

### Markdown → Sanity 自動投稿

`@portabletext/markdown` パッケージでマークダウンを Portable Text に変換し、Sanity API 経由でアップロード可能。CLI スクリプトとして実装すれば記事投稿を自動化できる。
