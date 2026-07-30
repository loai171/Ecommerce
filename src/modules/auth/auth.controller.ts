import type { Request, Response } from "express";
import { matchedData } from "express-validator";
import { StatusCodes } from "http-status-codes";

import { asyncHandler } from "../../utils/async-handler.js";
import { successResponse } from "../../utils/response.js";
import type { CreateUserDTO } from "../user/dto/create-user.dto.js";
import { userService } from "../user/user.service.js";
import type { LoginDTO } from "./dto/login.dto.js";
import { authService } from "./auth.service.js";
import type { AuthResponseDTO } from "./dto/auth-response.dto.js";
import { USER_KEY } from "../../constants/auth.constants.js";

export const authController = {
  register: asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const input = matchedData(req) as CreateUserDTO;

    const user = await userService.create(input);

    successResponse(
      res,
      user,
      "User created successfully",
      StatusCodes.CREATED,
    );
  }),

  login: asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const input: LoginDTO = matchedData(req) as LoginDTO;

    const userWithTokens: AuthResponseDTO = await authService.login(input);

    successResponse(
      res,
      userWithTokens,
      "User logged in successfully",
      StatusCodes.OK,
    );
  }),

  refresh: asyncHandler(async (req, res) => {
    const refreshToken = req.body.refreshToken;

    const tokens = await authService.refresh(refreshToken);

    return successResponse(res, tokens, "Token refreshed");
  }),

  logout: asyncHandler(async (req, res) => {
    const refreshToken = req.body.refreshToken;

    await authService.logout(refreshToken);

    return successResponse(res, null, "Logged out successfully");
  }),

  logoutAll: asyncHandler(async (req, res) => {
    const userId = req[USER_KEY].id;

    await authService.logoutAll(userId);

    return successResponse(res, null, "Logged out from all devices");
  }),
};
