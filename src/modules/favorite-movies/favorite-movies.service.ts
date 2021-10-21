import { HttpException, Inject, Injectable } from '@nestjs/common';
import { TryCatch } from 'src/utils/decorators/tryCatch';
import { TmbdService } from '../tmbd/tmbd.service';
import { ChosenMovies } from './chosenMovies.entity';

@TryCatch(HttpException)
@Injectable()
export class FavoriteMoviesService {
    constructor(
        private tmbdService: TmbdService,
        @Inject('CHOSEN_REPOSITORY') private favChosenRep: typeof ChosenMovies,
    ) {}

    public async addChosenMovie(userId: number | string, movieId: string) {
        const favMovie = await this.favChosenRep.findOne({
            where: {
                film_id: Number.parseInt(movieId, 10),
                user_id: userId,
            },
        });

        if (favMovie) return;

        return this.favChosenRep.create({
            film_id: Number.parseInt(movieId, 10),
            user_id: userId,
        });
    }

    public async removeFavMovie(userId: number | string, movieId: string) {
        return this.favChosenRep.destroy({
            where: {
                film_id: Number.parseInt(movieId, 10),
                user_id: userId,
            },
        });
    }

    public async findAllChosenMoviesByUser(user_id: number) {
        const movies = await this.favChosenRep.findAll({
            where: { user_id },
        });

        const moviePromises = movies.map((movie) => {
            const currentFilm = movie.get();
            return this.tmbdService.getFilmById(currentFilm.film_id);
        });

        return Promise.all(moviePromises);
    }

    public getAllFavMoviesList(user_id: number) {
        return this.favChosenRep.findAll({
            where: { user_id },
        });
    }
}
