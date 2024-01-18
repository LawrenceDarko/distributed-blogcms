"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/blogPostRoutes.ts
const express_1 = __importDefault(require("express"));
const blogPostController_1 = require("../controllers/blogPostController");
const processImages_1 = __importDefault(require("../middleware/processImages"));
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const commentsController_1 = require("../controllers/commentsController");
const router = express_1.default.Router();
// more general routes first
router.get('/', blogPostController_1.getAllBlogPosts);
router.post('/create', authMiddleware_1.default, (0, processImages_1.default)('image'), blogPostController_1.createBlogPost);
router.patch('/:slug', authMiddleware_1.default, (0, processImages_1.default)('image'), blogPostController_1.updateBlogPost);
router.delete('/:id', blogPostController_1.deleteBlogPost);
// more specific routes later
router.get('/author/:authorId', blogPostController_1.getAllBlogPostsByAuthorId);
router.get('/slug/:slug', blogPostController_1.getBlogPostBySlug);
router.post('/comments/create', authMiddleware_1.default, commentsController_1.createComment);
router.get('/comments/:postId', commentsController_1.getCommentsByPost);
exports.default = router;
