import bodyParser from 'body-parser';
import cookieParser from "cookie-parser";
import cors from 'cors';
import express from 'express';
import { createServer } from 'http';
import morgan from 'morgan';
import SocketIO from 'socket.io';
import { createConnection } from 'typeorm';
import errorMiddleware from './middleware/error';
import config from './ormconfig';
import AuthController from './services/auth/auth.controller';
import ChatController from './services/chat/chat.controller';
import UniversityController from './services/university/university.controller';
import UserController from './services/user/user.controller';
import WorkshopController from './services/workshop/workshop.controller';
import { env } from './utils/env';


class App {
    public app: express.Application;
    public port: number;
    private io: SocketIO.Server
    private server

    private constructor() {
        this.app = express();
        this.port = Number(env.SERVER_PORT);
        this.server = createServer(this.app)
        this.io = SocketIO(this.server)

        this.initializeMiddlewares();
        this.initializeControllers();
        this.initializeErrorHandling();
    }

    private initializeMiddlewares() {
        this.app.use(morgan("dev"));
        this.app.use(cors({
            credentials: true,
            origin: env.FRONT_ADRESS
        }));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(cookieParser());
    }

    private initializeControllers() {
        const controllers = [
            new AuthController(),
            new ChatController(this.io),
            new UniversityController(),
            new UserController(),
            new WorkshopController(),
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
            const db = await createConnection(config);
            console.log('Successfully connected to the database');
        }
        catch (error) {
            console.error('Error while connecting to the database', error);
            throw error;
        }
    }

    public listen() {
        this.server.listen(this.port, () => {
            console.log(`App listening on the port ${this.port}`);
        });
    }

    public static build() {
        return this.connectToDatabase()
            .then(() => { return new App() }); // TODO: add error management to indicate that the server has an internal issue
    }
}

export default App;