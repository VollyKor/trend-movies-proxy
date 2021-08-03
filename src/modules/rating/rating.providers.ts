import { Rating } from './rating.entity';

export const ratingProviders = [
    {
        provide: 'RATING_REPOSITORY',
        useValue: Rating,
    },
];
