import type { NextFunction } from "express";
export declare const isValidFileType: (validTypes?: string[]) => (req: Request & {
    file: Express.Multer.File;
}, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=isValidMimType.d.ts.map