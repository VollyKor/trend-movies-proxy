import { ChosenMovies } from './chosenMovies.entity';

export const chosenFilmsProviders = [
    {
        provide: 'CHOSEN_REPOSITORY',
        useValue: ChosenMovies,
    },
];
