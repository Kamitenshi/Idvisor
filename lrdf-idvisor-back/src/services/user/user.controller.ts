import express from 'express';
import { getRepository } from 'typeorm';
import { isAdmin } from '../../middleware/auth';
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
        this.router.get(`${this.path}/all`, isAdmin, this.getAllUsers)
        this.router.delete(`${this.path}/add`, isAdmin, this.addUser)
        this.router.delete(`${this.path}/delete`, isAdmin, this.deleteUser)
    }

    private getAllUsers = async (request: express.Request, response: express.Response) => {
        this.userRepository.find({ select: ['username', 'email', 'role'] })
            .then(HttpSuccess.sendCallback(response, "All users gathered"))
            .catch(HttpException.sendCallback(response, 500, "All users could not be gathered"));
    }

    private addUser = async (request: express.Request, response: express.Response) => {
    }

    private deleteUser = async (request: express.Request, response: express.Response) => {
        const user: User = request.query
        this.userRepository.delete({ email: user.email })
    }
}

export default UserController;