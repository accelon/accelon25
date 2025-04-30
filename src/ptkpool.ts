const pool={};
import {ZipStore} from "ptk/zip/zipstore.ts"
import {pagefilename} from "ptk/linebase/loadpage.ts"
import {readFile} from "fs/promises";
import { existsSync } from "fs";
export const getPtkPage=async (e)=>{
    const name = e.arg.string(0); // First argument
    const page = e.arg.string(1); // Second argument

    console.log('getPtkPage',name,page)
    if (!pool[name]) {
        if (!existsSync(name+".ptk")) {
            console.error(name,"not found");
            return;
        }
        const buffer=await readFile(name+".ptk");
        pool[name]=new ZipStore(buffer);
    }

    let fname='';
    if (parseInt(page).toString()==page) {
        fname=name+'/'+pagefilename(parseInt(page));
    } else {
        fname=name+'/'+page;
        
    }
    const f=pool[name].find(fname);
    return f&&f.content;
}