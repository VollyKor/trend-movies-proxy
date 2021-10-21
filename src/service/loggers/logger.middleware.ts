import { Injectable, NestMiddleware } from '@nestjs/common';

import { Request, Response, NextFunction } from 'express';
import { LoggerService } from './logger.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    constructor(private logger: LoggerService) {}

    use(req: Request, res: Response, next: NextFunction): any {
        const timeRequest = new Date().getTime();

        res.on('close', () => {
            const timeResponse = new Date().getTime();
            const delay = timeResponse - timeRequest;

            this.logger.log(res.statusMessage, undefined, {
                timeResponse,
                delay,
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                userID: (req.user as any)?.id || undefined,
                statusCode: res.statusCode,
                request: {
                    method: req.method,
                    body: req.body,
                },
                response: '', // todo
            });
        });

        next();
    }
}
