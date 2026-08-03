import ms, { StringValue } from "ms";

import { hashToken } from "../../../utils/helpers.js";
import { generateRefreshToken } from "../../../utils/jwt.js";
import { AppError } from "../../../utils/AppError.js";
import { env } from "../../../config/env.js";
import { RefreshTokenDocument } from "../schema/refresh-token.schema.js";
import { RefreshTokenRepository } from "../repository/refresh-token.repository.js";

export class RefreshTokenService {
  constructor(
    private readonly refreshTokenRepository: RefreshTokenRepository,
  ) {}
  create = async (userId: string): Promise<string> => {
    const refreshToken = generateRefreshToken({ id: userId });

    const expiresAt = new Date(
      Date.now() + ms(env.JWT_REFRESH_EXPIRES_IN as StringValue),
    );
    await this.refreshTokenRepository.create({
      user: userId,
      tokenHash: hashToken(refreshToken),
      expiresAt,
    });

    return refreshToken;
  };

  get = async (refreshToken: string): Promise<RefreshTokenDocument> => {
    const storedToken = await this.refreshTokenRepository.findByTokenHash(
      hashToken(refreshToken),
    );

    if (!storedToken) {
      throw AppError.unauthorized("Invalid refresh token");
    }

    return storedToken;
  };

  revoke = async (refreshToken: string) => {
    return this.refreshTokenRepository.revoke(hashToken(refreshToken));
  };

  revokeAllByUser = async (userId: string) => {
    return this.refreshTokenRepository.revokeAllByUser(userId);
  };
}
