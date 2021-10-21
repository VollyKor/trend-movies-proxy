import { InternalServerErrorException } from '@nestjs/common';
import { LoggerService } from 'src/service/loggers/logger.service';

const logger = new LoggerService();

/**
 * @description Catch Wrapper for async Functions
 */
export const TryCatch = (Exception = null, message = null): any => {
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
        if (descriptor && descriptor?.value?.constructor?.name == 'AsyncFunction') {
            _generateDescriptor(descriptor, Exception, message);
        } else {
            // Iterate over class properties except constructor
            for (const propertyName of Reflect.ownKeys(target.prototype).filter(
                (prop) => prop !== 'constructor',
            )) {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                const desc = Object.getOwnPropertyDescriptor(target.prototype, propertyName)!;
                const isMethod = desc.value instanceof Function;

                if (!isMethod) continue;

                Object.defineProperty(
                    target.prototype,
                    propertyName,
                    _generateDescriptor(desc, Exception, message),
                );
            }
        }
    };
};

function _generateDescriptor(
    descriptor: PropertyDescriptor,
    Exception: any,
    message: string,
): PropertyDescriptor {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
        const result = originalMethod.apply(this, args);

        return result.catch((error: any) => {
            if (logger) logger.error(message || error.message, '[_generateDescriptor]');

            throw Exception
                ? new Exception(message, error)
                : new InternalServerErrorException(error, message);
        });
    };
    return descriptor;
}
