import { Module } from '@nestjs/common';
import { databaseProviders } from './db.providers';
import { filmsProviders } from '../film/film.providers';
import { usersProviders } from '../users/user.providers';
import { ratingProviders } from '../rating/rating.providers';
import { chosenFilmsProviders } from '../favorite-movies/chosen-movies.providers';

@Module({
    providers: [
        databaseProviders,
        ...filmsProviders,
        ...usersProviders,
        ...ratingProviders,
        ...chosenFilmsProviders,
    ],
    exports: [
        databaseProviders,
        ...filmsProviders,
        ...usersProviders,
        ...ratingProviders,
        ...chosenFilmsProviders,
    ],
})
export class DatabaseModule {}
