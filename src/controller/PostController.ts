import { Request, RequestHandler, Response } from "express";
import multer from "multer";
import { Logger } from "pino";
import multerConfig from "../config/multer";
import Post, { PostInteface } from "../models/Post";
import Utils from "../utils/Utils";
import aws from "aws-sdk";
import { promisify } from "util";
import fs from "fs";
import path from "path";

const logger: Logger = Utils.getLoggerWithPathFile(__filename);
const s3 = new aws.S3();

class PostController {
    public async findAll(req: Request, res: Response): Promise<Response> {
        const posts: Array<PostInteface> = await Post.find();

        return res.json(posts);
    }

    public async uploadFile(req: Request, res: Response) {
        const uploadedMulter: RequestHandler =
            multer(multerConfig).single("file");

        return uploadedMulter(
            req,
            res,
            async (error: any): Promise<Response | undefined> => {
                try {
                    if (error instanceof multer.MulterError) {
                        throw new Error(
                            `Tamanho máximo permitido para a imagem é de ${Utils.MAX_FILE_SIZE_MB}.`
                        );
                    } else if (error) {
                        throw new Error(
                            `Tipo de arquivo não permitido. Somente é aceito arquivos do tipo .jpg, .jpeg, .png e .gif.`
                        );
                    }

                    const {
                        originalname: name,
                        size,
                        filename: key,
                    } = <Express.Multer.File>req.file;

                    const url: string = "";
                    const post: PostInteface = await Post.create({
                        name,
                        size,
                        key,
                        url,
                    });

                    logger.info(
                        `File id: ${post._id}, name: ${post.name} saved successfully.`
                    );

                    return res.json(post);
                } catch (error: any) {
                    logger.error(`Error saving file: ${error.message}`);

                    return res.status(404).json({ message: error.message });
                }
            }
        );
    }

    public async deleteById(req: Request, res: Response): Promise<Response> {
        try {
            const id: string = req.params.id;
            const post: PostInteface | null = await Post.findById(id);
            const { key } = post;

            if (!post) {
                throw new Error(`Arquivo de id ${id} não encontrado.`);
            }

            await post.remove();

            if (post.$isDeleted()) {
                if (process.env.STORAGE_TYPE === "s3") {
                    s3.deleteObject({
                        Bucket: <string>process.env.BUCKET_NAME,
                        Key: <string>key,
                    }).promise();
                } else {
                    promisify(fs.unlink)(
                        path.resolve(
                            __dirname,
                            "..",
                            "..",
                            "tmp",
                            "uploads",
                            <string>this.key
                        )
                    );
                }
            }

            logger.info(
                `File id: ${post._id}, name: ${post.name} deleted successfully.`
            );

            return res.status(204).send();
        } catch (error: any) {
            logger.error(error.message);

            if (error.message.includes("não encontrado")) {
                return res.status(404).json({
                    message: error.message,
                });
            }

            return res.status(500).json({
                message:
                    "Desculpe, ocorreu um erro interno no sistema. Tente novamente mais tarde.",
            });
        }
    }

    public notFound(req: Request, res: Response): Response {
        return res.status(404).json({
            message: `A URL ${req.url} não existe ou não aceita o método ${req.method}.`,
        });
    }
}

export default new PostController();
