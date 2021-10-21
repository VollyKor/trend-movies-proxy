import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';

import { UserId } from 'src/utils/decorators/UserId';
import { AuthService } from '../auth/auth.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { LocalAuthGuard } from '../auth/guards/local-auth.guard';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private userService: UsersService, private authService: AuthService) {}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async loginHangler(@Req() req: any) {
        return this.authService.createToken(req.user);
    }

    @Post('signup')
    async signUpHandler(@Body() userData: any) {
        const newUser = await this.userService.signUp(userData);
        return {
            ...(await this.authService.createToken(newUser)),
            user: newUser,
        };
    }

    @UseGuards(JwtAuthGuard)
    @Post('check-token')
    async checkTokenHandler(@UserId() id: number) {
        return this.userService.checkUser(id);
    }
}
