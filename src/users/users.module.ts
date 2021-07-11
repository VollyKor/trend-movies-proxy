import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
    imports: [AuthModule],
    controllers: [UsersController],
    exports: [UsersService],
    providers: [UsersService, AuthService],
})
export class UsersModule {}
