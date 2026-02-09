import type { NextFunction, Request, Response } from "express";

export const errorHandler =()=>{
return  (error:Error,req:Request,res:Response,next:NextFunction)=>{
        const status = error.cause as number||500;
            return res.status(status).json({status:'error', error:error.message, stack:error.stack})
        }
}