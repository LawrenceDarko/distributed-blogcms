// src/routes/blogPostRoutes.ts
import express from 'express';
import { createBlogPost, deleteBlogPost, getAllBlogPosts, getAllBlogPostsByAuthorId, getBlogPostBySlug, updateBlogPost } from '../controllers/blogPostController';
import processImage from '../middleware/processImages';
import protect from '../middleware/authMiddleware';
import { createComment, getCommentsByPost } from '../controllers/commentsController';

const router = express.Router();

// more general routes first
router.get('/', getAllBlogPosts);
router.post('/create', protect, processImage('image'), createBlogPost);
router.patch('/:slug', protect, processImage('image'), updateBlogPost);
router.delete('/:id', deleteBlogPost);

// more specific routes later
router.get('/author/:authorId', getAllBlogPostsByAuthorId);
router.get('/slug/:slug', getBlogPostBySlug);

router.post('/comments/create', protect, createComment);
router.get('/comments/:postId', getCommentsByPost);



export default router;
