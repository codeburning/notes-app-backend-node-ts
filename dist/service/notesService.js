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
    async getNotes(filter, limit, skip) {
        try {
            const c = notes_1.default.count(filter);
            //Sort the notes on last createdAt 
            const r = notes_1.default.find(Object.assign({}, filter)).limit(limit).skip(skip).sort({ createdAt: -1 });
            const [count, records] = await Promise.all([c, r]);
            return { count, records };
        }
        catch (e) {
            throw e;
        }
    }
    async getNoteById(id) {
        return await notes_1.default.findById(id);
    }
    async updateOneById(option, id) {
        return await notes_1.default.findByIdAndUpdate(id, option, { new: true });
    }
    async deleteOneUSingFilter(filter) {
        return await notes_1.default.findOneAndRemove(Object.assign({}, filter));
    }
}
exports.NotesService = NotesService;
