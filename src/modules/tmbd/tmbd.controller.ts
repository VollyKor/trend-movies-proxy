import { Body, Controller, Get, Param, Query, Req } from '@nestjs/common';
import { CheckToken } from 'src/utils/decorators/CheckToken';
import { UserId } from 'src/utils/decorators/UserId';
import { TmbdService } from './tmbd.service';

@Controller('tmbd')
export class TmbdController {
    constructor(private tmbdService: TmbdService) {}

    @Get('/trend-movies/:page')
    async getTrendMovies(@Param('page') page: string) {
        return this.tmbdService.getTrendMovies(page);
    }

    @Get('/review/:id/:page')
    async getReview(@Param() params: any) {
        const { id, page } = params;
        return this.tmbdService.getReview(id, page);
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
    async getFilmById(@Param('id') id: string, @CheckToken() user: any) {
        console.log(user);

        return this.tmbdService.getFilmById(id, user?.id);
    }

    @Get('search/movie/')
    async searchFilm(@Query('query') query: string) {
        return this.tmbdService.searchFilms(query);
    }
}
