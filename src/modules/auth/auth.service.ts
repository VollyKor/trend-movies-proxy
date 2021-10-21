import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService, private usersService: UsersService) {}

    public async validateUser(username: string, password: string): Promise<any> {
        const user = await this.usersService.findByEmail(username);
        if (!user) return null;

        const isMatch = await bcrypt.compare(password, user?.password);
        if (isMatch) return { id: user.id, email: user.email };

        return null;
    }

    public async createToken(user: User) {
        const payload = { id: user.id };
        return { accessToken: this.jwtService.sign(payload) };
    }
}
