// src/controllers/blogPostController.ts
import { Request, Response } from 'express';
import { BlogPostModel } from '../models/blogPost';
import { cache } from '../cache/cache';
// import { Cache } from '../cache/cache';
import fs from 'fs';

export const createBlogPost = async (req: Request, res: Response) => {
    
    try {
        let blogImage = null
        const { title, author, content, slug, tags, datePosted, category } = req.body;

        if(req.file) {
            const uploadedImage = req.file
            blogImage = uploadedImage.filename
        }

        if(!title || !author || !content || !slug || !tags) return res.status(400).json({ status: 'error', message: 'Missing required fields', data: null });

        const newBlogPost = await BlogPostModel.create({
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
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error', data: null });
    }
};

export const getAllBlogPosts = async (req: Request, res: Response): Promise<void> => {
    // const cache = new Cache();
    try {
        const cachedData = await cache.get('allBlogPosts');
        // console.log("CACHED DATA:", cachedData)
        // const cachedData = false;

        if (cachedData) {
            res.json({ status: 'success', message: 'Blog posts retrieved successfully from cache', data: JSON.parse(cachedData) });
        } else {
            const blogPosts = await BlogPostModel.find().populate('author').select('-password').sort({ createdAt: -1 }).exec();
            cache.set('allBlogPosts', JSON.stringify(blogPosts));
            res.json({ status: 'success', message: 'Blog posts retrieved successfully', data: blogPosts });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error', data: null });
    }
};

export const getBlogPostBySlug = async (req: Request, res: Response) => {
    try {
        const blogPost = await BlogPostModel.findOne({slug: req.params.slug}).populate('author').sort({ createdAt: -1 }).exec();
        if (!blogPost) {
            return res.status(404).json({ status: 'error', message: 'Blog Post not found', data: null });
        }

        res.json({ status: 'success', message: 'Blog post retrieved successfully', data: blogPost });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error', data: null });
    }
};

export const getAllBlogPostsByAuthorId = async (req: Request, res: Response): Promise<void> => {
    const authorId = req.params.authorId;

    try {
        // const cachedData = false;
        const cachedData = await cache.get('authorBlogPosts');

        if (cachedData) {
            res.json({ status: 'success', message: 'Blog posts retrieved successfully from cache', data: JSON.parse(cachedData) });
        } else {
            const blogPosts = await BlogPostModel.find({ author: authorId }).populate('author').sort({ createdAt: -1 }).exec();

            if (blogPosts.length === 0) {
                res.status(404).json({ status: 'error', message: 'Author has no blog post yet', data: null });
                return;
            }
            cache.set('authorBlogPosts', JSON.stringify(blogPosts));
            res.json({ status: 'success', message: 'Blog posts retrieved successfully', data: blogPosts });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error', data: null });
    }
};

export const updateBlogPost = async (req: Request, res: Response) => {
    try {
        const { title, author, content, tags, datePosted } = req.body;
        const updatedData: { [key: string]: any } = { title, author, content, tags, datePosted };

        if (req.file) {
            updatedData.image = req.file.filename;

            const currentBlogPost = await BlogPostModel.findOne({ slug: req.params.slug });
            if (currentBlogPost) {
                const oldImagePath = `uploads/${currentBlogPost.image}`;
                fs.unlinkSync(oldImagePath);
                console.log(`Deleted old image: ${oldImagePath}`);
            }
        }

        const updatedBlogPost = await BlogPostModel.findOneAndUpdate(
            { slug: req.params.slug }, 
            updatedData,
            { new: true }
        );

        if (!updatedBlogPost) {
            return res.status(404).json({ status: 'error', message: 'Blog Post not found', data: null });
        }

        res.json({ status: 'success', message: 'Post has been updated successfully', data: { updatedBlogPost } });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error', data: null });
    }
};

export const deleteBlogPost = async (req: Request, res: Response) => {
    try {
        const deletedBlogPost = await BlogPostModel.findByIdAndDelete(req.params.id);
        if (!deletedBlogPost) {
            return res.status(404).json({ status: 'error', message: 'Blog Post not found', data: null });
        }
        res.json({ status: 'success', message: 'Blog post deleted successfully', data: deletedBlogPost });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error', data: null });
    }
};