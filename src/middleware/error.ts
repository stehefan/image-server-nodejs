import {NextFunction, Request, Response} from "express";

export const defaultNotFoundHandler = (_req: Request, _res: Response, _next: NextFunction) => {
    throw new CustomError('page not found', 404);
};

export const defaultErrorHandler = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
    if (err instanceof CustomError) {
        res.status(err.statusCode);
        res.send({
            statusCode: err.statusCode,
            message: err.message
        });
    }
};
export class CustomError extends Error {
    readonly statusCode: number;

    constructor(message: string, statusCode?: number) {
        super(message);
        this.statusCode = statusCode || 500;
        Object.setPrototypeOf(this, CustomError.prototype);
    }
}
