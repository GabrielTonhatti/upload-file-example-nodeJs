import path from "path";
import { fileURLToPath } from "url";
import parentLogger from "../config/logger/logger.js";
import Post from "../models/Post.js";

const __filename = fileURLToPath(import.meta.url);
const logger = parentLogger.child({
    filename: `${path.dirname(
        __filename.substring(__filename.indexOf("src"))
    )}/${path.basename(__filename)}`,
});

class PostController {
    async findAll(req, res) {
        const posts = await Post.find();

        return res.json(posts);
    }

    async save(req, res) {
        const { originalname: name, size, key, location: url = "" } = req.file;

        const post = await Post.create({
            name,
            size,
            key,
            url,
        });

        logger.info(`Post ${post._id} saved successfully.`);

        return res.json(post);
    }

    async deleteById(req, res) {
        try {
            const post = await Post.findById(req.params.id);

            await post.remove();

            logger.info(`Post ${post._id} deleted successfully.`);

            return res.status(204).send();
        } catch (error) {
            logger.error(error.message);

            return res.status(404).json({
                message: `Post de id ${req.params.id} não encontrado.`,
            });
        }
    }

    notAcceptable(req, res) {
        return res.status(404).json({
            message: `A URL ${req.url} não aceita o método ${req.method}.`,
        });
    }
}

export default new PostController();
