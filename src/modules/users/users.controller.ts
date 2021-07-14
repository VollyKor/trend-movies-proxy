import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { LocalAuthGuard } from '../auth/guards/local-auth.guard';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) {}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async loginHangler(@Req() req) {
        // const credentials = await this.userService.login(data);
        return req.user;
    }

    @Post('signup')
    async signUpHandler(@Body() userData) {
        return await this.userService.signUp(userData);
    }

    @Get('encrypt/:password')
    async encryptHandler(@Param() { password }) {
        const saltOrRounds = 10;
        const hash = await bcrypt.hash(password, saltOrRounds);

        return hash;
    }
    @Get('validatePass/:password')
    async validatePasswordHandler(@Param() { password }, @Body() { hash }) {
        const isMatch = await bcrypt.compare(password, hash);
        return isMatch;
    }
}
