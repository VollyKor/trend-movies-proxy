import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { StatisticController } from './statistic.controller';
import { StatisticService } from './statistic.service';

import { User } from '../../db/models/User';
import { Film } from 'db/models/Film';

@Module({
    imports: [SequelizeModule.forFeature([User, Film])],
    controllers: [StatisticController],
    providers: [StatisticService],
})
export class StatisticModule {}
