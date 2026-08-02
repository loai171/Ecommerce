import { sanitizePassword } from "../../utils/helpers.js";
import { generateAccessToken, verifyRefreshToken } from "../../utils/jwt.js";
import { userRepository } from "../user/repository/user.repository.js";
import { refreshTokenService } from "./services/refresh-token.service.js";
import type { LoginDTO } from "./dto/login.dto.js";
import type { AuthResponseDTO } from "./dto/auth-response.dto.js";
import type { TokensResponseDTO } from "./dto/tokens-response.dto.js";
import { AppError } from "../../utils/AppError.js";

export const authService = {
  async login(input: LoginDTO): Promise<AuthResponseDTO> {
    const user = await userRepository.findByEmail(input.email);

    const accessToken = generateAccessToken({
      id: user._id.toString(),
      email: user.email,
    });

    const refreshToken = await refreshTokenService.create(user._id.toString());

    return {
      user: sanitizePassword(user)!,
      accessToken,
      refreshToken: refreshToken,
    };
  },

  async refresh(refreshToken: string): Promise<TokensResponseDTO> {
    if (!refreshToken) {
      throw AppError.unauthorized("Refresh token is required");
    }

    verifyRefreshToken(refreshToken);

    const storedToken = await refreshTokenService.get(refreshToken);

    if (!storedToken) {
      throw AppError.unauthorized("You are logged out");
    }

    const user = await userRepository.findById(storedToken.user.toString());
    if (!user) {
      throw AppError.unauthorized("User not found");
    }

    await refreshTokenService.revoke(refreshToken);

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
    if (refreshToken) {
      await refreshTokenService.revoke(refreshToken);
    }
  },

  async logoutAll(userId: string): Promise<void> {
    await refreshTokenService.revokeAllByUser(userId);
  },
};
