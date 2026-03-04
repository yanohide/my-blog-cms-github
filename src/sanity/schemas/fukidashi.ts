import { defineField, defineType } from "sanity";

export default defineType({
  name: "fukidashi",
  type: "object",
  title: "吹き出し",
  fields: [
    defineField({
      name: "characterName",
      type: "string",
      title: "キャラクター名",
    }),
    defineField({
      name: "dialogue",
      type: "text",
      title: "セリフ",
      rows: 3,
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { characterName: "characterName", dialogue: "dialogue" },
    prepare({ characterName, dialogue }) {
      const name = characterName ? `${characterName}：` : "";
      const text = dialogue ? dialogue.slice(0, 30) + (dialogue.length > 30 ? "…" : "") : "セリフを入力";
      return {
        title: `${name}${text}`,
        subtitle: "吹き出し",
      };
    },
  },
});
