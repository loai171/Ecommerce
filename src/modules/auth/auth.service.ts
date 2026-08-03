import { sanitizePassword } from "../../utils/helpers.js";
import { generateAccessToken, verifyRefreshToken } from "../../utils/jwt.js";
import type { LoginDTO } from "./dto/login.dto.js";
import type { AuthResponseDTO } from "./dto/auth-response.dto.js";
import type { TokensResponseDTO } from "./dto/tokens-response.dto.js";
import { AppError } from "../../utils/AppError.js";
import { RefreshTokenService } from "./services/refresh-token.service.js";
import { UserRepository } from "../user/repository/user.repository.js";

export class AuthService {
  constructor(
    private readonly refreshTokenService: RefreshTokenService,
    private readonly userRepository: UserRepository,
  ) {}
  login = async (input: LoginDTO): Promise<AuthResponseDTO> => {
    const user = await this.userRepository.findByEmail(input.email);
    if (!user) {
      throw AppError.unauthorized("Invalid email or password");
    }

    const accessToken = generateAccessToken({
      id: user._id.toString(),
      email: user.email,
    });

    const refreshToken = await this.refreshTokenService.create(user._id.toString());

    return {
      user: sanitizePassword(user)!,
      accessToken,
      refreshToken: refreshToken,
    };
  };

  refresh = async (refreshToken: string): Promise<TokensResponseDTO> => {
    if (!refreshToken) {
      throw AppError.unauthorized("Refresh token is required");
    }

    verifyRefreshToken(refreshToken);

    const storedToken = await this.refreshTokenService.get(refreshToken);

    if (!storedToken) {
      throw AppError.unauthorized("You are logged out");
    }

    const user = await this.userRepository.findById(storedToken.user.toString());
    if (!user) {
      throw AppError.unauthorized("User not found");
    }

    await this.refreshTokenService.revoke(refreshToken);

    const accessToken = generateAccessToken({
      id: user._id.toString(),
      email: user.email,
    });

    const newRefreshToken = await this.refreshTokenService.create(
      user._id.toString(),
    );

    return {
      accessToken,
      refreshToken: newRefreshToken,
    };
  };

  logout = async (refreshToken: string): Promise<void> => {
    if (refreshToken) {
      await this.refreshTokenService.revoke(refreshToken);
    }
  };

  logoutAll = async (userId: string): Promise<void> => {
    await this.refreshTokenService.revokeAllByUser(userId);
  };
}
