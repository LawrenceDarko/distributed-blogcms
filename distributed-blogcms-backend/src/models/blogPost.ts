// src/models/blogPost.ts
import mongoose, { Document, Schema, Types } from 'mongoose';
import path from 'path';

export interface BlogPost extends Document {
    title: string;
    content: string;
    author: Types.ObjectId;
    comments: Types.ObjectId[];
    tags: string[];
    image: string;
    metaDescription: string;
    slug: string;
    datePosted: Date;
    category: string;
}

const blogPostSchema = new Schema<BlogPost>(
    {
        title: { type: String, required: true },
        author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        content: { type: String, required: true },
        slug: { type: String, required: true, unique: true },
        datePosted: { type: Date, default: Date.now },
        tags: { type: [String], default: [] },
        image: { type: String },
        comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
        category: { type: String, enum: ['entertainment', 'sports', 'business'] },
        metaDescription: { type: String },
    },{ timestamps: true }
);


export const BlogPostModel = mongoose.model<BlogPost>('BlogPost', blogPostSchema);
