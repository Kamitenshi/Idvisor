import express from 'express';
import { getRepository } from 'typeorm';
import Controller from "../../utils/controller";
import { HttpException, HttpSuccess } from '../../utils/HttpReply';
import { checkToken } from '../../utils/jwt';
import UserDB, { Advisor, Field, Skill, Student } from "../user/user.entity";
import { Workshop } from "./workshop.entity";

class WorkshopController implements Controller {
    public path = "/workshop"
    public router = express.Router()
    private workshopRepo = getRepository(Workshop)
    private advisorRepo = getRepository(Advisor)
    private studentRepo = getRepository(Student)
    private skillRepo = getRepository(Skill)
    private fieldRepo = getRepository(Field)
    private userRepo = getRepository(UserDB)

    constructor() {
        this.initializeRoutes()
    }

    //TODO: add isAdvisor everywhere
    private initializeRoutes() {
        this.router.get(`${this.path}/all`, this.getAllWorkshops)
        this.router.get(`${this.path}/student/workshops`, this.getWorkshopStudent)
        this.router.get(`${this.path}/information`, this.getWorkshopInformation)
        this.router.post(`${this.path}/create/workshop`, this.createWorkshop)
        this.router.post(`${this.path}/create/skill`, this.createSkill)
        this.router.post(`${this.path}/add/student`, this.addStudent)
        this.router.post(`${this.path}/add/skill`, this.addSkill)
    }

    private getWorkshopStudent = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        const token = checkToken(request.query.cookie)
        const id = token.id

        const student = await this.studentRepo.findOne({ where: [{ userId: id }], relations: ["workshops"] })

        if (student) {
            const { workshops } = student
            HttpSuccess.send(response, "Workshops", { workshops })
        }
        else
            next(new HttpException(403, "Could not get user data"))
    }

    private addStudent = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        const { idStudents, workshopId } = request.body
        let workshop = await this.workshopRepo.findOne(workshopId)
        if (workshop) {
            workshop.students = idStudents.map(student => ({ id: student }))
            this.workshopRepo.save(workshop)
        }
        HttpSuccess.send(response, "Student added")
    }

    private addSkill = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        const { idSkills, workshopId } = request.body
        let workshop = await this.workshopRepo.findOne(workshopId)
        if (workshop) {
            workshop.skills = idSkills.map(id => ({ id }))
            this.workshopRepo.save(workshop)
        }
    }

    private getAllWorkshops = (request: express.Request, response: express.Response, next: express.NextFunction) => {
        this.workshopRepo.find({ select: ['id', 'name'] })
            .then(HttpSuccess.sendCallback(response, "All workshops gathered"))
            .catch(HttpException.sendCallback(response, 500, "All workshops could not be gathered"));
    }

    private getWorkshopInformation = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        const { id } = request.body
        const workshop = await this.workshopRepo.findOne(id, { relations: ["advisors", "advisors.user", "skills", "skills.field", "students", "students.user"] })

        if (workshop) {
            const { students, skills, advisors } = workshop
            const advisorsUsernames = advisors.map(adv => ({ username: adv.user.username }))
            const studentUsernames = students.map(stu => ({ username: stu.user.username }))
            const skillsResult = skills.map(skill => ({ id: skill.field, level: skill.level }))
            HttpSuccess.send(response, "Workshop information retrieved", { students: studentUsernames, skills: skillsResult, advisors: advisorsUsernames })
        }
        else {
            next(new HttpException(403, "Workshop with id: " + id + " does not exist"))
        }
    }

    private createSkill = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        const { name, level } = request.body
        const field = await this.fieldRepo.save({ name })
        await this.skillRepo.save({ level, field })
        HttpSuccess.send(response, "Skill successfuly created")
    }

    private createWorkshop = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        const { name, advisorId } = request.body
        const advisor = await this.advisorRepo.findOne({ where: [{ userId: advisorId }] })

        const newWorkshop = new Workshop()
        newWorkshop.name = name
        //@ts-ignore
        newWorkshop.advisors = [advisor]
        newWorkshop.students = []
        await this.workshopRepo.save(newWorkshop)

        HttpSuccess.send(response, "Workshop successfuly created")
    }
}

export default WorkshopController