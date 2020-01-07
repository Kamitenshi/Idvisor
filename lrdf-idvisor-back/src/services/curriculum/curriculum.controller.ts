import express from "express";
import { Curriculum } from "lrdf-idvisor-model";
import { getRepository } from 'typeorm';
import { isAdvisor } from "../../middleware/auth";
import Controller from "../../utils/controller";
import { HttpException, HttpSuccess } from '../../utils/HttpReply';
import { CurriculumDB } from "./curriculum.entity";

class UniversityController implements Controller {
    public path = '/curriculum';
    public router = express.Router();
    private curriculumRepository = getRepository(CurriculumDB)

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}/all`, this.getAllCurriculums);
        this.router.post(`${this.path}/add`, isAdvisor, this.addCurriculum);
        this.router.get(`${this.path}/get`, this.getCurriculum);
    }

    private getAllCurriculums = async (request: express.Request, response: express.Response) => {
        this.curriculumRepository.find({ select: ['id'] })
            .then(HttpSuccess.sendCallback(response, "All curriculums gathered"))
            .catch(HttpException.sendCallback(response, 500, "All curriculums could not be gathered"));
    }

    private getCurriculum = async (request: express.Request, response: express.Response) => {
        const curriculum: Curriculum = request.query
        this.curriculumRepository.findOne(curriculum.id)
            .then(HttpSuccess.sendCallback(response, "Curriculum found"))
            .catch(HttpException.sendCallback(response, 500, "Couldn't find the curriculum"));
    }

    private addCurriculum = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        const curriculumData: CurriculumDB = { ...request.body };
        try {
            const found = await this.curriculumRepository.findOne({ id: curriculumData.id })
            if (found === undefined) {
                this.curriculumRepository.insert(curriculumData)
                    .then(HttpSuccess.sendCallback(response, "Curriculum successfuly created"))
            }
            else {
                next(new HttpException(403, "Curriculum name is already taken"));
            }
        }
        catch (err) {
            next(new HttpException(500, "Could not create curriculum", err));
        }
    }

}

export default UniversityController;