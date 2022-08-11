import "dotenv/config.js";

import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import path from "path";
import logger from "./config/logger/logger.js";
import { fileURLToPath } from "url";
import routes from "./routes.js";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
/**
 * Database setup
 */
logger.info("Connecting to MongoDB...");
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
});
mongoose.connection.on("connected", () =>
    logger.info("Connected to MongoDB ✅")
);
mongoose.connection.on("error", () =>
    logger.error("Error connecting to MongoDB ❌")
);
mongoose.connection.on("disconnected", () =>
    logger.info("Disconnecting to MongoDB...")
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(
    "/files",
    express.static(path.resolve(__dirname, "..", "tmp", "uploads"))
);

app.use(routes);

app.listen(3000, () => logger.info(`Server running on ${process.env.APP_URL}`));
