import mongoose from "mongoose";
import Utils from "../../utils/Utils.js";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const logger = Utils.getLoggerWithPathFile(__filename);
logger.info("Connecting to MongoDB...");

/**
 * Database setup
 */
mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => logger.info("Connected to MongoDB ✅"))
    .catch((error) => {
        logger.error("Error connecting to MongoDB ❌");
        logger.error(error);
        logger.info("MongoDB disconnected");
    });
