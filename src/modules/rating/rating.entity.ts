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

@Table({
    tableName: 'rating',
    indexes: [
        {
            name: 'unique_pair_keys',
            unique: true,
            fields: ['film_id', 'user_id'],
        },
    ],
})
export class Rating extends Model {
    @ForeignKey(() => Film)
    @Column(DataType.BIGINT)
    film_id: number;

    @ForeignKey(() => User)
    @Column(DataType.BIGINT)
    user_id: number;

    @Column(DataType.INTEGER)
    rating: number;

    @CreatedAt created_at: Date;
    @UpdatedAt updated_at: Date;
}
