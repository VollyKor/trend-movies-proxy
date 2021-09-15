import { Injectable } from '@nestjs/common';
import { RedisApiService } from 'src/service/redis/redis.service';

@Injectable()
export class TestService {
    constructor(private redisService: RedisApiService) {}

    public async setKey(key: string, value: string) {
        return this.redisService.setCustomKey(key, value);
    }

    public async getKey(key: string) {
        return this.redisService.getCustomKey(key);
    }

    public logKey(key: string, value: string) {
        return console.log(key, value);
    }
}
