const Post = require("../models/Post");

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

        return res.json(post);
    }

    async deleteById(req, res) {
        const post = await Post.findById(req.params.id);

        await post.remove();

        return res.send();
    }
}

module.exports = new PostController();
