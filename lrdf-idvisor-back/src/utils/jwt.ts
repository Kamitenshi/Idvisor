import express from "express";
import { readFileSync } from "fs";
import { sign, verify } from "jsonwebtoken";
import { Role } from "../services/user/user.entity";

export const cookieName = "jwt";
const privateKey = readFileSync('key.pem', 'utf8');

const algorithm = 'HS256';
const optionsCreate = { algorithm };

const algorithms = [algorithm];
const optionsCheck = { algorithms }

interface Token {
    role: string
    email: string
    id: number
}

export function createToken(response: express.Response, role: Role, email: string, id: number) {
    const data: Token = { role, email, id }
    const token = sign(data, privateKey, optionsCreate);
    response.cookie(cookieName, token, { maxAge: 1000 * 60 * 60 });
}

export function checkToken(cookie) {
    const rawToken = verify(cookie, privateKey, optionsCheck);
    const { role, email, id } = rawToken as Token;
    const decryptedToken: Token = { role, email, id };
    return decryptedToken;
}

export function deleteToken(response: express.Response) {
    response.clearCookie(cookieName);
}