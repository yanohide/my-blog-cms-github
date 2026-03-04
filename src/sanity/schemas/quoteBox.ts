import { defineField, defineType } from "sanity";

export default defineType({
  name: "quoteBox",
  type: "object",
  title: "引用ボックス",
  fields: [
    defineField({
      name: "content",
      type: "text",
      title: "引用テキスト",
      rows: 4,
    }),
    defineField({
      name: "source",
      type: "string",
      title: "出典（任意）",
      description: "例：著者名、書籍名、URLなど",
    }),
  ],
  preview: {
    select: { content: "content", source: "source" },
    prepare({ content, source }) {
      const text = content ? content.slice(0, 30) + (content.length > 30 ? "…" : "") : "引用を入力";
      return {
        title: text,
        subtitle: source ? `出典: ${source}` : "引用ボックス",
      };
    },
  },
});
