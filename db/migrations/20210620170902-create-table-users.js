module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('users', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            user_id: Sequelize.STRING,
            user_name: Sequelize.STRING,
            email: Sequelize.STRING,
            clicks: {
                type: Sequelize.INTEGER,
                default: 0,
            },
            favorite_movies: Sequelize.ARRAY(Sequelize.TEXT),
            movies_to_watch: Sequelize.ARRAY(Sequelize.TEXT),
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    down: async (queryInterface) => {
        await queryInterface.dropTable('users');
    },
};
