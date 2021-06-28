import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { StatisticModule } from './statistic/statistic.module';

@Module({
    imports: [
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: 'localhost',
            port: 5450,
            username: 'postgres',
            password: 'Respubli4ka',
            database: 'trend_movies',
            autoLoadModels: true,
            synchronize: true,
        }),
        StatisticModule,
    ],
})
export class AppModule {}
