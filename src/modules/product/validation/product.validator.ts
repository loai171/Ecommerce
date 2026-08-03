import { body, param } from "express-validator";
import { AppError } from "../../../utils/AppError.js";
import { productRepository } from "../repository/product.repository.js";

export const createProductValidator = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Product name is required")
    .isLength({ min: 2, max: 100 })
    .withMessage("Product name must be between 2 and 100 characters"),

  body("price")
    .notEmpty()
    .withMessage("Product price is required")
    .isFloat({ min: 0 })
    .withMessage("Product price must be a positive number"),

  body("description")
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage("Description must not exceed 1000 characters"),

  body("stock")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Stock must be a non-negative integer"),
];
export const existingId = [
  param("id")
    .notEmpty()
    .withMessage("Id is required")

    .isMongoId()
    .withMessage("Invalid user id")

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

  body("price")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Product price must be a non-negative number"),

  body("description")
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage("Description must not exceed 1000 characters"),

  body("stock")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Stock must be a non-negative integer"),
];
