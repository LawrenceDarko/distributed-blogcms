// src/controllers/authController.ts
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { UserModel } from '../models/user';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import validator from 'validator';

dotenv.config(); 


const jwtSecret = process.env.ACCESS_TOKEN_SECRET as string;

export const generateAccessToken = (userId: any, username: string) => {
    return jwt.sign({userId, username}, jwtSecret, {
        expiresIn: '24h'
    })
}

export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;

        // Validate user input
        if (!validator.isEmail(email)) {
            res.status(400).json({ error: 'Invalid email address' });
            return;
        }

        const user = await UserModel.findOne({ email });

        if (!user || !bcrypt.compareSync(password, user.password)) {
            res.status(401).json({ error: 'Invalid username or password' });
            return;
        }
        
        const token = generateAccessToken(user._id, user.username);

        

        const data = {
            token: token,
            userId: user._id,
            username: user.username,
        }
        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
            secure: false
        }).json({status: 'success', message: 'Login successful', data });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const logout = (req: Request, res: Response): void => {
        res.clearCookie('token').send('Cookie cleared successfully');
        return;
    };
