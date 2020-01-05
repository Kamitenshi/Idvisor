import { compare } from "bcryptjs";
import express from 'express';
import { getRepository } from 'typeorm';
import UserDB, { Role } from '../services/user/user.entity';
import { HttpException } from "../utils/HttpReply";
import { checkToken, cookieName } from "../utils/jwt";

function isAuthorized(authorizedRole: Role, request: express.Request, res: express.Response, next: express.NextFunction) {
    try {
        const cookie = request.cookies[cookieName];
        const token = checkToken(cookie);
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


export const isUser = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
    const userRepository = getRepository(UserDB)
    const { email, password } = request.query

    try {
        const user = await userRepository.findOne({ email })
        if (user) {
            const passwordMatch = await compare(password, user.password)
            if (passwordMatch) {
                next()
            }
            else {
                next(new HttpException(403, "Wrong credentials"));
            }
        }
        else {
            next(new HttpException(403, "Wrong credentials"))
        }
    }
    catch (e) {
        next(new HttpException(500, "Could not patch user informations", e))
    }
}