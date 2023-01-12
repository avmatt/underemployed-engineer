import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";

export default defineConfig({
  site: "https://underemployed.engineer",
  integrations: [
    tailwind({
      config: {
        applyBaseStyles: false,
      },
    }),
  ],
});
