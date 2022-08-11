import "dotenv/config.js";
import express from "express";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import "./config/database/Mongo.js";
import routes from "./routes.js";
import Utils from "./utils/Utils.js";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const logger = Utils.getLoggerWithPathFile(__filename);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(
    "/files",
    express.static(path.resolve(__dirname, "..", "tmp", "uploads"))
);

app.use(routes);

app.listen(3000, () => logger.info(`Server running on ${process.env.APP_URL}`));
