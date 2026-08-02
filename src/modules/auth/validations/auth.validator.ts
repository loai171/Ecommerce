import { body } from "express-validator";

import { matchPassword } from "../../../utils/helpers.js";
import { AppError } from "../../../utils/AppError.js";
import { userRepository } from "../../user/repository/user.repository.js";

export const loginValidator = [
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Must be a valid email address")
    .custom(async (email) => {
      const user = await userRepository.findByEmail(email);

      if (!user) {
        throw AppError.unauthorized("Invalid email or password");
      }

      return true;
    }),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isString()
    .withMessage("Password must be a string")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long")
    .custom(async (password, { req }) => {
      const user = await userRepository.findByEmail(req.body.email);

      if (!user) {
        throw AppError.unauthorized("Invalid email or password");
      }

      const isMatching = await matchPassword(password, user.password);

      if (!isMatching) {
        throw AppError.unauthorized("Invalid email or password");
      }

      return true;
    }),
];
