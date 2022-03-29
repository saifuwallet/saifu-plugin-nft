import typescript from "@rollup/plugin-typescript";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import postcss from "rollup-plugin-postcss";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";

export default {
  input: "main.tsx",
  output: {
    dir: "dist",
    sourcemap: "inline",
    format: "system",
    exports: "default",
  },
  external: ["saifu", "react", "react-dom"],
  plugins: [
    commonjs(),

    postcss({
      inject: true,
      minimize: true,
      plugins: [
        new tailwindcss({
          content: ["./*/**.{js,jsx,ts,tsx}"],
          theme: {
            extend: {},
          },
          variants: {},
          plugins: [],
          corePlugins: {
            preflight: false,
          },
        }),
        new autoprefixer(),
      ],
    }),
    nodeResolve({
      browser: true,
      ignoreGlobal: false,
      include: ["node_modules/**"],
      skip: ["saifu", "react", "react-dom"],
    }),
    typescript({}),
  ],
};
