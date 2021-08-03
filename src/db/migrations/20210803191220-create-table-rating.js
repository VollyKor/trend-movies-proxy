module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('rating', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            film_id: {
                type: Sequelize.BIGINT,
                references: {
                    model: {
                        tableName: 'films',
                    },
                    key: 'id',
                },
                allowNull: false,
            },
            user_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: {
                        tableName: 'users',
                    },
                    key: 'id',
                },
                allowNull: false,
            },
            rating: Sequelize.INTEGER,
            created_at: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updated_at: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    down: async (queryInterface) => {
        await queryInterface.dropTable('films');
    },
};
