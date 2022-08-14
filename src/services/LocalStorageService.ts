import { promisify } from "util";
import fs from "fs";
import path from "path";

class LocalStorageService {
    public async deleteFile(key: string): Promise<void> {
        promisify(fs.unlink)(
            path.resolve(__dirname, "..", "..", "tmp", "uploads", <string>key)
        );
    }
}

export const localStorageService: LocalStorageService =
    new LocalStorageService();
