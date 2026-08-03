import type { Request, Response } from "express";
import { matchedData } from "express-validator";
import { StatusCodes } from "http-status-codes";

import { successResponse } from "../../utils/response.js";
import { asyncHandler } from "../../utils/async-handler.js";
import type { UpdateUserDTO } from "./dto/update-user.dto.js";
import type { CreateUserDTO } from "./dto/create-user.dto.js";
import type { CreateAddressDto } from "./dto/create-assress.dto.js";
import { getUserId } from "../../utils/auth.js";
import { UserService } from "./user.service.js";

export class UserController {
  constructor(private readonly userService: UserService) {}

  create = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const input: CreateUserDTO = matchedData(req) as CreateUserDTO;
    const user = await this.userService.create(input);

    successResponse(
      res,
      user,
      "User created successfully",
      StatusCodes.CREATED,
    );
  });

  list = asyncHandler(async (_req: Request, res: Response): Promise<void> => {
    const users = await this.userService.getAll();
    successResponse(res, users, "Users returned successfully", StatusCodes.OK);
  });

  getById = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const id: string = req.params["id"] as string;
    const user = await this.userService.getById(id);

    successResponse(res, user, "User returned successfully", StatusCodes.OK);
  });

  profile = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const id: string = getUserId(req);
    const user = await this.userService.getById(id);

    successResponse(res, user, "User returned successfully", StatusCodes.OK);
  });

  remove = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const id: string = req.params["id"] as string;
    await this.userService.remove(id);

    successResponse(res, null, "User removed successfully", StatusCodes.OK);
  });

  update = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const id: string = req.params["id"] as string;
    const input: UpdateUserDTO = matchedData(req) as UpdateUserDTO;

    const user = await this.userService.update(id, input);

    successResponse(res, user, "User updated successfully", StatusCodes.OK);
  });

  //  Address Controller

  createAddress = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const userId: string = req.params["id"] as string;
      const input: CreateAddressDto = matchedData(req) as CreateAddressDto;

      const user = await this.userService.createAddress(userId, input);

      successResponse(
        res,
        user,
        "Address created successfully",
        StatusCodes.CREATED,
      );
    },
  );
}
