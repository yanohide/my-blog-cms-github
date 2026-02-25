# Step 1: Cursor でブログサイトを構築してローカルで動かす

このステップでは、**Cursor の AI に設計書を読み込ませてブログサイトのコードを生成**し、自分のパソコン上で動かせるようにします。ゴールは `http://localhost:3000` でオリジナルのブログサイトが表示されることです。

---

## 目次

### Part A: Cursor でサイトを構築する

1. [Next.js プロジェクトを作成する](#1-nextjs-プロジェクトを作成する)
2. [設計書を Cursor に読み込ませてコーディング](#2-設計書を-cursor-に読み込ませてコーディング)
3. [生成されたコードの確認](#3-生成されたコードの確認)

### Part B: Sanity をセットアップしてローカルで動かす

4. [Sanity のアカウント登録とプロジェクト作成](#4-sanity-のアカウント登録とプロジェクト作成)
5. [Project ID の確認と API トークンの発行](#5-project-id-の確認と-api-トークンの発行)
6. [CORS Origins の設定](#6-cors-origins-の設定)
7. [.env.local に設定値を記入](#7-envlocal-に設定値を記入)
8. [開発サーバーを起動する（npm run dev）](#8-開発サーバーを起動するnpm-run-dev)
9. [ここまでの確認](#9-ここまでの確認)
10. [よくあるトラブルと対処](#10-よくあるトラブルと対処)

---

# Part A: Cursor でサイトを構築する

---

## 1. Next.js プロジェクトを作成する

まず、ブログサイトの土台となるプロジェクトを作成します。

### Cursor を起動してターミナルを開く

1. Cursor を起動します
2. `` Ctrl+` ``（バッククォート）を押してターミナルを開きます
3. プロジェクトを作りたい場所に移動します（例：デスクトップ）

```bash
cd ~/Desktop
```

### プロジェクトを作成する

以下のコマンドを実行します。いくつか質問されるので、そのまま Enter を押していけば OK です。

```bash
npx create-next-app@latest my-blog --typescript --tailwind --eslint --app --src-dir
```

> **このコマンドは何をしている？**
> `create-next-app` は、ブログサイトのひな形（テンプレート）を自動作成するツールです。TypeScript、Tailwind CSS、ESLint などの基本設定が含まれたプロジェクトフォルダが生成されます。

### Cursor でプロジェクトを開く

```bash
cd my-blog
```

Cursor のメニューから **File** → **Open Folder** で、作成した `my-blog` フォルダを開きます。

### 追加パッケージをインストールする

Sanity（記事管理）との連携に必要なパッケージを追加します。

```bash
npm install next-sanity sanity @portabletext/react @tailwindcss/typography
```

---

## 2. 設計書を Cursor に読み込ませてコーディング

ここが一番のポイントです。**自分でコードを書く必要はありません。** Cursor の AI に設計書を渡して、コードを生成させます。

### 設計書をプロジェクトにコピーする

このリポジトリの `docs/design-spec.md` が設計書です（[design-spec.md](./design-spec.md)）。この設計書をプロジェクト内にコピーしてください。

### Cursor の AI チャットで指示する

Cursor の AI チャット（`Cmd+L` / `Ctrl+L`）を開き、以下のように指示します。

```
design-spec.md を読んで、この設計書に従ってブログサイトを構築してください。
以下のファイルを作成・編集してください：

1. src/sanity/schemas/post.ts — Post スキーマ
2. src/sanity/schemas/index.ts — スキーマエクスポート
3. src/sanity/lib/client.ts — Sanity クライアント
4. src/sanity/lib/queries.ts — GROQ クエリ
5. sanity.config.ts — Sanity 設定
6. sanity.cli.ts — Sanity CLI 設定
7. src/app/studio/[[...tool]]/page.tsx — Sanity Studio ページ
8. src/app/globals.css — テーマ・デザイン定義
9. src/app/layout.tsx — ルートレイアウト（ヘッダー・フッター）
10. src/app/page.tsx — トップページ（記事一覧）
11. src/app/posts/[slug]/page.tsx — 記事詳細ページ
12. postcss.config.mjs — PostCSS 設定
13. vercel.json — Vercel 設定
```

> **ポイント**: Cursor の AI はファイルの作成・編集を提案してくれます。提案内容を確認して **「Accept」** をクリックするだけです。

### もっとシンプルに指示する場合

上記が長いと感じたら、以下のように一言で指示してもOKです。

```
design-spec.md の設計書に従ってブログサイトを構築して。
全ファイルを作成してください。
```

AI が設計書を読み込み、必要なファイルを順番に生成してくれます。

### デザインを自分好みにカスタマイズしたい場合

設計書のデザイン（色、フォント、レイアウト）をベースに、好みに合わせて変更できます。

```
例: 「背景色をもっと白くして」
例: 「フォントをゴシック体メインにして」
例: 「ヘッダーのデザインをもっとシンプルにして」
```

> **設計書（design-spec.md）の内容**: サイト名、カラーパレット、フォント、アニメーション、Sanity スキーマ、ルーティング構成、コンポーネント設計、データフロー図などがすべて記載されています。Cursor の AI はこれを読んでコードを生成します。

---

## 3. 生成されたコードの確認

AI がコードを生成したら、以下のファイル・フォルダが存在するか確認します。

```
my-blog/
├── src/
│   ├── app/
│   │   ├── layout.tsx          ← ヘッダー・フッター
│   │   ├── page.tsx            ← トップページ
│   │   ├── globals.css         ← デザイン定義
│   │   ├── posts/
│   │   │   └── [slug]/
│   │   │       └── page.tsx    ← 記事詳細ページ
│   │   └── studio/
│   │       └── [[...tool]]/
│   │           └── page.tsx    ← Sanity Studio
│   └── sanity/
│       ├── lib/
│       │   ├── client.ts       ← Sanity クライアント
│       │   └── queries.ts      ← GROQ クエリ
│       └── schemas/
│           ├── index.ts        ← スキーマエクスポート
│           └── post.ts         ← Post スキーマ
├── sanity.config.ts            ← Sanity 設定
├── sanity.cli.ts               ← Sanity CLI 設定
├── postcss.config.mjs          ← PostCSS 設定
└── vercel.json                 ← Vercel 設定
```

> **ファイルが足りない場合**: Cursor の AI に「〇〇 ファイルがまだ作成されていません。作成してください」と指示してください。
>
> **参考**: `docs/src-reference/` フォルダに完成版のソースコード一式を用意しています。AI が生成したコードと見比べたり、そのままコピーして使うこともできます。

---

# Part B: Sanity をセットアップしてローカルで動かす

コードが揃ったら、記事データの保管先（Sanity）をセットアップします。

---

## 4. Sanity のアカウント登録とプロジェクト作成

**Sanity（サニティ）** は、ブログ記事のデータを保管する倉庫です。

### アカウント登録

1. ブラウザで [https://www.sanity.io](https://www.sanity.io) を開きます
2. 画面右上の **「Get started」** または **「Sign up」** をクリックします
3. **「Continue with Google」** をクリックして、Google アカウントでログインします
4. 利用規約に同意し、登録を完了します

### プロジェクト作成

1. **「Create new project」** をクリックします
2. **Project name** に好きな名前を入力します（例：`My Blog`）
3. プランは **「Free」**（無料）を選択します
4. **「Create project」** をクリックします

> 無料プランで十分です。個人ブログで有料プランにする必要はありません。

---

## 5. Project ID の確認と API トークンの発行

### Project ID の確認

1. [https://www.sanity.io/manage](https://www.sanity.io/manage) を開きます
2. 作成したプロジェクトをクリックします
3. 画面に **Project ID** が表示されています（例：`abc12345`）
4. この ID をメモ帳などにコピーしておきます

**Dataset** はデフォルトの `production` をそのまま使います。変更不要です。

### API トークンの発行

**API トークン** は、ブログサイトが Sanity からデータを受け取るための「合言葉」です。

1. 同じ管理画面で **「Settings」** → **「API」** をクリックします
2. **「Tokens」** セクションで **「Add API token」** をクリックします
3. 以下を入力します：
   - **Name**: `Blog Token`
   - **Permissions**: **「Editor」** を選択
4. **「Save」** をクリックします
5. 表示されたトークン（長い英数字の文字列）を**必ずコピーして保存**します

> **重要**: トークンは一度しか表示されません。忘れた場合は新しいトークンを作り直せば OK です。
>
> **なぜ Editor 権限？** サイトが記事を表示するだけなら Viewer（読み取り専用）でも動きますが、Step 4 以降で Cursor の CLI から記事を投稿したり画像をアップロードするには書き込み権限が必要です。最初から Editor にしておけば後から作り直す手間がなくなります。

---

## 6. CORS Origins の設定

**CORS** は「どのサイトから Sanity のデータにアクセスしてよいか」を決めるセキュリティ設定です。

1. [https://www.sanity.io/manage](https://www.sanity.io/manage) でプロジェクトを開きます
2. **「Settings」** → **「API」** → **「CORS origins」** セクション
3. **「Add CORS origin」** をクリックし、以下を追加します：

| Origin                  | Allow credentials |
| ----------------------- | ----------------- |
| `http://localhost:3000` | ✅ チェックする          |

> Vercel の URL は Step 3 で追加します。今は `localhost` だけで OK です。

---

## 7. .env.local に設定値を記入

`.env.local` は秘密の設定値を保存するファイルです。

1. プロジェクトフォルダ内の `.env.local` ファイルを開きます（なければ新規作成）
2. 以下の 3 行を記入します：

```
NEXT_PUBLIC_SANITY_PROJECT_ID=ここにProject IDを入れる
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=ここにAPIトークンを入れる
```

**入力例：**

```
NEXT_PUBLIC_SANITY_PROJECT_ID=abc12345
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=skXXXXXXXXXXXXXXXX
```

> **注意**: `=` の前後にスペースを入れないでください。

---

## 8. 開発サーバーを起動する（npm run dev）

いよいよブログサイトを動かします。

```bash
npm run dev
```

以下のようなメッセージが表示されれば成功です：

```
  ▲ Next.js 16.x.x
  - Local:        http://localhost:3000
```

ブラウザで **`http://localhost:3000`** を開いてみましょう。

> **エラーが出た場合**: Cursor の AI に「npm run dev でエラーが出ました。修正してください」とエラーメッセージを貼り付けて相談してください。AI がコードを修正してくれます。

---

## 9. ここまでの確認

以下がすべてクリアできていれば、Step 1 完了です！

- [x] Cursor の AI で設計書を読み込ませてコードを生成した
- [x] `http://localhost:3000` でサイトのトップページが表示される
- [x] `http://localhost:3000/studio` で Sanity Studio（管理画面）が表示される
- [x] Sanity Studio に Google アカウントでログインできる

> **記事がまだ無いので「No articles yet.」と表示されるのは正常です。** 記事の作成は Step 2 で行います。

---

## 10. よくあるトラブルと対処

### 「npm: command not found」と表示される

Node.js がインストールされていません。[https://nodejs.org](https://nodejs.org) から LTS 版をダウンロードしてインストールしてください。インストール後、ターミナルを一度閉じて開き直してください。

### 「Port 3000 is already in use」と表示される

すでに別のプログラムが 3000 番を使っています。別のポートで起動できます：

```bash
npm run dev -- -p 3001
```

→ `http://localhost:3001` でアクセスしてください。

### npm run dev でエラーが出る

Cursor の AI にエラーメッセージをそのまま貼り付けて相談してください。

```
「以下のエラーが出ています。修正してください：
[エラーメッセージをここに貼り付け]」
```

AI がコードの問題を特定して修正してくれます。これが Cursor を使う最大のメリットです。

### `.env.local` が見つからない

名前がドット（`.`）で始まるファイルは「隠しファイル」です。

- **Mac**: Finder で `Cmd + Shift + .` を押すと表示されます
- **Cursor**: ファイルエクスプローラーにはデフォルトで表示されます

---

次のステップ → [Step 2: サンプル記事を作って GitHub と連携する](./02-article-and-github.md)
