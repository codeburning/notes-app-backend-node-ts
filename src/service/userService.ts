import user from "../schema/user";
import { UserRegister } from "../types";

export class UserService {
    /**
     * new user
     * @param option 
     * @returns 
     */
    async newUser(option:UserRegister){
        try{
            const x =new  user(option)
            return await x.save()
            }catch(e){
            throw e
        }
    }


    async getUserByEmail(email:string){
        return await user.findOne({email})
    }
}