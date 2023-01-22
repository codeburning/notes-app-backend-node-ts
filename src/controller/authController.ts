import {Request,Response} from 'express'
import { UserLogin, UserRegister } from '../types'
import { compareHash, generateHash } from '../utils/bcrypt'
import { UserService } from '../service/userService'
import { generateWebTokenLogin } from '../utils/jwt'
const userService =new UserService()
export class AuthController{
    async registerAcount(req:Request,res:Response){
      try{
        const body:UserRegister = req.body
        const passwordHash = generateHash(body.password)
        // console.log({passwordHash})
        // Now need to save into DB
        const data = await userService.newUser({...body,password:passwordHash})
        // @TODO need to send email with verification link 
        // will add later
        return res.jsonp(data)
      }catch(e:any){
        // console.log(e?.message)
        return res.status(400).jsonp({error:true,message:e?.message||"Server side error"})
      }
    }
    async loginToAccount(req:Request,res:Response){
        try{
            const body:UserLogin=req.body
            const data = await userService.getUserByEmail(body.email)
            if(!data) return res.status(404).jsonp({error:true,message:"Auth failed, Email is not registered"})
            // Here user found in database with body.email
            const flag = compareHash(body.password,data?.password||"")
            if(!flag) return res.status(400).json({error:false,message:"Auth failed"})
           
            /**
             * Now we will generate JSON Web token
             */
            const token = generateWebTokenLogin({id:data._id,email:body.email})
            const payload =  {user:{firstName:data.firstName,lastName:data.lastName,email:data.email},token:token}
            return res.status(200).json(payload)
        }catch(e:any){
            return res.status(400).jsonp({error:true,message:e?.message||"Server side error"})
        }
    }
}