import { Film } from './film.entity';

export const filmsProviders = [
    {
        provide: 'FILM_REPOSITORY',
        useValue: Film,
    },
];
