import * as fs from "fs";
import * as crypto from "crypto";

const start = Date.now();

setTimeout(() => console.log("timeout 1 finished"), 0);
setImmediate(() => console.log("immediate 1 finished"));

fs.readFile("text-file.txt", () => {
  console.log("i/o finished");
  setTimeout(() => console.log("timeout 2 finished"), 0);
  setTimeout(() => console.log("timeout 3 finished"), 3000);
  setImmediate(() => console.log("immediate 2 finished"));

  process.nextTick(() => console.log("process.nextTick"));

  crypto.pbkdf2Sync("password", "salt", 100000, 1024, "sha512");
  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
    console.log(
      Date.now() - start,
      "finished password encryption using crypto"
    );
  });
  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
    console.log(
      Date.now() - start,
      "finished password encryption using crypto"
    );
  });
});

console.log("hello from top level code");
