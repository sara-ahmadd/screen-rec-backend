import type { NextFunction } from "express";
import { fileTypeFromBuffer } from "file-type";
import fs from "node:fs";

export const isValidFileType = (validTypes = [""]) => {
  return async (
    req: Request & { file: Express.Multer.File },
    res: Response,
    next: NextFunction,
  ) => {
    const filePath = req.file?.path;
    if (!filePath) return next();
    //read file and convert it to buffer
    const buffer = fs.readFileSync(filePath);
    //check file mime type

    const type = await fileTypeFromBuffer(buffer);

    if (!type || !validTypes.includes(type.mime))
      return next(new Error("invalid file mime type"));

    return next();
  };
};
