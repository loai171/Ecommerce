import type { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { StatusCodes } from "http-status-codes";

import { errorResponse } from "../utils/response.js";
export function validate(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    errorResponse(
      res,
      errors.array(),
      "Validation failed",
      StatusCodes.BAD_REQUEST,
    );

    return;
  }

  next();
}
