import terser from "@rollup/plugin-terser";
import { readFileSync } from "fs";

const meta = JSON.parse(readFileSync("./package.json", "utf8"));

const config = {
  input: "src/index.js",
  external: ['d3-array', 'd3-hierarchy', 'd3-shape'],
  output: {
    file: `dist/${meta.name}.js`,
    name: "d3",
    format: "umd",
    indent: false,
    extend: true,
    banner: `// ${meta.homepage} v${meta.version} Copyright ${(new Date).getFullYear()} ${meta.author.name}`,
    globals: { 'd3-array': 'd3', 'd3-hierarchy': 'd3', 'd3-shape': 'd3', 'd3-scale': 'd3' },
    sourcemap: true
  },
  plugins: []
};

export default [
  config,
  {
    ...config,
    output: {
      ...config.output,
      file: `dist/${meta.name}.esm.js`,
      format: "esm"
    }
  },
  {
    ...config,
    output: {
      ...config.output,
      file: `dist/${meta.name}.min.js`
    },
    plugins: [
      terser({
        output: {
          preamble: config.output.banner
        }
      })
    ]
  }
];
