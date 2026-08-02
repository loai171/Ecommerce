import type { Response } from "express";
import { StatusCodes } from "http-status-codes";

export function successResponse(
  res: Response,
  data: unknown = null,
  message = "Success",
  statusCode = StatusCodes.OK,
) {
  return res.status(statusCode).json({
    statusCode,
    success: true,
    message,
    data,
    errors: [],
  });
}

export function errorResponse(
  res: Response,
  errors: unknown[] = [],
  message: string,
  statusCode = StatusCodes.INTERNAL_SERVER_ERROR,
) {
  return res.status(statusCode).json({
    statusCode,
    success: false,
    message,
    data: null,
    errors,
  });
}
