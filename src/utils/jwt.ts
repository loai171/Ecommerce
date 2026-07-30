import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import type {
  AccessTokenResponse,
  JwtUserPayload,
  RefreshTokenPayload,
  RefreshTokenResponse,
} from "../types/jwt.types.js";

export function generateAccessToken(user: JwtUserPayload): AccessTokenResponse {
  const accessToken = jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    env.JWT_SECRET,
    {
      expiresIn: env.JWT_EXPIRES_IN,
    },
  );

  return accessToken;
}

export function generateRefreshToken(
  userId: RefreshTokenPayload,
): RefreshTokenResponse {
  const refreshToken: RefreshTokenResponse = jwt.sign(
    {
      id: userId,
    },
    env.JWT_REFRESH_SECRET,
    {
      expiresIn: env.JWT_REFRESH_EXPIRES_IN,
    },
  );

  return refreshToken;
}

export function verifyRefreshToken(token: string) {
  return jwt.verify(token, env.JWT_REFRESH_SECRET) as JwtUserPayload;
}
