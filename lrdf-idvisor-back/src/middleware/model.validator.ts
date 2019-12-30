import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import * as express from 'express';
import { HttpException } from '../utils/HttpReply';

function modelValidatorMiddleware<T>(type: any): express.RequestHandler {
    return (req: express.Request, res: express.Response, next: express.NextFunction) => {
        const data = req.method === "POST" ? req.body : req.query
        validate(plainToClass(type, data))
            .then((errors: ValidationError[]) => {
                if (errors.length > 0) {
                    const message = errors.map((error: ValidationError) => Object.values(error.constraints)).join(', ');
                    const status = 400
                    next(new HttpException(status, message));
                } else {
                    next();
                }
            });
    };
}

export default modelValidatorMiddleware;