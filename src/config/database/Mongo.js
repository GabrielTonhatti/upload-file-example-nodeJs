const mongoose = require("mongoose");
const Utils = require("../../utils/Utils");
const logger = require("../../config/logger");
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
