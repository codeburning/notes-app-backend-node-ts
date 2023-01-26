"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noteGetRequestValidator = exports.noteValidator = void 0;
const express_validator_1 = require("express-validator");
exports.noteValidator = [
    (0, express_validator_1.body)("title").isString().withMessage("Title should be of alpha nemeric value"),
    (0, express_validator_1.body)("description").isString(),
    (0, express_validator_1.body)("images").isArray().custom((val, { req }) => {
        // TODO will add check if passed should be a valid image URL
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
