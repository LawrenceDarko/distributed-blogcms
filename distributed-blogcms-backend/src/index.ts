// src/index.ts
const mongoose = require('mongoose');
// const express = require('express');
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { Database } from './database/database'; 
import authRoutes from './routes/authRoutes';
import blogPostRoutes from './routes/blogPostRoutes';
import userRoutes from './routes/userRoutes';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import protect from './middleware/authMiddleware';

dotenv.config(); 

export const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI: string | undefined = process.env.MONGO_URI;

if (!MONGO_URI) {
    throw new Error('MongoDB URI is not defined in the environment variables.');
}

const databaseInstance = Database.getInstance();

// Singleton Connection
databaseInstance.connect(MONGO_URI)
    .then(() => {

        app.set('trust proxy', true);
        app.use(bodyParser.json());
        app.use(cookieParser())
        app.use(bodyParser.urlencoded({ extended: true }));

        app.use(cors({
            origin:'http://localhost:3000', 
            credentials:true,        
        }));

        app.use("/images",
        express.static(path.join(process.cwd(), 'uploads'))
        )

        app.use('/api/users', userRoutes);
        app.use('/api/blogposts', blogPostRoutes);
        app.use('/api/auth', authRoutes);

        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    })
    .catch((error: any) => {
        console.log(error)
        console.error('Failed to connect to MongoDB. Exiting application.');
        process.exit(1);
    });


