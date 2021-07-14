import { BadRequestException, HttpException, Injectable, Inject } from '@nestjs/common';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UsersService {
    constructor(
        @Inject('USERS_REPOSITORY') private usersRepository: typeof User, // private authService: AuthService,
    ) {}

    public async findByEmail(email: string): Promise<User> {
        return await this.usersRepository.findOne({ where: { email } });
    }

    public async login(data) {
        const user = await this.checkUser({ email: data.email });
        if (user) return { token: 'token', user };
        const newUser = await this.addUser(data);
        return { token: 'token', user: newUser };
    }

    public async signUp(userData) {
        try {
            const user = await this.checkUser({ email: userData.email });
            if (user) throw new HttpException('User with this email already exist', 400);
            const hash = await bcrypt.hash(
                userData.password,
                Number.parseInt(process.env.SALT_ROUNDS),
            );

            const newUser = await this.addUser({ ...userData, password: hash });

            delete newUser.password;
            return newUser;
        } catch (error) {
            throw new BadRequestException(error);
        }
    }
    public checkUser = async (params) => {
        const user = await this.usersRepository.findOne({ where: params });
        return user?.get();
    };
    public checkUserById = async ({ userId: user_id }) => {
        const user = await this.usersRepository.findOne({ where: { user_id } });
        return user?.get();
    };
    public addUser = async (data) => {
        const newUser = await this.usersRepository.create({ ...data });
        return newUser.get();
    };
    public updateUser = async (userId, userOpts) => {
        const updatedUser = await this.usersRepository.update(
            { where: { id: userId } },
            { ...userOpts },
        );
        return updatedUser;
    };
    public removeUser = async (user_id) => {
        const isDeleted = await this.usersRepository.destroy({ where: { user_id } });
        return isDeleted;
    };
    public addUserClick = async (user_id) => {
        const click = await this.usersRepository.increment('clicks', { where: { user_id } });
        return click;
    };
}
