import { Router } from "express";
import { NotesController } from "../controller/notesController";
import { noteGetRequestValidator, noteValidator } from "../validator/notesValidator";
import { authMiddleware } from "../middleware/auth";
const notesHandler = new NotesController()
// export 
const notesRoutes = Router()
//Create end point
// Will add auth middleware to prevent unAuth access to this end point
// and through middleware will get the logged in user details from user JSON webtoken 
notesRoutes.post("/",authMiddleware, noteValidator, notesHandler.noteCreation)

//Get lsit of notes 
notesRoutes.get("/", authMiddleware, noteGetRequestValidator, notesHandler.noteList)
//single note view

notesRoutes.get("/:id",authMiddleware,notesHandler.getSingleNote)

//Edit single note
notesRoutes.put("/:id",authMiddleware,noteValidator,notesHandler.updateSingleNote)


//Edit single note
notesRoutes.delete("/:id",authMiddleware,notesHandler.deleteNotes)
export default notesRoutes