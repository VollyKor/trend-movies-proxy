import { Module } from '@nestjs/common';
import { TmbdService } from './tmbd.service';
import { TmbdController } from './tmbd.controller';
import { ConfigService } from '@nestjs/config';
import { RedisApiModule } from 'src/service/redis/redis.module';

@Module({
    imports: [ConfigService, RedisApiModule],
    providers: [TmbdService],
    controllers: [TmbdController],
})
export class TmbdModule {}
