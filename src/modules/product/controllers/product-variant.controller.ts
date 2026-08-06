import type { Request, Response } from "express";
import { matchedData } from "express-validator";
import { StatusCodes } from "http-status-codes";

import {
  CreateProductVariantDTO,
  UpdateProductVariantDTO,
} from "../dto/create-variant.dto.js";
import { ProductVariantService } from "../service/product-variant.service.js";
import { successResponse } from "../../../utils/response.js";
import { asyncHandler } from "../../../utils/async-handler.js";
import { getUserId } from "../../../utils/auth.js";

export class ProductVariantController {
  constructor(private readonly productVariantService: ProductVariantService) {}

  // Create a new variant for a product
  create = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const userId = getUserId(req);
    const data = matchedData(req) as CreateProductVariantDTO;
    const variant = await this.productVariantService.create(userId, data);

    successResponse(
      res,
      variant,
      "Product variant created successfully",
      StatusCodes.CREATED,
    );
  });

  // Get all variants for one product
  getAllByProductId = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const userId = getUserId(req);
      const productId = req.params["productId"] as string;
      const variants = await this.productVariantService.getAllByProductId(
        productId,
        userId,
      );

      successResponse(res, variants, "Product variants returned successfully");
    },
  );

  // Get one variant by id
  get = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const userId = getUserId(req);
    const id = req.params["id"] as string;
    const variant = await this.productVariantService.get(id, userId);

    successResponse(res, variant, "Product variant returned successfully");
  });

  // Update a variant by id
  update = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const userId = getUserId(req);
    const id = req.params["id"] as string;
    const data = matchedData(req) as UpdateProductVariantDTO;
    const variant = await this.productVariantService.update(id, userId, data);

    successResponse(res, variant, "Product variant updated successfully");
  });

  // Delete a variant by id
  delete = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const userId = getUserId(req);
    const id = req.params["id"] as string;
    const variant = await this.productVariantService.delete(id, userId);

    successResponse(res, variant, "Product variant deleted successfully");
  });
}
