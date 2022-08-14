import { NextFunction, Request, Response, Router } from "express";
import formidable from "formidable";
import multer from "multer";
import postController from "./controller/PostController";

const routes: Router = Router();
const upload = multer({ dest: "tmp/uploads/" });

routes.get("/posts", postController.findAll);
routes.post("/posts", postController.uploadFile);
// routes.post(
//     "/posts",
//     (req: Request, res: Response, next: NextFunction): void => {
//         console.log("teste", req.body);

//         const form = new formidable.IncomingForm();

//         form.parse(req, (err: any, fields: any, files: any) => {
//             console.log("files", files);

//             //     const oldpath = files.filetoupload.path;
//             //     const newpath = path.join(__dirname, "..", files.filetoupload.name);
//             //     fs.renameSync(oldpath, newpath);
//             //     res.send("File uploaded and moved!");
//             return res.send();
//         });
//     }
// );
// routes.post(
//     "/posts",
//     upload.single("file"),
//     (req: Request, res: Response, next: NextFunction) => {
//         console.log(req.file);

//         return res.send();
//     }
// );

routes.delete("/posts/:id", postController.deleteById);
routes.all("*", postController.notFound);

export default routes;
