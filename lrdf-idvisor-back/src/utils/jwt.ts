import express from "express";
import { readFileSync } from "fs";
import { sign, verify } from "jsonwebtoken";
import { Role } from "../services/user/user.entity";

const cookieName = "jwt";
const privateKey = readFileSync('private.pem', 'utf8');

const algorithm = 'HS256';
const optionsCreate = { algorithm };

const algorithms = [algorithm];
const optionsCheck = { algorithms }



export async function createToken(response: express.Response, role: Role) {
    const token = await sign({ role }, privateKey, optionsCreate);
    response.cookie(cookieName, token, { maxAge: 1000 * 60 * 60 });
}

export async function checkToken(request: express.Request) {
    const token = request.cookies[cookieName];
    const decryptedToken = await verify(token, privateKey, optionsCheck);
    return decryptedToken;
}

export function deleteToken(response: express.Response) {
    response.clearCookie(cookieName);
}