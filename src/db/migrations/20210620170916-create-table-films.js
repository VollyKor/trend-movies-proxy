module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('films', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            film_id: {
                type: Sequelize.BIGINT,
            },
            film_clicks: {
                type: Sequelize.INTEGER,
                default: 0,
            },
            name: Sequelize.TEXT,
            desc: Sequelize.TEXT,
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
        await queryInterface.dropTable('films');
    },
};
