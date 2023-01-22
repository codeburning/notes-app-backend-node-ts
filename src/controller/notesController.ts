import {Request,Response} from 'express'
import { AuthTokenPayload, NotesCreationBody } from '../types'
import { NotesService } from '../service/notesService'
import { CustomRequest } from '../middleware/auth'
import { Types } from 'mongoose'
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
}