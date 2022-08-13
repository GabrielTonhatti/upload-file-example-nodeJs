import cors from "cors";
import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import path from "path";
import { Logger } from "pino";
import routes from "./routes";
import Utils from "./utils/Utils";

class App {
    private readonly _express: express.Application;
    private readonly logger: Logger = Utils.getLoggerWithPathFile(__filename);

    public constructor() {
        this._express = express();
        this.middlewares();
        this.database();
        this.routes();
    }

    private middlewares(): void {
        this._express.use(express.json());
        this._express.use(cors());
        this._express.use(express.urlencoded({ extended: true }));
        this._express.use(
            "/files",
            express.static(path.resolve(__dirname, "..", "tmp", "uploads"))
        );
    }

    private database(): void {
        this.logger.info("Connecting to MongoDB...");

        mongoose
            .connect(<string>process.env.MONGO_URL, {
                autoIndex: false,
            })
            .then((): void => this.logger.info("Connected to MongoDB ✅"))
            .catch((error: Error): void => {
                this.logger.error("Error connecting to MongoDB ❌");
                this.logger.error(error);
                this.logger.info("MongoDB disconnected");
            });
    }

    private routes(): void {
        this._express.use(routes);
    }

    public get express(): express.Application {
        return this._express;
    }
}

export default new App().express;
