import express from "express";
import fs from "fs";
import morgan from "morgan";
const app = express();

/*import routes*/
import tourRouter from "./routes/tourRoutes.js";
import userRouter from "./routes/userRoutes.js";

/*middleware*/
app.use(morgan("dev")); /*logging*/
app.use(express.json()); /*Parse requests with JSON*/
app.use(
  express.static("./public")
); /*serving static HTML files from our public folder*/

/*applying our routers to specific url's*/
app.use("/api/tours", tourRouter);
app.use("/api/users", userRouter);
/*start server*/
export default app;
