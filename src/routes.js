import { Router } from "express";

import postController from "./controller/PostController.js";

const routes = Router();
routes.get("/posts", postController.findAll);
routes.post("/posts", postController.uploadFile);
routes.delete("/posts/:id", postController.deleteById);
routes.all("*", postController.notFound);

export default routes;
