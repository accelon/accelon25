// @bun
// ../ptk/zip/utils.ts
var makeUint8Array = (thing) => new Uint8Array(thing.buffer || thing);
var wasm = "AGFzbQEAAAABCgJgAABgAn9/AXwDAwIAAQUDAQACBwkCAW0CAAFjAAEIAQAKlQECSQEDfwNAIAEhAEEAIQIDQCAAQQF2IABBAXFBoIbi7X5scyEAIAJBAWoiAkEIRw0ACyABQQJ0IAA2AgAgAUEBaiIBQYACRw0ACwtJAQF/IAFBf3MhAUGAgAQhAkGAgAQgAGohAANAIAFB/wFxIAItAABzQQJ0KAIAIAFBCHZzIQEgAkEBaiICIABJDQALIAFBf3O4Cw";
var instance = new WebAssembly.Instance(new WebAssembly.Module(Uint8Array.from(atob(wasm), (c) => c.charCodeAt(0))));
var { c, m } = instance.exports;
var pageSize = 65536;
var crcBuffer = makeUint8Array(m).subarray(pageSize);

// ../ptk/zip/zipstore.ts
class ZipStore {
  zipbuf;
  files;
  zipStart;
  constructor(zipbuf) {
    if (zipbuf instanceof ArrayBuffer) {
      zipbuf = new Uint8Array(zipbuf);
    }
    this.zipbuf = zipbuf instanceof Uint8Array ? zipbuf : new Uint8Array(zipbuf.buffer);
    this.files = [];
    this.zipStart = 0;
    const { fileCount, centralSize, centralOffset } = this.loadEndRecord();
    if (fileCount) {
      this.loadFiles(fileCount, centralSize, centralOffset);
    }
  }
  loadFiles(fileCount, centralSize, centralOffset) {
    const coffset = this.zipbuf.length - 22 /* endLength */ - centralSize;
    const buf = new DataView(this.zipbuf.buffer);
    let p = coffset;
    for (let i = 0;i < fileCount; i++) {
      const signature = buf.getUint32(p);
      if (signature !== 1347092738 /* centralHeaderSignature */) {
        break;
      }
      const size = buf.getUint32(p + 20, true);
      const namelen = buf.getUint16(p + 28, true);
      const extra = buf.getUint16(p + 30, true);
      const commentlen = buf.getUint16(p + 32, true);
      let offset = buf.getUint32(p + 42, true);
      p += 46 /* centralHeaderLength */;
      const encodedName = this.zipbuf.subarray(p, p + namelen);
      const name = new TextDecoder().decode(encodedName);
      p += namelen;
      p += extra + commentlen;
      if (i === 0)
        this.zipStart = offset;
      offset += 30 /* fileHeaderLength */ + namelen;
      let content;
      const inbuf = centralOffset - coffset;
      if (offset - inbuf >= 0) {
        content = this.zipbuf.subarray(offset - inbuf, offset - inbuf + size);
      }
      this.files.push({ name, offset, size, content });
    }
  }
  find(name) {
    for (let i = 0;i < this.files.length; i++) {
      if (this.files[i].name == name) {
        return this.files[i];
      }
    }
  }
  loadEndRecord() {
    const endRecord = { signature: 0, fileCount: 0, centralSize: 0, centralOffset: 0 };
    const buf = new DataView(this.zipbuf.buffer);
    const endpos = this.zipbuf.length - 22 /* endLength */;
    endRecord.signature = buf.getUint32(endpos);
    if (endRecord.signature !== 1347093766 /* endSignature */) {
      console.log("endrecord signature", endRecord.signature, "zipbuf length", this.zipbuf.length);
      throw "wrong endRecord signature";
      return endRecord;
    }
    endRecord.fileCount = buf.getUint16(endpos + 8, true);
    endRecord.centralSize = buf.getUint32(endpos + 12, true);
    endRecord.centralOffset = buf.getUint32(endpos + 16, true);
    return endRecord;
  }
}

// ../ptk/linebase/loadpage.ts
var pagefilename = (page) => page.toString().padStart(3, "0") + ".js";

// src/ptkpool.ts
import { readFile } from "fs/promises";
import { existsSync } from "fs";
var pool = {};
var getPtkPage = async (e) => {
  const name = e.arg.string(0);
  const page = e.arg.string(1);
  console.log("getPtkPage", name, page);
  if (!pool[name]) {
    if (!existsSync(name + ".ptk")) {
      console.error(name, "not found");
      return;
    }
    const buffer = await readFile(name + ".ptk");
    pool[name] = new ZipStore(buffer);
  }
  let fname = "";
  if (parseInt(page).toString() == page) {
    fname = name + "/" + pagefilename(parseInt(page));
  } else {
    fname = name + "/" + page;
  }
  const f = pool[name].find(fname);
  return f && f.content;
};

// src/backend.ts
async function allEvents(e) {
  console.log(`
allEvents: window = '${e.window}'`);
  console.log(`allEvents: eventType = '${e.eventType}'`);
  console.log(`allEvents: element = '${e.element}'`);
}
async function myBackendFunc(e) {
  const a = e.arg.number(0);
  const b = e.arg.string(1);
  const c2 = e.arg.boolean(2);
  console.log(`1First argument: ${a}`);
  console.log(`2Second argument: ${b}`);
  console.log(`3xxThird argument: ${c2}`);
}
export {
  myBackendFunc,
  getPtkPage,
  allEvents
};
