import {
    Column,
    DataType,
    Model,
    Table,
    UpdatedAt,
    CreatedAt,
    HasMany,
} from 'sequelize-typescript';
import { ChosenMovies } from '../favorite-movies/chosenMovies.entity';
import { Rating } from '../rating/rating.entity';

@Table({ tableName: 'films' })
export class Film extends Model {
    @Column({ type: DataType.BIGINT, primaryKey: true })
    film_id: number;

    @Column
    name: string;

    @Column({ defaultValue: 0, type: DataType.INTEGER })
    film_clicks: number;

    @CreatedAt createdAt: Date;
    @UpdatedAt updatedAt: Date;

    @HasMany(() => Rating)
    rating: Rating[];

    @HasMany(() => ChosenMovies)
    chosen_movies: ChosenMovies[];
}
