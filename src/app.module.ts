import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { StatisticModule } from './statistic/statistic.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { JwtService } from '@nestjs/jwt';

@Module({
    imports: [
        ConfigModule.forRoot(),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT) || 5432,
            username: process.env.DB_USER_NAME || 'postgres',
            password: process.env.DB_PASSWORD || '',
            database: process.env.DB_DATABASE || 'postgres',
            autoLoadModels: true,
            synchronize: true,
        }),
        StatisticModule,
        AuthModule,
        UsersModule,
    ],
})
export class AppModule {}
