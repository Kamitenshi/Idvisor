import express from "express";
import { readFileSync } from "fs";
import { sign, verify } from "jsonwebtoken";
import { Role } from "../services/user/user.entity";

const cookieName = "jwt";
const privateKey = readFileSync('key.pem', 'utf8');

const algorithm = 'HS256';
const optionsCreate = { algorithm };

const algorithms = [algorithm];
const optionsCheck = { algorithms }

interface Token {
    role: string;
}


export function createToken(response: express.Response, role: Role) {
    const token = sign({ role }, privateKey, optionsCreate);
    response.cookie(cookieName, token, { maxAge: 1000 * 60 * 60 });
}

export function checkToken(request: express.Request) {
    const token = request.cookies[cookieName];
    const rawToken = verify(token, privateKey, optionsCheck);
    const role = rawToken["role"];
    const decryptedToken: Token = { role };
    return decryptedToken;
}

export function deleteToken(response: express.Response) {
    response.clearCookie(cookieName);
}