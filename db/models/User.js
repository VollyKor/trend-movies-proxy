module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
        'user',
        {
            user_id: {
                type: DataTypes.STRING,
            },
            user_name: DataTypes.TEXT,
            telegram_id: {
                type: DataTypes.STRING,
            },
            clicks: {
                type: DataTypes.INTEGER,
                default: 0,
            },
            favorite_movies: {
                type: DataTypes.ARRAY(DataTypes.TEXT),
            },
            movies_to_watch: {
                type: DataTypes.ARRAY(DataTypes.TEXT),
            },
        },
        {
            tableName: 'users',
        },
    );
    return User;
};
