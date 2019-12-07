import { cleanEnv, str, host, port } from 'envalid';

export function validateEnv() {
    cleanEnv(process.env, {
        POSTGRES_HOST: host(),
        POSTGRES_PORT: port(),
        POSTGRES_USER: str(),
        POSTGRES_DB: str(),
        SERVER_PORT: port(),
    });
}