import { defineCliConfig } from "sanity/cli";

export default defineCliConfig({
  api: {
    projectId: "pumgsg9s", // Replace with your actual project ID
    dataset: "production", // Replace with your dataset name
  },

  autoUpdates: true,
});
