import { Router } from "express";
import { userController } from "./user.controller.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { createUserSchema } from "./user.schema.js";
const router = Router();

router.post("/", validate(createUserSchema), userController.create);

export const userRoutes = router;
