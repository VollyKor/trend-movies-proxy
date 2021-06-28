import { Injectable } from '@nestjs/common';
import { addUser, addUserClick, checkUser } from '../../db/functions/user';
import { addFilm, addFilmClick, checkFilm } from '../../db/functions/film';

@Injectable()
export class StatisticService {
    // check user and assign
    async handleUser(userOpts: any) {
        try {
            const user = await checkUser(userOpts);
            const currentUser = user ? user : await addUser(userOpts);

            await addUserClick(currentUser.user_id);
            return currentUser;
        } catch (error) {
            console.log(error);
        }
    }

    async handleFilm(filmOpts: any) {
        try {
            const film = await checkFilm(filmOpts);
            const currentFilm = film
                ? film
                : await addFilm({ film_id: filmOpts.id, film_name: filmOpts.original_title });

            await addFilmClick(currentFilm);
            return currentFilm;
        } catch (error) {
            console.log(error);
        }
    }
}
