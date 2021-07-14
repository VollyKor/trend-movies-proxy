import { Module } from '@nestjs/common';
import { databaseProviders } from './db.providers';
import { filmsProviders } from '../film/film.providers';
import { usersProviders } from '../users/user.providers';

@Module({
    providers: [databaseProviders, ...filmsProviders, ...usersProviders],
    exports: [databaseProviders, ...filmsProviders, ...usersProviders],
})
export class DatabaseModule {}
