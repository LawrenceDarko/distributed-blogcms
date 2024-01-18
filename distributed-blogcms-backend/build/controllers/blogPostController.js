"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBlogPost = exports.updateBlogPost = exports.getAllBlogPostsByAuthorId = exports.getBlogPostBySlug = exports.getAllBlogPosts = exports.createBlogPost = void 0;
const blogPost_1 = require("../models/blogPost");
const cache_1 = require("../cache/cache");
// import { Cache } from '../cache/cache';
const fs_1 = __importDefault(require("fs"));
const ALL_BLOG_POSTS_CACHE_KEY = 'allBlogPosts';
const AUTHOR_BLOG_POSTS_CACHE_KEY_PREFIX = 'authorBlogPosts_';
const createBlogPost = async (req, res) => {
    try {
        let blogImage = null;
        const { title, author, content, slug, tags, datePosted, category } = req.body;
        if (req.file) {
            const uploadedImage = req.file;
            blogImage = uploadedImage.filename;
        }
        if (!title || !author || !content || !slug || !tags)
            return res.status(400).json({ status: 'error', message: 'Missing required fields', data: null });
        const newBlogPost = await blogPost_1.BlogPostModel.create({
            title,
            author,
            category,
            content,
            slug,
            tags,
            image: blogImage,
            datePosted,
        });
        cache_1.cache.del(ALL_BLOG_POSTS_CACHE_KEY);
        res.status(201).json({ status: 'success', message: 'Blog post created successfully', data: { newBlogPost } });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error', data: null });
    }
};
exports.createBlogPost = createBlogPost;
const getAllBlogPosts = async (req, res) => {
    try {
        const cachedData = await cache_1.cache.get(ALL_BLOG_POSTS_CACHE_KEY);
        // const cachedData = false;
        if (cachedData) {
            res.json({ status: 'success', message: 'Blog posts retrieved successfully from cache', data: JSON.parse(cachedData) });
        }
        else {
            const blogPosts = await blogPost_1.BlogPostModel.find().populate('author').select('-password').sort({ createdAt: -1 }).exec();
            await cache_1.cache.set(ALL_BLOG_POSTS_CACHE_KEY, JSON.stringify(blogPosts));
            res.json({ status: 'success', message: 'Blog posts retrieved successfully', data: blogPosts });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error', data: null });
    }
};
exports.getAllBlogPosts = getAllBlogPosts;
const getBlogPostBySlug = async (req, res) => {
    try {
        const blogPost = await blogPost_1.BlogPostModel.findOne({ slug: req.params.slug }).populate('author').sort({ createdAt: -1 }).exec();
        if (!blogPost) {
            return res.status(404).json({ status: 'error', message: 'Blog Post not found', data: null });
        }
        res.json({ status: 'success', message: 'Blog post retrieved successfully', data: blogPost });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error', data: null });
    }
};
exports.getBlogPostBySlug = getBlogPostBySlug;
const getAllBlogPostsByAuthorId = async (req, res) => {
    const authorId = req.params.authorId;
    try {
        // const cachedData = false;
        const cachedData = await cache_1.cache.get(`${AUTHOR_BLOG_POSTS_CACHE_KEY_PREFIX}${authorId}`);
        // console.log("CACHED DATA:", cachedData)
        if (cachedData) {
            res.json({ status: 'success', message: 'Author Blog posts retrieved successfully from cache', data: JSON.parse(cachedData) });
        }
        else {
            const blogPosts = await blogPost_1.BlogPostModel.find({ author: authorId }).populate('author').sort({ createdAt: -1 }).exec();
            if (blogPosts.length === 0) {
                res.status(404).json({ status: 'error', message: 'Author has no blog post yet', data: null });
                return;
            }
            await cache_1.cache.set(`${AUTHOR_BLOG_POSTS_CACHE_KEY_PREFIX}${authorId}`, JSON.stringify(blogPosts));
            res.json({ status: 'success', message: 'Blog posts retrieved successfully', data: blogPosts });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error', data: null });
    }
};
exports.getAllBlogPostsByAuthorId = getAllBlogPostsByAuthorId;
const updateBlogPost = async (req, res) => {
    try {
        const { title, author, content, tags, datePosted } = req.body;
        const updatedData = { title, author, content, tags, datePosted };
        if (req.file) {
            updatedData.image = req.file.filename;
            const currentBlogPost = await blogPost_1.BlogPostModel.findOne({ slug: req.params.slug });
            if (currentBlogPost) {
                const oldImagePath = `uploads/${currentBlogPost.image}`;
                fs_1.default.unlinkSync(oldImagePath);
                console.log(`Deleted old image: ${oldImagePath}`);
            }
        }
        const updatedBlogPost = await blogPost_1.BlogPostModel.findOneAndUpdate({ slug: req.params.slug }, updatedData, { new: true });
        await Promise.all([
            cache_1.cache.del(ALL_BLOG_POSTS_CACHE_KEY),
            cache_1.cache.del(`${AUTHOR_BLOG_POSTS_CACHE_KEY_PREFIX}${updatedBlogPost?.author}`),
        ]);
        if (!updatedBlogPost) {
            return res.status(404).json({ status: 'error', message: 'Blog Post not found', data: null });
        }
        res.json({ status: 'success', message: 'Post has been updated successfully', data: { updatedBlogPost } });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error', data: null });
    }
};
exports.updateBlogPost = updateBlogPost;
const deleteBlogPost = async (req, res) => {
    try {
        const deletedBlogPost = await blogPost_1.BlogPostModel.findByIdAndDelete(req.params.id);
        if (!deletedBlogPost) {
            return res.status(404).json({ status: 'error', message: 'Blog Post not found', data: null });
        }
        await Promise.all([
            cache_1.cache.del(ALL_BLOG_POSTS_CACHE_KEY),
            cache_1.cache.del(`${AUTHOR_BLOG_POSTS_CACHE_KEY_PREFIX}${deletedBlogPost.author}`),
        ]);
        res.json({ status: 'success', message: 'Blog post deleted successfully', data: deletedBlogPost });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error', data: null });
    }
};
exports.deleteBlogPost = deleteBlogPost;
