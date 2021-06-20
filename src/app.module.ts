import { Module } from '@nestjs/common';
import { FavoriteMoviesModule } from './favorite-movies/favorite-movies.module';
import { StatisticModule } from './statistic/statistic.module';

@Module({
  imports: [FavoriteMoviesModule, StatisticModule],
})
export class AppModule {}
