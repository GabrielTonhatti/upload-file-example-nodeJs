require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const path = require("path");
require("./config/database/Mongo");
const routes = require("./routes");
const Utils = require("./utils/Utils");
const cors = require("cors");

const app = express();
const logger = Utils.getLoggerWithPathFile(__filename);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(
    "/files",
    express.static(path.resolve(__dirname, "..", "tmp", "uploads"))
);

app.use(routes);

app.listen(process.env.PORT || 3000, () =>
    logger.info(`Server running on ${process.env.APP_URL}`)
);
