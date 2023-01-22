
//database connection
import mongoose from 'mongoose'
import { appConfig } from '../config'
const mongoURL =`mongodb://${appConfig.mongoUser}:${appConfig.mongoPassword}@${appConfig.mongoHost}:${appConfig.mongoPort}/?retryWrites=true&w=majority&authSource=admin&tls=false`
const  databaseConnection = (result:(a:string|null)=>void)=>{
mongoose.connect(mongoURL,{dbName:"keeps-data"}).then(()=>{
    return result(null)
}).catch(e=>{
    console.log("Error",e)
    return result("Error failed to connected")
})
mongoose.Promise =global.Promise
}
export default databaseConnection




