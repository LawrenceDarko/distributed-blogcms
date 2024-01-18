import { Request, Response } from 'express';
import { BlogPostModel } from '../models/blogPost';
import { CommentModel } from '../models/comments';

export const createComment = async (req: Request, res: Response) => {
    try {
        const { postId, author, content, datePosted } = req.body;

        if (!postId || !author || !content) {
            return res.status(400).json({ status: 'error', message: 'Missing required fields', data: null });
        }

        const newComment = await CommentModel.create({
            postId,
            author,
            content,
            datePosted,
        });

        await BlogPostModel.findByIdAndUpdate(postId, { $push: { comments: newComment._id } });

        res.status(201).json({ status: 'success', message: 'Comment created successfully', data: { newComment } });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error', data: null });
    }
};

export const getCommentsByPost = async (req: Request, res: Response) => {
    try {
        const postId = req.params.postId;

        if (!postId) {
            return res.status(400).json({ status: 'error', message: 'Missing postId parameter', data: null });
        }

        const comments = await CommentModel.find({ postId }).populate('author').sort({ datePosted: -1 }).exec();

        res.json({ status: 'success', message: 'Comments retrieved successfully', data: comments });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error', data: null });
    }
};
