import { StatusCodes } from 'http-status-codes';

export class AppError extends Error {
    public readonly statusCode: number;
    public readonly isOperational: boolean;

    constructor(message: string, statusCode: number = StatusCodes.INTERNAL_SERVER_ERROR) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }

    static badRequest(message: string) {
        return new AppError(message, StatusCodes.BAD_REQUEST);
    }

    static unauthorized(message = 'Unauthorized') {
        return new AppError(message, StatusCodes.UNAUTHORIZED);
    }

    static forbidden(message = 'Forbidden') {
        return new AppError(message, StatusCodes.FORBIDDEN);
    }

    static notFound(message = 'Resource not found') {
        return new AppError(message, StatusCodes.NOT_FOUND);
    }

    static conflict(message: string) {
        return new AppError(message, StatusCodes.CONFLICT);
    }
}