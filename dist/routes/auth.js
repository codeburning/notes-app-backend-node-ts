"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controller/authController");
const authValidator_1 = require("../validator/authValidator");
const authRoutes = (0, express_1.Router)();
const authHandler = new authController_1.AuthController;
//Register end point
authRoutes.post("/register", authValidator_1.registerValidator, authHandler.registerAcount);
//Login end point
authRoutes.post("/login", authValidator_1.loginValidator, authHandler.loginToAccount);
exports.default = authRoutes;
