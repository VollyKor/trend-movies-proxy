import { Injectable, Inject } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { User } from './user.entity';
import { TryCatch } from 'src/utils/decorators/tryCatch';
import { DbException, AppException } from 'src/utils/exceptions';
import { WrongRequestException } from 'src/utils/exceptions/WrongRequest';
import { LoggerService } from 'src/service/loggers/logger.service';

@Injectable()
@TryCatch(AppException)
export class UsersService {
    constructor(
        @Inject('USERS_REPOSITORY') private usersRepository: typeof User,
        private logger: LoggerService,
    ) {}

    public async findByEmail(email: string): Promise<User> {
        return this.usersRepository.findOne({ where: { email } });
    }

    public async getAll(): Promise<User[]> {
        return this.usersRepository.findAll();
    }

    @TryCatch(WrongRequestException)
    public async signUp(userData) {
        const user = await this.checkUser({ email: userData.email });

        if (user) throw new DbException('User with this email already exist');

        const hash = await bcrypt.hash(userData.password, Number.parseInt(process.env.SALT_ROUNDS));

        const newUser = await this.addUser({ ...userData, password: hash });
        delete newUser.password;

        return newUser;
    }

    public async checkUser(params) {
        const user = await this.usersRepository.findOne({
            where: params,
            attributes: ['id', 'email', 'clicks', 'favorite_movies', 'movies_to_watch'],
        });
        return user?.get();
    }

    public checkUserById = async ({ userId: user_id }) => {
        const user = await this.usersRepository.findOne({ where: { user_id } });
        return user?.get();
    };

    public async addUser(data) {
        const newUser = await this.usersRepository.create({ ...data });
        return newUser.get();
    }

    public async updateUser(userId: number, userOpts) {
        const updatedUser = await this.usersRepository.update(
            { where: { id: userId } },
            { ...userOpts },
        );
        return updatedUser;
    }

    public removeUser = async (user_id: number) => {
        const isDeleted = await this.usersRepository.destroy({ where: { user_id } });
        return isDeleted;
    };

    public addUserClick = async (id: number) =>
        await this.usersRepository.increment('clicks', { where: { id } });
}
