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
exports.deleteBlogPost = exports.updateBlogPost = exports.getAllBlogPostsByAuthorId = exports.getBlogPostBySlug = exports.getAllBlogPosts = exports.createBlogPost = void 0;
const blogPost_1 = require("../models/blogPost");
const cache_1 = require("../cache/cache");
// import { Cache } from '../cache/cache';
const fs_1 = __importDefault(require("fs"));
const createBlogPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let blogImage = null;
        const { title, author, content, slug, tags, datePosted, category } = req.body;
        if (req.file) {
            const uploadedImage = req.file;
            blogImage = uploadedImage.filename;
        }
        if (!title || !author || !content || !slug || !tags)
            return res.status(400).json({ status: 'error', message: 'Missing required fields', data: null });
        const newBlogPost = yield blogPost_1.BlogPostModel.create({
            title,
            author,
            category,
            content,
            slug,
            tags,
            image: blogImage,
            datePosted,
        });
        res.status(201).json({ status: 'success', message: 'Blog post created successfully', data: { newBlogPost } });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error', data: null });
    }
});
exports.createBlogPost = createBlogPost;
const getAllBlogPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const cache = new Cache();
    try {
        const cachedData = yield cache_1.cache.get('allBlogPosts');
        // console.log("CACHED DATA:", cachedData)
        // const cachedData = false;
        if (cachedData) {
            res.json({ status: 'success', message: 'Blog posts retrieved successfully from cache', data: JSON.parse(cachedData) });
        }
        else {
            const blogPosts = yield blogPost_1.BlogPostModel.find().populate('author').select('-password').sort({ createdAt: -1 }).exec();
            cache_1.cache.set('allBlogPosts', JSON.stringify(blogPosts));
            res.json({ status: 'success', message: 'Blog posts retrieved successfully', data: blogPosts });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error', data: null });
    }
});
exports.getAllBlogPosts = getAllBlogPosts;
const getBlogPostBySlug = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blogPost = yield blogPost_1.BlogPostModel.findOne({ slug: req.params.slug }).populate('author').sort({ createdAt: -1 }).exec();
        if (!blogPost) {
            return res.status(404).json({ status: 'error', message: 'Blog Post not found', data: null });
        }
        res.json({ status: 'success', message: 'Blog post retrieved successfully', data: blogPost });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error', data: null });
    }
});
exports.getBlogPostBySlug = getBlogPostBySlug;
const getAllBlogPostsByAuthorId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const authorId = req.params.authorId;
    try {
        // const cachedData = false;
        const cachedData = yield cache_1.cache.get('authorBlogPosts');
        if (cachedData) {
            res.json({ status: 'success', message: 'Blog posts retrieved successfully from cache', data: JSON.parse(cachedData) });
        }
        else {
            const blogPosts = yield blogPost_1.BlogPostModel.find({ author: authorId }).populate('author').sort({ createdAt: -1 }).exec();
            if (blogPosts.length === 0) {
                res.status(404).json({ status: 'error', message: 'Author has no blog post yet', data: null });
                return;
            }
            cache_1.cache.set('authorBlogPosts', JSON.stringify(blogPosts));
            res.json({ status: 'success', message: 'Blog posts retrieved successfully', data: blogPosts });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error', data: null });
    }
});
exports.getAllBlogPostsByAuthorId = getAllBlogPostsByAuthorId;
const updateBlogPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, author, content, tags, datePosted } = req.body;
        const updatedData = { title, author, content, tags, datePosted };
        if (req.file) {
            updatedData.image = req.file.filename;
            const currentBlogPost = yield blogPost_1.BlogPostModel.findOne({ slug: req.params.slug });
            if (currentBlogPost) {
                const oldImagePath = `uploads/${currentBlogPost.image}`;
                fs_1.default.unlinkSync(oldImagePath);
                console.log(`Deleted old image: ${oldImagePath}`);
            }
        }
        const updatedBlogPost = yield blogPost_1.BlogPostModel.findOneAndUpdate({ slug: req.params.slug }, updatedData, { new: true });
        if (!updatedBlogPost) {
            return res.status(404).json({ status: 'error', message: 'Blog Post not found', data: null });
        }
        res.json({ status: 'success', message: 'Post has been updated successfully', data: { updatedBlogPost } });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error', data: null });
    }
});
exports.updateBlogPost = updateBlogPost;
const deleteBlogPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedBlogPost = yield blogPost_1.BlogPostModel.findByIdAndDelete(req.params.id);
        if (!deletedBlogPost) {
            return res.status(404).json({ status: 'error', message: 'Blog Post not found', data: null });
        }
        res.json({ status: 'success', message: 'Blog post deleted successfully', data: deletedBlogPost });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error', data: null });
    }
});
exports.deleteBlogPost = deleteBlogPost;
