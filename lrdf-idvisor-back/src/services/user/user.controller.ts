import { genSalt, hash } from 'bcryptjs';
import express from 'express';
import { User } from 'lrdf-idvisor-model';
import { getRepository } from 'typeorm';
import { isAdmin, isUser } from '../../middleware/auth';
import Controller from '../../utils/controller';
import { env } from '../../utils/env';
import { HttpException, HttpSuccess } from '../../utils/HttpReply';
import { checkToken } from '../../utils/jwt';
import UserDB, { Student } from './user.entity';




class UserController implements Controller {
    public path = '/user'
    public router = express.Router()
    private userRepository = getRepository(UserDB)
    private studentRepo = getRepository(Student)

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}/all`, isAdmin, this.getAllUsers)
        this.router.get(`${this.path}/chat`, this.getAllChat)
        this.router.get(`${this.path}/students`, this.getAllStudents)
        this.router.get(`${this.path}/students/interest`, this.getInterests)
        this.router.delete(`${this.path}/delete`, isAdmin, this.deleteUser)
        this.router.patch(`${this.path}/modify`, isUser, this.modifySettings) // TODO: Check user format
        this.router.post(`${this.path}/add/fields`, this.addField)
    }

    private getInterests = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        const { cookie } = request.query
        const id = checkToken(cookie).id
        const student = await this.studentRepo.findOne({ where: [{ userId: id }], relations: ['centerOfInterests'] })
        HttpSuccess.send(response, "Center of interest", student?.centerOfInterests)

    }
    private addField = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        const { id, fields } = request.body
        const student = await this.studentRepo.findOne({ where: [{ userId: id }] })
        if (student) {
            student.centerOfInterests = fields.map(id => ({ id }))
            this.studentRepo.save(student)
            HttpSuccess.send(response, "Field added")
        }
    }

    private getAllStudents = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        const students = await this.studentRepo.find({ relations: ["user"] })
        const result = students.map(student => ({ id: student.id, username: student.user.username }))
        HttpSuccess.send(response, "Could gather all students", result)
    }

    private getAllChat = (request: express.Request, response: express.Response, next: express.NextFunction) => {
        this.userRepository.find({ select: ['id', 'username'] })
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
            const { username, role, id } = user
            email = user.email
            HttpSuccess.send(response, `${field} field has now value ${user[field]}`, { username, role, email, id })
        }
        catch (e) {
            next(new HttpException(500, "Could not patch user informations", e))
        }

    }

    private getAllUsers = async (request: express.Request, response: express.Response) => {
        this.userRepository.find({ select: ['username', 'email', 'role', 'id'] })
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