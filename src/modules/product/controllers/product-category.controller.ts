import type { Request, Response } from "express";
import { matchedData } from "express-validator";
import { StatusCodes } from "http-status-codes";

import {
  CreateProductCategoryDTO,
  UpdateProductCategoryDTO,
} from "../dto/create-category.dto.js";
import { ProductCategoryService } from "../service/product-category.service.js";
import { successResponse } from "../../../utils/response.js";
import { asyncHandler } from "../../../utils/async-handler.js";

export class ProductCategoryController {
  constructor(
    private readonly productCategoryService: ProductCategoryService,
  ) {}

  // Create a new category
  create = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const data = matchedData(req) as CreateProductCategoryDTO;
    const category = await this.productCategoryService.create(data);

    successResponse(
      res,
      category,
      "Category created successfully",
      StatusCodes.CREATED,
    );
  });

  // Get all categories
  getAll = asyncHandler(async (_req: Request, res: Response): Promise<void> => {
    const categories = await this.productCategoryService.getAll();

    successResponse(res, categories, "Categories returned successfully");
  });

  // Get one category by id
  get = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const id = req.params["id"] as string;
    const category = await this.productCategoryService.get(id);

    successResponse(res, category, "Category returned successfully");
  });

  // Update a category by id
  update = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const id = req.params["id"] as string;
    const data = matchedData(req) as UpdateProductCategoryDTO;
    const category = await this.productCategoryService.update(id, data);

    successResponse(res, category, "Category updated successfully");
  });

  // Delete a category by id
  delete = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const id = req.params["id"] as string;
    const category = await this.productCategoryService.delete(id);

    successResponse(res, category, "Category deleted successfully");
  });
}
