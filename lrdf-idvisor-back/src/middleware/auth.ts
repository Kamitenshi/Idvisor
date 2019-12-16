import express from 'express';
import { Role } from '../services/user/user.entity';
import { HttpException } from "../utils/HttpReply";
import { checkToken } from "../utils/jwt";

function isAuthorized(authorizedRole: Role, request: express.Request, res: express.Response, next: express.NextFunction) {
    try {
        const token = checkToken(request);
        const role = token.role;
        if (role == authorizedRole) {
            next();
        }
        else {
            next(new HttpException(403, `User is not a ${authorizedRole}`));
        }
    }
    catch (err) {
        res.status(500).json({ error: "Not Authorized" }); //TODO: give a more precise answer (server down, not valid token, ...)
    }
}

export function isAdmin(request: express.Request, res: express.Response, next: express.NextFunction) {
    isAuthorized('admin', request, res, next);
}

export function isAdvisor(request: express.Request, res: express.Response, next: express.NextFunction) {
    isAuthorized('advisor', request, res, next);
}

export function isStudent(request: express.Request, res: express.Response, next: express.NextFunction) {
    isAuthorized('student', request, res, next);
}