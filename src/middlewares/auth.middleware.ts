// src/middlewares/auth.middleware.ts

import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import { env } from "../config/env.js";
import { AppError } from "../utils/AppError.js";
import { JwtUserPayload } from "../types/jwt.types.js";

import { USER_KEY } from "../constants/auth.constants.js";

export async function authMiddleware(
  req: Request,
  _res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw AppError.unauthorized("Authentication required");
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded: JwtUserPayload = jwt.verify(
      token,
      env.JWT_SECRET,
    ) as JwtUserPayload;

    req[USER_KEY] = decoded;

    next();
  } catch (error) {
    throw AppError.unauthorized("Invalid or expired token");
  }
}
