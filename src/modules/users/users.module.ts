import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DatabaseModule } from '../db/db.module';
import { usersProviders } from './user.providers';
import { AuthService } from '../auth/auth.service';
import { AuthModule } from '../auth/auth.module';

@Module({
    imports: [DatabaseModule, AuthModule],
    controllers: [UsersController],
    providers: [UsersService, AuthService, ...usersProviders],
    exports: [UsersService],
})
export class UsersModule {}
