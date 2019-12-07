import express from "express";
import { getRepository } from "typeorm";
import User from "./user.entity";
import { request } from "http";

class UserController {
    public path = '/user'
    public router = express.Router()
    private userRepository = getRepository(User)

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(this.path, this.getAllUsers);
        this.router.post(this.path, this.createUser);
    }

    private getAllUsers = async (request: express.Request, response: express.Response) => {
        const users = await this.userRepository.find();
        response.send(users);
    }

    private createUser = async (request: express.Request, response: express.Response) => {
        // TODO : add error checking
        const userData = request.body;
        const newUser = this.userRepository.create(userData);
        await this.userRepository.save(newUser);
        response.send("Success");
    }
}

export default UserController;