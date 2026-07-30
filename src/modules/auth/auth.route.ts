import { Router } from "express";
import { authController } from "./auth.controller.js";
import { createUserValidator } from "../user/validations/user.validator.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { loginValidator } from "./validations/auth.validator.js";

const router: Router = Router();

router.post(
  "/register",
  createUserValidator,
  validate,
  authController.register,
);
router.post("/login", loginValidator, validate, authController.login);

export const authRoutes = router;
