import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { LocalAuthGuard } from '../auth/guards/local-auth.guard';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private userService: UsersService, private authService: AuthService) {}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async loginHangler(@Req() req) {
        return this.authService.createToken(req.user);
    }

    @Post('signup')
    async signUpHandler(@Body() userData) {
        return await this.userService.signUp(userData);
    }

    @UseGuards(JwtAuthGuard)
    @Post('check-token')
    async getAllUsersHandler(@Req() req) {
        return this.userService.checkUser(req?.user);
    }
}
