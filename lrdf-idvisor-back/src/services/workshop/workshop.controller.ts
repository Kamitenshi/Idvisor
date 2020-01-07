import express from 'express';
import { getRepository } from 'typeorm';
import Controller from "../../utils/controller";
import { HttpException, HttpSuccess } from '../../utils/HttpReply';
import { Advisor, Field, Skill, Student } from "../user/user.entity";
import { Workshop } from "./workshop.entity";

class WorkshopController implements Controller {
    public path = "/workshop"
    public router = express.Router()
    private workshopRepo = getRepository(Workshop)
    private advisorRepo = getRepository(Advisor)
    private studentRepo = getRepository(Student)
    private skillRepo = getRepository(Skill)
    private fieldRepo = getRepository(Field)

    constructor() {
        this.initializeRoutes()
    }

    //TODO: add isAdvisor everywhere
    private initializeRoutes() {
        this.router.get(`${this.path}/all`, this.getAllWorkshops)
        this.router.post(`${this.path}/create/workshop`, this.createWorkshop)
        this.router.post(`${this.path}/create/skill`, this.createSkill)
    }

    private getAllWorkshops = (request: express.Request, response: express.Response, next: express.NextFunction) => {
        this.workshopRepo.find({ select: ['name'] })
            .then(HttpSuccess.sendCallback(response, "All workshops gathered"))
            .catch(HttpException.sendCallback(response, 500, "All workshops could not be gathered"));
    }

    private createSkill = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        const { name, level } = request.body
        const field = await this.fieldRepo.save({ name })
        await this.skillRepo.save({ level, field })
        HttpSuccess.send(response, "Skill successfuly created")
    }

    private createWorkshop = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        const { name, adviorId } = request.body
        console.log(JSON.stringify(request.body));

        const newWorkshop = new Workshop()
        //@ts-ignore
        newWorkshop.advisors = [{ id: adviorId }]
        newWorkshop.name = name
        await this.workshopRepo.save(newWorkshop)
        HttpSuccess.send(response, "Workshop successfuly created")
    }
}

export default WorkshopController