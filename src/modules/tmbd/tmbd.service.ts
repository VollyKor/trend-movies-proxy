import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosInstance } from 'axios';
import { RedisApiService } from 'src/service/redis/redis.service';

@Injectable()
export class TmbdService {
    #page: number;
    #apiKey: string;
    #baseUrl: string;
    #tmbd: AxiosInstance;

    constructor(private readonly configService: ConfigService, private cache: RedisApiService) {
        this.#apiKey = this.configService.get('TMBD_API_KEY');
        this.#baseUrl = this.configService.get('TMBD_BASE_URL');
        this.#tmbd = axios.create({
            params: { api_key: this.#apiKey },
            baseURL: this.#baseUrl,
        });
    }

    public async getTrendMovies(page = '1') {
        return (await this.#tmbd.get(`/trending/movie/day?page=${page}`))?.data;
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
        await this.cache.setCustomKey(`MovieCredits:${id}`, data);
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

    public async getFilmById(id) {
        try {
            const cache = await this.cache.getCustomKey(`film:${id}`);
            if (cache) {
                return cache;
            }

            const data = (await this.#tmbd.get(`/movie/${id}`))?.data;
            await this.cache.setCustomKey(`film:${id}`, data);
            return data;
        } catch (error) {
            throw new InternalServerErrorException(error, error.message);
        }
    }
}
