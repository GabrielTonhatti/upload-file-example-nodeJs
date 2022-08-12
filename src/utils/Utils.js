import path from "path";
import parentLogger from "../config/logger/logger.js";

export default class Utils {
    static MEGABYTE = 1024 * 1000;
    static MAX_FILE_SIZE = 2 * 1024 * 1024;
    static MAX_FILE_SIZE_MB = Utils.MAX_FILE_SIZE / Utils.MEGABYTE;

    static getLoggerWithPathFile(filename) {
        return parentLogger.child({
            filename: `${path.dirname(
                filename.substring(filename.indexOf("src"))
            )}/${path.basename(filename)}`,
        });
    }
}
