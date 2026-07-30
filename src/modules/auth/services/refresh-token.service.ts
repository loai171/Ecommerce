import { hashToken } from "../../../utils/helpers.js";
import { generateRefreshToken } from "../../../utils/jwt.js";
import { AppError } from "../../../utils/AppError.js";
import { refreshTokenRepository } from "../repository/refresh-token.repository.js";
import { env } from "../../../config/env.js";
import { RefreshTokenDocument } from "../schema/refresh-token.schema.js";

export const refreshTokenService = {
  async create(userId: string): Promise<string> {
    const refreshToken = generateRefreshToken({id:userId});

    const expiresAt = new Date(
      Date.now() + Number(env.JWT_REFRESH_EXPIRES_IN) * 1000,
    );

    await refreshTokenRepository.create({
      user: userId,
      tokenHash: hashToken(refreshToken),
      expiresAt,
    });

    return refreshToken;
  },

  async validate(token: string): Promise<RefreshTokenDocument> {
    const tokenHash = hashToken(token);

    const storedToken = await refreshTokenRepository.findByTokenHash(tokenHash);

    if (!storedToken) {
      throw AppError.unauthorized("Invalid refresh token");
    }

    return storedToken;
  },

  async revoke(tokenId: string) {
    return refreshTokenRepository.revoke(tokenId);
  },

  async revokeAllByUser(userId: string) {
    return refreshTokenRepository.revokeAllByUser(userId);
  },
};
