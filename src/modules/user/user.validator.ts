import { body, param } from "express-validator";
import { userRepository } from "./user.repository.js";
import { AppError } from "../../utils/AppError.js";
import { matchPassword } from "../../utils/helpers.js";

export const createUserValidator = [
  body("name")
    .optional()
    .notEmpty()
    .withMessage("Name is required")
    .isString()
    .withMessage("Name must be a string")
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters long"),

  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Must be a valid email address")
    .custom(async (email) => {
      const existingUser = await userRepository.findByEmail(email);

      if (existingUser) {
        throw AppError.conflict(`User with email ${email} already exists`);
      }

      return true;
    }),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

export const existingId = [
  param("id")
    .notEmpty()
    .withMessage("Id is required")

    .isMongoId()
    .withMessage("Invalid user id")

    .custom(async (id) => {
      const existingUser = await userRepository.findById(id);

      if (!existingUser) {
        throw AppError.notFound(`User with id ${id} does not exist`);
      }

      return true;
    }),
];
export const updateUserValidator = [
  body("name")
    .optional()
    .isString()
    .withMessage("Name must be a string")
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters long"),

  body("email")
    .optional()
    .isEmail()
    .withMessage("Must be a valid email address")
    .custom(async (email, { req }) => {
      const existingUser = await userRepository.findByEmail(email);

      if (!existingUser) {
        return true;
      }

      if (existingUser._id.toString() === req.params?.id) {
        return true;
      }

      throw AppError.conflict(`User with email ${email} already exists`);
    }),

  body("oldPassword")
    .if(body("newPassword").exists())
    .notEmpty()
    .withMessage("Old password is required")
    .custom(async (oldPassword, { req }) => {
      const user = await userRepository.findById(req.params?.id);

      if (!user) {
        throw AppError.notFound("User not found");
      }

      const isMatching = await matchPassword(oldPassword, user.password);

      if (!isMatching) {
        throw AppError.unauthorized("Old password is incorrect");
      }

      return true;
    }),

  body("newPassword")
    .if(body("oldPassword").exists())
    .notEmpty()
    .withMessage("New password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),

  body("confirmPassword")
    .if(body("newPassword").exists())
    .notEmpty()
    .withMessage("Confirm password is required")
    .custom((confirmPassword, { req }) => {
      if (confirmPassword !== req.body.newPassword) {
        throw AppError.badRequest("Passwords do not match");
      }

      return true;
    }),

  body("age")
    .optional()
    .isInt({ min: 18 })
    .withMessage("Age must be greater than or equal to 18"),
];
