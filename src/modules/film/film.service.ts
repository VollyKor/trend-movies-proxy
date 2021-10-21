import { HttpException, Inject, Injectable } from '@nestjs/common';
import { LoggerService } from 'src/service/loggers/logger.service';
import { TryCatch } from 'src/utils/decorators/tryCatch';
import { Film } from './film.entity';

@Injectable()
// @TryCatch(HttpException)
export class FilmService {
    constructor(
        @Inject('FILM_REPOSITORY') private filmRep: typeof Film,
        private logger: LoggerService,
    ) {}

    async checkFilm(id) {
        try {
            const film = await this.filmRep.findOne({ where: { film_id: id } });
            return film?.get();
        } catch (error) {
            throw error;
        }
    }

    public async handleFilm(filmObj) {
        try {
            const film = await this.checkFilm(filmObj.id);

            if (!film) return this.addFilm(filmObj);
            if (film) return this.addFilmClick(filmObj.id);
            return;
        } catch (error) {
            throw error;
        }
    }

    async addFilm({ id, title, original_title, film_clicks = 1 }) {
        const newFilm = await this.filmRep.create({
            film_id: id,
            name: title || original_title,
            film_clicks,
        });
        return newFilm.get();
    }

    async updateFilm(filmId, filmOpts) {
        const updatedFilm = await this.filmRep.update({ where: { id: filmId } }, { ...filmOpts });
        return updatedFilm;
    }

    async removeFilm(film_id) {
        const isRemoved = await this.filmRep.destroy({ where: { film_id } });
        return isRemoved;
    }

    async addFilmClick(film_id) {
        try {
            await this.filmRep.increment('film_clicks', { where: { film_id: parseInt(film_id) } });
        } catch (error) {
            throw error;
        }
    }
}
