"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//database connection
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("../config");
const mongoURL = `mongodb://${config_1.appConfig.mongoUser}:${config_1.appConfig.mongoPassword}@${config_1.appConfig.mongoHost}:${config_1.appConfig.mongoPort}/?retryWrites=true&w=majority&authSource=admin&tls=false`;
const databaseConnection = (result) => {
    mongoose_1.default.connect(mongoURL, { dbName: "keeps-data" }).then(() => {
        return result(null);
    }).catch(e => {
        console.log("Error", e);
        return result("Error failed to connected");
    });
    mongoose_1.default.Promise = global.Promise;
};
exports.default = databaseConnection;
