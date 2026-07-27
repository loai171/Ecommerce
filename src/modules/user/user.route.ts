import { Router } from "express";
import { userController } from "./user.controller.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { createUserValidator } from "./user.validator.js";

const router = Router();

router.post("/", validate(createUserValidator), userController.create);

export const userRoutes = router;
