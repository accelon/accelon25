// @bun
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
  const c = e.arg.boolean(2);
  console.log(`1First argument: ${a}`);
  console.log(`2Second argument: ${b}`);
  console.log(`3xxThird argument: ${c}`);
}
export {
  myBackendFunc,
  allEvents
};
