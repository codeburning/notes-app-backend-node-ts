import mongoose, { Types } from "mongoose";

const notesSchema = new mongoose.Schema({
    title:{type:String,required:true},
    noteDescription:{type:String,default:null},
    createdBy:{type:Types.ObjectId,ref:"user-records",required:true},
    images:{type:Array<string>,default:[]}
},{timestamps:true,collection:"notes-schema"})
//Indexed on created by
notesSchema.index({createdBy:1})
export default mongoose.model("notes-schema",notesSchema)