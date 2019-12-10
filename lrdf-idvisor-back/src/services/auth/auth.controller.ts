import { genSalt, hash } from 'bcryptjs';
import express from "express";
import { getRepository } from 'typeorm';
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
            next(new HttpException(500, "Could not register user"));
        }
    }

    private loggingIn = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
    }
}

export default AuthController;