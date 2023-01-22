import { Router } from "express";
import { NotesController } from "../controller/notesController";
import { noteValidator } from "../validator/notesValidator";
import { authMiddleware } from "../middleware/auth";
const notesHandler = new NotesController()
// export 
const notesRoutes = Router()
//Create end point
// Will add auth middleware to prevent unAuth access to this end point
// and through middleware will get the logged in user details from user JSON webtoken 
notesRoutes.post("/",authMiddleware, noteValidator, notesHandler.noteCreation)
export default notesRoutes