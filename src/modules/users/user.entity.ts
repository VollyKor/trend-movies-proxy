import {
    Column,
    DataType,
    Model,
    Table,
    UpdatedAt,
    CreatedAt,
    HasMany,
} from 'sequelize-typescript';

import { Rating } from 'src/modules/rating/rating.entity';
import { ChosenMovies } from '../favorite-movies/chosenMovies.entity';

@Table({ tableName: 'users' })
export class User extends Model {
    @Column(DataType.STRING) user_name: string;
    @Column(DataType.STRING) email: string;
    @Column(DataType.STRING) password: string;
    @Column({ defaultValue: 0 }) clicks: number;
    @Column(DataType.ARRAY(DataType.TEXT)) favorite_movies: boolean;
    @Column(DataType.ARRAY(DataType.TEXT)) movies_to_watch: string[];
    @CreatedAt
    createdAt: Date;
    @UpdatedAt
    updatedAt: Date;

    @HasMany(() => Rating)
    rating: Rating[];

    @HasMany(() => ChosenMovies)
    chosen_movies: ChosenMovies[];
}
