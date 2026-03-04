import { defineField, defineType } from "sanity";

export default defineType({
  name: "captionBox",
  type: "object",
  title: "キャプションボックス",
  fields: [
    defineField({
      name: "content",
      type: "text",
      title: "テキスト",
      rows: 4,
    }),
  ],
  preview: {
    select: { content: "content" },
    prepare({ content }) {
      const text = content ? content.slice(0, 40) + (content.length > 40 ? "…" : "") : "テキストを入力";
      return {
        title: text,
        subtitle: "キャプションボックス",
      };
    },
  },
});
