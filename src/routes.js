import { Router } from "express";
import multer from "multer";
import multerConfig from "./config/multer.js";

import postController from "./controller/PostController.js";

const routes = Router();
routes.get("/posts", postController.findAll);
routes.post("/posts", multer(multerConfig).single("file"), postController.save);
routes.delete("/posts/:id", postController.deleteById);
routes.all("*", postController.notFound);

export default routes;
