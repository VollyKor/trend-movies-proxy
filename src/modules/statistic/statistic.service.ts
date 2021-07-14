import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/modules/users/users.service';
import { addFilm, addFilmClick, checkFilm } from '../../db/functions/film';

@Injectable()
export class StatisticService {
    // constructor(private userService: UsersService) {}
    // check user and assign
    async handleUser(userOpts: any) {
        // try {
        //     const user = await this.userService.checkUser(userOpts);
        //     const currentUser = user ? user : await this.userService.addUser(userOpts);
        //     await this.userService.addUserClick(currentUser.user_id);
        //     return currentUser;
        // } catch (error) {
        //     console.log(error);
        // }
    }
    async handleFilm(filmOpts: any) {
        // try {
        //     const film = await checkFilm(filmOpts);
        //     const currentFilm = film
        //         ? film
        //         : await addFilm({ film_id: filmOpts.id, film_name: filmOpts.original_title });
        //     await addFilmClick(currentFilm);
        //     return currentFilm;
        // } catch (error) {
        //     console.log(error);
        // }
    }
}
