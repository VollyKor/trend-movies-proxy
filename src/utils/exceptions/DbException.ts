import { HttpStatus, Injectable } from '@nestjs/common';
import { AppException } from './AppException';

@Injectable()
export class DbException extends AppException {
    constructor(message: string, error?: any) {
        super(
            error?.status || error?.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
            error?.code || error?.response?.code || 'DbException',
            message || error?.message || error?.response?.message,
        );
    }
}
