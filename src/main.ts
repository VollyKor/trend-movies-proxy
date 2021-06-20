import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { sequelize as db } from '../db/models';

require('dotenv').config();

const PORT = process.env.PORT || 3010;

async function bootstrap() {
    try {
        const app = await NestFactory.create(AppModule);
        app.enableCors();

        await db.authenticate();
        console.log('Connection has been established successfully.');

        await db.sync();
        console.log('All models were synchronized successfully.');

        await app.listen(PORT);
        console.log('Server runing on port: ', PORT);
    } catch (error) {
        console.error(error);
    }
}
bootstrap();
