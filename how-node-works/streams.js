import * as fs from "fs";
import * as http from "http";

const server = http.createServer();

server.on("request", (req, res) => {
  /*solution 1: standard*/
  /*fs.readFile("test-file.txt", (err, data) => {
    if (err) console.log(err);
    res.end(data);
  });*/

  /*solution 2: Streams*/
  /* const readable = fs.createReadStream("test-file.txt");
  readable.on("data", (chunk) => {
    res.write(chunk);
  });
  readable.on("end", () => {
    res.end();
  });*/

  /*Solution 3: Pipes*/
  const readable = fs.createReadStream("test-file.txt");
  readable.on("data", (chunk) => {
    readable.pipe(res);
  });
});

server.listen(3000, () => {
  console.log("listening....");
});
