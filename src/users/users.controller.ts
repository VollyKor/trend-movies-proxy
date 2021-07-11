import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) {}
    @Post('login')
    async loginHangler(@Body() data: any) {
        await this.userService.userlogin(data);
        return 'Hello';
    }

    @Post('signup')
    async signUpHandler(@Body() userData) {
        console.log(userData);
        //  создать usera
        // вернуть сразу токен
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
