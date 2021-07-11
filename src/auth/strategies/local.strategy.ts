import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly authService: AuthService, // private readonly jwtService: JwtService,
    ) {
        super();
    }

    async validate(username: string, password: string): Promise<any> {
        return;
    }

    async login(user) {
        const payload = { username: user.username, sub: user.userId };
        // return { accessToken: this.jwtService.sign(payload) };
    }
}
