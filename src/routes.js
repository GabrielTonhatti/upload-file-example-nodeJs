const routes = require("express").Router();
const postController = require("./controller/PostController");

routes.get("/posts", postController.findAll);
routes.post("/posts", postController.uploadFile);
routes.delete("/posts/:id", postController.deleteById);
routes.all("*", postController.notFound);

module.exports = routes;
