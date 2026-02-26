# Well-being デザイン 組み込み手順

このドキュメントでは、有機的でおしゃれな「Art for Well-being」デザインを Next.js + Sanity プロジェクトに組み込んだ際の構成と手順を説明します。

## 実装済みの構成

### 1. カラーとユーティリティ（globals.css）

**追加したカラー変数（@theme 内）:**
- `--color-wellbeing-bg`: #f4f3ea（温かみのある背景色）
- `--color-wellbeing-text`: #222222
- `--color-wellbeing-accent-green`: #a6ff4d
- `--color-wellbeing-accent-blue`: #0080ff
- `--color-wellbeing-logo`: #ff4500（ロゴのオレンジレッド）

**追加したユーティリティ:**
- `.blob-shape`: 有機的な形（アメーバ風）の border-radius
- `.font-wellbeing`: Helvetica Neue 系フォント

### 2. コンポーネント構成

| ファイル | 役割 |
|---------|------|
| `src/components/Sidebar.tsx` | 左固定のナビゲーション（ロゴ + メニュー） |
| `src/components/MainContent.tsx` | メインコンテンツのラッパー（縦書きテキスト + children） |
| `src/components/VerticalText.tsx` | 縦書きの装飾テキスト |
| `src/components/BlobImage.tsx` | 有機的な形の画像 + 装飾パーツ |
| `src/components/AboutSection.tsx` | About セクション（テキスト + Blob画像） |
| `src/components/index.ts` | コンポーネントのエクスポート |

### 3. レイアウトとページの役割

| ファイル | 役割 |
|---------|------|
| `src/app/layout.tsx` | ルートレイアウト。`<Sidebar>` と `<MainContent>` で全体をラップ |
| `src/app/page.tsx` | トップページ。`<AboutSection>` + 記事一覧 |
| `src/app/posts/[slug]/page.tsx` | 記事詳細ページ。Well-being デザインに合わせたスタイル |

## ファイル配置の流れ

```
1. layout.tsx
   └── <body>
       ├── <Sidebar />          ← 全ページ共通
       └── <MainContent>        ← 全ページ共通のメイン領域
           └── {children}       ← 各ページの内容

2. page.tsx（トップページ）
   └── <AboutSection />         ← About セクション
   └── <section id="article">  ← 記事一覧（Sanity から取得）

3. posts/[slug]/page.tsx
   └── 記事詳細（eyecatch、タイトル、本文、フッター）
```

## カスタマイズのヒント

### 画像の変更
`AboutSection` のデフォルト画像は `BlobImage` の `DEFAULT_IMAGE` で指定しています。Sanity から画像を取得する場合は、`AboutSection` に `imageSrc` プロップを渡してください。

### ナビゲーションの変更
`Sidebar.tsx` の `navItems` 配列を編集すると、メニュー項目を変更できます。

### レスポンシブ対応
- サイドバーは `w-[250px]` 固定。モバイルでは `ml-[250px]` のメインコンテンツが狭くなる可能性があります。
- 必要に応じて、`md:` ブレークポイントでサイドバーを折りたたむなどの対応を検討してください。

## 実行方法

```bash
npm run dev
```

ブラウザで http://localhost:3001 を開いて確認できます。
