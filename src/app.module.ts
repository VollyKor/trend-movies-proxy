import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { StatisticModule } from './modules/statistic/statistic.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { DatabaseModule } from './modules/db/db.module';
import { FilmModule } from './modules/film/film.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

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
export class AppModule {}
