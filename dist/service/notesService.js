"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotesService = void 0;
const notes_1 = __importDefault(require("../schema/notes"));
class NotesService {
    /**
     *
     * @param option
     * @returns
     */
    async newNote(option) {
        try {
            const x = new notes_1.default(option);
            return await x.save();
        }
        catch (e) {
            throw e;
        }
    }
}
exports.NotesService = NotesService;
