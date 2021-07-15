import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { User } from '../users/user.entity';

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService, private usersService: UsersService) {}

    public async validateUser(username: string, password: string): Promise<any> {
        const user = await this.usersService.findByEmail(username);
        const isMatch = await bcrypt.compare(password, user?.password);
        if (user && isMatch) {
            return { userId: user.id, email: user.email };
        }
        return null;
    }

    public async createToken(user: User) {
        const payload = { username: user.email, sub: user.user_id };
        return { accessToken: this.jwtService.sign(payload) };
    }
}
