import mongoose from 'mongoose';

export class Database {
    private static instance: Database | null = null;

    private constructor() {}

    static getInstance(): Database {
        if (!this.instance) {
            this.instance = new Database();
        }
        return this.instance;
    }

    async connect(mongoUri: string): Promise<void> {
        try {
            await mongoose.connect(mongoUri);
            console.log('Connected to MongoDB');
        } catch (error) {
            console.error('Error connecting to MongoDB:', error);
            throw error;
        }
    }
}


