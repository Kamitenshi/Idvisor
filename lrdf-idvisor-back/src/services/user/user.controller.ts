import { genSalt, hash } from 'bcryptjs';
import express from 'express';
import { User } from 'lrdf-idvisor-model';
import { getRepository } from 'typeorm';
import { isAdmin, isUser } from '../../middleware/auth';
import Controller from '../../utils/controller';
import { env } from '../../utils/env';
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
        this.router.get(`${this.path}/all/username`, this.getAllUsernames)
        this.router.delete(`${this.path}/delete`, isAdmin, this.deleteUser)
        this.router.patch(`${this.path}/modify`, isUser, this.modifySettings) // TODO: Check user format
    }

    private getAllUsernames = (request: express.Request, response: express.Response, next: express.NextFunction) => {
        this.userRepository.find({ select: ['username'] })
            .then(HttpSuccess.sendCallback(response, "All usernames gathered"))
            .catch(HttpException.sendCallback(response, 500, "All usernames could not be gathered"));

    }

    private modifySettings = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        let { email } = request.query
        let { field, newValue } = request.body


        const salt = await genSalt(env.SALT_ROUND);
        newValue = field === 'password' ? await hash(newValue, salt) : newValue
        console.log("Newvalue: " + newValue);

        try {
            let user = await this.userRepository.findOne({ email }) as UserDB
            user[field] = newValue
            await this.userRepository.save(user)
            const { username, role } = user
            email = user.email
            HttpSuccess.send(response, `${field} field has now value ${user[field]}`, { username, role, email })
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
        const user: User = request.query
        this.userRepository.delete({ email: user.email })
        HttpSuccess.send(response, 'User successfully deleted')
    }
}

export default UserController;