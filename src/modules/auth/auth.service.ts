import { sanitizePassword } from "../../utils/helpers.js";
import { generateAccessToken, verifyRefreshToken } from "../../utils/jwt.js";
import { userRepository } from "../user/repository/user.repository.js";
import { AppError } from "../../utils/AppError.js";
import { refreshTokenService } from "./services/refresh-token.service.js";
import type { LoginDTO } from "./dto/login.dto.js";
import type { AuthResponseDTO } from "./dto/auth-response.dto.js";
import { RefreshTokenDocument } from "./schema/refresh-token.schema.js";

export const authService = {
  async login(input: LoginDTO): Promise<AuthResponseDTO> {
    const user = await userRepository.findByEmail(input.email);

    if (!user) {
      throw AppError.unauthorized("Invalid credentials");
    }

    const accessToken = generateAccessToken({
      id: user._id.toString(),
      email: user.email,
    });

    const refreshToken = await refreshTokenService.create(user._id.toString());

    return {
      user: sanitizePassword(user)!,
      accessToken,
      refreshToken,
    };
  },

  async refresh(
    refreshToken: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    // chweck if refresh token is valid
    verifyRefreshToken(refreshToken);

    // check if refresh token isn't revoked
    const storedToken: RefreshTokenDocument =
      await refreshTokenService.validate(refreshToken);

    const user = await userRepository.findById(storedToken.user.toString());

    if (!user) {
      throw AppError.unauthorized("User not found");
    }

    await refreshTokenService.revoke(storedToken._id.toString());

    const accessToken = generateAccessToken({
      id: user._id.toString(),
      email: user.email,
    });

    const newRefreshToken = await refreshTokenService.create(
      user._id.toString(),
    );

    return {
      accessToken,
      refreshToken: newRefreshToken,
    };
  },

  async logout(refreshToken: string): Promise<void> {
    const storedToken = await refreshTokenService
      .validate(refreshToken)
      .catch(() => null);

    if (!storedToken) {
      return;
    }

    await refreshTokenService.revoke(storedToken._id.toString());
  },

  async logoutAll(userId: string): Promise<void> {
    await refreshTokenService.revokeAllByUser(userId);
  },
};
