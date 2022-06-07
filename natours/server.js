import mongoose from "mongoose";
import { CONNECTION_STRING } from "./secret.js";

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

import app from "./app.js";

mongoose.connect(CONNECTION_STRING, {}).then((con) => {
  console.log("connected to database");
});

const server = app.listen(3000, () => {
  console.log("Server launched");
});

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
