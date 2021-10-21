import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { TmbdService } from './tmbd.service';
import { TmbdController } from './tmbd.controller';
import { RedisApiModule } from 'src/service/redis/redis.module';
import { FilmModule } from '../film/film.module';
import { UsersModule } from '../users/users.module';
// import { UserMiddleware } from 'src/middlewares/user.middleware';

@Module({
    imports: [ConfigService, RedisApiModule, FilmModule, UsersModule],
    providers: [TmbdService],
    controllers: [TmbdController],
    exports: [TmbdService],
})
export class TmbdModule {
    // configure(consumer: MiddlewareConsumer) {
    // consumer.apply(UserMiddleware).forRoutes('*');
    // }
}
