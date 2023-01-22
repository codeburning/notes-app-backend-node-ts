import { NextFunction , Request,Response } from "express";
import { verifyJSONToken } from "../utils/jwt";
import { JwtPayload } from "jsonwebtoken";
export interface CustomRequest extends Request {
    token?: string | JwtPayload;
}
export const authMiddleware=(req:CustomRequest,res:Response,next:NextFunction)=>{
    try{
        const authHeader = req.headers?.["authorization"] ||req?.headers?.["Authorization"] ||undefined
        if(!authHeader|| typeof authHeader !=="string") throw new Error("Auth failed, token not present in header authorization")
        const payload :string|JwtPayload= verifyJSONToken(authHeader)
        req.token=payload
        next()
    }catch(e:any){
        return res.status(401).jsonp({error:true,message:e?.message||"Forbidden"})
    }
}