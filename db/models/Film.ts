import { Column, DataType, Model, Table, UpdatedAt, CreatedAt } from 'sequelize-typescript';

@Table({ tableName: 'films' })
export class Film extends Model {
    @Column(DataType.BIGINT)
    film_id: number;
    @Column
    name: string;
    @Column({ defaultValue: 0, type: DataType.INTEGER })
    film_clicks: number;
    @CreatedAt createdAt: Date;
    @UpdatedAt updatedAt: Date;
}
