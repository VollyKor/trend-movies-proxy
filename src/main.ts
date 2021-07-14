import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

const PORT = process.env.PORT || 3010;

async function bootstrap() {
    try {
        const app = await NestFactory.create(AppModule);
        app.useGlobalPipes(new ValidationPipe());
        app.enableCors();

        await app.listen(PORT);
        console.log('Server runing on port: ', PORT);
    } catch (error) {
        console.error(error);
    }
}
bootstrap();
