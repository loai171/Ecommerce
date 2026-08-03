import type { Request, Response } from "express";
import { matchedData } from "express-validator";
import { StatusCodes } from "http-status-codes";

import { asyncHandler } from "../../utils/async-handler.js";
import { successResponse } from "../../utils/response.js";
import type { CreateUserDTO } from "../user/dto/create-user.dto.js";
import type { LoginDTO } from "./dto/login.dto.js";
import type { AuthResponseDTO } from "./dto/auth-response.dto.js";
import { REFRESH_TOKEN_KEY, USER_KEY } from "../../constants/auth.constants.js";
import { TokensResponseDTO } from "./dto/tokens-response.dto.js";
import { refreshTokenCookieOptions } from "../../config/cookie.js";
import { AppError } from "../../utils/AppError.js";
import { AuthService } from "./auth.service.js";
import { UserService } from "../user/user.service.js";

export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}
  register = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const input: CreateUserDTO = matchedData(req) as CreateUserDTO;

      const user = await this.userService.create(input);

      successResponse(
        res,
        user,
        "User created successfully",
        StatusCodes.CREATED,
      );
    },
  );

  login = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const input: LoginDTO = matchedData(req) as LoginDTO;

    const result: AuthResponseDTO = await this.authService.login(input);

    res.cookie(
      REFRESH_TOKEN_KEY,
      result.refreshToken,
      refreshTokenCookieOptions,
    );

    successResponse(
      res,
      {
        user: result.user,
        accessToken: result.accessToken,
      },
      "User logged in successfully",
    );
  });

  refresh = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const refreshToken = req.cookies[REFRESH_TOKEN_KEY];

    if (!refreshToken) {
      throw AppError.unauthorized("Refresh token is required");
    }

    const result: TokensResponseDTO = await this.authService.refresh(refreshToken);

    res.cookie(
      REFRESH_TOKEN_KEY,
      result.refreshToken,
      refreshTokenCookieOptions,
    );

    successResponse(
      res,
      {
        accessToken: result.accessToken,
      },
      "Token refreshed",
    );
  });

  logout = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const refreshToken = req.cookies[REFRESH_TOKEN_KEY];

    await this.authService.logout(refreshToken);

    res.clearCookie(REFRESH_TOKEN_KEY, refreshTokenCookieOptions);

    successResponse(res, null, "Logged out successfully");
  });

  logoutAll = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const userId = req.body?.userId || req[USER_KEY]?.id;

      await this.authService.logoutAll(userId);

      res.clearCookie(REFRESH_TOKEN_KEY, refreshTokenCookieOptions);

      successResponse(res, null, "Logged out from all devices");
    },
  );
}
