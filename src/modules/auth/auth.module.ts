import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { UsersService } from 'src/modules/users/users.service';
import { DatabaseModule } from '../db/db.module';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
    imports: [
        ConfigModule.forRoot(),
        DatabaseModule,
        AuthModule,
        PassportModule,
        JwtModule.register({
            secret: process.env.JWT_PASSWORD,
            signOptions: { expiresIn: '7d' },
        }),
    ],
    providers: [AuthService, LocalStrategy, UsersService, JwtStrategy],
    exports: [AuthService, JwtModule],
})
export class AuthModule {}
