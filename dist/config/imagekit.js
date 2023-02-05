"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.imagekit = void 0;
const imageKitconfig = {
    publicKey: "public_6oeT72Gg0m35ZhLXxeTI6WwQpBI=",
    privateKey: "private_e2VrS7dPJ4U7ZnexRx0r3SQo2zA=",
    urlEndPoint: "https://ik.imagekit.io/burningcode"
};
const imagekit_1 = __importDefault(require("imagekit"));
exports.imagekit = new imagekit_1.default({
    publicKey: imageKitconfig.publicKey,
    privateKey: imageKitconfig.privateKey,
    urlEndpoint: imageKitconfig.urlEndPoint
});
