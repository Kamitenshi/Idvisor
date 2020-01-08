import express from "express";
import { getRepository } from 'typeorm';
import Controller from "../../utils/controller";
import { HttpException, HttpSuccess } from '../../utils/HttpReply';
import { Field } from "../user/user.entity";
import { CurriculumDB } from "./curriculum.entity";

class CurriculumController implements Controller {
    public path = '/curriculum';
    public router = express.Router();
    private curriculumRepository = getRepository(CurriculumDB)
    private fieldRepo = getRepository(Field)

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}/all`, this.getAllCurriculums);
        this.router.get(`${this.path}/fields`, this.getFields)
        this.router.post(`${this.path}/add`, this.addCurriculum);
        this.router.post(`${this.path}/create/field`, this.createField)
    }

    private getFields = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        const fields = await this.fieldRepo.find()
        HttpSuccess.send(response, "Fields sent", fields)
    }

    private createField = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        const { name } = request.body
        const field = new Field()
        field.name = name
        await this.fieldRepo.save(field)
        HttpSuccess.send(response, "Could create field")
    }

    private getAllCurriculums = async (request: express.Request, response: express.Response) => {
        this.curriculumRepository.find({ select: ['id'] })
            .then(HttpSuccess.sendCallback(response, "All curriculums gathered"))
            .catch(HttpException.sendCallback(response, 500, "All curriculums could not be gathered"));
    }

    private addCurriculum = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        const curriculumData: CurriculumDB = { ...request.body };
        console.log("bim")
        try {
            this.curriculumRepository.insert(curriculumData)
                .then(HttpSuccess.sendCallback(response, "Curriculum successfuly created"))
        }

        catch (err) {
            next(new HttpException(500, "Could not create curriculum", err));
        }
    }

}

export default CurriculumController;