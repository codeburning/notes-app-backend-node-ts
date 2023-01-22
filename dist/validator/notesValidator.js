"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noteValidator = void 0;
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
