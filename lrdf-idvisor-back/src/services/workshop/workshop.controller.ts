import express from 'express';
import { getRepository } from 'typeorm';
import Controller from "../../utils/controller";
import { HttpException, HttpSuccess } from '../../utils/HttpReply';
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
        this.router.get(`${this.path}/information`, this.getWorkshopInformation)
        this.router.post(`${this.path}/create/workshop`, this.createWorkshop)
        this.router.post(`${this.path}/create/skill`, this.createSkill)
    }

    private getAllWorkshops = (request: express.Request, response: express.Response, next: express.NextFunction) => {
        this.workshopRepo.find({ select: ['id', 'name'] })
            .then(HttpSuccess.sendCallback(response, "All workshops gathered"))
            .catch(HttpException.sendCallback(response, 500, "All workshops could not be gathered"));
    }

    private getWorkshopInformation = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        const { id } = request.body
        const workshop = await this.workshopRepo.findOne(id, { relations: ["advisors", "advisors.user", "skills", "students"] })

        if (workshop) {
            const { students, skills, advisors } = workshop
            //@ts-ignore
            console.log(JSON.stringify(advisors));

            const advisorsUsernames = advisors.map(adv => ({ username: adv.user.username }))
            HttpSuccess.send(response, "Workshop information retrieved", { students, skills, advisors: advisorsUsernames })
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
        const result = await this.workshopRepo.save(newWorkshop)

        HttpSuccess.send(response, "Workshop successfuly created")
    }
}

export default WorkshopController