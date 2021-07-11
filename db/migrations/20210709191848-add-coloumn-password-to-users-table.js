module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addColumn('users', 'password', Sequelize.STRING);
    },

    down: async (queryInterface) => {
        await queryInterface.dropColumn('users', 'password');
    },
};
