import { Module } from '@nestjs/common';

import { StatisticController } from './statistic.controller';
import { StatisticService } from './statistic.service';

import { UsersModule } from 'src/modules/users/users.module';
import { DatabaseModule } from '../db/db.module';
import { FilmModule } from '../film/film.module';

@Module({
    imports: [DatabaseModule, UsersModule, FilmModule],
    controllers: [StatisticController],
    providers: [StatisticService],
    exports: [StatisticService],
})
export class StatisticModule {}
