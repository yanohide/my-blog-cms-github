# 発展編：ブログ運用と UI/UX をさらに進化させる

Step 1〜4 の基本が身についたら、次はさらに効率的な運用と、サイトの品質向上に挑戦しましょう。Cursor の **Skills / Commands / Rules** を使い分けることで、記事の執筆から UI 改善まで AI に任せる範囲を広げられます。

---

## 目次

### Cursor の AI を使いこなす

1. [Cursor の 5 つの指示方法を理解する](#1-cursor-の-5-つの指示方法を理解する)
2. [ブログ運用での使い分け](#2-ブログ運用での使い分け)
3. [Skills：記事執筆と UI 改善の要](#3-skills記事執筆と-ui-改善の要)
4. [Commands：定型ワークフローの自動化](#4-commands定型ワークフローの自動化)
5. [Rules：常時適用のルールブック](#5-rules常時適用のルールブック)
6. [AGENTS.md：プロジェクトの基本方針](#6-agentsmdプロジェクトの基本方針)
7. [Sanity CLI で記事投稿を自動化する（上級）](#7-sanity-cli-で記事投稿を自動化する上級)

### サイトの UI/UX を発展させる

8. [Skills を活用した UI 改善](#8-skills-を活用した-ui-改善)
9. [デザインの改善アイデア](#9-デザインの改善アイデア)
10. [機能の追加アイデア](#10-機能の追加アイデア)
11. [パフォーマンスの改善](#11-パフォーマンスの改善)
12. [Cursor で UI 変更を行う手順](#12-cursor-で-ui-変更を行う手順)

---

# Cursor の AI を使いこなす

---

## 1. Cursor の 5 つの指示方法を理解する

Cursor には AI への指示方法が **5 つ** あります。それぞれ役割が違うので、正しく使い分けることが大切です。

| 方法 | 保存場所 | いつ適用されるか | 一言でいうと |
|------|---------|----------------|------------|
| **AGENTS.md** | プロジェクトルート | 常に自動で読み込まれる | プロジェクトの自己紹介 |
| **Rules** | `.cursor/rules/` | 条件に合うファイルを触るたびに適用 | 常時適用のルールブック |
| **Commands** | `.cursor/commands/` | `/command` で手動実行 | ワンクリックの定型作業 |
| **Skills** | `.cursor/skills/` | AI が必要と判断したら自動読み込み | 専門知識パック |
| **Subagents** | `.cursor/agents/` | AI が必要と判断したら並列実行 | 別働隊のリサーチャー |

### それぞれのイメージ

```
AGENTS.md   → 「うちのプロジェクトはこういうものです」（名刺）
Rules       → 「この種類のファイルは必ずこうして」（社内規則）
Commands    → 「/blog-publish を実行して」（ボタンを押す）
Skills      → AI が「この作業にはこの知識が要るな」と自分で棚から取る（百科事典）
Subagents   → AI が「この調査は別の人に任せよう」と判断して並列作業（チームメンバー）
```

---

## 2. ブログ運用での使い分け

### 記事の執筆 → Skills

記事の執筆は **Skills** が最適です。理由は：

- 記事を書くには **文体、構成パターン、スタイルガイド** など多くの知識が必要
- Skills なら AI が「ブログを書きたい」という意図を検知して、自動的に関連知識を読み込む
- スクショの配置、エラー記録の整理など、**手順書+テンプレート**をまとめて管理できる

### 定型の公開作業 → Commands

`git push` + Sanity 投稿案内のような **短い定型ワークフロー** は Commands が向いています。

- 「`/blog-publish` を実行」とワンコマンドで起動できる
- 手順が明確で、毎回同じ操作を繰り返す
- 大量の知識は不要。やることリストがあれば十分

### 常時適用のルール → Rules

記事のフォーマットやコーディング規約は Rules で常時適用します。

- `blog/**/*.md` を触るたびに自動で Front Matter のルールが効く
- 指示しなくても AI が勝手に守ってくれる

### UI の品質チェック → Skills

サイトの UI を変更するときも Skills が有効です。

- React/Next.js のベストプラクティス（45 ルール）を AI が自動参照
- Web デザインガイドラインに照らしたレビューを実行
- 知識量が多いため、常時読み込む Rules ではなく Skills が適切

### まとめ

```
┌─────────────────────────────────────────────────────────┐
│  Skills（AI が自動判断で読み込む専門知識）                  │
│  ├── 記事執筆     blog-writer / tech-blog-writer         │
│  ├── 素材収集     blog-material-collector                │
│  ├── React品質    vercel-react-best-practices            │
│  └── UIレビュー   web-design-guidelines                  │
├─────────────────────────────────────────────────────────┤
│  Commands（手動で実行する定型ワークフロー）                 │
│  └── /blog-publish  GitHub プッシュ + Sanity 投稿案内     │
├─────────────────────────────────────────────────────────┤
│  Rules（常時適用のルール）                                 │
│  ├── blog-format.md    記事の Front Matter ルール         │
│  └── coding-style.md   TypeScript / React の規約         │
├─────────────────────────────────────────────────────────┤
│  AGENTS.md（プロジェクトの基本方針）                       │
│  └── 技術スタック、記事の仕組み、プロジェクト構成          │
└─────────────────────────────────────────────────────────┘
```

---

## 3. Skills：記事執筆と UI 改善の要

### 公開 Skills をインストールする

Vercel などが公開している Skills は `npx skills add` コマンドでインストールできます。

```bash
# 例: Vercel の React Best Practices をインストール
npx skills add vercel-labs/agent-skills/vercel-react-best-practices
```

| 公開 Skill | 用途 | 提供元 |
|-----------|------|--------|
| **vercel-react-best-practices** | React/Next.js の最適化（45ルール×8カテゴリ） | Vercel 公式 |
| **web-design-guidelines** | Web Interface Guidelines に照らした UI レビュー | Vercel 公式 |

> **Skills の探し方**: [skills.sh](https://skills.sh) や [claude-plugins.dev/skills](https://claude-plugins.dev/skills) で公開 Skills を検索できます。[awesome-agent-skills](https://github.com/VoltAgent/awesome-agent-skills) にもコミュニティ製 Skills がまとまっています。

### 自作 Skills を作る — ブログ執筆を例に

公開 Skills だけでなく、**自分の用途に合わせた Skills を自作**できます。ここではブログ執筆に特化した Skills の作り方を紹介します。

### Skill の基本構造

```
~/.cursor/skills/my-skill/      ← Cursor 用
~/.claude/skills/my-skill/      ← Claude Code 用

my-skill/
├── SKILL.md              ← 必須。スキルの定義
├── references/            ← 任意。参照ドキュメント（スタイルガイドなど）
├── assets/                ← 任意。テンプレートファイル
└── scripts/               ← 任意。実行スクリプト
```

**SKILL.md** が唯一の必須ファイルです。YAML フロントマター（`name` と `description`）+ Markdown 本体で構成します。

### SKILL.md の書き方

```markdown
---
name: my-skill-name
description: どういう場面で使うスキルかを説明する。AI はこの説明文を読んで「今のタスクに必要か」を判断する。
---

# スキルのタイトル

## ワークフロー
（手順を書く）

## 注意事項
（守るべきルールを書く）
```

**ポイント:**

- `name` は小文字英数字+ハイフンのみ（フォルダ名と一致させる）
- `description` が最も重要。**AI はこの説明文だけを見て読み込むかどうか判断する**ので、「いつ使うか」を具体的に書く

### 実例 ① ブログ記事の執筆 Skill

非エンジニア向けに、資料をもとに 5 部構成の記事を対話的に生成するスキルです。

**ディレクトリ構成:**

```
blog-writer/
├── SKILL.md                          ← スキル本体
└── references/
    ├── style-guide.md                ← 文体・表記のルール
    ├── article-template.md           ← 5部構成のテンプレート
    └── metaphor-examples.md          ← 専門用語の比喩表現集
```

**SKILL.md:**

```markdown
---
name: blog-writer
description: 非エンジニア向け技術ブログの執筆支援スキル。「非エンジニア出身の管理職が最新技術に挑戦している」という視点で、5部構成の記事を対話的に作成する。ブログ記事を書きたい、記事のアウトラインを作りたい、技術記事を執筆したい、ブログ執筆を手伝ってほしい、という場合に使用する。
---

# Blog Writer

非エンジニア向け技術ブログの執筆を支援する。

## ワークフロー

### Step 1: 資料の収集
ユーザーに以下を依頼:
- フォルダパス: スクショやメモを保存したフォルダ
- 参照URL: 公式ドキュメント、関連記事など

### Step 2: 資料の読み込み
1. 指定フォルダ内のファイルを確認（画像、テキスト、メモ）
2. 参照URLの内容を取得
3. 資料の概要を整理してユーザーに提示

### Step 3: 構成の検討
references/article-template.md の5部構成をベースに構成案を提示:
1. 導入 — どんな悩み/きっかけで始めたか
2. 概念解説 — 何を使ったか、どういうものか
3. 実践/検証 — 実際にやったこと（スクショ配置場所を提案）
4. 壁と解決 — 躓いたポイントと解決方法
5. 結び — 学びとNext Action

### Step 4: 記事生成
references/style-guide.md のスタイルに従い記事を生成する。

## 注意事項
- 資料にない情報は推測せず確認する
- 構成はユーザーと相談して決める
```

**references/style-guide.md（文体ルール）:**

```markdown
# スタイルガイド

## 文体
- 「です・ます」調が基本。適度に「〜ですね」「〜ですよね」と語りかける
- 文は短く切る。体言止めを効果的に使う
- 口語表現を適度に混ぜる（「サクサク進む」「まさかの事態」）

## 専門用語の扱い
- 必ず「非エンジニア向けの解説」をセットにする
- 横文字が出たら「一言で言うと〇〇」と噛み砕く

## 強調表現
- 重要なキーワードは**太字**にする
- 専門用語やファイル名は `コード` で装飾
```

**references/article-template.md（構成テンプレート）:**

```markdown
# 記事構成テンプレート（5部構成）

## 1. 導入
- 自己紹介
- 読者の悩みへの共感（「〜と感じたことありませんか？」）

## 2. 概念解説
- 「〇〇とは？」の解説
- 比喩表現で分かりやすく説明

## 3. 実践/検証
- 使用ツールの明示
- 実際のコマンドやプロンプトの提示

## 4. 壁と解決
- エラー内容 → 原因分析 → 解決策のプロセス

## 5. 結び
- 今回の成果（要約）
- 学んだこと（箇条書き）
- 次回の予告
```

### 実例 ② ブログ素材の自動収集 Skill

「作ってみた」系の記事を書くとき、**作業中にコマンドログ・スクショ・エラーを自動記録**するスキルです。

**ディレクトリ構成:**

```
blog-material-collector/
├── SKILL.md                          ← スキル本体
├── scripts/
│   ├── init_project.sh               ← フォルダ初期化
│   ├── screenshot.sh                 ← デスクトップのスクショ撮影
│   ├── web_screenshot.py             ← Webページのスクショ撮影
│   └── compile_materials.py          ← 素材のまとめ生成
├── assets/
│   ├── step_template.md              ← 作業ステップの記録テンプレート
│   └── error_template.md             ← エラー記録のテンプレート
└── references/
    └── hook_config.md                ← Hook連携の設定例
```

**SKILL.md（抜粋）:**

```markdown
---
name: blog-material-collector
description: |
  ブログ記事「〇〇作ってみた」の素材を自動収集するスキル。
  コマンド実行ログ、エラー、スクリーンショットを記録し、
  Markdownとフォルダ構造で整理する。
---

# Blog Material Collector

## コマンド

### プロジェクト開始
/blog-collect start <プロジェクト名>

### プロジェクト終了・まとめ
/blog-collect finish

## ワークフロー

### 1. プロジェクト開始時
フォルダを作成し、logs/ screenshots/ errors/ のサブディレクトリを用意する。

### 2. 作業中の記録
各作業ステップごとに logs/ に Markdown ファイルを作成。
エラーが発生したら errors/ に記録。

### 3. プロジェクト終了時
全素材を README.md にまとめ、スクショへのリンクを挿入する。
```

**assets/step_template.md（作業ステップの記録フォーマット）:**

```markdown
## ステップ {{NUMBER}}: {{TITLE}}

**目的:** {{PURPOSE}}

**コマンド:**
```bash
{{COMMAND}}
```

**出力:**
```
{{OUTPUT}}
```

**解説:**
{{EXPLANATION}}
```

**出力されるフォルダ構成:**

```
blog-materials/nextjs-sanity-setup/
├── README.md              ← 完成したまとめドキュメント
├── logs/
│   ├── 001-setup.md       ← ステップ1のログ
│   ├── 002-install.md     ← ステップ2のログ
│   └── ...
├── screenshots/
│   ├── 001-initial.png
│   └── ...
└── errors/
    ├── error-001.md       ← エラーと解決方法
    └── ...
```

### 実例 ③ 技術ブログの執筆 Skill

blog-writer の技術者向けバリエーションです。構成パターンが複数あり、テーマに合わせて選択します。

**SKILL.md（抜粋）:**

```markdown
---
name: tech-blog-writer
description: 技術ブログの執筆支援スキル。実践した内容（スクショ・メモ・参照URL）を基に、カジュアルで読みやすい技術記事を対話的に作成する。ブログ記事を書きたい、記事のアウトラインを作りたい、技術記事を執筆したい、ブログ執筆を手伝ってほしい、という場合に使用する。
---

# Tech Blog Writer

## ワークフロー

### Step 1: 資料の収集
トピック、フォルダパス、参照URLを確認する。

### Step 3: 構成の検討
テーマに合わせた構成パターンを提案:

| パターン | 構成 | 適したテーマ |
|----------|------|--------------|
| チュートリアル型 | 導入→手順→まとめ | ツールの使い方 |
| 体験記型 | きっかけ→やったこと→躓き→学び | 新技術への挑戦 |
| 比較レビュー型 | 背景→比較軸→各ツール評価→結論 | ツール比較 |
| 問題解決型 | 課題→調査→解決策→結果 | エラー対応 |

### Step 4: 記事生成
references/style-guide.md に従い、カジュアルで読みやすい文体で記事を生成する。
```

### Skills を組み合わせた執筆フロー

3 つの Skill を組み合わせると、**素材収集 → 執筆** がシームレスにつながります。

```
/blog-collect start nextjs-sanity-setup   ← 作業しながら素材を自動収集
（作業中にスクショ、コマンドログ、エラーが自動記録される）
/blog-collect finish                      ← 素材をまとめ
「blog-materials/ の素材でブログを書いて」  ← blog-writer が自動で起動して執筆
```

### 自作 Skills のポイント

| ポイント | 説明 |
|---------|------|
| **description が命** | AI はこの説明文だけでスキルを使うか判断する。「いつ使うか」を具体的に書く |
| **references/ で知識を分離** | スタイルガイドやテンプレートは別ファイルに。SKILL.md 本体は手順だけにする |
| **scripts/ で自動化** | スクショ撮影やファイル生成は shell / Python スクリプトで自動化できる |
| **段階的に育てる** | 最初は SKILL.md だけの最小構成で始め、必要に応じて references / scripts を追加 |

---

## 4. Commands：定型ワークフローの自動化

短い定型操作は Commands で `/command` としてまとめます。

### ディレクトリ構成

```
.cursor/commands/
└── blog-publish.md     ← 記事の公開ワークフロー
```

### `/blog-publish` — 記事の公開

**ファイル**: `.cursor/commands/blog-publish.md`

```markdown
# ブログ記事の公開

blog/ フォルダの記事を GitHub にプッシュし、
Sanity Studio での投稿手順を案内してください。

## 手順

### Step 1: 変更ファイルの確認
git status で blog/ 内の新規・変更ファイルを確認する。

### Step 2: GitHub にプッシュ
以下のコマンドを実行する：
- git add blog/
- git commit -m "記事を追加: {記事のタイトル}"
- git push

実行前に .env.local が staging されていないことを必ず確認する。

### Step 3: Sanity Studio での投稿を案内
以下の手順をユーザーに伝える：
1. ブラウザで /studio を開く
2. Post → Create new Post をクリック
3. Title / Slug（Generate ボタンを押す） / Published At / Body を入力
4. Publish をクリック
5. 60 秒以内に公開サイトに反映される
```

**使い方**:

```
/blog-publish blog/my-new-article.md を公開して
```

> **Commands vs Skills の判断基準**: 「手順リストがあればそれで終わる」→ Commands。「大量の知識やテンプレートを参照する必要がある」→ Skills。

---

## 5. Rules：常時適用のルールブック

**Rules** は特定のファイルを触るたびに自動で適用されるルールです。

### ディレクトリ構成

```
.cursor/rules/
├── coding-style.md     ← TypeScript / React のルール
└── blog-format.md      ← ブログ記事のルール
```

### 例: コーディングスタイル

**ファイル**: `.cursor/rules/coding-style.md`

```markdown
---
globs: "*.tsx,*.ts"
---

- TypeScript strict モードを使用する
- コンポーネントは関数コンポーネントで書く
- Tailwind CSS のクラスを使い、インラインスタイルは避ける
- Server Component をデフォルトとし、必要な場合のみ 'use client' を使う
- 日本語のコメントは最小限に。コードで意図を伝える
```

### 例: 記事フォーマット

**ファイル**: `.cursor/rules/blog-format.md`

```markdown
---
globs: "blog/**/*.md"
---

- Front Matter に title, slug, publishedAt を必ず含める
- slug は半角英数字+ハイフンのみ
- publishedAt は YYYY-MM-DD 形式
- 本文は日本語で執筆する
- 見出しは ## から始める（# は使わない。Front Matter の title が h1 になるため）
```

### Rules を追加するタイミング

公式ドキュメントのベストプラクティスより：

> **「同じミスを AI が繰り返していると気づいたときにだけルールを追加する」**

最初からルールを大量に作る必要はありません。AI が slug に大文字を使ってしまう、Front Matter を忘れるなど、同じ問題が起きたときに追加していきましょう。

---

## 6. AGENTS.md：プロジェクトの基本方針

`AGENTS.md` はプロジェクトルートに置くだけで、**すべての会話で自動的に読み込まれる**ファイルです。

**ファイル**: `AGENTS.md`（プロジェクトルート）

```markdown
# The Literary Review — ブログサイト

## 技術スタック
- Next.js 16 (App Router) + TypeScript
- Sanity v5 (Headless CMS)
- Tailwind CSS v4
- Vercel にデプロイ

## プロジェクト構成
- `src/app/` — ページとレイアウト
- `src/sanity/` — Sanity スキーマとクライアント
- `blog/` — マークダウン記事のバックアップ
- `docs/` — 運用ドキュメント

## 記事の仕組み
- 記事データは Sanity に保存される（Git リポジトリではない）
- サイトは ISR（60 秒）で Sanity から最新データを取得する
- UI・コード変更のみ git push → Vercel 自動デプロイが必要

## 記事のフォーマット
blog/ のマークダウンファイルは以下の Front Matter を使用：
- title: "タイトル"（日本語OK）
- slug: url-slug（半角英数字+ハイフン）
- publishedAt: YYYY-MM-DD
```

---

## 7. Sanity CLI で記事投稿を自動化する（上級）

現在はマークダウン → Sanity Studio（ブラウザ）で手動投稿ですが、スクリプトで自動化することも可能です。

### 必要なパッケージ

```bash
npm install @sanity/client @portabletext/markdown
```

### 投稿スクリプトの概要

```
blog/article.md
    ↓  スクリプトが読み込み
Front Matter → title, slug, publishedAt を抽出
本文 → Portable Text（Sanity の形式）に変換
    ↓
Sanity API に POST → 記事が公開される
```

> **注意**: この自動化にはプログラミングの知識が必要です。まずは Sanity Studio での手動投稿に慣れてから挑戦してください。興味があれば Cursor の AI に「blog/ のマークダウンを Sanity に自動投稿するスクリプトを作って」と相談してみましょう。

---

# サイトの UI/UX を発展させる

---

## 8. Skills を活用した UI 改善

サイトの UI を変更するとき、Skills を使うとプロ品質のコードが書けます。

### vercel-react-best-practices

Vercel が公式に公開している Skills で、**10 年以上の React/Next.js 最適化ノウハウ**が 45 ルールにまとまっています。

```
AI が自動で参照するケース:
- 新しい React コンポーネントを書くとき
- データフェッチを実装するとき
- バンドルサイズの最適化を頼んだとき
- パフォーマンスレビューを依頼したとき
```

**特に効果が大きいルール:**

| カテゴリ | 影響度 | 例 |
|---------|--------|-----|
| ウォーターフォール排除 | CRITICAL | `Promise.all()` で並列フェッチ、Suspense でストリーミング |
| バンドルサイズ最適化 | CRITICAL | barrel import を避ける、`next/dynamic` で遅延読み込み |
| SSR パフォーマンス | HIGH | `React.cache()` でリクエスト単位の重複排除 |

### web-design-guidelines

Vercel の Web Interface Guidelines に準拠した UI レビューを実行します。

```
使い方:
「src/app/page.tsx の UI をレビューして」
  → 最新のガイドラインを取得して、ファイル:行番号 形式で指摘
```

### 活用のコツ

UI を変更するときは、以下の流れが効果的です：

```
① Cursor で UI 変更を指示する
      ↓
② vercel-react-best-practices が自動適用（パフォーマンス最適化）
      ↓
③ 「UI をレビューして」と指示
      ↓
④ web-design-guidelines が自動適用（デザイン品質チェック）
      ↓
⑤ 指摘を修正して完成
```

---

## 9. デザインの改善アイデア

サイトの見た目をさらに良くするアイデアです。Cursor の AI に指示するだけで実現できます。

### タイポグラフィの調整

| 改善 | Cursor への指示例 |
|------|------------------|
| 本文の行間を広げる | 「本文の line-height を 2.0 にして」 |
| 見出しのサイズ調整 | 「h2 の文字サイズをもう少し大きくして」 |
| フォントの変更 | 「本文のフォントをゴシック体メインに変えて」 |

### カラーパレットの変更

| 改善 | Cursor への指示例 |
|------|------------------|
| 背景色を変える | 「背景をもっと白に近い色にして」 |
| アクセントカラーを変える | 「リンクの色を青系に変えて」 |
| ダークモード対応 | 「ダークモードを追加して」 |

### レイアウトの改善

| 改善 | Cursor への指示例 |
|------|------------------|
| サイドバーの追加 | 「記事ページにサイドバーを追加して、目次を表示して」 |
| カード型レイアウト | 「トップページの記事一覧をカード型デザインに変えて」 |
| ヒーロー画像 | 「トップページにヒーロー画像エリアを追加して」 |

---

## 10. 機能の追加アイデア

ブログの使い勝手を向上させる機能を追加できます。

### 難易度：低（AI への指示だけで実現しやすい）

| 機能 | 説明 | Cursor への指示例 |
|------|------|------------------|
| **記事の目次** | 見出しから自動生成される目次 | 「記事ページに目次を自動生成して」 |
| **読了時間の表示** | 「約 5 分で読めます」 | 「記事の文字数から読了時間を計算して表示して」 |
| **トップへ戻るボタン** | スクロール後に表示されるボタン | 「スクロールしたらトップに戻るボタンを表示して」 |
| **SNS シェアボタン** | X（Twitter）などへの共有ボタン | 「記事ページに X のシェアボタンを追加して」 |

### 難易度：中（Sanity スキーマの変更が必要）

| 機能 | 説明 | 概要 |
|------|------|------|
| **カテゴリ・タグ** | 記事をカテゴリで分類 | Sanity スキーマに category フィールドを追加 |
| **アイキャッチ画像** | 記事のサムネイル画像 | Sanity スキーマに image フィールドを追加 |
| **関連記事** | 記事下に「関連する記事」を表示 | カテゴリ or タグで関連記事を GROQ で取得 |
| **著者プロフィール** | 記事下に著者情報を表示 | Sanity に author スキーマを追加 |

### 難易度：高（外部サービスとの連携が必要）

| 機能 | 説明 | 使うもの |
|------|------|---------|
| **コメント機能** | 読者がコメントを投稿できる | Giscus（GitHub Discussions ベース） |
| **ニュースレター** | メール配信の購読フォーム | Buttondown / Resend |
| **アクセス解析** | 訪問者数やページビュー | Vercel Analytics / Google Analytics |
| **サイト内検索** | 記事をキーワードで検索 | Algolia / Pagefind |

---

## 11. パフォーマンスの改善

サイトの表示速度を上げるための施策です。`vercel-react-best-practices` Skill が自動で最適なパターンを提案してくれます。

### 画像の最適化

```
Cursor への指示例:
「next/image を使って画像を最適化して。WebP 形式で配信されるようにして」
```

Next.js の `<Image>` コンポーネントは自動で画像を最適化（リサイズ、WebP 変換、遅延読み込み）します。

### フォントの最適化

```
Cursor への指示例:
「Google Fonts の読み込みを next/font に変更して、FOUT を防いで」
```

> **FOUT とは？** Flash of Unstyled Text の略。フォントの読み込み中に一瞬デフォルトフォントが表示される現象です。`next/font` を使うと防げます。

### PageSpeed Insights でチェック

[PageSpeed Insights](https://pagespeed.web.dev/) にサイトの URL を入力すると、改善すべきポイントを教えてくれます。結果を Cursor の AI に見せて「この指摘を修正して」と指示できます。

---

## 12. Cursor で UI 変更を行う手順

デザインや機能を変更したら、以下の手順で公開サイトに反映します。

```
① Cursor で変更を指示する
      ↓  （vercel-react-best-practices が自動適用）
② ローカルで確認（npm run dev → localhost:3000）
      ↓
③ 「UI をレビューして」と指示
      ↓  （web-design-guidelines が自動適用）
④ 指摘を修正
      ↓
⑤ GitHub にプッシュ → Vercel が自動ビルド（1〜3 分）
```

### 具体的なコマンド

```bash
# 1. ローカルで動作確認
npm run dev

# 2. ビルドエラーがないか確認
npm run build

# 3. 問題なければ GitHub にプッシュ
git add .
git commit -m "変更内容の説明"
git push
```

> **重要**: UI やデザインの変更は `git push` が必要です。記事の投稿・編集は Sanity だけで完結し、`git push` は不要です（[03-vercel-deploy.md](./03-vercel-deploy.md) の「ブログの仕組みを理解する」を参照）。

---

## 参考リンク

### Cursor 公式

- [Agent Best Practices](https://cursor.com/ja/blog/agent-best-practices) — エージェントのベストプラクティス
- [Skills ドキュメント](https://cursor.com/ja/docs/context/skills) — Skills 機能の公式ドキュメント
- [Rules ドキュメント](https://cursor.com/docs/context/rules) — Rules 機能の公式ドキュメント

### Skills の探し方・インストール

- [skills.sh](https://skills.sh) — Skills の検索・インストール
- [claude-plugins.dev/skills](https://claude-plugins.dev/skills) — Agent Skills ディレクトリ
- [awesome-agent-skills](https://github.com/VoltAgent/awesome-agent-skills) — コミュニティ製 Skills 集

### 解説記事

- [Skills・Rules・Commands の使い分け](https://zenn.dev/redamoon/articles/article38-cursor-skills-rules-commands)（日本語）
- [Vercel React Best Practices](https://vercel.com/blog/introducing-react-best-practices) — Vercel 公式 Skills の紹介

---

前のステップ ← [07-site-maintenance.md](./07-site-maintenance.md)
