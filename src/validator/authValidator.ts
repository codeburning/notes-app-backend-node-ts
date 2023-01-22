import {NextFunction, Request,Response} from 'express'
import {body, validationResult} from 'express-validator'
// Register account validator 
export const registerValidator = [
       body("email").isEmail(),
        body("password").isStrongPassword({minLength:8,minLowercase:1,minUppercase:1,minNumbers:1}),
        body("firstName").isAlpha(),
        body("lastName").isAlpha(),
        (req:Request,res: Response,next:NextFunction)=>{
            const errors =validationResult(req)
            // console.log({errors})
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
              }
              next()
        }

]
//Login body validator

export const loginValidator = [
    body("email").isEmail(),
    body("password").isStrongPassword({minLength:8,minLowercase:1,minUppercase:1,minNumbers:1}),
   (req:Request,res: Response,next:NextFunction)=>{
       const errors =validationResult(req)
       // console.log({errors})
       if (!errors.isEmpty()) {
           return res.status(400).json({ errors: errors.array() });
         }
         next()
   }

]
