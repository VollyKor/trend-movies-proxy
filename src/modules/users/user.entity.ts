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
@Table({ tableName: 'users' })
export class User extends Model {
    @Column user_id: string;
    @Column user_name: string;
    @Column email: string;
    @Column password: string;
    @Column({ defaultValue: 0 }) clicks: number;
    @Column(DataType.ARRAY(DataType.TEXT)) favorite_movies: boolean;
    @Column(DataType.ARRAY(DataType.TEXT)) movies_to_watch: string[];
    @CreatedAt
    createdAt: Date;
    @UpdatedAt
    updatedAt: Date;

    @HasMany(() => Rating)
    rating: Rating[];
}
