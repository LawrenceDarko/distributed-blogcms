"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUsers = exports.createUser = void 0;
const user_1 = require("../models/user");
const bcrypt_1 = __importDefault(require("bcrypt"));
const validator_1 = __importDefault(require("validator"));
const createUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        // Validate user input
        if (!validator_1.default.isEmail(email)) {
            res.status(400).json({ error: 'Invalid email address' });
            return;
        }
        // Check if the user already exists
        const existingUser = await user_1.UserModel.findOne({ email });
        if (existingUser) {
            res.status(400).json({ status: 'error', error: 'User already exists' });
            return; // Exit the function early if the user already exists
        }
        // Hash the password before storing it
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        await user_1.UserModel.create({ username, email, password: hashedPassword });
        res.status(201).json({ status: 'success', message: 'User created successfully' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', error: 'Internal Server Error' });
    }
};
exports.createUser = createUser;
const getAllUsers = async (req, res) => {
    try {
        const allUsers = await user_1.UserModel.find();
        res.json(allUsers);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.getAllUsers = getAllUsers;
