import { ConnectionOptions } from 'typeorm';

import { env } from './utils/env';


const config: ConnectionOptions = {
    type: 'postgres',
    host: env.POSTGRES_HOST,
    port: Number(env.POSTGRES_PORT),
    username: env.POSTGRES_USER,
    //TODO add a password - password: env.POSTGRES_PASSWORD,
    database: env.POSTGRES_DB,
    entities: [
        __dirname + '/../**/*.entity{.ts,.js}',
    ],
    synchronize: true,
};

export default config;