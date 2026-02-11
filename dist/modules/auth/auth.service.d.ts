import type { NextFunction, Request, Response } from "express";
declare const register: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
declare const newOtp: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
declare const verfiyemail: (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
declare const login: (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
declare const googleLogin: (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
declare const forgotPassword: (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
declare const resetPassword: (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
declare const updatePassword: (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
declare const logout: (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
declare const refreshToken: (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
declare const getProfile: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
declare const updateProfile: (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
declare const updateEmail: (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
export { register, verfiyemail, newOtp, login, googleLogin, forgotPassword, resetPassword, updatePassword, logout, refreshToken, getProfile, updateProfile, updateEmail, };
//# sourceMappingURL=auth.service.d.ts.map