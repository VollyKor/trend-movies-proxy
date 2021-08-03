import {
    Injectable,
    InternalServerErrorException,
    Logger,
    NotFoundException,
} from '@nestjs/common';
import { UsersService } from 'src/modules/users/users.service';
import { addFilm, addFilmClick, checkFilm } from '../../db/functions/film';

@Injectable()
export class StatisticService {
    constructor(private userService: UsersService) {}
    // check user and assign
    async handleUser(userOpts: any) {
        try {
            const user = await this.userService.checkUser(userOpts?.id);

            if (!user) throw new NotFoundException();

            await this.userService.addUserClick(user.id);

            Logger.log('[StatisticService] [handleUser] Success');
            return;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
    async handleFilm(filmOpts: any) {
        try {
            const film = await checkFilm(filmOpts);

            if (film) return await addFilmClick(film);

            return await addFilm({ film_id: filmOpts.id, name: filmOpts.original_title });
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
}
