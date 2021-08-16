import {
    Column,
    DataType,
    ForeignKey,
    Model,
    Table,
    UpdatedAt,
    CreatedAt,
} from 'sequelize-typescript';
import { Film } from '../film/film.entity';
import { User } from '../users/user.entity';

@Table({ tableName: 'chosen_movies' })
export class ChosenMovies extends Model {
    @ForeignKey(() => Film)
    @Column({ type: DataType.BIGINT, primaryKey: true })
    film_id: number;

    @ForeignKey(() => User)
    @Column(DataType.INTEGER)
    user_id: number;

    @Column({ defaultValue: 0, type: DataType.INTEGER })
    type: string;

    @CreatedAt createdAt: Date;
    @UpdatedAt updatedAt: Date;
}
