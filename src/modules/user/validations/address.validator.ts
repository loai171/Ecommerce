import { body } from "express-validator";

export const createAddressValidator = [
  body("country")
    .notEmpty()
    .withMessage("Country is required")
    .isString()
    .withMessage("Country must be a string")
    .isLength({ min: 2 })
    .withMessage("Country must be at least 2 characters long"),

  body("city")
    .notEmpty()
    .withMessage("City is required")
    .isString()
    .withMessage("City must be a string")
    .isLength({ min: 2 })
    .withMessage("City must be at least 2 characters long"),

  body("street")
    .notEmpty()
    .withMessage("Street is required")
    .isString()
    .withMessage("Street must be a string")
    .isLength({ min: 3 })
    .withMessage("Street must be at least 3 characters long"),

  body("isDefault")
    .optional()
    .isBoolean()
    .withMessage("isDefault must be a boolean"),
];
