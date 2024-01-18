"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCommentsByPost = exports.createComment = void 0;
const blogPost_1 = require("../models/blogPost");
const comments_1 = require("../models/comments");
const createComment = async (req, res) => {
    try {
        const { postId, author, content, datePosted } = req.body;
        if (!postId || !author || !content) {
            return res.status(400).json({ status: 'error', message: 'Missing required fields', data: null });
        }
        const newComment = await comments_1.CommentModel.create({
            postId,
            author,
            content,
            datePosted,
        });
        await blogPost_1.BlogPostModel.findByIdAndUpdate(postId, { $push: { comments: newComment._id } });
        res.status(201).json({ status: 'success', message: 'Comment created successfully', data: { newComment } });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error', data: null });
    }
};
exports.createComment = createComment;
const getCommentsByPost = async (req, res) => {
    try {
        const postId = req.params.postId;
        if (!postId) {
            return res.status(400).json({ status: 'error', message: 'Missing postId parameter', data: null });
        }
        const comments = await comments_1.CommentModel.find({ postId }).populate('author').sort({ datePosted: -1 }).exec();
        res.json({ status: 'success', message: 'Comments retrieved successfully', data: comments });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error', data: null });
    }
};
exports.getCommentsByPost = getCommentsByPost;
