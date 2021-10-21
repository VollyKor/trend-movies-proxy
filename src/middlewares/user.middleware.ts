import { Injectable, NestMiddleware } from '@nestjs/common';
import * as json from 'jsonwebtoken';

@Injectable()
export class UserMiddleware implements NestMiddleware {
    use(req, res, next) {
        const header = req.headers?.authorization;

        if (header) {
            const token = header.slice(7);
            const data = json.decode(token);
            res.user = data;
        }
        next();
    }
}
