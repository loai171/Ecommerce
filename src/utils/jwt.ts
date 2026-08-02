import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import type {
  AccessTokenResponse,
  JwtUserPayload,
  RefreshTokenPayload,
  RefreshTokenResponse,
} from "../types/jwt.types.js";
import { AppError } from "./AppError.js";

export function generateAccessToken(user: JwtUserPayload): AccessTokenResponse {
  const accessToken = jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    env.JWT_SECRET,
    {
      expiresIn: env.JWT_EXPIRES_IN as jwt.SignOptions["expiresIn"],
    },
  );

  return accessToken;
}

export function generateRefreshToken(
  userId: string | RefreshTokenPayload,
): RefreshTokenResponse {
  const id = typeof userId === "string" ? userId : userId.id;
  const refreshToken: RefreshTokenResponse = jwt.sign(
    {
      id,
    },
    env.JWT_REFRESH_SECRET,
    {
      expiresIn: env.JWT_REFRESH_EXPIRES_IN as jwt.SignOptions["expiresIn"],
    },
  );

  return refreshToken;
}

export function verifyAccessToken(token: string): JwtUserPayload {
  try {
    return jwt.verify(token, env.JWT_SECRET) as JwtUserPayload;
  } catch {
    throw AppError.unauthorized("Invalid or expired access token");
  }
}

export function verifyRefreshToken(token: string) {
  try {
    return jwt.verify(token, env.JWT_REFRESH_SECRET) as JwtUserPayload;
  } catch {
    throw AppError.unauthorized("Invalid or expired refresh token");
  }
}
