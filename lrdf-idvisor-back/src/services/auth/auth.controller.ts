import { compare, genSalt, hash } from 'bcryptjs';
import express from "express";
import { readFileSync } from 'fs';
import { sign } from "jsonwebtoken";
import { getRepository } from 'typeorm';
import isAuthenticated from '../../middleware/auth';
import modelValidatorMiddleware from "../../middleware/model.validator";
import Controller from "../../utils/controller";
import { env } from '../../utils/env';
import { HttpException, HttpSuccess } from "../../utils/HttpReply";
import User from "../user/user.entity";

class AuthController implements Controller {
    public path = '/auth';
    public router = express.Router();
    private userRepository = getRepository(User)

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(`${this.path}/register`, modelValidatorMiddleware(User), this.register);
        this.router.post(`${this.path}/login`, this.loggingIn);//TODO: add data check
        this.router.get(`${this.path}/logout`, this.loggout);
        this.router.get(`${this.path}/test`, isAuthenticated, this.test);
    }

    private test = async (request, response: express.Response, next: express.NextFunction) => {
        response.send(request.user);
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
        catch (err) { //TODO: pass the error to the httpException
            next(new HttpException(500, "Could not register user"));
        }
    }

    private async createToken() {
        let privateKey = readFileSync('private.pem', 'utf8');
        return sign({ "body": "stuff" }, "MySuperSecretPassPhrase", { algorithm: 'HS256' });
    }

    private loggingIn = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        const userData: User = request.body;
        try {
            const user = await this.userRepository.findOne({ email: userData.email });
            if (user) {
                const passwordMatch = await compare(userData.password, user.password);
                if (passwordMatch) {
                    const token = await this.createToken();
                    response.cookie('token', token, { maxAge: 1000 * 60 * 60 });
                    response.send(token);
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
            next(new HttpException(500, "could not loggin user"));
        }
    }

    private loggout = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        response.clearCookie('token');
        response.send(200);
    }
}

export default AuthController;