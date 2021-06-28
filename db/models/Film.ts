import { Column, DataType, Model, Table, UpdatedAt, CreatedAt } from 'sequelize-typescript';

@Table
export class Film extends Model {
    @Column(DataType.BIGINT)
    film_id: number;
    @Column
    film_name: string;
    @Column({ defaultValue: 0, type: DataType.INTEGER })
    film_clicks: number;
    @CreatedAt creationDate: Date;
    @UpdatedAt updatedOn: Date;
}

// module.exports = (sequelize, DataTypes) => {
//     const Film = sequelize.define(
//         'film',
//         {
//             film_id: {
//                 type: DataTypes.STRING,
//             },
//             film_clicks: {
//                 type: DataTypes.INTEGER,
//                 default: 0,
//             },
//             name: DataTypes.TEXT,
//             desc: DataTypes.TEXT,
//         },
//         {
//             timeStampts: true,
//             tableName: 'films',
//         },
//     );
//     return Film;
// };
