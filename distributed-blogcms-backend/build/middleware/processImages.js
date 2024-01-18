"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const multer_1 = __importDefault(require("multer"));
const limits = {
    fileSize: 4 * 1024 * 1024, // Limit file size to 4MB
};
const fileFilter = (req, file, cb) => {
    // Check if the uploaded file is an image
    if (file.mimetype.startsWith("image/")) {
        cb(null, true); // Accept the file
    }
    else {
        cb(new Error("Only image files are allowed.")); // Reject the file
    }
};
// Set up Multer storage
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        const destinationPath = path_1.default.join(process.cwd(), "uploads");
        cb(null, destinationPath); // Specify the directory where you want to save the files
    },
    filename: function (req, file, cb) {
        const ext = path_1.default.extname(file.originalname);
        const fileName = file.originalname.replace(ext, "");
        cb(null, `${fileName}-${Date.now()}${ext}`);
    },
});
// Create the multer middleware
const upload = (0, multer_1.default)({ storage, limits, fileFilter });
const processImage = (fileInputName) => {
    return upload.single(fileInputName);
};
exports.default = processImage;
