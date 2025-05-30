import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default () => {
  return defineConfig({
    root: ".",
    base: "",
    plugins: [
      reactRefresh(),
      {
        name: "override-config",
        config: () => ({
          build: {
            target: "esnext",
          },
        }),
      },
    ],
  });
};
