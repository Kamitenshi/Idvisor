import { cleanEnv, host, num, port, str } from 'envalid';

export const env = cleanEnv(process.env, {
    POSTGRES_HOST: host(),
    POSTGRES_PORT: port(),
    POSTGRES_USER: str(),
    POSTGRES_DB: str(),
    SERVER_PORT: port(), // Hosting port
    SALT_ROUND: num() // Used by bcrypt
});