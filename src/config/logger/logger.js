import pino from "pino";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);

const logger = pino({
    name: "application upload example",
    level: "info",
    transport: {
        target: "./pino-pretty-transport",
        options: {
            colorize: true,
            levelFirst: true,
            sync: true,
            translateTime: true,
            singleLine: false,
            ignore: "pid,hostname,filename",
        },
    },
}).child({ filename: path.basename(__filename) });

export default logger;
