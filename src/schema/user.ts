// user schema file
// Will use email as unique key
// first name will be required field
import mongoose, {Schema}  from 'mongoose'

const userSchema = new Schema({
    firstName:{type:String,required:true,},
    lastName:{type:String,default:null},
    email:{type:String,required:true,unique:true,},
    password:{type:String,required:true},
    lastLogin:{type:Date,default:null},
    isEmailVerified:{type:Boolean,default:false}
},{collection:"user-records",timestamps:true})
//Created index on email
userSchema.index({email:1})
export default mongoose.model("user-records", userSchema);