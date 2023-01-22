import express from 'express'
import { appConfig } from './config'
import appRoutes from './routes'
import databaseConnection from './database/connection'

// Express app

const app = express()
app.use(express.json())
const PORT = appConfig.port
app.use("/v1",appRoutes)
//Base URL 
app.get("/",(req,res)=>{
    return res.json({error:false,message:"SERVER IS OK"})
})

// All app routes


app.listen(PORT,()=>{
    console.log("Sever started at ",PORT)
    databaseConnection((e)=>{
        if(e){
            console.log("Error",e)
            process.kill(1)
        }else{
            console.log("Database connected ")
        }
    })
})