import pino, { Logger } from "pino";
import moment from "moment-timezone";

const getCurrentDateTime: Function = (): string => {
    const DATA_TIME_FORMAT: string = "DD/MM/yyyy HH:mm:ss";
    const TIME_ZONE: string = "America/Sao_Paulo";

    return moment().tz(TIME_ZONE).format(DATA_TIME_FORMAT);
};

const logger: Logger = pino({
    name: "upload example",
    level: "info",
    timestamp: () => `,"time":"${getCurrentDateTime()}"`,
    prettyPrint: {
        colorize: true,
        levelFirst: true,
        timestampKey: "time",
        messageKey: "msg",
    },
});

export default logger;
