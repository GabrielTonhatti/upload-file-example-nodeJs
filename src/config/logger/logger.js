const pino = require("pino");
const path = require("path");

const enviroment = process.env.NODE_ENV;

let logger;

if (enviroment !== "production") {
    logger = pino({
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
    });
} else {
    logger = pino({
        name: "upload example",
        level: "info",
    });
}

logger.child({ filename: path.basename(__filename) });

module.exports = logger;
