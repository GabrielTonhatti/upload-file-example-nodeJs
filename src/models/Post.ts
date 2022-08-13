import { Schema, model, Document } from "mongoose";
import aws, { AWSError } from "aws-sdk";
import fs from "fs";
import path from "path";
import { promisify } from "util";
import { PromiseResult } from "aws-sdk/lib/request";
import { DeleteObjectOutput } from "aws-sdk/clients/s3";

const s3 = new aws.S3();

export interface PostInteface extends Document {
    name?: string;
    size?: number;
    key?: string;
    url?: string;
    createdAt?: Date;
}

const PostSchema = new Schema({
    name: String,
    size: Number,
    key: String,
    url: String,
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

PostSchema.pre("save", function (): void {
    if (!this.url) {
        this.url = `${process.env.APP_URL}/files/${this.key}`;
    }
});

// PostSchema.pre("remove", function ():
//     | Promise<void>
//     | Promise<PromiseResult<DeleteObjectOutput, AWSError>> {
//     if (process.env.STORAGE_TYPE === "s3") {
//         return s3
//             .deleteObject({
//                 Bucket: <string>process.env.BUCKET_NAME,
//                 Key: <string>this.key,
//             })
//             .promise();
//     } else {
//         return promisify(fs.unlink)(
//             path.resolve(
//                 __dirname,
//                 "..",
//                 "..",
//                 "tmp",
//                 "uploads",
//                 <string>this.key
//             )
//         );
//     }
// });

export default model<PostInteface>("Post", PostSchema);
