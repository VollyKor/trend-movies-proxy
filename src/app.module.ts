import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { StatisticModule } from './modules/statistic/statistic.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { FilmService } from './modules/film/film.service';
import { DatabaseModule } from './modules/db/db.module';
import { FilmModule } from './modules/film/film.module';

@Module({
    imports: [
        ConfigModule.forRoot(),
        UsersModule,
        FilmModule,
        DatabaseModule,
        StatisticModule,
        AuthModule,
    ],
})
export class AppModule {}
