import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    private logger = new Logger('HTTP');

    use(request: Request, response: Response, next: NextFunction): void {
        const { ip, method, originalUrl } = request;
        const userAgent = request.get('user-agent') || '';

        response.on('readable', () => {
            this.logger.log(
                `Request Body:${request.body}, Request Params:${request.params}, Request Query: ${request.query}`,
            );
        });

        response.on('finish', () => {
            const { statusCode } = response;
            const contentLength = response.get('content-length');

            this.logger.log(
                `[${method}] URL: ${originalUrl} code: ${statusCode} ${contentLength} - ${userAgent} ${ip}`,
            );
        });

        next();
    }
}
