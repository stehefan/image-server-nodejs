import express, {Express, json} from "express";
import cors from "cors";
import "express-async-errors";
import {defaultErrorHandler, defaultNotFoundHandler} from "./middleware/error";
import imageRoute from "./routes/imageRoute";

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(json());
app.use(cors());
app.use("/image", imageRoute);

app.use(defaultNotFoundHandler);
app.use(defaultErrorHandler)

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
