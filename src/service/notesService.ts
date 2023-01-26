import notes from "../schema/notes"
import {Types} from 'mongoose'
export class NotesService{
   /**
    * 
    * @param option 
    * @returns 
    */
    async newNote(option:{[key:string]:any}){
        try{
            const x = new notes(option)
            return await x.save()
        }catch(e){
            throw e
        }
    }

    async getNotes(filter:{[key:string]:any},limit:number,skip:number){
        try{
            const c = notes.count(filter)
            //Sort the notes on last createdAt 
            const r =  notes.find({...filter}).limit(limit).skip(skip).sort({createdAt:-1})
            const [count,records] =await  Promise.all([c,r])
            return {count,records}
        }catch(e){
            throw e
        }
    }

    async getNoteById(id:Types.ObjectId){
        return await notes.findById(id)
    }

    async updateOneById(option:{[key:string]:any},id:Types.ObjectId){
        return await notes.findByIdAndUpdate(id,option,{new:true})
    }

    async deleteOneUSingFilter(filter:{[key:string]:any}){
        return await notes.findOneAndRemove({...filter})
    }
}