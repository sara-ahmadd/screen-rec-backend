import type { NextFunction, Request, Response } from "express"

export const asyncHandler =  (fn:Function)=>{
return async (req:Request,res:Response,next:NextFunction)=>{
        await fn(req,res,next).catch((error:any)=>{
             if(!Object.keys(error)){
            return next(new Error(error?.message))
            }
            const errorString=error.errors ? error.errors.map((e:any) => e.message).join(", ") : error 
            return next(new Error(errorString,{cause:400}) );
        })
    }
}