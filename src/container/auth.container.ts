import { AuthController } from "../modules/auth/auth.controller.js";
import { AuthService } from "../modules/auth/auth.service.js";
import { RefreshTokenService } from "../modules/auth/services/refresh-token.service.js";
import { RefreshTokenRepository } from "../modules/auth/repository/refresh-token.repository.js";
import { userRepository, userService } from "./user.container.js";

export const refreshTokenRepository = new RefreshTokenRepository();
export const refreshTokenService = new RefreshTokenService(
  refreshTokenRepository,
);

export const authService = new AuthService(refreshTokenService, userRepository);

export const authController = new AuthController(authService, userService);
