import express from "express";
import dotenv from "dotenv";
dotenv.config();
import "express-async-errors";
import cors from "cors";
import route from "./routes/route";
import connect from "./db/connect";
import notFoundMiddleware from "./middleware/not-found";
import errorHandleMiddleware from "./middleware/error-handler";
const app: express.Express = express();

app.use(cors());
app.use(express.json());
app.use("/api/", route);
app.use(notFoundMiddleware);
app.use(errorHandleMiddleware);

const PORT = process.env.PORT || 5000;
const DB = process.env.DB;
const start = async () => {
  if (!DB) return;
  await connect(DB);
  app.listen(PORT, () => {
    console.log("server is running on " + PORT);
  });
};

start();
