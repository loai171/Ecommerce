import type { Request, Response } from "express";
import { matchedData } from "express-validator";
import { StatusCodes } from "http-status-codes";

import { successResponse } from "../../utils/response.js";
import { asyncHandler } from "../../utils/async-handler.js";
import { CreateProductDTO } from "./dto/create-product.dto.js";
import { productService } from "./product.service.js";
import { getUserId } from "../../utils/auth.js";
import { UpdateProductDTO } from "./dto/update-product.dto.js";

export const productController = {
  create: asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const userId = getUserId(req);
    const input: CreateProductDTO = matchedData(req) as CreateProductDTO;
    const product = await productService.create(userId, input);

    successResponse(
      res,
      product,
      "Product created successfully",
      StatusCodes.CREATED,
    );
  }),
  getAll: asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const userId = getUserId(req);
    const products = await productService.getAll(userId);

    successResponse(res, products, "Products returned successfully");
  }),
  get: asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const userId = getUserId(req);
    const productId = req.params["id"] as string;
    const product = await productService.get(productId, userId);

    successResponse(res, product, "Product returned successfully");
  }),
  update: asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const userId = getUserId(req);
    const productId = req.params["id"] as string;
    const input: UpdateProductDTO = matchedData(req) as UpdateProductDTO;
    const product = await productService.update(productId, userId, input);

    successResponse(res, product, "Product updated successfully");
  }),
  delete: asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const userId = getUserId(req);
    const productId = req.params["id"] as string;
    const product = await productService.delete(productId, userId);

    successResponse(res, product, "Product deleted successfully");
  }),
  deleteAll: asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const userId = getUserId(req);
      const products = await productService.deleteAll(userId);

      successResponse(res, products, "Products deleted successfully");
    },
  ),
};
