import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoggerMiddleware } from './logger.middleware';
import { LoggerService } from './logger.service';

@Module({
    imports: [ConfigModule],
    providers: [LoggerService, LoggerMiddleware],
    exports: [LoggerService, LoggerMiddleware],
})
export class CustomLoggerModule {}
