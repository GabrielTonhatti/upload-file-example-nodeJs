const Post = require("../models/Post");
const { MAX_FILE_SIZE_MB } = require("../utils/Utils");
const multer = require("multer");
const multerConfig = require("../config/multer");
const logger = require("../config/logger");

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
                        `Tamanho máximo permitido para a imagem é de ${MAX_FILE_SIZE_MB}`
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

module.exports = new PostController();
