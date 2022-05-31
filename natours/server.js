import app from "./app.js";
import mongoose from "mongoose";
import { CONNECTION_STRING } from "./secret.js";

mongoose.connect(CONNECTION_STRING, {}).then((con) => {
  console.log("connected to database");
});

app.listen(3000, () => {
  console.log("Server launched");
});
