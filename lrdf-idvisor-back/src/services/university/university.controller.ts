import express from "express";
import { getRepository } from 'typeorm';
import { isAdvisor } from "../../middleware/auth";
import modelValidatorMiddleware from "../../middleware/model.validator";
import Controller from "../../utils/controller";
import { HttpException, HttpSuccess } from '../../utils/HttpReply';
import UniversityDB from "../university/university.entity";
import { CreatingUniversity } from './university.entity';

class UniversityController implements Controller {
    public path = '/university';
    public router = express.Router();
    private universityRepository = getRepository(UniversityDB)

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}/all`, this.getAllUniversities);
        this.router.post(`${this.path}/add`, isAdvisor, modelValidatorMiddleware(CreatingUniversity), this.addUniversity);
    }

    private getAllUniversities = async (request: express.Request, response: express.Response) => {
        this.universityRepository.find({ select: ['name'] })
            .then(HttpSuccess.sendCallback(response, "All universities gathered"))
            .catch(HttpException.sendCallback(response, 500, "All universities could not be gathered"));
    }

    private addUniversity = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        const universityData: UniversityDB = { ...request.body };
        try {
            const found = await this.universityRepository.findOne({ name: universityData.name })
            if (found === undefined) {
                this.universityRepository.insert(universityData)
                    .then(HttpSuccess.sendCallback(response, "University successfuly created"))
            }
            else {
                next(new HttpException(403, "University name is already taken"));
            }
        }
        catch (err) {
            next(new HttpException(500, "Could not create university", err));
        }
    }

}

export default UniversityController;