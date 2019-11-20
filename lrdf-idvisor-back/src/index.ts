import express from 'express';
import path from 'path'
import cookieParser from 'cookie-parser'
import logger from 'morgan'

import usersRouter from './routes/users'
const app = express();
const port = 6000;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', usersRouter);

app.listen(port, () => console.log('App listening on port: ' + port));

export default app;