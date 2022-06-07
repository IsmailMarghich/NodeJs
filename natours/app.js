import express from "express";
import morgan from "morgan";
const app = express();
import { AppError } from "./utils/AppError.js";
import globalErrorHandler from "./controllers/ErrorController.js";
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

/*error handling for nonexistent routes*/
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.url} on this server`, 404));
});

app.use(globalErrorHandler);
export default app;
