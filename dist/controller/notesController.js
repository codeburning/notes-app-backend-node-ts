"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotesController = void 0;
const notesService_1 = require("../service/notesService");
const mongoose_1 = require("mongoose");
const pagiantio_1 = require("../utils/pagiantio");
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
    async noteList(req, res) {
        try {
            const token = req.token;
            const loggedInUser = typeof token !== "string" ? token === null || token === void 0 ? void 0 : token["id"] : undefined;
            // if(!loggedInUser) throw new Error("Session")
            const page = Number(req.query.page);
            const { limit, skip } = (0, pagiantio_1.getPagination)(page, Number(req.query.size));
            const { count, records } = await noteService.getNotes({ createdBy: new mongoose_1.Types.ObjectId(loggedInUser) }, limit, skip);
            const result = (0, pagiantio_1.getPaginationData)(count, page, limit, records);
            return res.json(result);
        }
        catch (e) {
            return res.status(400).jsonp({ error: true, message: (e === null || e === void 0 ? void 0 : e.message) || "Api request Failed" });
        }
    }
    async getSingleNote(req, res) {
        try {
            const noteId = mongoose_1.Types.ObjectId.isValid(req.params.id) ? new mongoose_1.Types.ObjectId(req.params.id) : undefined;
            if (!noteId)
                throw new Error("Invalid Id passed");
            //Need to check is this notes belong to this particular user also
            const token = req.token;
            const loggedInUser = typeof token !== "string" ? token === null || token === void 0 ? void 0 : token["id"] : undefined;
            const noteData = await noteService.getNoteById(noteId);
            if (noteData && String(noteData.createdBy) !== String(loggedInUser))
                throw new Error("Forbidden");
            return res.json(noteData);
        }
        catch (e) {
            return res.status(400).jsonp({ error: true, message: (e === null || e === void 0 ? void 0 : e.message) || "Api failed" });
        }
    }
    async updateSingleNote(req, res) {
        try {
            const noteId = mongoose_1.Types.ObjectId.isValid(req.params.id) ? new mongoose_1.Types.ObjectId(req.params.id) : undefined;
            if (!noteId)
                throw new Error("Invalid Id passed");
            //Need to check is this notes belong to this particular user also
            const token = req.token;
            const loggedInUser = typeof token !== "string" ? token === null || token === void 0 ? void 0 : token["id"] : undefined;
            const noteData = await noteService.getNoteById(noteId);
            if (!noteData)
                throw new Error("Invalid request");
            if (String(noteData.createdBy) !== String(loggedInUser))
                throw new Error("Forbidden");
            const body = req.body;
            const updated = await noteService.updateOneById(Object.assign({}, body), noteData._id);
            return res.json(updated);
        }
        catch (e) {
            return res.status(400).jsonp({ error: true, message: (e === null || e === void 0 ? void 0 : e.message) || "Api failed" });
        }
    }
    async deleteNotes(req, res) {
        try {
            const noteId = mongoose_1.Types.ObjectId.isValid(req.params.id) ? new mongoose_1.Types.ObjectId(req.params.id) : undefined;
            if (!noteId)
                throw new Error("Invalid Id passed");
            const token = req.token;
            const loggedInUser = typeof token !== "string" ? token === null || token === void 0 ? void 0 : token["id"] : undefined;
            const result = await noteService.deleteOneUSingFilter({ _id: noteId, createdBy: new mongoose_1.Types.ObjectId(loggedInUser) });
            return res.jsonp(result);
        }
        catch (e) {
            return res.status(400).jsonp({ error: true, message: (e === null || e === void 0 ? void 0 : e.message) || "Api failed" });
        }
    }
}
exports.NotesController = NotesController;
