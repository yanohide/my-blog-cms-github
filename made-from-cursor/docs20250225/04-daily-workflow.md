# Step 4: 日常の記事運用をはじめる

サイトが公開できたら、あとは記事を書いて投稿するサイクルを回すだけです。**Obsidian でネタを集め、Cursor で記事を書き、Cursor から Sanity にアップロードする**——この流れを身につけましょう。

---

## 目次

1. [日常ワークフローの全体像](#1-日常ワークフローの全体像)
2. [Obsidian でネタ集め・アウトライン作成](#2-obsidian-でネタ集めアウトライン作成)
3. [Cursor で記事を執筆する](#3-cursor-で記事を執筆する)
4. [Cursor から GitHub プッシュ + Sanity アップロード](#4-cursor-から-github-プッシュ--sanity-アップロード)
5. [サイトで記事を確認する](#5-サイトで記事を確認する)
6. [記事の編集・削除](#6-記事の編集削除)
7. [Obsidian のおすすめ設定](#7-obsidian-のおすすめ設定)
8. [Cursor のおすすめ設定](#8-cursor-のおすすめ設定)
9. [運用サイクルのまとめ](#9-運用サイクルのまとめ)

---

## 1. 日常ワークフローの全体像

```
┌─────────────┐      ┌─────────────┐      ┌─────────────┐
│   Obsidian   │      │   Cursor     │      │    サイト     │
│  ネタ集め     │ ───▶ │  記事を書く   │ ───▶ │   自動反映    │
│  アウトライン  │      │  AI に操作を  │      │  (最大60秒)   │
│  調査メモ    │      │  任せる      │      │              │
└─────────────┘      └─────────────┘      └─────────────┘
   考える場             作る場+操作する場        公開される場
```

```
① Obsidian: ネタを見つけてアウトラインを書く
      ↓
② Cursor: アウトラインを元にマークダウンで記事を執筆
      ↓
③ Cursor: AI に「GitHub にプッシュして、Sanity にアップロードして」と指示
      ↓
④ サイトに自動反映（最大 60 秒）
```

> **ポイント**: GitHub プッシュも Sanity 投稿も CLI（コマンド操作）で完結します。Cursor の AI にコマンド実行を任せれば、ブラウザで管理画面を開く必要はありません。

---

## 2. Obsidian でネタ集め・アウトライン作成

### Obsidian とは

マークダウン形式でメモを書き、メモ同士をリンクで結べるナレッジ管理アプリです。ダウンロード：[https://obsidian.md](https://obsidian.md)

### Vault（保管庫）のフォルダ構成例

```
Blog-Vault/
├── 00-Inbox/          ← Web Clipper の保存先、一時メモ
├── 01-Ideas/          ← ブログネタ帳
├── 02-Research/       ← 調査・読書メモ
├── 03-Outlines/       ← 記事のアウトライン
├── 04-Published/      ← 公開済み記事の振り返り
└── Templates/         ← テンプレート
```

### ネタメモのテンプレート

```markdown
---
tags: [blog/idea]
created: {{date}}
---

# タイトル案

## 何について書くか
-

## 読者にとっての価値
-

## キーポイント（3つ程度）
1.
2.
3.

## 参考リンク
-
```

### アウトラインのテンプレート

```markdown
---
tags: [blog/outline]
target-slug: article-slug-here
---

# 記事タイトル案

## リード文（冒頭 2〜3 文）

## セクション 1: 〇〇
- ポイント:
- 具体例:

## セクション 2: 〇〇
- ポイント:
- 具体例:

## まとめ
```

### Web Clipper で情報収集

1. Chrome に [Obsidian Web Clipper](https://chromewebstore.google.com/detail/obsidian-web-clipper/cnjifjpddelmedmihgijeibhnjfabmlf) をインストール
2. 気になった記事をクリップ → `00-Inbox/` に保存
3. 後で読み返してブログネタに昇華する

---

## 3. Cursor で記事を執筆する

### 記事ファイルの作成

Cursor でプロジェクトフォルダを開き、`blog/` に新しいマークダウンファイルを作成します。

```markdown
---
title: "記事のタイトル"
slug: article-slug
publishedAt: 2026-02-12
---

Obsidian で作ったアウトラインを元に本文を展開する。
```

| 項目 | ルール |
|------|-------|
| `title` | 日本語 OK。ダブルクォーテーションで囲む |
| `slug` | URL に使う文字列。半角英数字 + ハイフン |
| `publishedAt` | `YYYY-MM-DD` 形式（Sanity 側は datetime 型。時刻は自動補完されます） |
| ファイル名 | `.md` で終わる。日本語 OK。スペースは使わない |

### AI を活用した執筆

Cursor の AI チャット（`Cmd+L` / `Ctrl+L`）で記事を推敲できます。

| やりたいこと | 指示例 |
|------------|--------|
| 下書きを書く | 「このアウトラインを元にブログ記事を書いて」 |
| 文章の推敲 | 「この段落をもっと読みやすくリライトして」 |
| 導入文の作成 | 「読者を引き込むリード文を書いて」 |
| 校正 | 「誤字脱字と不自然な表現をチェックして」 |

---

## 4. Cursor から GitHub プッシュ + Sanity アップロード

### おすすめ：AI に一括で任せる

Cursor の AI チャット（`Cmd+L`）に以下のように指示するだけです。

```
「blog/my-new-article.md を GitHub にプッシュして、Sanity にもアップロードして」
```

AI が以下を実行してくれます：
- `git add` → `git commit` → `git push`（GitHub バックアップ）
- `@sanity/client` + `@portabletext/markdown` を使って、マークダウンを Portable Text に変換し Sanity API 経由で投稿

### 手動で行う場合：GitHub プッシュ

```bash
git add blog/my-new-article.md
git commit -m "記事を追加: 記事タイトル"
git push
```

### 手動で行う場合：Sanity Studio で投稿

1. ブラウザで `/studio` を開く
2. **Post** → **Create new Post**
3. Title / Slug（Generate） / Published At / Body を入力
4. **Publish** をクリック

> Sanity Studio でのブラウザ操作は、CLI が使えない場合のフォールバックです。**基本は Cursor の AI に CLI 操作を任せましょう。**

---

## 5. サイトで記事を確認する

1. 公開サイト（`https://あなたのサイト.vercel.app`）を開きます
2. 記事の一覧に新しい記事が表示されていることを確認します
3. 記事をクリックして内容が正しく表示されることを確認します

> 反映に最大 60 秒かかります。表示されない場合はページを再読み込み（`Cmd+R`）してください。

---

## 6. 記事の編集・削除

### 編集

Cursor の AI に指示するのが最も簡単です：

```
「blog/my-article.md のタイトルを『〇〇』に変更して、Sanity も更新して」
```

手動で行う場合は Sanity Studio（`/studio`）で記事を開いて編集 → **Publish** をクリックします。

### 削除

Sanity Studio で記事を開き、**「⋯」** → **「Delete」** → **「Delete now」** をクリックします。

> `blog/` フォルダのマークダウンファイルはバックアップとして残しておくことを推奨します。

---

## 7. Obsidian のおすすめ設定

### コアプラグイン

| プラグイン | 用途 |
|-----------|------|
| **Daily Notes** | 日々の気づきやブログネタの記録 |
| **Templates** | ネタメモ・アウトラインのテンプレート |
| **Tags** | `#blog/idea` `#blog/draft` でフィルタリング |

### コミュニティプラグイン

| プラグイン | 用途 |
|-----------|------|
| **Templater** | 日付挿入など高度なテンプレート |
| **Dataview** | ブログネタの一覧やステータス管理 |
| **Calendar** | カレンダーからデイリーノートにアクセス |
| **Kanban** | 記事の進捗管理（ネタ → 下書き → 公開） |

### タグ設計

```
#blog/idea      — ブログネタ
#blog/outline   — アウトライン作成済み
#blog/writing   — 執筆中
#blog/published — 公開済み
```

---

## 8. Cursor のおすすめ設定

### よく使うショートカット

| 操作 | ショートカット |
|------|-------------|
| AI チャット | `Cmd+L` / `Ctrl+L` |
| インライン AI 編集 | `Cmd+K` / `Ctrl+K` |
| ターミナル表示 | `` Ctrl+` `` |
| ファイル検索 | `Cmd+P` / `Ctrl+P` |

### AI への定番指示

| 場面 | 指示例 |
|------|--------|
| 記事の投稿 | 「blog/ の新しい記事を GitHub にプッシュして Sanity にアップロードして」 |
| サイト確認 | 「npm run build でエラーがないか確認して」 |
| パッケージ更新 | 「npm パッケージを最新に更新して」 |
| トラブル対応 | 「以下のエラーの原因と対処法を教えて：[エラーメッセージ]」 |

---

## 9. 運用サイクルのまとめ

### 日常（記事を書くとき）

```
Obsidian でネタをメモ → アウトラインを作成
      ↓
Cursor で blog/ にマークダウン記事を作成
      ↓
Cursor の AI に「プッシュ＆アップロード」を指示
      ↓
サイトで確認（60秒以内に反映）
```

### 週に 1 回（15 分程度）

- Obsidian の `00-Inbox/` を整理する
- ネタ帳を見返して次に書く記事を決める
- サイトの表示確認

### 月に 1 回（30 分程度）

- パッケージの更新確認（[07-site-maintenance.md](./07-site-maintenance.md) 参照）
- Vercel のデプロイ状況確認
- Obsidian の知識ベースとブログ記事の棚卸し

---

前のステップ ← [Step 3: ブログサイトを Web で公開する](./03-vercel-deploy.md)
運用ガイド → [05-daily-operations.md](./05-daily-operations.md) | [06-troubleshooting.md](./06-troubleshooting.md) | [07-site-maintenance.md](./07-site-maintenance.md)
