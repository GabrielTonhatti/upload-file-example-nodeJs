require("dotenv").config();
const express = require("express");
const path = require("path");
require("./config/database/Mongo");
const routes = require("./routes");
const cors = require("cors");
const logger = require("./config/logger");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    "/files",
    express.static(path.resolve(__dirname, "..", "tmp", "uploads"))
);

app.use(routes);

app.listen(process.env.PORT || 3000, () =>
    logger.info(`Server running on ${process.env.APP_URL}`)
);
