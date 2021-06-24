import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const getDB = require('../db/models');

const db = getDB();

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

const PORT = process.env.PORT || 3010;

async function bootstrap() {
    try {
        const app = await NestFactory.create(AppModule);
        app.enableCors();

        await db.sequelize.authenticate();
        console.log('Connection has been established successfully.');

        await db.sequelize.sync();
        console.log('All models were synchronized successfully.');

        await app.listen(PORT);
        console.log('Server runing on port: ', PORT);
    } catch (error) {
        console.error(error);
    }
}
bootstrap();
