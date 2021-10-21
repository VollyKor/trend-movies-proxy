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
import { TestModule } from './modules/test/test.module';
import { TmbdModule } from './modules/tmbd/tmbd.module';
import { RedisApiModule } from './service/redis/redis.module';
import { CustomLoggerModule } from './service/loggers/logger.module';
import { FavoriteMoviesModule } from './modules/favorite-movies/favorite-movies.module';
import { AppController } from './app/app.controller';
import { AppService } from './app/app.service';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        RedisConnect.forRootAsync({
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => [
                {
                    url: configService.get('REDIS_URL'),
                },
            ],
        }),
        UsersModule,
        FilmModule,
        FavoriteMoviesModule,
        DatabaseModule,
        AuthModule,
        PassportModule,
        RatingModule,
        TestModule,
        TmbdModule,
        RedisApiModule,
        CustomLoggerModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerMiddleware).forRoutes('*');
    }
}
