import { body, param, query } from "express-validator";
import { AppError } from "../../../utils/AppError.js";
import {
  productCategoryRepository,
  productRepository,
} from "../../../container/product.container.js";

export const createProductValidator = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Product name is required")
    .isLength({ min: 2, max: 100 })
    .withMessage("Product name must be between 2 and 100 characters"),

  body("description")
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage("Description must not exceed 1000 characters"),

  body("categoryId")
    .notEmpty()
    .withMessage("Category ID is required")
    .isMongoId()
    .withMessage("Invalid category ID")
    .custom(async (categoryId) => {
      const category = await productCategoryRepository.get(categoryId);
      if (!category) {
        throw AppError.notFound(
          `Category with id ${categoryId} does not exist`,
        );
      }
      return true;
    }),
];

export const existingId = [
  param("id")
    .notEmpty()
    .withMessage("Id is required")
    .isMongoId()
    .withMessage("Invalid product id")
    .custom(async (id) => {
      const existingProduct = await productRepository.get(id);

      if (!existingProduct) {
        throw AppError.notFound(`Product with id ${id} does not exist`);
      }

      return true;
    }),
];

export const updateProductValidator = [
  body("name")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Product name cannot be empty")
    .isLength({ min: 2, max: 100 })
    .withMessage("Product name must be between 2 and 100 characters"),

  body("description")
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage("Description must not exceed 1000 characters"),

  body("categoryId")
    .optional()
    .isMongoId()
    .withMessage("Invalid category ID")
    .custom(async (categoryId) => {
      const category = await productCategoryRepository.get(categoryId);
      if (!category) {
        throw AppError.notFound(
          `Category with id ${categoryId} does not exist`,
        );
      }
      return true;
    }),
];

export const productQueryValidator = [
  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Page must be a positive integer")
    .toInt(),

  query("limit")
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage("Limit must be between 1 and 100")
    .toInt(),

  query("categoryId").optional().isMongoId().withMessage("Invalid category ID"),
];
