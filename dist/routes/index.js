"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = __importDefault(require("./auth"));
const notes_1 = __importDefault(require("./notes"));
const appRoutes = (0, express_1.Router)();
//Register post request will be handled here
//Added registervalidator as middleware to validate required body
appRoutes.use("/auth", auth_1.default);
//Notes CRUD end points
appRoutes.use("/notes", notes_1.default);
exports.default = appRoutes;
