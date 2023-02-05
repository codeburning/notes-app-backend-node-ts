"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const fs_1 = require("fs");
const path_1 = require("path");
const auth_1 = require("../middleware/auth");
const imagekit_1 = require("../config/imagekit");
const mediaRoutes = (0, express_1.Router)();
//Folder where file will get stored for temporary
let dir = (0, path_1.join)(__dirname, '../../uploads/');
//Check is folder exist
if (!(0, fs_1.existsSync)(dir)) {
    (0, fs_1.mkdirSync)(dir);
}
const fileStorage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, dir);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "_" + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + file.originalname);
    },
});
//File fileter can be used to add limit
const uploader = (0, multer_1.default)({ storage: fileStorage });
//Endpoint will support single file at one time
//Currnttely not added any upper media file size limit
//Or Media file type
mediaRoutes.post("/upload", auth_1.authMiddleware, uploader.single("file"), async (req, res) => {
    try {
        // const 
        const file = req.file;
        if (!file)
            throw new Error("File upload failed");
        //Upload to image kit 
        const url = await imagekit_1.imagekit.upload({ file: (0, fs_1.readFileSync)(file.path),
            fileName: file.filename, });
        // Delete from file storage
        (0, fs_1.unlinkSync)(file.path);
        return res.json({ error: false, url: url.url });
    }
    catch (e) {
        return res.status(400).jsonp({ error: true, message: (e === null || e === void 0 ? void 0 : e["message"]) || "Failed" });
    }
});
exports.default = mediaRoutes;
