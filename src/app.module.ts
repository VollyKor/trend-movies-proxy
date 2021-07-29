import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { StatisticModule } from './modules/statistic/statistic.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { DatabaseModule } from './modules/db/db.module';
import { FilmModule } from './modules/film/film.module';
import { PassportModule } from '@nestjs/passport';
import { LoggerMiddleware } from './middlewares/logger.middleware';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true, cache: true }),
        UsersModule,
        FilmModule,
        DatabaseModule,
        StatisticModule,
        AuthModule,
        PassportModule,
    ],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerMiddleware).forRoutes('*');
    }
}
