"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.login = exports.generateAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = require("../models/user");
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
const validator_1 = __importDefault(require("validator"));
dotenv_1.default.config();
const jwtSecret = process.env.ACCESS_TOKEN_SECRET;
const generateAccessToken = (userId, username) => {
    return jsonwebtoken_1.default.sign({ userId, username }, jwtSecret, {
        expiresIn: '24h'
    });
};
exports.generateAccessToken = generateAccessToken;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        // Validate user input
        if (!validator_1.default.isEmail(email)) {
            res.status(400).json({ error: 'Invalid email address' });
            return;
        }
        const user = yield user_1.UserModel.findOne({ email });
        if (!user || !bcrypt_1.default.compareSync(password, user.password)) {
            res.status(401).json({ error: 'Invalid username or password' });
            return;
        }
        const token = (0, exports.generateAccessToken)(user._id, user.username);
        const data = {
            token: token,
            userId: user._id,
            username: user.username,
        };
        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
            secure: false
        }).json({ status: 'success', message: 'Login successful', data });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.login = login;
const logout = (req, res) => {
    res.clearCookie('token').send('Cookie cleared successfully');
    return;
};
exports.logout = logout;
