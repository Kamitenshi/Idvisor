import express from 'express';
import { getRepository } from 'typeorm';
import { isAdmin, isUser } from '../../middleware/auth';
import Controller from '../../utils/controller';
import { HttpException, HttpSuccess } from '../../utils/HttpReply';
import UserDB from './user.entity';




class UserController implements Controller {
    public path = '/user'
    public router = express.Router()
    private userRepository = getRepository(UserDB)

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}/all`, isAdmin, this.getAllUsers)
        this.router.delete(`${this.path}/delete`, isAdmin, this.deleteUser)
        this.router.patch(`${this.path}/modify`, isUser, this.modifySettings) // TODO: Check user format
    }

    private modifySettings = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        let { email } = request.query
        const { field, value } = request.body
        try {
            const user = await this.userRepository.findOne({ email }) as UserDB
            user[field] = value
            await this.userRepository.save(user)
            const { username, role } = user
            email = user.email
            HttpSuccess.send(response, "User information properly modified", { username, role, email })
        }
        catch (e) {
            next(new HttpException(500, "Could not patch user informations", e))
        }

    }

    private getAllUsers = async (request: express.Request, response: express.Response) => {
        this.userRepository.find({ select: ['username', 'email', 'role'] })
            .then(HttpSuccess.sendCallback(response, "All users gathered"))
            .catch(HttpException.sendCallback(response, 500, "All users could not be gathered"));
    }

    private deleteUser = async (request: express.Request, response: express.Response) => {
        const user: UserDB = request.query
        this.userRepository.delete({ email: user.email })
    }
}

export default UserController;