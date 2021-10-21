import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

export const CheckToken = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();

    const authHeader = req.headers?.authorization;

    if (authHeader) {
        const token = authHeader.slice(7);
        const userData = jwt.decode(token);

        return userData;
    }
    return null;
});
