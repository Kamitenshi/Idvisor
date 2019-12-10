import express from 'express';

import { env } from './env';








const SUCCESS_STATUS = 200
type SuccessStatus = 200;

type ErrorStatus = 400 | 500;
type Status = SuccessStatus | ErrorStatus;

function isSuccessStatus(status: Status): status is SuccessStatus {
    return status == SUCCESS_STATUS;
}

class HttpReply {
    status: Status;
    message: string;
    constructor(status: Status, message: string) {
        this.status = status;
        this.message = message;
    }

    public send(response: express.Response) {
        HttpReply.send(response, this.status, this.message);
    }

    static send(response: express.Response, status: Status, message: string) {
        this.createSender(response, status, "")(message);
    }

    private static sendResponse(status: Status, responseMessage: string, result: string) {
        return (response: express.Response) => {
            if (isSuccessStatus(status) || env.isDevelopment) response.status(status).send({ status, responseMessage, result });
            else response.status(status).send({ status, responseMessage });
        }
    }

    static createSender(response: express.Response, status: Status, responseMessage: string) {
        return function (result) {
            const output = '[' + responseMessage + ']' + ': ' + JSON.stringify(result);
            console.log(output);
            HttpReply.sendResponse(status, responseMessage, result)(response);
        }
    }
}



const createSenderFunction = function <T extends Status>() {
    return function (response: express.Response, status: T, message: string) {
        return HttpReply.createSender(response, status, message);
    };
}

export class HttpException extends Error {
    reply: HttpReply
    constructor(status: ErrorStatus, message: string) {
        super(message);
        this.reply = new HttpReply(status || 500, message || "Something went wrong");
    }

    public static createSender = createSenderFunction<ErrorStatus>();
}

export class HttpSuccess {
    public static createSender(response: express.Response, message: string) {
        return createSenderFunction<SuccessStatus>()(response, 200, message);
    }
}
