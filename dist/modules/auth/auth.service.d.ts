import type { NextFunction, Request, Response } from "express";
declare const register: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
declare const newOtp: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
declare const verfiyemail: (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
declare const login: (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
export { register, verfiyemail, newOtp, login };
//# sourceMappingURL=auth.service.d.ts.map