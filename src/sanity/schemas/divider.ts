import { defineType } from "sanity";

export default defineType({
  name: "divider",
  type: "object",
  title: "罫線",
  fields: [
    {
      name: "placeholder",
      type: "string",
      hidden: true,
      initialValue: "divider",
    },
  ],
  preview: {
    prepare() {
      return {
        title: "─── 罫線 ───",
        subtitle: "区切り線",
      };
    },
  },
});
