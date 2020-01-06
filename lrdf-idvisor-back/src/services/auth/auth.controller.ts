import { genSalt, hash } from 'bcryptjs';
import express from "express";
import { getRepository } from 'typeorm';
import { isAdmin, isStudent, isUser } from "../../middleware/auth";
import modelValidatorMiddleware from "../../middleware/model.validator";
import Controller from "../../utils/controller";
import { env } from '../../utils/env';
import { HttpException, HttpSuccess } from "../../utils/HttpReply";
import { createToken, deleteToken } from '../../utils/jwt';
import UserDB, { LoggingUser, RegisteringUser, Role } from "../user/user.entity";

class AuthController implements Controller {
    public path = '/auth';
    public router = express.Router();
    private userRepository = getRepository(UserDB)

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(`${this.path}/register/admin`, modelValidatorMiddleware(RegisteringUser), isAdmin, this.registerAdmin);
        this.router.post(`${this.path}/register/advisor`, modelValidatorMiddleware(RegisteringUser), isAdmin, this.registerAdvisor);
        this.router.post(`${this.path}/register/student`, modelValidatorMiddleware(RegisteringUser), this.registerStudent);
        this.router.get(`${this.path}/login`, modelValidatorMiddleware(LoggingUser), isUser, this.loggingIn);
        this.router.get(`${this.path}/logout`, this.loggout);
        //TODO: Delete the 2 routes below
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
        const userData: UserDB = { ...request.body, role };
        try {
            const found = await this.userRepository.findOne({ email: userData.email })
            if (found === undefined) {
                const salt = await genSalt(env.SALT_ROUND);
                const hashedPassword = await hash(userData.password, salt);
                await this.userRepository.insert({
                    ...userData,
                    password: hashedPassword
                })
                HttpSuccess.send(response, "User successfuly created",
                    { username: userData.username, email: userData.email, role: userData.role, id: userData.id })
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
        const userData: UserDB = request.query;
        try {
            const user = await this.userRepository.findOne({ email: userData.email }) as UserDB
            createToken(response, user.role, user.email);
            HttpSuccess.send(response, `Session created - user: ${userData.email}`, { username: user.username, role: user.role, id: user.id });
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