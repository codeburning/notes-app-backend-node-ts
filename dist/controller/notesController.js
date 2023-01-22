"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotesController = void 0;
const notesService_1 = require("../service/notesService");
const mongoose_1 = require("mongoose");
const noteService = new notesService_1.NotesService();
class NotesController {
    async noteCreation(req, res) {
        try {
            const token = req.token;
            const loggedInUser = typeof token !== "string" ? token === null || token === void 0 ? void 0 : token["id"] : undefined;
            const body = req.body;
            const data = await noteService.newNote(Object.assign(Object.assign({}, body), { noteDescription: body.description, createdBy: new mongoose_1.Types.ObjectId(loggedInUser) }));
            return res.json(data);
        }
        catch (e) {
            return res.status(400).jsonp({ error: true, message: (e === null || e === void 0 ? void 0 : e.message) || "Api Failed" });
        }
    }
}
exports.NotesController = NotesController;
