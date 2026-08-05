import { body, param } from "express-validator";

export const createProductVariantValidator = [
  body("productId")
    .notEmpty()
    .withMessage("Product ID is required")
    .isMongoId()
    .withMessage("Invalid product ID"),

  body("attributesValue")
    .notEmpty()
    .withMessage("attributesValue is required")
    .isObject()
    .withMessage("attributesValue must be an object"),

  body("price")
    .notEmpty()
    .withMessage("Price is required")
    .isFloat({ min: 0 })
    .withMessage("Price must be a positive number"),

  body("stock")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Stock must be a non-negative integer"),
];

export const updateProductVariantValidator = [
  body("attributesValue")
    .optional()
    .isObject()
    .withMessage("attributesValue must be an object"),

  body("price")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Price must be a positive number"),

  body("stock")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Stock must be a non-negative integer"),
];

export const existingVariantIdValidator = [
  param("id")
    .notEmpty()
    .withMessage("Variant ID is required")
    .isMongoId()
    .withMessage("Invalid variant ID"),
];

export const existingProductIdParamValidator = [
  param("productId")
    .notEmpty()
    .withMessage("Product ID is required")
    .isMongoId()
    .withMessage("Invalid product ID"),
];
