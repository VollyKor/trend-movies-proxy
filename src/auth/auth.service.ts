import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    // constructor(private readonly jwtService: JwtService) {}

    async validateUser(password: string): Promise<any> {
        // const user = await this.usersService.findOne(username);
        // if (user && user.password === pass) {
        //     const { password, ...result } = user;
        //     return result;
        // }
        // return null;
    }

    async createToken(payload: any) {
        return;
    }
}
