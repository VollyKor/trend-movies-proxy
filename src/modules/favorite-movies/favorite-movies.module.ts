import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { DatabaseModule } from '../db/db.module';
import { TmbdModule } from '../tmbd/tmbd.module';
import { FavoriteMoviesController } from './favorite-movies.controller';
import { FavoriteMoviesService } from './favorite-movies.service';

@Module({
    imports: [AuthModule, DatabaseModule, TmbdModule],
    controllers: [FavoriteMoviesController],
    providers: [FavoriteMoviesService],
})
export class FavoriteMoviesModule {}
