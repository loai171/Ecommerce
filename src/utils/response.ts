import { Response } from "express";
import { StatusCodes } from "http-status-codes";


export function successResponse(
  res: Response,
  data: unknown,
  message = "Success",
  statusCode = StatusCodes.OK
) {
  return res.status(statusCode).json({
    success: true,
    message,
    data
  });
}


export function errorResponse(
  res: Response,
  message: string,
  statusCode = StatusCodes.INTERNAL_SERVER_ERROR
) {
  return res.status(statusCode).json({
    success: false,
    message
  });
}