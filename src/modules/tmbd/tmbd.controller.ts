import { Body, Controller, Get, Param } from '@nestjs/common';
import { TmbdService } from './tmbd.service';

@Controller('tmbd')
export class TmbdController {
    constructor(private tmbdService: TmbdService) {}

    @Get('/trend-movies/:page')
    async getTrendMovies(@Param('page') page: string) {
        return this.tmbdService.getTrendMovies(page);
    }

    @Get('/review/:id')
    async getReview(@Param('id') id: string) {
        return this.tmbdService.getReview(id);
    }

    @Get('/img-url')
    async getImgUrl(@Body() data: any) {
        return this.tmbdService.getImgURL(data.size, data.url);
    }

    @Get('/tmbd-config')
    async getConfig() {
        return this.tmbdService.getApiConfig();
    }

    @Get('/movie-credits/:id')
    async getMovieCredits(@Param('id') id: string) {
        return this.tmbdService.getMovieCredits(id);
    }

    @Get('/genres-list')
    async getGenresList() {
        return this.tmbdService.getApiGenresList();
    }

    @Get('/movie/:id')
    async getFilmById(@Param('id') id: string) {
        return this.tmbdService.getFilmById(id);
    }

    @Get('search/movie/:name')
    async searchFilm(@Param('name') name: string) {
        return this.tmbdService.searchFilms(name);
    }
}
