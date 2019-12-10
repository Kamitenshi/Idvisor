import 'dotenv/config';
import 'reflect-metadata';
import App from './app';




App.build().then(app => app.listen()).catch(err => console.log(err)); // TODO: add a maintenance page

