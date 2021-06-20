import { Module } from '@nestjs/common';
import { FavoriteMoviesController } from './favorite-movies.controller';
import { FavoriteMoviesService } from './favorite-movies.service';

@Module({
  controllers: [FavoriteMoviesController],
  providers: [FavoriteMoviesService]
})
export class FavoriteMoviesModule {}
