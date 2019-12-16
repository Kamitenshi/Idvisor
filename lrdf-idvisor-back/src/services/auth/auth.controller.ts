import { compare, genSalt, hash } from 'bcryptjs';
import express from "express";
import { getRepository } from 'typeorm';
import modelValidatorMiddleware from "../../middleware/model.validator";
import Controller from "../../utils/controller";
import { env } from '../../utils/env';
import { HttpException, HttpSuccess } from "../../utils/HttpReply";
import { createToken, deleteToken } from '../../utils/jwt';
import User, { LoggingUser, RegisteringUser } from "../user/user.entity";

class AuthController implements Controller {
    public path = '/auth';
    public router = express.Router();
    private userRepository = getRepository(User)

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(`${this.path}/register`, modelValidatorMiddleware(RegisteringUser), this.register);
        this.router.post(`${this.path}/login`, modelValidatorMiddleware(LoggingUser), this.loggingIn);
        this.router.get(`${this.path}/logout`, this.loggout);
    }

    private register = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        const userData: User = request.body;
        try {
            const found = await this.userRepository.findOne({ email: userData.email })
            if (found === undefined) {
                const salt = await genSalt(env.SALT_ROUND);
                const hashedPassword = await hash(userData.password, salt);
                this.userRepository.insert({
                    ...userData,
                    password: hashedPassword
                })
                    .then(HttpSuccess.sendCallback(response, "User successfuly created"))
            }
            else {
                next(new HttpException(403, "E-mail is already taken"));
            }
        }
        catch (err) {
            next(new HttpException(500, "Could not register user", err));
        }
    }

    private loggingIn = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        const userData: User = request.body;
        try {
            const user = await this.userRepository.findOne({ email: userData.email });
            if (user) {
                const passwordMatch = await compare(userData.password, user.password);
                if (passwordMatch) {
                    createToken(response, user.role);
                    HttpSuccess.send(response, `Session created - user: ${userData.email}`);
                }
                else {
                    next(new HttpException(403, "Wrong credentials"));
                }
            }
            else {
                next(new HttpException(403, "Wrong credentials"));
            }
        }
        catch (err) {
            next(new HttpException(500, "Could not loggin user", err));
        }
    }

    private loggout = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        deleteToken(response);
        HttpSuccess.send(response, "Session ended");
    }
}

export default AuthController;