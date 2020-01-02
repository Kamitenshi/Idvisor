import { compare, genSalt, hash } from 'bcryptjs';
import express from "express";
import { getRepository } from 'typeorm';
import { isAdmin, isStudent } from "../../middleware/auth";
import modelValidatorMiddleware from "../../middleware/model.validator";
import Controller from "../../utils/controller";
import { env } from '../../utils/env';
import { HttpException, HttpSuccess } from "../../utils/HttpReply";
import { createToken, deleteToken } from '../../utils/jwt';
import User, { LoggingUser, RegisteringUser, Role } from "../user/user.entity";

class AuthController implements Controller {
    public path = '/auth';
    public router = express.Router();
    private userRepository = getRepository(User)

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(`${this.path}/register/admin`, isAdmin, modelValidatorMiddleware(RegisteringUser), this.registerAdmin);
        this.router.post(`${this.path}/register/advisor`, isAdmin, modelValidatorMiddleware(RegisteringUser), this.registerAdvisor);
        this.router.post(`${this.path}/register/student`, modelValidatorMiddleware(RegisteringUser), this.registerStudent);
        this.router.get(`${this.path}/login`, modelValidatorMiddleware(LoggingUser), this.loggingIn);
        this.router.get(`${this.path}/logout`, this.loggout);
        this.router.get(`${this.path}/test/isAdmin`, isAdmin, this.testAdmin);
        this.router.get(`${this.path}/test/isStudent`, isStudent, this.testStudent);
    }

    private testAdmin = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        console.log("In testAdmin");

        response.send(200)
    }

    private testStudent = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        console.log("In testStudent");

        response.send(200)
    }

    private registerAdmin = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        this.register(request, response, next, 'admin')
    }
    private registerStudent = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        this.register(request, response, next, 'student')
    }
    private registerAdvisor = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        this.register(request, response, next, 'advisor')
    }

    private register = async (request: express.Request, response: express.Response, next: express.NextFunction, role: Role) => {
        const userData: User = { ...request.body, role };
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
        const userData: User = request.query;
        try {
            const user = await this.userRepository.findOne({ email: userData.email });
            if (user) {
                const passwordMatch = await compare(userData.password, user.password);
                if (passwordMatch) {
                    createToken(response, user.role);
                    HttpSuccess.send(response, `Session created - user: ${userData.email}`, { username: user.username, role: user.role });
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