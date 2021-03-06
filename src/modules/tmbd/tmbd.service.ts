import { Catch, HttpException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosInstance } from 'axios';
import { RedisApiService } from 'src/service/redis/redis.service';
import { TryCatch } from 'src/utils/decorators/tryCatch';
import { FilmService } from '../film/film.service';
import { UsersService } from '../users/users.service';

@Injectable()
// @TryCatch(HttpException)
export class TmbdService {
    #apiKey: string;
    #baseUrl: string;
    #tmbd: AxiosInstance;

    constructor(
        private readonly configService: ConfigService,
        private cache: RedisApiService,
        private filmService: FilmService,
        private userService: UsersService,
    ) {
        this.#apiKey = this.configService.get('TMBD_API_KEY');
        this.#baseUrl = this.configService.get('TMBD_BASE_URL');
        this.#tmbd = axios.create({
            params: { api_key: this.#apiKey },
            baseURL: this.#baseUrl,
        });
    }

    public async getTrendMovies(page = '1') {
        const cache = await this.cache.getCustomKey(`trendMovies:${page}`);
        if (cache) return cache;

        const data = (await this.#tmbd.get(`/trending/movie/day?page=${page}`))?.data;
        this.cache.setCustomKey(`trendMovies:${page}`, data, 60 * 15);
        return data;
    }

    public async getReview(id, page = 1) {
        try {
            return (await this.#tmbd.get(`/movie/${id}/reviews?language=en-US&page${page}`))?.data;
        } catch (error) {
            throw new InternalServerErrorException(error, error.message);
        }
    }

    public async getImgURL(size = 'original', url) {
        return (await axios.get(`https://image.tmdb.org/t/p/${size}${url}`))?.data;
    }

    public async getApiConfig() {
        return (await this.#tmbd.get(`/configuration`))?.data;
    }

    public async getMovieCredits(id) {
        const cache = await this.cache.getCustomKey(`MovieCredits:${id}`);
        if (cache) return cache;

        const data = (await this.#tmbd.get(`/movie/${id}/credits?language=en-US`))?.data;
        this.cache.setCustomKey(`MovieCredits:${id}`, data);
        return data;
    }

    public async getApiGenresList() {
        return (await this.#tmbd.get(`/genre/movie/list?language=en-US`))?.data;
    }

    public async searchFilms(query) {
        try {
            return (await this.#tmbd.get(`/search/movie?query=${query}`))?.data;
        } catch (error) {
            throw new InternalServerErrorException(error, error.message);
        }
    }

    public async getFilmById(id: string, userId = null) {
        try {
            if (userId) this.userService.addUserClick(userId);

            const cache = await this.cache.getCustomKey(`film:${id}`);
            if (cache) {
                const data = JSON.parse(cache);
                this.filmService.handleFilm(data);
                return data;
            }

            const data = (await this.#tmbd.get(`/movie/${id}`))?.data;
            this.filmService.handleFilm(data);
            this.cache.setCustomKey(`film:${id}`, data);
            return data;
        } catch (error) {
            throw new InternalServerErrorException(error, error.message);
        }
    }
}
