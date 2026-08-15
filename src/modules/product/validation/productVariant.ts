import { body, param } from "express-validator";
import {
  productRepository,
  productVariantRepository,
} from "../../../container/product.container.js";
import { AppError } from "../../../utils/AppError.js";

export const createProductVariantValidator = [
  body("productSlug")
    .notEmpty()
    .withMessage("Product slug is required")
    .isString()
    .withMessage("Product slug must be a string")
    .trim()
    .custom(async (slug, { req }) => {
      const product = await productRepository.getBySlug(slug);

      if (!product) {
        throw AppError.notFound("Product not found");
      }

      req.body.productId = product._id.toString();

      return true;
    }),

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

  body("sku")
    .notEmpty()
    .withMessage("SKU is required")
    .isString()
    .withMessage("SKU must be a string")
    .trim()
    .isLength({ min: 3, max: 50 })
    .withMessage("SKU must be between 3 and 50 characters"),
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

  body("sku")
    .optional()
    .isString()
    .trim()
    .isLength({ min: 3, max: 50 })
    .withMessage("SKU must be between 3 and 50 characters"),
];

export const existingVariantSkuValidator = [
  param("sku")
    .notEmpty()
    .withMessage("SKU is required")
    .isString()
    .withMessage("Invalid SKU")
    .trim()
    .custom(async (sku, { req }) => {
      const variant = await productVariantRepository.getBySku(sku);

      if (!variant) {
        throw new Error("Product variant not found");
      }

      const params = (req.params ?? {}) as Record<string, string>;
      params.id = variant._id.toString();
      req.params = params;

      return true;
    }),
];

export const existingProductIdParamValidator = [
  param("productId")
    .notEmpty()
    .withMessage("Product ID is required")
    .isMongoId()
    .withMessage("Invalid product ID"),
];
