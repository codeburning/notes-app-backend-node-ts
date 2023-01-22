"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const user_1 = __importDefault(require("../schema/user"));
class UserService {
    /**
     * new user
     * @param option
     * @returns
     */
    async newUser(option) {
        try {
            const x = new user_1.default(option);
            return await x.save();
        }
        catch (e) {
            throw e;
        }
    }
    async getUserByEmail(email) {
        return await user_1.default.findOne({ email });
    }
}
exports.UserService = UserService;
