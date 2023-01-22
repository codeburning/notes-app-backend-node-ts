// import {} from 'brcypt'
import {genSaltSync,hashSync,compareSync} from 'bcrypt'
const SALT_ROUND =10
/**
 *  Generate brcypt hash 
 * @param str 
 * @returns 
 */
export const generateHash = (str:string):string=>{
    const salt = genSaltSync(SALT_ROUND)
    return  hashSync(str,salt)
}

export const compareHash = (str:string,hashString:string):boolean=>{
    return  compareSync(str,hashString)
}