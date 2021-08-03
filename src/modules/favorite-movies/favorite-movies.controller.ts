import { Controller } from '@nestjs/common';
import { FavoriteMoviesService } from './favorite-movies.service';

@Controller('favorite-movies')
export class FavoriteMoviesController {
    constructor(private favoriteMoviesService: FavoriteMoviesService) {}
}
