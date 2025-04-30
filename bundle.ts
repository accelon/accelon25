import {sveltePlugin} from "./svelteplugin.ts"
await Bun.build({
    plugins:[sveltePlugin],
    entrypoints:['./src/index.ts'],
    outdir:'./dist',
    bundle:true,
    watch:true, //not working??
    format:'iife',
    // minify:true,
})
console.log('rebuild',new Date())
