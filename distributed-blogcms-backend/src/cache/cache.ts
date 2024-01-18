// src/cache/cache.ts
import Redis from 'ioredis';

const client = new Redis("redis://default:f6463f24458744899b1a52a614c0fa2a@us1-saving-wren-39807.upstash.io:39807");

client.on('error', (err) => console.log('Redis Client Error', err));

export const cache = {
    get: async (key: string): Promise<string | null> => {
        const data = await client.get(key);
        return data ?? null;
    },
    set: (key: string, value: string, expiry: number = 3600): void => {
        client.set(key, value, 'EX', expiry).catch((err) => {
            console.error('Error setting cache:', err);
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
