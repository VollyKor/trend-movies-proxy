import { Module } from '@nestjs/common';
import { databaseProviders } from './db.providers';
import { filmsProviders } from '../film/film.providers';
import { usersProviders } from '../users/user.providers';
import { ratingProviders } from '../rating/rating.providers';

@Module({
    providers: [databaseProviders, ...filmsProviders, ...usersProviders, ...ratingProviders],
    exports: [databaseProviders, ...filmsProviders, ...usersProviders, ...ratingProviders],
})
export class DatabaseModule {}
