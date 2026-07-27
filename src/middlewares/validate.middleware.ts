import type { NextFunction, Request, Response } from "express";
import { validationResult, type ValidationChain } from "express-validator";
import { StatusCodes } from "http-status-codes";

export function validate(validations: ValidationChain[]) {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    for (const validation of validations) {
      await validation.run(req);
    }

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: "Validation failed",
      errors: errors.array(),
    });
  };
}