import { Router } from "express";
import { userController } from "./user.controller.js";
import { validate } from "../../middlewares/validate.middleware.js";
import {
  createUserValidator,
  existingId,
  updateUserValidator,
} from "./user.validator.js";
import { createAddressValidator } from "./address.validator.js";

const router: Router = Router();

//  User Routes

router.post("/", validate(createUserValidator), userController.create);

router.get("/", userController.list);

router.get("/:id", validate(existingId), userController.getById);

router.delete("/:id", validate(existingId), userController.remove);

router.patch(
  "/:id",
  validate(existingId),
  validate(updateUserValidator),
  userController.update,
);

//  Address Routes

router.post(
  "/:id/addresses",
  validate(existingId),
  validate(createAddressValidator),
  userController.createAddress,
);

export const userRoutes = router;
