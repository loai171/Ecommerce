import ms, { StringValue } from "ms";

import { hashToken } from "../../../utils/helpers.js";
import { generateRefreshToken } from "../../../utils/jwt.js";
import { AppError } from "../../../utils/AppError.js";
import { refreshTokenRepository } from "../repository/refresh-token.repository.js";
import { env } from "../../../config/env.js";
import { RefreshTokenDocument } from "../schema/refresh-token.schema.js";

export const refreshTokenService = {
  async create(userId: string): Promise<string> {
    const refreshToken = generateRefreshToken({ id: userId });

    const expiresAt = new Date(
      Date.now() + ms(env.JWT_REFRESH_EXPIRES_IN as StringValue),
    );
    await refreshTokenRepository.create({
      user: userId,
      tokenHash: hashToken(refreshToken),
      expiresAt,
    });

    return refreshToken;
  },

  async get(refreshToken: string): Promise<RefreshTokenDocument> {
    const storedToken = await refreshTokenRepository.findByTokenHash(
      hashToken(refreshToken),
    );

    if (!storedToken) {
      throw AppError.unauthorized("Invalid refresh token");
    }

    return storedToken;
  },

  async revoke(refreshToken: string) {
    return refreshTokenRepository.revoke(hashToken(refreshToken));
  },

  async revokeAllByUser(userId: string) {
    return refreshTokenRepository.revokeAllByUser(userId);
  },
};
