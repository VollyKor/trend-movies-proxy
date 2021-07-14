import { Injectable } from '@nestjs/common';
import FILMS from './films.mock';

@Injectable()
export class FavoriteMoviesService {
    private films = FILMS;
    public async getFilms() {
        return this.films;
    }

    public addFilm(filmObj) {
        console.log('add film');
        this.films.push(filmObj);
        return this.films;
    }

    public getFilm(id) {
        console.log('get film');
        const film = this.films.find((film) => film.id === id);
        return film;
    }

    public removeFilm(id) {
        console.log('remove film');
        const films = this.films.filter((film) => film.id !== id);
        return (this.films = films);
    }

    public updateFilm(id) {
        console.log('update film');
        const films = this.films.map((film) => {
            if (film.id !== id) {
                console.log('update film');
                return {
                    id: 100,
                    name: 'Updated names',
                    genres: [1, 4, 6, 9, 3],
                };
            }
            return film;
        });
        return (this.films = films);
    }
}
