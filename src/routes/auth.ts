import {Router} from 'express'
import { AuthController } from '../controller/authController'
import {loginValidator, registerValidator} from '../validator/authValidator'
const authRoutes = Router()
const authHandler = new AuthController

//Register end point
authRoutes.post("/register",registerValidator, authHandler.registerAcount)
//Login end point
authRoutes.post("/login", loginValidator, authHandler.loginToAccount)

export default authRoutes