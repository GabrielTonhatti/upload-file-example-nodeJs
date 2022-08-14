import multer from "multer";

export type CallbackDestination = (
    error: Error | null,
    destination: string
) => void;

export type CallbackFilename = (error: Error | null, filename: string) => void;

export type CallbackKey = (error: Error | null, key?: string) => void;

export type CallbackFileFilter = (
    error: Error | null,
    accepted?: boolean
) => void;

type AwsCredentials = {
    accessKeyId: string;
    secretAccessKey: string;
};

export type AwsConfig = {
    credentials: AwsCredentials;
    region: string;
};

export type StorageType = {
    local: multer.StorageEngine;
    s3: multer.StorageEngine;
};
