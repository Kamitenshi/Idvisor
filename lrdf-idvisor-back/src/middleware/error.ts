import { NextFunction, Request, Response } from 'express';
import { HttpException } from '../utils/HttpReply';

function errorMiddleware(error: HttpException, request: Request, response: Response, next: NextFunction) {
    error.reply.send(response);
}

export default errorMiddleware;