import { body, param } from "express-validator";
import { productVariantRepository } from "../../../container/product.container.js";
import { AppError } from "../../../utils/AppError.js";

export const addCartItemValidator = [
  body("variantSku")
    .notEmpty()
    .withMessage("Variant SKU is required")
    .isString()
    .withMessage("Variant SKU must be a string")
    .trim()
    .custom(async (variantSku, { req }) => {
      const variant = await productVariantRepository.getBySku(variantSku);

      if (!variant) {
        throw AppError.notFound("Product variant not found");
      }

      req.body.variantId = variant._id.toString();

      return true;
    }),

  body("quantity")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Quantity must be at least 1"),

  body("variantId").optional().isMongoId(),
];

export const existingCartItemValidator = [
  param("sku")
    .notEmpty()
    .withMessage("Variant SKU is required")
    .isString()
    .withMessage("Variant SKU must be a string")
    .trim()
    .custom(async (sku, { req }) => {
      const variant = await productVariantRepository.getBySku(sku);

      if (!variant) {
        throw AppError.notFound("Product variant not found");
      }

        req.params.variantId = variant._id.toString();

      return true;
    }),
  param("variantId").optional().isMongoId(),
];

export const updateCartItemQuantityValidator = [
  param("sku")
    .notEmpty()
    .withMessage("Variant SKU is required")
    .isString()
    .withMessage("Variant SKU must be a string")
    .trim()
    .custom(async (sku, { req }) => {
      const variant = await productVariantRepository.getBySku(sku);

      if (!variant) {
        throw AppError.notFound("Product variant not found");
      }

        req.params.variantId = variant._id.toString();

      return true;
    }),
  body("quantity")
    .notEmpty()
    .withMessage("Quantity is required")
    .isInt({ min: 1 })
    .withMessage("Quantity must be at least 1"),
];

