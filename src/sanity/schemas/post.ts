// sanityというライブラリから、入力欄を定義するための「道具」を読み込みます
import type React from "react";
import type { BlockProps } from "sanity";
import { defineArrayMember, defineField, defineType } from "sanity";
import { BlockWithBoundary } from "../components/BlockWithBoundary";

// 「post（記事）」というデータの「設計図」を作ります
export default defineType({
  name: "post",        // プログラムがこのデータを識別するためのID（名前）
  title: "Post",       // 管理画面（Studio）の左側に表示されるメニュー名
  type: "document",    // これが「一つの独立した書類（記事）」であることを示します
  
  // ここからが、実際の入力項目（フィールド）のリストです
  fields: [
    // 1. タイトル入力欄
    defineField({
      name: "title",   // データの名前
      title: "Title",   // 管理画面に表示されるラベル名
      type: "string",  // 1行の短い文章を入力する形式
      validation: (rule) => rule.required(), // 「空っぽのまま公開しちゃダメ！」というルール
    }),

    // 2. スラッグ（URLの末尾部分）
    defineField({
      name: "slug",    // データの名前
      title: "Slug",   // 管理画面での表示名
      type: "slug",    // URL形式にするための特別な設定
      options: { source: "title" }, // 「タイトル」ボタンを押すと、タイトルから自動で作ってくれる設定
    }),

    // 3. 公開日時
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime", // カレンダーと時計から選べる入力形式
    }),

    // 4. 画像（アイキャッチ）
    defineField({
      name: "mainImage",
      title: "アイキャッチ画像",
      type: "image",    // 画像をアップロードできる形式
      options: { hotspot: true }, // アップした画像で「大事な部分（顔など）」を指定できる機能
    }),

    // 5. 本文（メインコンテンツ）
    defineField({
      name: "body",
      title: "Body",
      type: "array",    // 「ブロックの積み重ね」を許可する形式
      of: [
        defineArrayMember({
          type: "block",
          title: "テキスト",
          components: {
            block: BlockWithBoundary as unknown as React.ComponentType<BlockProps>,
          },
          styles: [
            { title: "通常", value: "normal" },
            { title: "見出し1", value: "h1" },
            { title: "見出し2", value: "h2" },
            { title: "見出し3", value: "h3" },
            { title: "引用", value: "blockquote" },
            { title: "罫線", value: "hr" },
          ],
        }),
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          title: "画像",
        }),
        defineArrayMember({ type: "youtube", title: "YouTube" }),
        defineArrayMember({ type: "fukidashi", title: "吹き出し" }),
        defineArrayMember({ type: "divider", title: "罫線" }),
        defineArrayMember({ type: "captionBox", title: "キャプションボックス" }),
        defineArrayMember({ type: "quoteBox", title: "引用ボックス" }),
      ],
    }),
  ],
});