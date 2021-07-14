import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { FavoriteMoviesController } from './favorite-movies.controller';
import { FavoriteMoviesService } from './favorite-movies.service';

@Module({
    imports: [AuthModule],
    controllers: [FavoriteMoviesController],
    providers: [FavoriteMoviesService],
})
export class FavoriteMoviesModule {}
