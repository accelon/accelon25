import type { BunPlugin } from "bun";
console.error('Bun plugin loaded');
export const sveltePlugin: BunPlugin ={
  name: "svelte loader",
  async setup(build) {
    const { compile } = await import("svelte/compiler");
    // when a .svelte file is imported...
    build.onLoad({ filter: /\.svelte$/ }, async ({ path }) => {

      // read and compile it with the Svelte compiler
      const file = await Bun.file(path).text();
      const contents = compile(file, {
        filename: path,
        generate: "client",
      }).js.code;

      // and return the compiled source code as "js"
      return {
        contents,
        loader: "js",
      };
    });
  },
};