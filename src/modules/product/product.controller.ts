import type { Request, Response } from "express";
import { matchedData } from "express-validator";
import { StatusCodes } from "http-status-codes";

import { successResponse } from "../../utils/response.js";
import { asyncHandler } from "../../utils/async-handler.js";
import { getUserId } from "../../utils/auth.js";
import { UpdateProductDTO } from "./dto/update-product.dto.js";
import { ProductService } from "./product.service.js";
import { ProductQueryDTO } from "./dto/product-query.dto.js";
import { ProductListResponseDTO } from "./dto/product-response.dto.js";
import { CreateProductDTO } from "./dto/create-product.dto.js";

export class ProductController {
  constructor(private readonly productService: ProductService) {}

  // Create a new product
  create = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const userId = getUserId(req);
    const input: CreateProductDTO = matchedData(req) as CreateProductDTO;
    const product = await this.productService.create(userId, input);

    successResponse(
      res,
      product,
      "Product created successfully",
      StatusCodes.CREATED,
    );
  });

  // Get all products with pagination
  getAll = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const query = matchedData(req) as ProductQueryDTO;
    const userId = getUserId(req);
    const products: ProductListResponseDTO = await this.productService.getAll(
      userId,
      query,
    );

    successResponse(res, products, "Products returned successfully");
  });

  // Get one product by id
  get = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const userId = getUserId(req);
    const productId = req.params["id"] as string;
    const product = await this.productService.get(productId, userId);

    successResponse(res, product, "Product returned successfully");
  });

  // Update a product by id
  update = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const userId = getUserId(req);
    const productId = req.params["id"] as string;
    const input: UpdateProductDTO = matchedData(req) as UpdateProductDTO;
    const product = await this.productService.update(productId, userId, input);

    successResponse(res, product, "Product updated successfully");
  });

  // Delete one product by id
  delete = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const userId = getUserId(req);
    const productId = req.params["id"] as string;
    const product = await this.productService.delete(productId, userId);

    successResponse(res, product, "Product deleted successfully");
  });

  // Delete all products for user
  deleteAll = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const userId = getUserId(req);
      const products = await this.productService.deleteAll(userId);

      successResponse(res, products, "Products deleted successfully");
    },
  );
}
