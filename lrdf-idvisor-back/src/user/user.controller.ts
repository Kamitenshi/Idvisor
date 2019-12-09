import express from "express";
import { getRepository } from "typeorm";
import modelValidatorMiddleware from "../middleware/model.validator";
import { HttpException, HttpSuccess } from "../utils/HttpReply";
import User from "./user.entity";

class UserController {
    public path = '/user'
    public router = express.Router()
    private userRepository = getRepository(User)

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(this.path, this.getAllUsers);
        this.router.post(this.path, modelValidatorMiddleware(User), this.createUser);
    }

    private getAllUsers = async (request: express.Request, response: express.Response) => {
        const users = await this.userRepository.find();
        response.send(users);
    }

    private createUser = async (request: express.Request, response: express.Response) => {
        const userData = request.body;
        await this.userRepository.insert(userData)
            .then(HttpSuccess.createSender(response, "User successfuly created"))
            .catch(HttpException.createSender(response, 400, "User could not be created"));
    }
}

export default UserController;