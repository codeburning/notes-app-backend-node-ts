"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compareHash = exports.generateHash = void 0;
// import {} from 'brcypt'
const bcrypt_1 = require("bcrypt");
const SALT_ROUND = 10;
/**
 *  Generate brcypt hash
 * @param str
 * @returns
 */
const generateHash = (str) => {
    const salt = (0, bcrypt_1.genSaltSync)(SALT_ROUND);
    return (0, bcrypt_1.hashSync)(str, salt);
};
exports.generateHash = generateHash;
const compareHash = (str, hashString) => {
    return (0, bcrypt_1.compareSync)(str, hashString);
};
exports.compareHash = compareHash;
