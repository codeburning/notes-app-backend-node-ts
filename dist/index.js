"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = require("./config");
const routes_1 = __importDefault(require("./routes"));
const connection_1 = __importDefault(require("./database/connection"));
// Express app
const app = (0, express_1.default)();
app.use(express_1.default.json());
// app.use(express)
const PORT = config_1.appConfig.port;
app.use("/v1", routes_1.default);
//Base URL 
app.get("/", (req, res) => {
    return res.json({ error: false, message: "SERVER IS OK" });
});
// All app routes
app.listen(PORT, () => {
    console.log("Sever started at ", PORT);
    (0, connection_1.default)((e) => {
        if (e) {
            console.log("Error", e);
            process.kill(1);
        }
        else {
            console.log("Database connected ");
        }
    });
});
