import express from 'express';
import { getRepository } from 'typeorm';
import Controller from '../../utils/controller';
import { HttpException, HttpSuccess } from '../../utils/HttpReply';
import User from './user.entity';




class UserController implements Controller {
    public path = '/user'
    public router = express.Router()
    private userRepository = getRepository(User)

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(this.path, this.getAllUsers);
    }

    private getAllUsers = async (request: express.Request, response: express.Response) => {
        this.userRepository.find()
            .then(HttpSuccess.sendCallback(response, "All users gathered"))
            .catch(HttpException.sendCallback(response, 500, "All users could not be gathered"));
    }
}

export default UserController;