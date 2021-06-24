module.exports = (sequelize, DataTypes) => {
    const Film = sequelize.define(
        'film',
        {
            film_id: {
                type: DataTypes.STRING,
            },
            film_clicks: {
                type: DataTypes.INTEGER,
                default: 0,
            },
            name: DataTypes.TEXT,
            desc: DataTypes.TEXT,
        },
        {
            timeStampts: true,
            tableName: 'films',
        },
    );
    return Film;
};
