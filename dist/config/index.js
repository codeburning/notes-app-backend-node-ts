"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.appConfig = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.appConfig = {
    port: process.env.PORT || 8081,
    mongoHost: process.env.MONGODB_DB_HOST,
    mongoPort: process.env.MONGO_DB_PORT,
    mongoUser: process.env.MONGO_DB_USER,
    mongoPassword: process.env.MONGO_DB_PWD
};
