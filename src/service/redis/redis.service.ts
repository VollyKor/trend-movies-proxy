import { Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';
import { RedisService as RedisInnerService } from 'nestjs-redis';
import { TryCatch } from 'src/utils/decorators/tryCatch';

@Injectable()
export class RedisApiService {
    private redis: Redis;
    constructor(private readonly redisService: RedisInnerService) {
        this.redis = this.redisService.getClient();
    }
    @TryCatch()
    public async setCustomKey(key: string, value: any, expireTIme = 60 * 60 * 24) {
        return await this.redis.set(key, JSON.stringify(value), 'EX', expireTIme);
    }

    @TryCatch()
    public async getCustomKey(key: string) {
        return await this.redis.get(key);
    }
}
