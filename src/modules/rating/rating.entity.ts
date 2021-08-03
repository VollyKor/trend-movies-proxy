import { User } from '../users/user.entity';
import { Film } from '../film/film.entity';
import {
    Column,
    DataType,
    Model,
    Table,
    UpdatedAt,
    CreatedAt,
    ForeignKey,
} from 'sequelize-typescript';

@Table({ tableName: 'rating' })
export class Rating extends Model {
    @ForeignKey(() => Film)
    @Column(DataType.BIGINT)
    film_id: number;

    @ForeignKey(() => User)
    @Column(DataType.BIGINT)
    user_id: number;

    @Column(DataType.INTEGER)
    rating: number;

    @CreatedAt createdAt: Date;
    @UpdatedAt updatedAt: Date;
}
