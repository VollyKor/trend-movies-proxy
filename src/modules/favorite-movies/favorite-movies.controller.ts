import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';

import { UserId } from 'src/utils/decorators/UserId';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { FavoriteMoviesService } from './favorite-movies.service';

@UseGuards(JwtAuthGuard)
@Controller('favorite-movies')
export class FavoriteMoviesController {
    constructor(private favoriteMoviesService: FavoriteMoviesService) {}

    @Post('add')
    public async addChosenMovie(@UserId() id: string, @Body('movieId') movieId: string) {
        return this.favoriteMoviesService.addChosenMovie(id, movieId);
    }

    @Delete('remove/:movieId')
    public async removeChosenMovie(@UserId() id: number, @Param('movieId') movieId: string) {
        return this.favoriteMoviesService.removeFavMovie(id, movieId);
    }

    @Get()
    public async getAllFavMovieByUser(@UserId() id: number, @Body('movieId') movieId: number) {
        return this.favoriteMoviesService.findAllChosenMoviesByUser(id);
    }
    @Get('list')
    public async getAllFavMovieListByUser(@UserId() id: number, @Body('movieId') movieId: number) {
        return this.favoriteMoviesService.findAllChosenMoviesByUser(id);
    }
}
