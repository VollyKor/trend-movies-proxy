import { NestExpressApplication } from '@nestjs/platform-express';
import { Transport } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { join } from 'path';

import { AppModule } from './app.module';
import { LoggerService } from './service/loggers/logger.service';

// eslint-disable-next-line @typescript-eslint/no-var-requires

const PORT = process.env.PORT || 3010;

async function bootstrap() {
    try {
        const app = await NestFactory.create<NestExpressApplication>(AppModule, {
            logger: new LoggerService(),
            cors: true,
        });

        app.useStaticAssets(join(__dirname, '..', 'public'));
        app.setBaseViewsDir(join(__dirname, '..', 'public'));
        app.setViewEngine('hbs');

        app.useLogger(app.get(LoggerService));
        app.useGlobalPipes(new ValidationPipe());

        await NestFactory.createMicroservice(AppModule, {
            transport: Transport.REDIS,
            options: {
                url: 'redis://localhost:6379',
            },
        });

        await app.listen(PORT);
        console.log('Server runing on port: ', PORT);
    } catch (error) {
        throw error;
        console.error(error);
    }
}
bootstrap();
