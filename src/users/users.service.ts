import { HttpException, Injectable } from '@nestjs/common';
import { checkUser, addUser } from '../../db/functions/user';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UsersService {
    constructor(private authSrvice: AuthService) {}
    async userlogin(data) {
        const user = await checkUser({ email: data.email });
        // Проверить пароль
        if (user) return { token: 'token', user };

        const newUser = await addUser(data);
        return { token: 'token', user: newUser };
    }

    async signUp(userData) {
        const user = await checkUser({ email: userData.email });

        if (user) throw new HttpException('User with this email already exist', 400);

        const newUser = await addUser(userData);
        const token = this.authSrvice.createToken({ userId: newUser.id });

        // return { token, user: newUser };
    }
}
