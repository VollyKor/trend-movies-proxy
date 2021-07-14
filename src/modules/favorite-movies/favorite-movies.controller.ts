import { Controller, Delete, Get, Patch, Post, Put } from '@nestjs/common';
import { FavoriteMoviesService } from './favorite-movies.service';

@Controller('favorite-movies')
export class FavoriteMoviesController {
    constructor(private favoriteMoviesService: FavoriteMoviesService) {}

    @Get('')
    async getFilms() {
        return this.favoriteMoviesService.getFilms();
    }
    @Post(':id')
    // async addFilm() {
    //     return this.favoriteMoviesService.getFilms();
    // }
    @Put(':id')
    async updateFilm() {
        return this.favoriteMoviesService.getFilms();
    }
    @Delete(':id')
    async removeFilm() {
        return this.favoriteMoviesService.getFilms();
    }
}
