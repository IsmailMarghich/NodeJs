import EventEmitter from "events";
const myEmitter = new EventEmitter();

myEmitter.on("click", () => {
  console.log("I was clicked!");
});

myEmitter.on("click", (arg) => {
  console.log(arg, "was clicked!");
});

myEmitter.emit("click", 9);
