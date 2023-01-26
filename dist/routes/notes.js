"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const notesController_1 = require("../controller/notesController");
const notesValidator_1 = require("../validator/notesValidator");
const auth_1 = require("../middleware/auth");
const notesHandler = new notesController_1.NotesController();
// export 
const notesRoutes = (0, express_1.Router)();
//Create end point
// Will add auth middleware to prevent unAuth access to this end point
// and through middleware will get the logged in user details from user JSON webtoken 
notesRoutes.post("/", auth_1.authMiddleware, notesValidator_1.noteValidator, notesHandler.noteCreation);
//Get lsit of notes 
notesRoutes.get("/", auth_1.authMiddleware, notesValidator_1.noteGetRequestValidator, notesHandler.noteList);
//single note view
notesRoutes.get("/:id", auth_1.authMiddleware, notesHandler.getSingleNote);
//Edit single note
notesRoutes.put("/:id", auth_1.authMiddleware, notesValidator_1.noteValidator, notesHandler.updateSingleNote);
//Edit single note
notesRoutes.delete("/:id", auth_1.authMiddleware, notesHandler.deleteNotes);
exports.default = notesRoutes;
