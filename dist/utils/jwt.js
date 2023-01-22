"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJSONToken = exports.generateWebTokenLogin = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SECRET_TOKEN = "ABCDEFGHIJKLMNOP_09876543210";
const generateWebTokenLogin = (payload) => {
    try {
        //setting up expires in to 24 Hour
        const data = jsonwebtoken_1.default.sign(payload, SECRET_TOKEN, { expiresIn: "24h" });
        return data;
    }
    catch (e) {
        throw e;
    }
};
exports.generateWebTokenLogin = generateWebTokenLogin;
/**
 *
 * @param token
 * @returns
 */
const verifyJSONToken = (token) => {
    return jsonwebtoken_1.default.verify(token, SECRET_TOKEN);
};
exports.verifyJSONToken = verifyJSONToken;
