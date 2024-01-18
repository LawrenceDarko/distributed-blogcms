// src/models/comment.ts
import mongoose, { Document, Schema, Types } from 'mongoose';

export interface Comment extends Document {
    author: Types.ObjectId; // Assuming comments are associated with users, adjust the type accordingly
    content: string;
    datePosted: Date;
    postId: Types.ObjectId;
}

const commentSchema = new Schema<Comment>({
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    postId: { type: mongoose.Schema.Types.ObjectId, ref: 'BlogPost', required: true }, // Assuming comments are associated with blog posts, adjust the type accordingly
    content: { type: String, required: true },
    datePosted: { type: Date, default: Date.now }
});

export const CommentModel = mongoose.model<Comment>('Comment', commentSchema);
