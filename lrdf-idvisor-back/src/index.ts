import 'dotenv/config';
import 'reflect-metadata';
import App from './app';
import { validateEnv } from './utils/validateEnv';


validateEnv();

App.build().then(app => app.listen());
