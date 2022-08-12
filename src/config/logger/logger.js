const pino = require("pino");
const path = require("path");

const logger = pino({
    name: "upload example",
    level: "info",
    transport: {
        target: "./pino-pretty-transport",
        options: {
            colorize: true,
            levelFirst: true,
            sync: true,
            translateTime: true,
            singleLine: false,
            ignore: "pid,filename",
        },
    },
}).child({ filename: path.basename(__filename) });

module.exports = logger;
