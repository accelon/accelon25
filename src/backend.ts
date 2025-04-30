
export async function allEvents(e) {
  /*
    e.window: WebUI;
    e.eventType: WebUI.EventType;
    e.element: string;
  */
  console.log(`\nallEvents: window = '${e.window}'`);
  console.log(`allEvents: eventType = '${e.eventType}'`);
  console.log(`allEvents: element = '${e.element}'`);
  /*
  switch (e.eventType) {
    case WebUI.EventType.Disconnected:
      // Window disconnection event
      console.log(`Window closed.`);
      break;
    case WebUI.EventType.Connected:
      // Window connection event
      console.log(`Window connected.`);
      break;
    case WebUI.EventType.MouseClick:
      // Mouse click event
      console.log(`Mouse click.`);
      break;
    case WebUI.EventType.Navigation:
      // Window navigation event
      const url = e.arg.string(0);
      console.log(`Navigation to '${url}'`);
      // Because we used `webui_bind(MyWindow, "", events);`
      // WebUI will block all `href` link clicks and sent here instead.
      // We can then control the behaviour of links as needed.
      e.window.navigate(url);
      break;
    case WebUI.EventType.Callback:
      // Function call event
      console.log(`Function call.`);
      break;
  }
      */
}

export async function myBackendFunc(e) {
  const a = e.arg.number(0); // First argument
  const b = e.arg.string(1); // Second argument
  const c = e.arg.boolean(2); // Third argument
  console.log(`1First argument: ${a}`);
  console.log(`2Second argument: ${b}`);
  console.log(`3xxThird argument: ${c}`);
}
