// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

const DB_USER_NAME = process.env.DB_USER_NAME || 'postgres';
const DB_PASSWORD = process.env.DB_PASSWORD || '';
const DB_DATABASE = process.env.DB_DATABASE || 'postgres';
const DB_HOST = process.env.DB_HOST || '127.0.0.1';
const DB_PORT = process.env.DB_PORT || 5432;

module.exports = {
    local: {
        username: DB_USER_NAME,
        password: DB_PASSWORD,
        database: DB_DATABASE,
        host: '127.0.0.1',
        port: DB_PORT,
        dialect: 'postgres',
        dialectOptions: {
            bigNumberStrings: true,
        },
    },
    development: {
        username: DB_USER_NAME,
        password: DB_PASSWORD,
        database: DB_DATABASE,
        host: DB_HOST,
        port: DB_PORT,
        dialect: 'postgres',
        dialectOptions: {
            bigNumberStrings: true,
        },
    },
    test: {
        username: process.env.CI_DB_USERNAME,
        password: process.env.CI_DB_PASSWORD,
        database: process.env.CI_DB_NAME,
        host: '127.0.0.1',
        port: 3306,
        dialect: 'mysql',
        dialectOptions: {
            bigNumberStrings: true,
        },
    },
    production: {
        username: process.env.PROD_DB_USERNAME,
        password: process.env.PROD_DB_PASSWORD,
        database: process.env.PROD_DB_NAME,
        host: process.env.PROD_DB_HOSTNAME,
        port: process.env.PROD_DB_PORT,
        dialect: 'mysql',
    },
};
