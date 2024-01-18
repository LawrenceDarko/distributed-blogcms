// src/controllers/userController.ts
import { Request, Response } from 'express';
import { UserModel } from '../models/user';
import bcrypt from 'bcrypt';
import validator from 'validator';

export const createUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { username, email, password } = req.body;

        // Validate user input
        if (!validator.isEmail(email)) {
            res.status(400).json({ error: 'Invalid email address' });
            return;
        }

        // Check if the user already exists
        const existingUser = await UserModel.findOne({ email })
        if (existingUser) {
            res.status(400).json({ status: 'error', error: 'User already exists' });
            return;  // Exit the function early if the user already exists
        
        }
        // Hash the password before storing it
        const hashedPassword = await bcrypt.hash(password, 10);

        await UserModel.create({ username, email, password: hashedPassword });

        res.status(201).json({status: 'success', message: 'User created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({status: 'error', error: 'Internal Server Error' });
    }
};

export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const allUsers = await UserModel.find();
        res.json(allUsers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
