import type { NextFunction, Request, Response } from "express";
import type { Schema } from "joi";
export declare const validateSchema: (schema: Schema) => (req: Request, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=data.validate.d.ts.map