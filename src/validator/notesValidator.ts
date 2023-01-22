import { NextFunction,Request,Response } from "express";
import { body, validationResult } from "express-validator";

export const noteValidator=[
    body("title").isString().withMessage("Title should be of alpha nemeric value"),
    body("description").isString(),
    body("images").isArray() .custom((val:Array<string>,{req})=>{
        // TODO will add check if passed should be a valid image URL
        return true 
    }),
    async(req:Request,res:Response,next:NextFunction)=>{
        const errors = validationResult(req)
        if(!errors.isEmpty()) return res.status(400).json(errors)
        next()
    }
]