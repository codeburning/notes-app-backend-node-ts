import dotenv from 'dotenv'
dotenv.config()
export const appConfig ={
    port:process.env.PORT ||8081,
    mongoHost:process.env.MONGODB_DB_HOST ,
    mongoPort:process.env.MONGO_DB_PORT ,
    mongoUser:process.env.MONGO_DB_USER,
    mongoPassword:process.env.MONGO_DB_PWD
}