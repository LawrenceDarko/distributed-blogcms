"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cache = void 0;
// src/cache/cache.ts
const ioredis_1 = __importDefault(require("ioredis"));
// const client = new Redis("redis://default:f6463f24458744899b1a52a614c0fa2a@us1-saving-wren-39807.upstash.io:39807");
const client = new ioredis_1.default({
    host: 'redis',
    port: 6379,
});
client.on('error', (err) => console.log('Redis Client Error', err));
exports.cache = {
    get: async (key) => {
        const data = await client.get(key);
        return data ?? null;
    },
    set: async (key, value, expiry = 3600) => {
        try {
            await client.set(key, value, 'EX', expiry);
        }
        catch (err) {
            console.error('Error setting cache:', err);
            throw err;
        }
    },
    del: async (key) => {
        await client.del(key).catch((err) => {
            console.error('Error deleting cache:', err);
        });
    },
};
// src/cache/cache.ts
// import { createClient } from 'redis';
// const client: any = createClient({port: '6379'});
// (async () => {
//     await client.connect();
// })();
// client.on('error', (err: any) => console.log('Redis Client Error', err));
// export const cache = {
//     get: (key: string): Promise<string | null> => {
//         return new Promise((resolve, reject) => {
//             client.get(key, (err: Error | null, data: string | null) => {
//                 if (err) reject(err);
//                 resolve(data);
//             });
//         });
//     },
//     set: (key: string, value: string, expiry: number = 3600): void => {
//         // Use setex method instead of setEx
//         client.setex(key, expiry, value, (err: Error | null) => {
//             if (err) {
//                 console.error('Error setting cache:', err);
//             }
//         });
//     },
// };
