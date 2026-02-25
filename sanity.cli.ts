import { defineCliConfig } from "sanity/cli";

export default defineCliConfig({
  api: {
    projectId: "<Project ID>",
    dataset: "production",
  },
});
