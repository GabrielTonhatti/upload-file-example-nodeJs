const PinoPretty = require("pino-pretty");
const Utils = require("../../utils/Utils");

module.exports = (opts) =>
    PinoPretty({
        ...opts,
        messageFormat: "{filename}: {msg}",
        customPrettifiers: {
            time: () => `[time: ${Utils.getCurrentDateTime()}]`,
            pid: (pid) => `pid: ${pid}`,
        },
    });
