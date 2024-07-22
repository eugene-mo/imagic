import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";

function UploadInterceptor(param, savePath, fileName) {
    console.log("IN METHOD dssdfs")
    return FileInterceptor(param, {
        storage: diskStorage({
            destination: savePath,
            filename: (req, file, callback) => {
                // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                // const ext = extname(file.originalname);
                callback(null, fileName);
            },
        }),
    })
}

export { UploadInterceptor }