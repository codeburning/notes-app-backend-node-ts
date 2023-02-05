"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.noteGetRequestValidator = exports.noteValidator = void 0;
const express_validator_1 = require("express-validator");
const validator = __importStar(require("validator"));
exports.noteValidator = [
    (0, express_validator_1.body)("title").isString().withMessage("Title should be of alpha nemeric value"),
    (0, express_validator_1.body)("description").isString(),
    (0, express_validator_1.body)("images").isArray().custom((val, { req }) => {
        // TODO will add check if passed should be a valid image URL
        val.forEach(e => {
            const flag = validator.default.isURL(e);
            if (!flag)
                throw new Error("Image url is not valid");
        });
        return true;
    }),
    async (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty())
            return res.status(400).json(errors);
        next();
    }
];
exports.noteGetRequestValidator = [
    (0, express_validator_1.query)("page").custom((val, { req }) => {
        if (isNaN(val))
            throw new Error("Page value should be a numeric value");
        if (Number(val) < 1)
            throw new Error("Minimum value should be 1");
        return true;
    }),
    (0, express_validator_1.query)("size").isNumeric(),
    // query("size")
    async (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty())
            return res.status(400).json(errors);
        next();
    }
];
