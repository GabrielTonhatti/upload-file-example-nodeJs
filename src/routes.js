const routes = require("express").Router();
const multer = require("multer");
const multerConfig = require("./config/multer");

const PostController = require("./controller/PostController");

routes.get("/posts", PostController.findAll);
routes.post("/posts", multer(multerConfig).single("file"), PostController.save);
routes.delete("/posts/:id", PostController.deleteById);

module.exports = routes;
