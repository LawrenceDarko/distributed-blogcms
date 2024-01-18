// src/cache/cache.ts
import Redis from 'ioredis';

// const client = new Redis("redis://default:f6463f24458744899b1a52a614c0fa2a@us1-saving-wren-39807.upstash.io:39807");
const client = new Redis({
    host: 'redis',
    port: 6379,
})

client.on('error', (err) => console.log('Redis Client Error', err));

export const cache = {
    get: async (key: string): Promise<string | null> => {
        const data = await client.get(key);
        return data ?? null;
    },
    set: async (key: string, value: string, expiry: number = 3600): Promise<void> => {
        try {
            await client.set(key, value, 'EX', expiry);
        } catch (err) {
            console.error('Error setting cache:', err);
            throw err;
        }
    },
    del: async (key: string): Promise<void> => {
        await client.del(key).catch((err) => {
            console.error('Error deleting cache:', err);
        });
    },
};
