import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import { createConnection } from 'typeorm';

import errorMiddleware from './middleware/error';
import config from './ormconfig';
import UserController from './services/user/user.controller';

class App {
    public app: express.Application;
    public port: number;

    private constructor() {
        this.app = express();
        this.port = Number(process.env.SERVER_PORT);

        this.initializeMiddlewares();
        this.initializeControllers();
        this.initializeErrorHandling();
    }

    private initializeMiddlewares() {
        this.app.use(morgan("dev"));
        this.app.use(cors());
        this.app.use(bodyParser.json());
    }

    private initializeControllers() {
        const controllers = [
            new UserController(),
        ];
        controllers.forEach((controller) => {
            this.app.use('/', controller.router);
        });
    }

    private initializeErrorHandling() {
        this.app.use(errorMiddleware);
    }

    private static async connectToDatabase() {
        try {
            await createConnection(config);
            console.log('Successfully connected to the database');
        }
        catch (error) {
            console.error('Error while connecting to the database', error);
            throw error;
        }
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`App listening on the port ${this.port}`);
        });
    }

    public static build() {
        return this.connectToDatabase()
            .then(() => { return new App() }); // TODO: add error management to indicate that the server has an internal issue
    }
}

export default App;