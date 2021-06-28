import { Column, DataType, Model, Table, UpdatedAt, CreatedAt } from 'sequelize-typescript';

@Table
export class User extends Model {
    @Column user_id: string;
    @Column user_name: string;
    @Column telegram_id: string;
    @Column({ defaultValue: 0 }) clicks: number;
    @Column(DataType.ARRAY(DataType.TEXT)) favorite_movies: boolean;
    @Column(DataType.ARRAY(DataType.TEXT)) movies_to_watch: string[];
    @CreatedAt
    creationDate: Date;
    @UpdatedAt
    updatedOn: Date;
}

// module.exports = (sequelize, DataTypes) => {
//     const User = sequelize.define(
//         'user',
//         {
//             user_id: {
//                 type: DataTypes.STRING,
//             },
//             user_name: DataTypes.TEXT,
//             telegram_id: {
//                 type: DataTypes.STRING,
//             },
//             clicks: {
//                 type: DataTypes.INTEGER,
//                 default: 0,
//             },
//             favorite_movies: {
//                 type: DataTypes.ARRAY(DataTypes.TEXT),
//             },
//             movies_to_watch: {
//                 type: DataTypes.ARRAY(DataTypes.TEXT),
//             },
//         },
//         {
//             tableName: 'users',
//         },
//     );
//     return User;
// };
