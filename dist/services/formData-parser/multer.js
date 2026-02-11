import path from "node:path";
import multer, {} from "multer";
import fs from "node:fs";
import { acceptedImgExts } from "../../constants.js";
import { fileTypeFromBuffer } from "file-type";
const AVATAR_DIR = path.join(process.cwd(), "uploads", "avatars");
// check file existence, & create it if doesnot exist
fs.mkdirSync(AVATAR_DIR, { recursive: true });
export const uploadFile = async ({ maxSize, allowedMimtypes, filesCount, fieldName, }) => {
    const storage = multer.diskStorage({
        destination: (_req, _file, cb) => cb(null, AVATAR_DIR),
        filename: (_req, file, cb) => {
            const id = crypto.randomUUID();
            const ext = path.extname(file.originalname).toLowerCase();
            const name = `${new Date().getTime()}-${id}-${ext || ".bin"}`;
            return cb(null, name);
        },
    });
    const fileFilter = async (_req, file, cb) => {
        const type = file.mimetype;
        if (!type || !allowedMimtypes.includes(type))
            return cb(new Error(`only ${allowedMimtypes} images are allowed`));
        return cb(null, true);
    };
    const upload = multer({
        storage,
        fileFilter,
        limits: {
            fieldSize: maxSize * 1024 * 1024,
            files: filesCount ?? 1,
        },
    });
    return filesCount == 1 || !filesCount
        ? upload.single(fieldName)
        : upload.array(fieldName);
};
//# sourceMappingURL=multer.js.map