import pino from "pino";
import moment from "moment-timezone";

const DATA_TIME_FORMAT = "DD/MM/yyyy HH:mm:ss";
const TIME_ZONE = "America/Sao_Paulo";

const logger = pino({
    name: "application upload example",
    level: "info",
    transport: {
        target: "pino-pretty",
        options: {
            colorize: true,
            levelFirst: true,
            sync: true,
            translateTime: `"time": ${moment()
                .tz(TIME_ZONE)
                .format(DATA_TIME_FORMAT)}`,
        },
    },
});

export default logger;
