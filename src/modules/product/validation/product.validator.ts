import { body, param, query } from "express-validator";
import { AppError } from "../../../utils/AppError.js";
import { productRepository } from "../../../container/product.container.js";

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
];
// export const createProductValidator = [
//   body("name")
//     .trim()
//     .notEmpty()
//     .withMessage("Product name is required")
//     .isLength({ min: 2, max: 100 })
//     .withMessage("Product name must be between 2 and 100 characters"),

//   body("price")
//     .notEmpty()
//     .withMessage("Product price is required")
//     .isFloat({ min: 0 })
//     .withMessage("Product price must be a positive number"),

//   body("description")
//     .optional()
//     .trim()
//     .isLength({ max: 1000 })
//     .withMessage("Description must not exceed 1000 characters"),

//   body("stock")
//     .optional()
//     .isInt({ min: 0 })
//     .withMessage("Stock must be a non-negative integer"),
// ];
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

  body("description")
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage("Description must not exceed 1000 characters"),
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
];
