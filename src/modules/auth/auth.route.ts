import { Router } from "express";
import { createUserValidator } from "../user/validations/user.validator.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { loginValidator } from "./validations/auth.validator.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { authController } from "../../container/auth.container.js";

const router: Router = Router();

router.post(
  "/register",
  createUserValidator,
  validate,
  authController.register,
);
router.post("/login", loginValidator, validate, authController.login);

router.post("/refresh", authController.refresh);

router.post("/logout", authMiddleware, authController.logout);

router.post("/logout-all", authMiddleware, authController.logoutAll);

export const authRoutes = router;
