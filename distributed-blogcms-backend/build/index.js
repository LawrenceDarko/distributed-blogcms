"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
// src/index.ts
const mongoose = require('mongoose');
// const express = require('express');
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const database_1 = require("./database/database");
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const blogPostRoutes_1 = __importDefault(require("./routes/blogPostRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config();
exports.app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
    throw new Error('MongoDB URI is not defined in the environment variables.');
}
const databaseInstance = database_1.Database.getInstance();
// Singleton Connection
databaseInstance.connect(MONGO_URI)
    .then(() => {
    exports.app.set('trust proxy', true);
    exports.app.use(body_parser_1.default.json());
    exports.app.use((0, cookie_parser_1.default)());
    exports.app.use(body_parser_1.default.urlencoded({ extended: true }));
    exports.app.use((0, cors_1.default)({
        origin: 'http://localhost:3000',
        credentials: true,
    }));
    exports.app.use("/images", express_1.default.static(path_1.default.join(process.cwd(), 'uploads')));
    exports.app.use('/api/users', userRoutes_1.default);
    exports.app.use('/api/blogposts', blogPostRoutes_1.default);
    exports.app.use('/api/auth', authRoutes_1.default);
    exports.app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
})
    .catch((error) => {
    console.log(error);
    console.error('Failed to connect to MongoDB. Exiting application.');
    process.exit(1);
});
// Normal Connection
// mongoose.connect(process.env.MONGO_URI, {
//     // useNewUrlParser: true,
//     // useUnifiedTopology: true
// })
// .then(() => {
//     app.use(bodyParser.json());
//     app.use(cookieParser())
//     app.use(bodyParser.urlencoded({ extended: true }));
//     app.use(cors({
//         origin:'http://localhost:3000', 
//         credentials:true,        
//     }));
//     app.use("/images",
//     express.static(path.join(process.cwd(), 'uploads'))
// )
//     app.use('/users', userRoutes);
//     app.use('/blogposts', blogPostRoutes);
//     app.use('/auth', authRoutes);
//     app.listen(PORT, () => {
//         console.log(`Server is running on http://localhost:${PORT}`);
//     });
// })
// .catch((error: any)=>{
//     console.log('db connect error:',error.message)
// })
