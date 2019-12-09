import express from "express";
import { getRepository } from "typeorm";
import modelValidatorMiddleware from "../middleware/model.validator";
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
        const newUser = this.userRepository.create(userData);
        await this.userRepository.save(newUser);
        response.send("Success");
    }
}

export default UserController;