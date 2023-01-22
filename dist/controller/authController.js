"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const bcrypt_1 = require("../utils/bcrypt");
const userService_1 = require("../service/userService");
const jwt_1 = require("../utils/jwt");
const userService = new userService_1.UserService();
class AuthController {
    async registerAcount(req, res) {
        try {
            const body = req.body;
            const passwordHash = (0, bcrypt_1.generateHash)(body.password);
            // console.log({passwordHash})
            // Now need to save into DB
            const data = await userService.newUser(Object.assign(Object.assign({}, body), { password: passwordHash }));
            // @TODO need to send email with verification link 
            // will add later
            return res.jsonp(data);
        }
        catch (e) {
            // console.log(e?.message)
            return res.status(400).jsonp({ error: true, message: (e === null || e === void 0 ? void 0 : e.message) || "Server side error" });
        }
    }
    async loginToAccount(req, res) {
        try {
            const body = req.body;
            const data = await userService.getUserByEmail(body.email);
            if (!data)
                return res.status(404).jsonp({ error: true, message: "Auth failed, Email is not registered" });
            // Here user found in database with body.email
            const flag = (0, bcrypt_1.compareHash)(body.password, (data === null || data === void 0 ? void 0 : data.password) || "");
            if (!flag)
                return res.status(400).json({ error: false, message: "Auth failed" });
            /**
             * Now we will generate JSON Web token
             */
            const token = (0, jwt_1.generateWebTokenLogin)({ id: data._id, email: body.email });
            const payload = { user: { firstName: data.firstName, lastName: data.lastName, email: data.email }, token: token };
            return res.status(200).json(payload);
        }
        catch (e) {
            return res.status(400).jsonp({ error: true, message: (e === null || e === void 0 ? void 0 : e.message) || "Server side error" });
        }
    }
}
exports.AuthController = AuthController;
