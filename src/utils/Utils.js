import path from "path";
import parentLogger from "../config/logger/logger.js";

export default class Utils {
    static getLoggerWithPathFile(filename) {
        return parentLogger.child({
            filename: `${path.dirname(
                filename.substring(filename.indexOf("src"))
            )}/${path.basename(filename)}`,
        });
    }
}
