import { sanitizePassword } from "../../utils/helpers.js";
import { generateAccessToken } from "../../utils/jwt.js";
import { userRepository } from "../user/repository/user.repository.js";
import { refreshTokenService } from "./services/refresh-token.service.js";
import type { LoginDTO } from "./dto/login.dto.js";
import type { AuthResponseDTO } from "./dto/auth-response.dto.js";
import type { TokensResponseDTO } from "./dto/tokens-response.dto.js";

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
      refreshToken,
    };
  },

  async refresh(refreshToken: string): Promise<TokensResponseDTO> {
    // make sure refresh token isnot expired 'revoked'
    const storedToken = await refreshTokenService.validate(refreshToken);

    const user = await userRepository.findById(storedToken.user.toString());

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
    const storedToken = await refreshTokenService.validate(refreshToken);

    await refreshTokenService.revoke(storedToken._id.toString());
  },

  async logoutAll(userId: string): Promise<void> {
    await refreshTokenService.revokeAllByUser(userId);
  },
};
