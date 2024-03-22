self.addEventListener("message", (event: MessageEvent) => {
  console.log("워커가 받음 : ", event.data);
  self.postMessage("Hello from worker");
});
