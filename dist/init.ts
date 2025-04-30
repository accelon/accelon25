// run by bun
import { WebUI } from "./src/webui.ts";
import {myBackendFunc,allEvents} from "./backend.js"

// Create new window
process.chdir(__dirname)
const myWindow = new WebUI();

// Bind All Events
myWindow.bind("", allEvents);
// Bind Backend Function
myWindow.bind("myBackendFunc", myBackendFunc);

// Bind Exit Function
myWindow.bind("exit", () => {
  // Close all windows and exit
  WebUI.exit();
});
myWindow.setPort(8081);
myWindow.setSize(900,500)
myWindow.setPosition(50,50)
myWindow.show("index.html")
await WebUI.wait();
console.log("Thank you.",new Date());
process.exit(0);