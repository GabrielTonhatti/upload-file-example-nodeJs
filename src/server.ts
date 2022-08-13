import { Logger } from "pino";
import app from "./App";
import Utils from "./utils/Utils";

const logger: Logger = Utils.getLoggerWithPathFile(__filename);

 app.listen(process.env.PORT || 3333, (): void =>
    logger.info(`Server running on ${process.env.APP_URL}`)
);
