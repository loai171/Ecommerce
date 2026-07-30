import type { Request, Response } from "express";
import { matchedData } from "express-validator";
import { StatusCodes } from "http-status-codes";

import { asyncHandler } from "../../utils/async-handler.js";
import { successResponse } from "../../utils/response.js";
import type { CreateUserDTO } from "../user/dto/create-user.dto.js";
import { userService } from "../user/user.service.js";
import { LoginDTO } from "./dto/login.dto.js";
import { authService } from "./auth.service.js";
import { AuthResponseDTO } from "./dto/auth-response.dto.js";

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

    const user: AuthResponseDTO = await authService.login(input);

    successResponse(res, user, "User logged in successfully", StatusCodes.OK);
  }),
};
