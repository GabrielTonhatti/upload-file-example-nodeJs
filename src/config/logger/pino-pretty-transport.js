import moment from "moment-timezone";
import PinoPretty from "pino-pretty";

const DATA_TIME_FORMAT = "DD/MM/yyyy HH:mm:ss";
const TIME_ZONE = "America/Sao_Paulo";

export default (opts) =>
    PinoPretty({
        ...opts,
        messageFormat: "{filename}: {msg}",
        customPrettifiers: {
            time: () =>
                `[time: ${moment().tz(TIME_ZONE).format(DATA_TIME_FORMAT)}]`,
            pid: (pid) => `pid: ${pid}`,
        },
    });
