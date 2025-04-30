import {sveltePlugin} from "./svelteplugin.ts"
await Bun.build({
    entrypoints:['./src/index.ts'],
    outdir:'./dist',
    bundle:true,
    format:'iife',
    generate:'dom',
    plugins:[sveltePlugin]
})