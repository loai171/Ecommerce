// src/middlewares/auth.middleware.ts

import type { NextFunction, Request, Response } from "express";

import { AppError } from "../utils/AppError.js";

import { REFRESH_TOKEN_KEY, USER_KEY } from "../constants/auth.constants.js";
import { verifyAccessToken, verifyRefreshToken } from "../utils/jwt.js";

import { refreshTokenService } from "../container/auth.container.js";

export async function authMiddleware(
  req: Request,
  _res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw AppError.unauthorized("Authentication required");
  }

  const accessToken = authHeader.split(" ")[1];

  const refreshToken = req.cookies[REFRESH_TOKEN_KEY];

  if (!refreshToken) {
    throw AppError.unauthorized("Refresh token is required");
  }

  const accessPayload = verifyAccessToken(accessToken);

  const refreshPayload = verifyRefreshToken(refreshToken);

  // make sure refresh token isnot expired 'revoked'
  const storedToken = await refreshTokenService.get(refreshToken);

  if (!storedToken) {
    throw AppError.unauthorized("you are lougged out");
  }

  if (accessPayload.id !== refreshPayload.id) {
    throw AppError.unauthorized("Invalid session");
  }

  req[USER_KEY] = accessPayload;

  next();
}
