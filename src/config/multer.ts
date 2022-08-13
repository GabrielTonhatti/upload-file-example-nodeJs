import { S3Client } from "@aws-sdk/client-s3";
import crypto from "crypto";
import { Request } from "express";
import multer from "multer";
import multerS3 from "multer-s3";
import path from "path";
import Utils from "../utils/Utils";

type CallbackDestination = (error: Error | null, destination: string) => void;
type CallbackFilename = (error: Error | null, filename: string) => void;
type CallbackKey = (error: Error | null, key?: string) => void;
type CallbackFileFilter = (error: Error | null, accepted?: boolean) => void;

type StorageType = {
    local: multer.StorageEngine;
    s3: multer.StorageEngine;
};

const storageTypes: StorageType = {
    local: multer.diskStorage({
        destination: (
            req: Request,
            file: Express.Multer.File,
            cb: CallbackDestination
        ): void => {
            cb(null, path.resolve(__dirname, "..", "..", "tmp", "uploads"));
        },
        filename: (
            req: Request,
            file: Express.Multer.File,
            cb: CallbackFilename
        ): void => {
            crypto.randomBytes(16, (err: Error | null, hash: Buffer): void => {
                if (err) cb(err, "");

                file.filename = `${hash.toString("hex")}-${file.originalname}`;

                cb(null, file.filename);
            });
        },
    }),
    s3: multerS3({
        s3: new S3Client({
            credentials: {
                accessKeyId: <string>process.env.AWS_ACCESS_KEY_ID,
                secretAccessKey: <string>process.env.AWS_SECRET_ACCESS_KEY,
            },
            region: <string>process.env.AWS_DEFAULT_REGION,
        }),
        bucket: "",
        contentType: multerS3.AUTO_CONTENT_TYPE,
        acl: "public-read",
        key: (
            req: Request,
            file: Express.Multer.File,
            cb: CallbackKey
        ): void => {
            crypto.randomBytes(16, (err: Error | null, hash: Buffer): void => {
                if (err) cb(err);

                const fileName = `${hash.toString("hex")}-${file.originalname}`;

                cb(null, fileName);
            });
        },
    }),
};

const storageType: string = <string>process.env.STORAGE_TYPE;
export default {
    dest: path.resolve(__dirname, "..", "..", "tmp", "uploads"),
    storage: storageTypes[`local`],
    limits: {
        fileSize: Utils.MAX_FILE_SIZE,
    },
    fileFilter: (
        req: Request,
        file: Express.Multer.File,
        cb: CallbackFileFilter
    ): void => {
        const allowedMimes: Array<string> = [
            "image/jpeg",
            "image/pjpeg",
            "image/png",
            "image/gif",
        ];

        if (allowedMimes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error("Invalid file type."));
        }
    },
};
