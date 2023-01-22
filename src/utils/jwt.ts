import jwt from 'jsonwebtoken'
const SECRET_TOKEN = "ABCDEFGHIJKLMNOP_09876543210"
export const generateWebTokenLogin = (payload:{[key:string]:any})=>{
    try{
        //setting up expires in to 24 Hour
        const data = jwt.sign(payload,SECRET_TOKEN,{expiresIn:"24h"}) 
        return data
    }catch(e){
        throw e
    }
}
/**
 * 
 * @param token 
 * @returns 
 */
export const verifyJSONToken=(token:string)=>{
    return jwt.verify(token,SECRET_TOKEN)
}