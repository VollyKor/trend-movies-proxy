import { Module } from '@nestjs/common';
import { TestService } from './test.service';
import { TestController } from './test.controller';
import { RedisApiModule } from 'src/service/redis/redis.module';

@Module({
    imports: [RedisApiModule],
    providers: [TestService],
    exports: [TestService],
    controllers: [TestController],
})
export class TestModule {}
