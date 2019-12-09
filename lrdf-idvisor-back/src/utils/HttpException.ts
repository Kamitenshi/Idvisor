import express from "express";

class HttpException extends Error {
    status: number;
    message: string;
    constructor(status: number, message: string) {
        super(message);
        this.status = status;
        this.message = message;
    }

    static abort(response: express.Response, status: number, message: string) {
        response
            .status(status)
            .send({ status, message });
    }
}

export default HttpException;