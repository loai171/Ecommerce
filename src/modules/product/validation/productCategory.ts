import { body, param } from "express-validator";
import { AppError } from "../../../utils/AppError.js";
import { productCategoryRepository } from "../../../container/product.container.js";

export const createProductCategoryValidator = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Category name is required")
    .isString()
    .withMessage("Category name must be a string"),

  body("attributes")
    .isArray({ min: 1 })
    .withMessage("attributes must be a non-empty array"),

  body("attributes.*")
    .trim()
    .notEmpty()
    .withMessage("Attribute name cannot be empty")
    .isString()
    .withMessage("Attribute name must be a string"),
];

export const updateProductCategoryValidator = [
  body("name")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Category name cannot be empty")
    .isString()
    .withMessage("Category name must be a string"),

  body("attributes")
    .optional()
    .isArray({ min: 1 })
    .withMessage("attributes must be a non-empty array"),

  body("attributes.*")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Attribute name cannot be empty")
    .isString()
    .withMessage("Attribute name must be a string"),
];

export const existingCategoryIdValidator = [
  param("id")
    .notEmpty()
    .withMessage("Category ID is required")
    .isMongoId()
    .withMessage("Invalid category ID")
    .custom(async (id) => {
      const existingCategory = await productCategoryRepository.get(id);

      if (!existingCategory) {
        throw AppError.notFound(`Category with id ${id} does not exist`);
      }

      return true;
    }),
];
