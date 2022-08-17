const pino = require("pino");
const moment = require("moment-timezone");

const getCurrentDateTime = () => {
    const DATA_TIME_FORMAT = "DD/MM/yyyy HH:mm:ss";
    const TIME_ZONE = "America/Sao_Paulo";

    return moment().tz(TIME_ZONE).format(DATA_TIME_FORMAT);
};

const logger = pino({
    name: "upload example",
    level: "info",
    timestamp: () => `,"time":"${getCurrentDateTime()}"`,
    prettyPrint: {
        colorize: true,
        levelFirst: true,
        sync: true,
        timestampKey: "time",
        messageKey: "msg",
        ignore: "filename",
    },
});

module.exports = logger;
