import { HttpException, Injectable } from '@nestjs/common';

@Injectable()
export abstract class AppException extends HttpException {
    constructor(status: number, code: string, message: string, data?: Record<string, unknown>) {
        super(
            {
                code,
                message,
                data,
            },
            status,
        );
    }
}
