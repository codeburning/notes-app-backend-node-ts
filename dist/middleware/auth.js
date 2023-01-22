"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jwt_1 = require("../utils/jwt");
const authMiddleware = (req, res, next) => {
    var _a, _b;
    try {
        const authHeader = ((_a = req.headers) === null || _a === void 0 ? void 0 : _a["authorization"]) || ((_b = req === null || req === void 0 ? void 0 : req.headers) === null || _b === void 0 ? void 0 : _b["Authorization"]) || undefined;
        if (!authHeader || typeof authHeader !== "string")
            throw new Error("Auth failed, token not present in header authorization");
        const payload = (0, jwt_1.verifyJSONToken)(authHeader);
        req.token = payload;
        next();
    }
    catch (e) {
        return res.status(401).jsonp({ error: true, message: (e === null || e === void 0 ? void 0 : e.message) || "Forbidden" });
    }
};
exports.authMiddleware = authMiddleware;
