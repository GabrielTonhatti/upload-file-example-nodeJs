const path = require("path");
const logger = require("../config/logger/logger");

class Utils {
    static MEGABYTE = 1024 * 1000;
    static MAX_FILE_SIZE = 2 * 1024 * 1024;
    static MAX_FILE_SIZE_MB = Utils.MAX_FILE_SIZE / Utils.MEGABYTE;

    static getLoggerWithPathFile(filename) {
        return logger.child({
            filename: `${path.dirname(
                filename.substring(filename.indexOf("src"))
            )}/${path.basename(filename)}`,
        });
    }
}

module.exports = Utils;
