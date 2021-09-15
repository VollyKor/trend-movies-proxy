import { Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';
import { RedisService as RedisInnerService } from 'nestjs-redis';

@Injectable()
export class RedisApiService {
    private redis: Redis;
    constructor(private readonly redisService: RedisInnerService) {
        this.redis = this.redisService.getClient();
    }

    public async setCustomKey(key: string, value: any) {
        try {
            return await this.redis.set(key, JSON.stringify(value), 'EX', 4000);
        } catch (error) {
            throw new Error(error.message);
        }
    }
    public async getCustomKey(key: string) {
        try {
            return await this.redis.get(key);
        } catch (error) {
            throw new Error(error.message);
        }
    }
}
