import fileSize from "filesize";
import path from "path";
import { Logger } from "pino";
import logger from "../config/logger";

class Utils {
    public static readonly MAX_FILE_SIZE: number = 2 * 1024 * 1024;
    public static readonly MAX_FILE_SIZE_MB: string = fileSize(Utils.MAX_FILE_SIZE);

    public static getLoggerWithPathFile(filename: string): Logger {
        return logger.child({
            filename: `${path.dirname(
                filename.substring(filename.indexOf("src"))
            )}/${path.basename(filename)}`,
        });
    }
}

export default Utils;
