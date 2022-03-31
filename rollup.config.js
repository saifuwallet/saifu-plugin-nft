import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import autoprefixer from "autoprefixer";
import postcss from "rollup-plugin-postcss";
import tailwindcss from "tailwindcss";
import copy from "rollup-plugin-copy";

const isProd = process.env.NODE_ENV === "production";

export default {
  input: "main.tsx",
  output: {
    dir: "dist",
    sourcemap: !isProd && "inline",
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
    typescript({
      declaration: !isProd,
    }),
    copy({
      targets: [{ src: "./manifest.json", dest: "./dist" }],
    }),
  ],
};
