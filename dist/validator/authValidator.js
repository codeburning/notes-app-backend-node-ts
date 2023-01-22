"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginValidator = exports.registerValidator = void 0;
const express_validator_1 = require("express-validator");
// Register account validator 
exports.registerValidator = [
    (0, express_validator_1.body)("email").isEmail(),
    (0, express_validator_1.body)("password").isStrongPassword({ minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1 }),
    (0, express_validator_1.body)("firstName").isAlpha(),
    (0, express_validator_1.body)("lastName").isAlpha(),
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        // console.log({errors})
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];
//Login body validator
exports.loginValidator = [
    (0, express_validator_1.body)("email").isEmail(),
    (0, express_validator_1.body)("password").isStrongPassword({ minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1 }),
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        // console.log({errors})
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];
