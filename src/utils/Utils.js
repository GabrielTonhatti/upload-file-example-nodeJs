const path = require("path");
const parentLogger = require("../config/logger/logger");
const moment = require("moment-timezone");

class Utils {
    static MEGABYTE = 1024 * 1000;
    static MAX_FILE_SIZE = 2 * 1024 * 1024;
    static MAX_FILE_SIZE_MB = Utils.MAX_FILE_SIZE / Utils.MEGABYTE;
    static DATA_TIME_FORMAT = "DD/MM/yyyy HH:mm:ss";
    static TIME_ZONE = "America/Sao_Paulo";

    static getLoggerWithPathFile(filename) {
        return parentLogger.child({
            filename: `${path.dirname(
                filename.substring(filename.indexOf("src"))
            )}/${path.basename(filename)}`,
        });
    }

    static getCurrentDateTime() {
        return moment().tz(Utils.TIME_ZONE).format(Utils.DATA_TIME_FORMAT);
    }
}

module.exports = Utils;
