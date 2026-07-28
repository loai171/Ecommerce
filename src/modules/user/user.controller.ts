import type { Request, Response } from "express";
import { matchedData } from "express-validator";
import { StatusCodes } from "http-status-codes";

import { userService } from "./user.service.js";
import { successResponse } from "../../utils/response.js";
import { asyncHandler } from "../../utils/async-handler.js";
import type { UpdateUserDTO } from "./dto/update-user.dto.js";
import type { CreateUserDTO } from "./dto/create-user.dto.js";
import { UserResponseDTO } from "./dto/user-respones.dto.js";

export const userController = {
  create: asyncHandler(
    async (req: Request, res: Response): Promise<Response> => {
      // for sinataize
      const input: CreateUserDTO = matchedData(req) as CreateUserDTO;
      const user: UserResponseDTO = await userService.create(input);

      return successResponse(
        res,
        user,
        "User created successfully",
        StatusCodes.CREATED,
      );
    },
  ),

  list: asyncHandler(
    async (_req: Request, res: Response): Promise<Response> => {
      const users: UserResponseDTO[] = await userService.getAll();
      return successResponse(
        res,
        users,
        "Users returend successfully",
        StatusCodes.OK,
      );
    },
  ),

  getById: asyncHandler(
    async (req: Request, res: Response): Promise<Response> => {
      const id: string = req.params["id"] as string;
      const user: UserResponseDTO = await userService.getById(id);
      return successResponse(
        res,
        user,
        "User returend successfully",
        StatusCodes.OK,
      );
    },
  ),
  remove: asyncHandler(
    async (req: Request, res: Response): Promise<Response> => {
      const id: string = req.params["id"] as string;
      await userService.remove(id);
      return successResponse(
        res,
        null,
        "User removed successfully",
        StatusCodes.OK,
      );
    },
  ),

  update: asyncHandler(
    async (req: Request, res: Response): Promise<Response> => {
      const id: string = req.params["id"] as string;
      const input: UpdateUserDTO = matchedData(req) as UpdateUserDTO;

      const user = await userService.update(id, input);
      return successResponse(
        res,
        user,
        "User updated successfully",
        StatusCodes.OK,
      );
    },
  ),
};
