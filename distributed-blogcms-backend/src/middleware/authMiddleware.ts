import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserModel } from '../models/user';
import dotenv from 'dotenv';
dotenv.config();

const jwtSecret = process.env.ACCESS_TOKEN_SECRET as string;
const jwtRefreshTokenSecret = process.env.REFRESH_TOKEN_SECRET as string

interface JwtPayload {
    userId: string;
    exp: any
}

interface AuthenticatedRequest extends Request {
    user?: any;
}



const protect = async(req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    // const refreshToken = req.cookies['refreshToken'];
    
    let token
    if(authHeader && authHeader.startsWith('Bearer')){
        try {
            // Get token from header
            token = authHeader.split(' ')[1];

            // verify token
            const decoded = jwt.verify(token, jwtSecret) as JwtPayload;

            if(decoded.exp * 1000 < Date.now()){
                return res.status(401).json({message: 'Token expired'})
            }

            req.user = await UserModel.findById(decoded.userId).select('-password');
            // This also works
            // req.body.user = await User.findById(decoded.userId).select('-password');
            next()
        } catch (error) {
            console.log(error);
            // res.status(403).json('Not authorized, token invalid');
            res.redirect('http://localhost:3000/auth/login')
        }
    }

    if(!token){
        res.status(401).json('Not authorized, no token')
    }
}

export default protect

