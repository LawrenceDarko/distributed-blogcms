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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCommentsByPost = exports.createComment = void 0;
const blogPost_1 = require("../models/blogPost");
const comments_1 = require("../models/comments");
const createComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { postId, author, content, datePosted } = req.body;
        if (!postId || !author || !content) {
            return res.status(400).json({ status: 'error', message: 'Missing required fields', data: null });
        }
        const newComment = yield comments_1.CommentModel.create({
            postId,
            author,
            content,
            datePosted,
        });
        yield blogPost_1.BlogPostModel.findByIdAndUpdate(postId, { $push: { comments: newComment._id } });
        res.status(201).json({ status: 'success', message: 'Comment created successfully', data: { newComment } });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error', data: null });
    }
});
exports.createComment = createComment;
const getCommentsByPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const postId = req.params.postId;
        if (!postId) {
            return res.status(400).json({ status: 'error', message: 'Missing postId parameter', data: null });
        }
        const comments = yield comments_1.CommentModel.find({ postId }).populate('author').sort({ datePosted: -1 }).exec();
        res.json({ status: 'success', message: 'Comments retrieved successfully', data: comments });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error', data: null });
    }
});
exports.getCommentsByPost = getCommentsByPost;
