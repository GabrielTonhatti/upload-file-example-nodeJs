import { fileURLToPath } from "url";
import Post from "../models/Post.js";
import Utils from "../utils/Utils.js";
import multer from "multer";
import multerConfig from "../config/multer.js";

const __filename = fileURLToPath(import.meta.url);
const logger = Utils.getLoggerWithPathFile(__filename);

class PostController {
    async findAll(req, res) {
        const posts = await Post.find();

        return res.json(posts);
    }

    async uploadFile(req, res) {
        const uploadedMulter = multer(multerConfig).single("file");

        return uploadedMulter(req, res, async (error) => {
            try {
                if (error instanceof multer.MulterError) {
                    throw new Error(
                        `Tamanho máximo permitido para a imagem é de ${Utils.MAX_FILE_SIZE_MB.toFixed(
                            0
                        )} MB.`
                    );
                } else if (error) {
                    throw new Error(
                        `Tipo de arquivo não permitido. Somente é aceito arquivos do tipo .jpg, .jpeg, .png e .gif.`
                    );
                }

                const {
                    originalname: name,
                    size,
                    key,
                    location: url = "",
                } = req.file;

                const post = await Post.create({
                    name,
                    size,
                    key,
                    url,
                });

                logger.info(
                    `File id: ${post._id}, name: ${post.name} saved successfully.`
                );

                return res.json(post);
            } catch (error) {
                logger.error(`Error saving file: ${error.message}`);

                return res.status(404).json({ message: error.message });
            }
        });
    }

    async deleteById(req, res) {
        try {
            const id = req.params.id;
            const post = await Post.findById(id);

            if (!post) {
                throw new Error(`Arquivo de id ${id} não encontrado.`);
            }

            await post.remove();

            logger.info(
                `File id: ${post._id}, name: ${post.name} deleted successfully.`
            );

            return res.status(204).send();
        } catch (error) {
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

    notFound(req, res) {
        return res.status(404).json({
            message: `A URL ${req.url} não existe ou não aceita o método ${req.method}.`,
        });
    }
}

export default new PostController();
