import { Injectable, LoggerService as NestLoggerService } from '@nestjs/common';
import * as winston from 'winston';

@Injectable()
export class LoggerService implements NestLoggerService {
    private logger: winston.Logger;
    // eslint-disable-next-line @typescript-eslint/member-ordering
    constructor() {
        this.initializeLogger();
    }

    initializeLogger(): void {
        this.logger = winston.createLogger({
            format: winston.format.json(),
            transports: [new winston.transports.Console()],
        });
    }

    // eslint-disable-next-line @typescript-eslint/member-ordering
    private format(message: string, params?: Record<string, unknown>): Record<string, unknown> {
        return {
            _application: 'Trend-Movies-back',
            _stage: process.env.NODE_ENV,
            timestamp: new Date().toISOString(),
            message,
            ...params,
        };
    }

    log(message: string, context?: string, params?: Record<string, unknown>): void {
        this.logger.info(this.format(message, params));
    }

    info(message: string, params?: Record<string, unknown>): void {
        this.logger.info(this.format(message, params));
    }

    error(message: string, trace: string): void {
        this.logger.error(JSON.stringify(this.format(message, { trace })));
    }
    warn(message: string): void {
        this.logger.warn(JSON.stringify(this.format(message)));
    }
    debug(message: string): void {
        this.logger.debug(JSON.stringify(this.format(message)));
    }
    verbose(message: string): void {
        this.logger.verbose(JSON.stringify(this.format(message)));
    }
}
