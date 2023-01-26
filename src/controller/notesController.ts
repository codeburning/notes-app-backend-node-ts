import {Response} from 'express'
import {  NotesCreationBody } from '../types'
import { NotesService } from '../service/notesService'
import { CustomRequest } from '../middleware/auth'
import { Types } from 'mongoose'
import { getPagination, getPaginationData } from '../utils/pagiantio'
const noteService=new NotesService()
export class NotesController{
    async noteCreation(req:CustomRequest,res:Response){
        try{
            const token =req.token
            const loggedInUser =typeof token!=="string"? token?.["id"]:undefined
            const body:NotesCreationBody=req.body
            const data = await noteService.newNote({...body,noteDescription:body.description,createdBy:new Types.ObjectId(loggedInUser)})
            return res.json(data)
        }catch(e:any){
            return res.status(400).jsonp({error:true,message:e?.message||"Api Failed"})
        }
    }

    async noteList(req:CustomRequest,res:Response){
        try{
            const token =req.token
            const loggedInUser =typeof token!=="string"? token?.["id"]:undefined
            // if(!loggedInUser) throw new Error("Session")
            const page = Number(req.query.page)
            const {limit,skip} = getPagination(page, Number(req.query.size))
            const {count,records} = await noteService.getNotes({createdBy:new Types.ObjectId(loggedInUser)},limit,skip)
            const result = getPaginationData(count,page,limit,records)
            return res.json(result)
        }catch(e:any){
            return res.status(400).jsonp({error:true,message:e?.message||"Api request Failed"})
        }
    }

    async getSingleNote(req:CustomRequest,res:Response){
        try{
            const noteId = Types.ObjectId.isValid(req.params.id)?new Types.ObjectId(req.params.id):undefined
            if(!noteId) throw new Error("Invalid Id passed")
            //Need to check is this notes belong to this particular user also
            const token =req.token
            const loggedInUser =typeof token!=="string"? token?.["id"]:undefined
            const noteData = await noteService.getNoteById(noteId)
            if(noteData && String(noteData.createdBy)!==String(loggedInUser)) throw new Error("Forbidden")
            return res.json(noteData)
        }catch(e:any){
            return res.status(400).jsonp({error:true,message:e?.message||"Api failed"})
        }
    }

    async updateSingleNote(req:CustomRequest,res:Response){
        try{
            const noteId = Types.ObjectId.isValid(req.params.id)?new Types.ObjectId(req.params.id):undefined
            if(!noteId) throw new Error("Invalid Id passed")
            //Need to check is this notes belong to this particular user also
            const token =req.token
            const loggedInUser =typeof token!=="string"? token?.["id"]:undefined
            const noteData = await noteService.getNoteById(noteId)
            if(!noteData) throw new Error("Invalid request")
            if(String(noteData.createdBy)!==String(loggedInUser)) throw new Error("Forbidden")
            const body:NotesCreationBody=req.body
            const updated = await noteService.updateOneById({...body},noteData._id)
            return res.json(updated)
        }catch(e:any){
            return res.status(400).jsonp({error:true,message:e?.message||"Api failed"})

        }
    }

    async deleteNotes(req:CustomRequest,res:Response){
        try{
            const noteId = Types.ObjectId.isValid(req.params.id)?new Types.ObjectId(req.params.id):undefined
            if(!noteId) throw new Error("Invalid Id passed")
            const token =req.token
            const loggedInUser =typeof token!=="string"? token?.["id"]:undefined
            const result = await noteService.deleteOneUSingFilter({_id:noteId,createdBy:new Types.ObjectId(loggedInUser)})
            return res.jsonp(result)
        }catch(e:any){
            return res.status(400).jsonp({error:true,message:e?.message||"Api failed"})

        }
    }

   
}