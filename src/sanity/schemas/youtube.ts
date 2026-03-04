import { defineField, defineType } from "sanity";

export default defineType({
  name: "youtube",
  type: "object",
  title: "YouTube",
  fields: [
    defineField({
      name: "url",
      type: "url",
      title: "YouTubeのURL",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { url: "url" },
    prepare({ url }) {
      return {
        title: url || "YouTube URLを入力",
        subtitle: "YouTube",
      };
    },
  },
});
