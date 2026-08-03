import { Router } from "express";
import { userController } from "../../container/user.container.js";
import { validate } from "../../middlewares/validate.middleware.js";
import {
  createUserValidator,
  existingId,
  updateUserValidator,
} from "./validations/user.validator.js";
import { createAddressValidator } from "./validations/address.validator.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";

const router: Router = Router();

//  User Routes

router.post("/", createUserValidator, validate, userController.create);

router.get("/", userController.list);

router.get("/profile", authMiddleware, userController.profile);

router.get("/:id", existingId, validate, userController.getById);

router.delete("/:id", existingId, validate, userController.remove);

router.patch(
  "/:id",
  existingId,
  updateUserValidator,
  validate,
  userController.update,
);

//  Address Routes

router.post(
  "/:id/addresses",
  existingId,
  createAddressValidator,
  validate,
  userController.createAddress,
);

export const userRoutes = router;
