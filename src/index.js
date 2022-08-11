require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const path = require("path");

const app = express();
const logger = require("./config/logger/logger");

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
    logger.info("Disconnecting to MongoDB ...")
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(
    "/files",
    express.static(path.resolve(__dirname, "..", "tmp", "uploads"))
);

app.use(require("./routes"));

app.listen(3000, () => logger.info(`Server running on ${process.env.APP_URL}`));
