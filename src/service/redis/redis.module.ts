import { Module } from '@nestjs/common';
import { RedisApiService } from './redis.service';

@Module({
    providers: [RedisApiService],
    exports: [RedisApiService],
})
export class RedisApiModule {}
