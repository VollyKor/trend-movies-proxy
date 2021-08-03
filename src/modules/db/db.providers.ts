import { Sequelize } from 'sequelize-typescript';
import { Film } from '../film/film.entity';
import { User } from '../users/user.entity';
import { Rating } from '../rating/rating.entity';

export const databaseProviders = {
    provide: 'SEQUELIZE',
    useFactory: async () => {
        const sequelize = new Sequelize({
            dialect: 'postgres',
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT) || 5432,
            username: process.env.DB_USER_NAME || 'postgres',
            password: process.env.DB_PASSWORD || '',
            database: process.env.DB_DATABASE || 'postgres',
            logging: false,
        });
        sequelize.addModels([User, Film, Rating]);
        await sequelize.sync();
        return sequelize;
    },
};
