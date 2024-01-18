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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = require("../models/user");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const jwtSecret = process.env.ACCESS_TOKEN_SECRET;
const jwtRefreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
const protect = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = req.headers.authorization;
    const refreshToken = req.cookies['refreshToken'];
    let token;
    if (authHeader && authHeader.startsWith('Bearer')) {
        try {
            // Get token from header
            token = authHeader.split(' ')[1];
            // verify token
            const decoded = jsonwebtoken_1.default.verify(token, jwtSecret);
            if (decoded.exp * 1000 < Date.now()) {
                return res.status(401).json({ message: 'Token expired' });
            }
            req.user = yield user_1.UserModel.findById(decoded.userId).select('-password');
            // This also works
            // req.body.user = await User.findById(decoded.userId).select('-password');
            next();
        }
        catch (error) {
            console.log(error);
            // res.status(403).json('Not authorized, token invalid');
            res.redirect('http://localhost:3000/auth/login');
        }
    }
    if (!token) {
        res.status(401).json('Not authorized, no token');
    }
});
exports.default = protect;
// Or do this
// const protect = async(req: AuthenticatedRequest, res: Response, next: NextFunction) => {
//     const authHeader = req.headers.authorization;
//     const refreshToken = req.cookies['refreshToken'];
//     let token
//     if(authHeader && authHeader.startsWith('Bearer')){
//         try {
//             // Get token from header
//             token = authHeader.split(' ')[1];
//             // verify token
//             const decoded = jwt.verify(token, jwtSecret) as JwtPayload;
//             // req.user = await User.findById(decoded.userId).select('-password');
//             // This also works
//             req.body.user = await User.findById(decoded.userId).select('-password');
//             next()
//         } catch (error) {
//             console.log(error);
//             res.status(403).json('Not authorized, token invalid');
//             // if (!refreshToken) {
//             //     return res.status(401).send('Access Denied. No refresh token provided.');
//             // }
//             // return res.redirect('/refresh')
//         }
//     }
//     if(!token && !refreshToken){
//         res.status(401).json('Not authorized, no token')
//     }
// }
// export default protect