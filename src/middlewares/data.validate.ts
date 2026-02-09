import type { NextFunction, Request, Response } from "express";
import type { Schema } from "joi";

export const validateSchema =  (schema:Schema)=>{
   return async (req:Request, res:Response, next:NextFunction)=>{
    const data = {...req.body, ...req.params, ...req.query};
    const validate = schema.validate(data,{abortEarly:false});
   if(validate.error){
        const error = validate.error.details.map(e=>e.message).join(", ")
        return next(new Error(error, {cause:400}))
   }
    return next()
   }
}