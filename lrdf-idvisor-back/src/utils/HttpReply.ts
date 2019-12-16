import express from 'express';
import { env } from './env';









const SUCCESS_STATUS = 200
type SuccessStatus = 200;

type ErrorStatus = 400 | 403 | 500;
type Status = SuccessStatus | ErrorStatus;

function isSuccessStatus(status: Status): status is SuccessStatus {
    return status == SUCCESS_STATUS;
}


//TODO : simplify this class
class HttpReply {
    status: Status;
    message: string;
    constructor(status: Status, message: string) {
        this.status = status;
        this.message = message;
    }

    public send(response: express.Response) {
        HttpReply.send(response, this.status, this.message)("");
    }

    static send(response: express.Response, status: Status, responseMessage: string) {
        return function (result) {
            const output = '[' + responseMessage + ']' + ': ' + JSON.stringify(result);
            console.log(output);
            HttpReply.sendResponse(status, responseMessage, result)(response);
        }
    }

    private static sendResponse(status: Status, responseMessage: string, result: string) {
        return (response: express.Response) => {
            if (isSuccessStatus(status) || env.isDevelopment) response.status(status).send({ status, responseMessage, result });
            else response.status(status).send({ status, responseMessage });
        }
    }
}

const createSendFunction = function <T extends Status>() {
    return function (response: express.Response, status: T, message: string) {
        return HttpReply.send(response, status, message);
    };
}

export class HttpException extends Error {
    reply: HttpReply
    constructor(status: ErrorStatus, message: string) {
        super(message);
        this.reply = new HttpReply(status || 500, message || "Something went wrong");
    }

    public static sendCallback = createSendFunction<ErrorStatus>();
}

export class HttpSuccess {
    public static sendCallback(response: express.Response, message: string) {
        return createSendFunction<SuccessStatus>()(response, 200, message);
    }

    public static send(response: express.Response, message: string) {
        this.sendCallback(response, message)("");
    }
}
