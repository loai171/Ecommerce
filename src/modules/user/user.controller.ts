import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { userService } from "./user.service.js";
import { successResponse } from "../../utils/response.js";
import { asyncHandler } from "../../utils/async-handler.js";


export const userController = {

  create: asyncHandler(
    async (req: Request, res: Response) => {
      const user = await userService.create(req.body);

      return successResponse(
        res,
        user,
        "User created successfully",
        StatusCodes.CREATED
      );
    }
  ),

};