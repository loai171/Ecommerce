import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import type {
  AccessTokenResponse,
  JwtUserPayload,
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
