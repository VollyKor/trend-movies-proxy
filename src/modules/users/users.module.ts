import { Module } from '@nestjs/common';

import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DatabaseModule } from '../db/db.module';
import { usersProviders } from './user.providers';
import { AuthService } from '../auth/auth.service';
import { AuthModule } from '../auth/auth.module';
import { CustomLoggerModule } from 'src/service/loggers/logger.module';

@Module({
    imports: [DatabaseModule, AuthModule, CustomLoggerModule],
    controllers: [UsersController],
    providers: [UsersService, AuthService, ...usersProviders],
    exports: [UsersService],
})
export class UsersModule {}
