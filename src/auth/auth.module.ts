import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
    imports: [
        PassportModule,
        JwtModule.register({
            secret: process.env.JWT_PASSWORD || 'secret key',
            signOptions: { expiresIn: '7d' },
        }),
    ],
    providers: [AuthService, LocalStrategy],
    exports: [AuthService],
})
export class AuthModule {}
