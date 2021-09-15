import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { RedisModule as RedisConnect } from 'nestjs-redis';

import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { DatabaseModule } from './modules/db/db.module';
import { FilmModule } from './modules/film/film.module';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { RatingModule } from './modules/rating/rating.module';
import { StatisticModule } from './modules/statistic/statistic.module';
import { TestModule } from './modules/test/test.module';
import { TmbdModule } from './modules/tmbd/tmbd.module';
import { RedisApiModule } from './service/redis/redis.module';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        RedisConnect.forRootAsync({
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => [
                {
                    host: configService.get('REDIS_HOST'),
                    port: configService.get('REDIS_PORT'),
                    password: configService.get('REDIS_PASSWORD'),
                },
            ],
        }),
        UsersModule,
        FilmModule,
        DatabaseModule,
        StatisticModule,
        AuthModule,
        PassportModule,
        RatingModule,
        TestModule,
        TmbdModule,
        RedisApiModule,
    ],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerMiddleware).forRoutes('*');
    }
}
