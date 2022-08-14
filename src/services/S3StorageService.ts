import AWS from "aws-sdk";

class S3StorageService {
    private readonly s3;

    public constructor() {
        this.s3 = new AWS.S3();
    }

    public async deleteFile(key: string): Promise<void> {
        await this.s3
            .deleteObject({
                Bucket: <string>process.env.BUCKET_NAME,
                Key: key,
            })
            .promise();
    }
}

export const s3StorageService: S3StorageService = new S3StorageService();
