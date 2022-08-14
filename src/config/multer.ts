import {
    AwsConfig,
    CallbackDestination,
    CallbackFileFilter,
    CallbackFilename,
    CallbackKey,
} from "./../utils/types/types";
import aws, { S3 } from "aws-sdk";
import crypto from "crypto";
import { Request } from "express";
import multer from "multer";
import multerS3 from "multer-s3";
import path from "path";
import Utils from "../utils/Utils";
import { S3Client } from "@aws-sdk/client-s3";
import { StorageType } from "../utils/types/types";

const awsConfig: AwsConfig = {
    credentials: {
        accessKeyId: <string>process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: <string>process.env.AWS_SECRET_ACCESS_KEY,
    },
    region: <string>process.env.AWS_DEFAULT_REGION,
};

const s3 = new S3Client(awsConfig);

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
        s3: s3,
        bucket: <string>process.env.BUCKET_NAME,
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

const storage: string = <string>process.env.STORAGE_TYPE;
export default {
    dest: path.resolve(__dirname, "..", "..", "tmp", "uploads"),
    storage: storageTypes[storage as keyof typeof storageTypes],
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
